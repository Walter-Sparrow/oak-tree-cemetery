import type { Company } from "@/stores/organizations-store";
import styles from "./org-card.module.scss";
import type { HTMLAttributes } from "react";

interface OrganizationCardProps {
  organization: Company;
  onClick?: HTMLAttributes<HTMLDivElement>["onClick"];
}

export function OrganizationCard({
  organization,
  onClick: clickHandler,
}: OrganizationCardProps) {
  const thumbnail =
    organization.photos.length > 0
      ? organization.photos[0].thumbpath
      : "https://placehold.co/400";

  return (
    <div className={styles.card} onClick={clickHandler}>
      <img src={thumbnail} alt="Organization photo" />
      <span>{organization.name}</span>
    </div>
  );
}
