import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./icon-button.module.scss";
import classNames from "classnames";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export function IconButton({ icon, className, ...rest }: IconButtonProps) {
  return (
    <button {...rest} className={classNames(styles.button, className)}>
      {icon}
    </button>
  );
}
