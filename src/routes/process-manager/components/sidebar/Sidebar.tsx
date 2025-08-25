import { Sidebar } from "@/components/sidebar/Sidebar";
import styles from "./sidebar.module.scss";
import { Button } from "@/components/button/Button";
import Trash from "@/assets/svg/trash.svg?react";

export function ProcessManagerSidebar() {
  return (
    <Sidebar className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>Oak Tree Cemetery</h2>
          <span>Process Manager</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.menu}>
          <Button variant="filled" icon={<Trash />}>
            Organizations
          </Button>
          <Button icon={<Trash />}>Contractors</Button>
          <Button icon={<Trash />}>Clients</Button>
        </div>
      </div>
      <span className={styles.copyright}>All Funeral Services © 2015-2025</span>
    </Sidebar>
  );
}
