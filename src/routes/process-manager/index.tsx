import { ProcessManagerSidebar } from "./components/sidebar/Sidebar";
import styles from "./process-manager.module.scss";

export function ProcessManager() {
  return (
    <div className={styles.container}>
      <ProcessManagerSidebar />
    </div>
  );
}
