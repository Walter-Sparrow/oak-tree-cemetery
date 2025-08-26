import type { Company } from "@/stores/organizations-store";
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

export const OrganizationDetails = observer(() => {
  const { viewStore } = useStore();
  const org = viewStore.context as Company;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <IconButton
            icon={<Arrow />}
            className={styles.back}
            onClick={() => viewStore.switchView("organizations")}
          />
          <h1>{org.name}</h1>
          <div className={styles.controls}>
            <IconButton icon={<Pencil />} />
            <IconButton danger icon={<Trash />} />
          </div>
        </div>
        <div className={styles.cards}>
          <OrganizationDetailsCard organization={org} />
          <ContactCard contact={org.contact} />
          <PhotosCard photos={org.photos} />
        </div>
      </div>
    </div>
  );
});
