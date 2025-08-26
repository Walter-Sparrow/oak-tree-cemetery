import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions?: ReactNode;
}

export function Card({
  className,
  title,
  actions,
  children,
  ...rest
}: CardProps) {
  return (
    <div {...rest} className={classNames(styles.card, className)}>
      {(title || actions) && (
        <div className={styles.card__header}>
          <span>{title}</span>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
