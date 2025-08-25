import type { Company } from "@/stores/organizations-store";
import { useStore } from "@/stores/root-store";
import { observer } from "mobx-react-lite";
import styles from "./org-details.module.scss";
import { IconButton } from "@/components/icon-button/IconButton";
import Trash from "@/assets/svg/trash.svg?react";

export const OrganizationDetails = observer(() => {
  const { viewStore } = useStore();
  const org = viewStore.context as Company;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <IconButton
            icon={<Trash />}
            className={styles.back}
            onClick={() => viewStore.switchView("organizations")}
          />
          <h1>{org.name}</h1>
          <div className={styles.controls}>
            <IconButton icon={<Trash />} />
            <IconButton icon={<Trash />} />
          </div>
        </div>
      </div>
    </div>
  );
});
