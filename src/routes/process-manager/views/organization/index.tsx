import type { Company } from "@/stores/organizations-store";
import { useStore } from "@/stores/rootStore";
import { observer } from "mobx-react-lite";

export const OrganizationDetails = observer(() => {
  const { viewStore } = useStore();
  const org = viewStore.context as Company;

  return <>{org.name}</>;
});
