import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={classNames(styles.input, className)}
    />
  );
});
