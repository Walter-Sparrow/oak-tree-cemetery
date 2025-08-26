import type { Contact } from "@/stores/organizations-store";
import styles from "./contact-card.module.scss";
import { Card } from "@/components/card/Card";
import { Button } from "@/components/button/Button";
import Pencil from "@/assets/svg/pencil.svg?react";
import { Description } from "@/components/description/Description";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root-store";
import { useState } from "react";
import { ContactForm } from "../contact-form/ContactForm";

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = observer(({ contact }: ContactCardProps) => {
  const { organizationsStore } = useStore();

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [formValues, setFormValues] = useState<Contact>(contact);

  const handleEditMode = () => {
    setFormValues(contact);
    setMode("edit");
  };

  const handleSave = () => {
    organizationsStore.updateContact(formValues).then(() => setMode("view"));
  };

  return (
    <Card
      className={styles.card}
      title="Contacts"
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
      ) : (
        <ContactForm values={formValues} onChange={setFormValues} />
      )}
    </Card>
  );
});
