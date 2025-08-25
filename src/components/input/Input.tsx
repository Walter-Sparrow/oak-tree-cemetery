import type { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} className={classNames(styles.input, className)} />;
}
