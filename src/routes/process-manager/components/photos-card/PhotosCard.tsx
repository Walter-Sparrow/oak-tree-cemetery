import type { Photo } from "@/stores/organizations-store";
import styles from "./photos-card.module.scss";
import Trash from "@/assets/svg/trash.svg?react";
import PhotoAdd from "@/assets/svg/photo-add.svg?react";
import { Card } from "@/components/card/Card";
import { Button } from "@/components/button/Button";

interface PhotosCardProps {
  photos: Photo[];
}

export function PhotosCard({ photos }: PhotosCardProps) {
  return (
    <Card
      className={styles.card}
      title="Photos"
      actions={
        <Button size="mini" icon={<PhotoAdd />}>
          Add
        </Button>
      }
    >
      <div className={styles.card__photos}>
        {photos.map((photo) => (
          <div key={photo.thumbpath} className={styles.card__photo}>
            <img src={photo.thumbpath} alt={photo.name} />
            <Button variant="filled" icon={<Trash />} />
          </div>
        ))}
      </div>
    </Card>
  );
}
