import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  size?: "oversize" | "normal" | "mini";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "outlined",
  size = "normal",
  iconPosition = "left",
  icon,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        styles.button,
        variant && styles[`button--${variant}`],
        size && styles[`button--${size}`],
        iconPosition && styles[`button--icon-position-${iconPosition}`]
      )}
      {...rest}
    >
      {icon && <span className={styles["button__icon"]}>{icon}</span>}
      {children && <span className={styles["button__label"]}>{children}</span>}
    </button>
  );
}
