import type { Contact } from "@/stores/organizations-store";
import styles from "./contact-card.module.scss";
import { Card } from "@/components/card/Card";
import { Button } from "@/components/button/Button";
import Pencil from "@/assets/svg/pencil.svg?react";
import { Description } from "@/components/description/Description";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <Card
      className={styles.card}
      title="Contacts"
      actions={
        <Button size="mini" icon={<Pencil />}>
          Edit
        </Button>
      }
    >
      <Description
        items={[
          {
            label: "Responsible person",
            value: `${contact.firstname} ${contact.lastname}`,
          },
          {
            label: "Phone number",
            value: contact.phone,
          },
          {
            label: "E-mail",
            value: contact.email,
          },
        ]}
      />
    </Card>
  );
}
