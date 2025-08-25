import { Loading } from "@/components/loading/Loading";
import { Error } from "@/components/error/Error";
import { useStore } from "@/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { OrganizationCard } from "../../components/organization-card/OrganizationCard";
import styles from "./orgs.module.scss";

export const Organizations = observer(() => {
  const { viewStore, organizationsStore } = useStore();

  useEffect(() => {
    const abortController = new AbortController();
    organizationsStore.fetchCompamies(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  if (organizationsStore.loading) {
    return <Loading />;
  }

  if (organizationsStore.error) {
    return <Error message={organizationsStore.error} />;
  }

  return (
    <div className={styles.container}>
      {organizationsStore.organizations.map((org) => (
        <OrganizationCard
          key={org.id}
          organization={org}
          onClick={() => viewStore.switchView("organization", org)}
        />
      ))}
    </div>
  );
});
