import { observer } from "mobx-react-lite";
import { ProcessManagerSidebar } from "./components/sidebar/Sidebar";
import styles from "./process-manager.module.scss";
import { viewMap } from "@/stores/view-store";
import { useStore } from "@/stores/root-store";

export const ProcessManager = observer(() => {
  const { viewStore } = useStore();

  return (
    <div className={styles.manager}>
      <ProcessManagerSidebar
        selectedView={viewStore.view}
        onChangeView={(view) => viewStore.switchView(view)}
      />
      <div className={styles.manager__content}>{viewMap[viewStore.view]()}</div>
    </div>
  );
});
