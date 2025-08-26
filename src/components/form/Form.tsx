import type { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export function Form({ children }: PropsWithChildren) {
  return <div className={styles.form}>{children}</div>;
}
