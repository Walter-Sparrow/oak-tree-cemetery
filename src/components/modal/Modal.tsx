import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import { Button } from "../button/Button";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOk?: () => void;
  onClose?: () => void;
  title: string;
  okProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  cancelProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export function Modal({
  isOpen,
  onOk,
  onClose,
  title,
  okProps,
  cancelProps,
  className,
  children,
  ...rest
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div {...rest} className={classNames(styles.modal, className)}>
        <div className={styles.modal__content}>
          <span className={styles.modal__title}>{title}</span>
          {children}
          <div className={styles.modal__controls}>
            {onClose && (
              <Button {...cancelProps} onClick={onClose}>
                {cancelProps?.title ?? "Cancel"}
              </Button>
            )}
            {onOk && (
              <Button {...okProps} variant="filled" onClick={onOk}>
                {okProps?.title ?? "Yes"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
