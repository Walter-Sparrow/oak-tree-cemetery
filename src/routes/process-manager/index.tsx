import { observer } from "mobx-react-lite";
import { ProcessManagerSidebar } from "./components/sidebar/Sidebar";
import styles from "./process-manager.module.scss";
import { viewMap, viewStore } from "@/stores/view-store";

export const ProcessManager = observer(() => {
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
