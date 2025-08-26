import type { Photo } from "@/stores/organizations-store";
import styles from "./photos-card.module.scss";
import Trash from "@/assets/svg/trash.svg?react";
import PhotoAdd from "@/assets/svg/photo-add.svg?react";
import { Card } from "@/components/card/Card";
import { Button } from "@/components/button/Button";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root-store";
import { useRef } from "react";

interface PhotosCardProps {
  organizationId: string;
  photos: Photo[];
}

export const PhotosCard = observer(
  ({ organizationId, photos }: PhotosCardProps) => {
    const { organizationsStore } = useStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRemove = (name: string) => {
      organizationsStore.removeOrganizationImage(organizationId, name);
    };

    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        organizationsStore.uploadOrganizationImage(organizationId, file);
        e.target.value = "";
      }
    };

    return (
      <Card
        className={styles.card}
        title="Photos"
        actions={
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button size="mini" icon={<PhotoAdd />} onClick={handleUploadClick}>
              Add
            </Button>
          </>
        }
      >
        <div className={styles.card__photos}>
          {photos.map((photo) => (
            <div key={photo.name} className={styles.card__photo}>
              <img src={photo.thumbpath} alt={photo.name} />
              <Button
                variant="filled"
                icon={<Trash />}
                onClick={() => handleRemove(photo.name)}
              />
            </div>
          ))}
        </div>
      </Card>
    );
  }
);
