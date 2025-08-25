import { MenuButton } from "./menu-button/MenuButton";
import styles from "./main-menu.module.scss";
import Logo from "@/assets/svg/logo.svg?react";
import Trash from "@/assets/svg/trash.svg?react";

export type MenuElements = "home" | "search";

export interface MenuProps {
  value: MenuElements;
  onChange: (value: MenuElements) => void;
}

export function MainMenu({ value, onChange }: MenuProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.items}>
        <span className={styles.logo}>
          <Logo />
        </span>
        <MenuButton
          selected={value === "home"}
          icon={<Trash />}
          title="Home"
          onClick={() => onChange("home")}
        />
        <MenuButton
          selected={value === "search"}
          icon={<Trash />}
          title="Search"
          onClick={() => onChange("search")}
        />
      </div>
      <span className={styles.divider} />
      <div className={styles.items}>
        <MenuButton icon={<Trash />} title="Settings" />
        <MenuButton icon={<Trash />} title="Logout" />
      </div>
    </nav>
  );
}
