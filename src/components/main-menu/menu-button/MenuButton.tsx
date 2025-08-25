import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./menu-button.module.scss";
import classNames from "classnames";

export interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  selected?: boolean;
}

export function MenuButton({ selected, icon, ...rest }: MenuButtonProps) {
  return (
    <button
      className={classNames(styles.button, {
        [styles["button--selected"]]: selected,
      })}
      {...rest}
    >
      <span className={styles["button__icon"]}>{icon}</span>
    </button>
  );
}
