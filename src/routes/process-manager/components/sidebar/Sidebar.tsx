import { Sidebar } from "@/components/sidebar/Sidebar";
import styles from "./sidebar.module.scss";
import { Button } from "@/components/button/Button";
import Briefcase from "@/assets/svg/briefcase.svg?react";
import Archive from "@/assets/svg/archive.svg?react";
import User from "@/assets/svg/user.svg?react";
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
      <div className={styles.sidebar__content}>
        <div className={styles.sidebar__info}>
          <h2>Oak Tree Cemetery</h2>
          <span>Process Manager</span>
        </div>
        <div className={styles.sidebar__divider} />
        <div className={styles.sidebar__menu}>
          <Button
            variant={
              selectedView === "organizations" ||
              selectedView === "organization"
                ? "filled"
                : "outlined"
            }
            onClick={() => onChangeView("organizations")}
            icon={<Briefcase />}
          >
            Organizations
          </Button>
          <Button
            variant={selectedView === "contractors" ? "filled" : "outlined"}
            onClick={() => onChangeView("contractors")}
            icon={<Archive />}
          >
            Contractors
          </Button>
          <Button
            variant={selectedView === "clients" ? "filled" : "outlined"}
            onClick={() => onChangeView("clients")}
            icon={<User />}
          >
            Clients
          </Button>
        </div>
      </div>
      <span className={styles.sidebar__copyright}>
        All Funeral Services © 2015-2025
      </span>
    </Sidebar>
  );
}
