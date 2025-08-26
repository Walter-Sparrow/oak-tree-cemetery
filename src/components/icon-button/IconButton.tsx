import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./icon-button.module.scss";
import classNames from "classnames";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  icon: ReactNode;
}

export function IconButton({
  icon,
  className,
  danger,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      className={classNames(styles.button, className, {
        [styles["button--danger"]]: danger,
      })}
    >
      {icon}
    </button>
  );
}
