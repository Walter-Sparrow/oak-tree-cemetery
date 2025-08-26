import { MenuButton } from "./menu-button/MenuButton";
import styles from "./main-menu.module.scss";
import Logo from "@/assets/svg/logo.svg?react";
import Briefcase from "@/assets/svg/Briefcase.svg?react";
import Search from "@/assets/svg/magnifying-glass.svg?react";
import Gear from "@/assets/svg/gear.svg?react";
import SignOut from "@/assets/svg/sign-out.svg?react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root-store";

export type MenuElements = "home" | "search";

export interface MenuProps {
  value: MenuElements;
  onChange: (value: MenuElements) => void;
}

export const MainMenu = observer(({ value, onChange }: MenuProps) => {
  const { authStore } = useStore();

  return (
    <nav className={styles.menu}>
      <div className={styles.menu__items}>
        <span className={styles.menu__logo}>
          <Logo />
        </span>
        <MenuButton
          selected={value === "home"}
          icon={<Briefcase />}
          title="Home"
          onClick={() => onChange("home")}
        />
        <MenuButton
          selected={value === "search"}
          icon={<Search />}
          title="Search"
          onClick={() => onChange("search")}
        />
      </div>
      <span className={styles.menu__divider} />
      <div className={styles.menu__items}>
        <MenuButton icon={<Gear />} title="Settings" />
        <MenuButton
          icon={<SignOut />}
          title="Logout"
          onClick={() => authStore.logout()}
        />
      </div>
    </nav>
  );
});
