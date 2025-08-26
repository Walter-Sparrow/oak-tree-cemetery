import { useEffect } from "react";
import styles from "./photo-viewer.module.scss";
import Close from "@/assets/svg/x.svg?react";
import { IconButton } from "../icon-button/IconButton";

interface PhotoViewerProps {
  photoUrl: string;
  alt: string;
  onClose: () => void;
}

export function PhotoViewer({ photoUrl, alt, onClose }: PhotoViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.viewer} onClick={(e) => e.stopPropagation()}>
        <IconButton
          icon={<Close />}
          className={styles.viewer__close}
          onClick={onClose}
        />
        <img src={photoUrl} alt={alt} className={styles.viewer__image} />
      </div>
    </div>
  );
}
