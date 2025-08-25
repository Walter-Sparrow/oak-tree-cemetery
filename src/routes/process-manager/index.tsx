import { observer } from "mobx-react-lite";
import { ProcessManagerSidebar } from "./components/sidebar/Sidebar";
import styles from "./process-manager.module.scss";
import { viewMap } from "@/stores/view-store";
import { useStore } from "@/stores/rootStore";

export const ProcessManager = observer(() => {
  const { viewStore } = useStore();

  return (
    <div className={styles.container}>
      <ProcessManagerSidebar
        selectedView={viewStore.view}
        onChangeView={(view) => viewStore.switchView(view)}
      />
      <div className={styles.content}>{viewMap[viewStore.view]}</div>
    </div>
  );
});
