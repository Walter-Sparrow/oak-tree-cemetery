import { useStore } from "@/stores/root-store";
import { observer } from "mobx-react-lite";
import styles from "./org-details.module.scss";
import { IconButton } from "@/components/icon-button/IconButton";
import Trash from "@/assets/svg/trash.svg?react";
import Arrow from "@/assets/svg/arrow.svg?react";
import Pencil from "@/assets/svg/pencil.svg?react";
import { OrganizationDetailsCard } from "../../components/organization-details-card/OrganizationDetailsCard";
import { ContactCard } from "../../components/contact-card/ContactCard";
import { PhotosCard } from "../../components/photos-card/PhotosCard";
import { useState } from "react";
import { OrganizationRenameModal } from "../../components/organization-rename-modal/OrganizationRenameModal";
import { Error } from "@/components/error/Error";
import { OrganizationRemoveModal } from "../../components/organization-remove-modal/OrganizationRemoveModal";

export const OrganizationDetails = observer(() => {
  const { viewStore, organizationsStore } = useStore();
  const orgId = viewStore.context as string;
  const org = organizationsStore.organizations.find((o) => o.id === orgId);

  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  if (!org) {
    return <Error message={`No organization with id=${orgId}`} />;
  }

  return (
    <>
      <div className={styles.details}>
        <div className={styles.details__content}>
          <div className={styles.details__header}>
            <IconButton
              icon={<Arrow />}
              className={styles["details__back-btn"]}
              onClick={() => viewStore.switchView("organizations")}
            />
            <h1>{org.name}</h1>
            <div className={styles.details__controls}>
              <IconButton
                icon={<Pencil />}
                onClick={() => setOpenRenameModal(true)}
              />
              <IconButton
                danger
                icon={<Trash />}
                onClick={() => setOpenRemoveModal(true)}
              />
            </div>
          </div>
          <div className={styles.details__cards}>
            <OrganizationDetailsCard organization={org} />
            <ContactCard contact={org.contact} />
            <PhotosCard organizationId={org.id} photos={org.photos} />
          </div>
        </div>
      </div>
      <OrganizationRenameModal
        organization={org}
        isOpen={openRenameModal}
        onOpenChange={setOpenRenameModal}
      />
      <OrganizationRemoveModal
        organization={org}
        isOpen={openRemoveModal}
        onOpenChange={setOpenRemoveModal}
      />
    </>
  );
});
