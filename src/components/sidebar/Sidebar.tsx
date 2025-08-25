import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./sidebar.module.scss";
import classNames from "classnames";

export function Sidebar({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...rest} className={classNames(styles.sidebar, className)}>
      {children}
    </div>
  );
}
