import { Sidebar } from "@/components/sidebar/Sidebar";
import styles from "./sidebar.module.scss";
import { Button } from "@/components/button/Button";
import Trash from "@/assets/svg/trash.svg?react";
import type { View } from "@/stores/view-store";

export interface SidebarProps {
  selectedView: View;
  onChangeView: (view: View) => void;
}

export function ProcessManagerSidebar({
  selectedView,
  onChangeView,
}: SidebarProps) {
  return (
    <Sidebar className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>Oak Tree Cemetery</h2>
          <span>Process Manager</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.menu}>
          <Button
            variant={selectedView === "organizations" ? "filled" : "outlined"}
            onClick={() => onChangeView("organizations")}
            icon={<Trash />}
          >
            Organizations
          </Button>
          <Button
            variant={selectedView === "contractors" ? "filled" : "outlined"}
            onClick={() => onChangeView("contractors")}
            icon={<Trash />}
          >
            Contractors
          </Button>
          <Button
            variant={selectedView === "clients" ? "filled" : "outlined"}
            onClick={() => onChangeView("clients")}
            icon={<Trash />}
          >
            Clients
          </Button>
        </div>
      </div>
      <span className={styles.copyright}>All Funeral Services © 2015-2025</span>
    </Sidebar>
  );
}
