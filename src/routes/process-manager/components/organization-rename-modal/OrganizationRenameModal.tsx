import { Input } from "@/components/input/Input";
import { Modal } from "@/components/modal/Modal";
import type { Company } from "@/stores/organizations-store";
import { useStore } from "@/stores/root-store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Company;
}

export const OrganizationRenameModal = observer(
  ({ isOpen, onOpenChange: openChangeHandler, organization }: ModalProps) => {
    const { organizationsStore } = useStore();

    const [name, setName] = useState(organization.name);

    const handleOk = () => {
      organizationsStore
        .renameOrganization(organization.id, name)
        .finally(() => openChangeHandler(false));
    };

    return (
      <Modal
        isOpen={isOpen}
        title="Specify the Organization's name"
        onClose={() => openChangeHandler(false)}
        onOk={handleOk}
        okProps={{
          title: organizationsStore.loading ? "Saving..." : "Save changes",
        }}
      >
        <Input
          placeholder="Enter the Organization's name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    );
  }
);
