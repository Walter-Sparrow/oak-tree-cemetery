import classNames from "classnames";
import type { HTMLAttributes } from "react";
import styles from "./card.module.scss";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={classNames(styles.card, className)} />;
}
