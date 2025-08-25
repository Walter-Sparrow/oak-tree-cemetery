import styles from "./error.module.scss";

interface ErrorProps {
  message?: string;
}

export function Error({ message }: ErrorProps) {
  return <div className={styles.container}>{message}</div>;
}
