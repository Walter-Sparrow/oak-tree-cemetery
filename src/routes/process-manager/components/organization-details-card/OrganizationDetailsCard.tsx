import { Card } from "@/components/card/Card";
import styles from "./org-details-card.module.scss";
import type { Company } from "@/stores/organizations-store";
import Pencil from "@/assets/svg/pencil.svg?react";
import { Button } from "@/components/button/Button";
import { Description } from "@/components/description/Description";
import { formatDate } from "@/utils";

interface OrganizationCardProps {
  organization: Company;
}

export function OrganizationDetailsCard({
  organization,
}: OrganizationCardProps) {
  const { no: contractNumber, issue_date: contractDate } =
    organization.contract;

  return (
    <Card
      className={styles.card}
      title="Company Details"
      actions={
        <Button size="mini" icon={<Pencil />}>
          Edit
        </Button>
      }
    >
      <Description
        items={[
          {
            label: "Agreement",
            value: [contractNumber, formatDate(contractDate)],
          },
          {
            label: "Buisness entity",
            value: organization.businessEntity,
          },
          {
            label: "Company type",
            value: organization.type.join(", "),
          },
        ]}
      />
    </Card>
  );
}
