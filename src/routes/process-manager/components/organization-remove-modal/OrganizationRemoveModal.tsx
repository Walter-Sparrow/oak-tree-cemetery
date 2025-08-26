import { Modal } from "@/components/modal/Modal";
import type { Company } from "@/stores/organizations-store";
import { useStore } from "@/stores/root-store";
import { observer } from "mobx-react-lite";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Company;
}

export const OrganizationRemoveModal = observer(
  ({ isOpen, onOpenChange: openChangeHandler, organization }: ModalProps) => {
    const { organizationsStore, viewStore } = useStore();

    const handleOk = () => {
      organizationsStore
        .removeOrganization(organization.id)
        .then(() => viewStore.switchView("organizations"));
    };

    return (
      <Modal
        isOpen={isOpen}
        title="Remove the Organization?"
        onClose={() => openChangeHandler(false)}
        onOk={handleOk}
        okProps={{
          title: organizationsStore.loading ? "Removing..." : "Yes, remove",
        }}
      >
        Are you sure you want to remove this Organozation?
      </Modal>
    );
  }
);
