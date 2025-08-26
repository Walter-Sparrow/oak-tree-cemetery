import { Card } from "@/components/card/Card";
import styles from "./org-details-card.module.scss";
import type { Company } from "@/stores/organizations-store";
import Pencil from "@/assets/svg/pencil.svg?react";
import { Button } from "@/components/button/Button";
import { Description } from "@/components/description/Description";
import { formatCompanyType, formatDate } from "@/utils";
import { useState } from "react";
import { OrganizationDetailsForm } from "../organization-details-form/OrganizationDetailsForm";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root-store";

interface OrganizationCardProps {
  organization: Company;
}

export const OrganizationDetailsCard = observer(
  ({ organization }: OrganizationCardProps) => {
    const { organizationsStore } = useStore();
    const { no: contractNumber, issue_date: contractDate } =
      organization.contract;

    const [mode, setMode] = useState<"view" | "edit">("view");
    const [formValues, setFormValues] = useState<Company>(organization);

    const handleEditMode = () => {
      setFormValues(organization);
      setMode("edit");
    };

    const handleSave = () => {
      organizationsStore.updateOrganization(formValues).then(() => {
        setMode("view");
      });
    };

    return (
      <Card
        className={styles.card}
        title="Company Details"
        actions={
          mode === "view" ? (
            <Button size="mini" icon={<Pencil />} onClick={handleEditMode}>
              Edit
            </Button>
          ) : (
            <div className={styles.card__actions}>
              <Button size="mini" icon={<Pencil />} onClick={handleSave}>
                Save changes
              </Button>
              <Button
                size="mini"
                icon={<Pencil />}
                onClick={() => setMode("view")}
              >
                Cancel
              </Button>
            </div>
          )
        }
      >
        {mode === "view" ? (
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
                value: organization.type.map(formatCompanyType).join(", "),
              },
            ]}
          />
        ) : (
          <OrganizationDetailsForm
            values={formValues}
            onChange={setFormValues}
          />
        )}
      </Card>
    );
  }
);
