import type { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface FormItemProps {
  label: string;
}

export function FormItem({
  label,
  children,
}: PropsWithChildren<FormItemProps>) {
  return (
    <div className={styles.form__item}>
      <div className={styles.form__label}>{label}:</div>
      {children}
    </div>
  );
}
