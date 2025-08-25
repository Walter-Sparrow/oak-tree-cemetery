import { type MenuElements, MainMenu } from "@/components/main-menu/MainMenu";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ProcessManager } from "../process-manager";
import styles from "./dashboard.module.scss";

export const Dashboard = observer(() => {
  const [view, setView] = useState<MenuElements>("home");

  return (
    <div className={styles.container}>
      <MainMenu value={view} onChange={setView} />
      <main className={styles.content}>
        {view === "home" && <ProcessManager />}
      </main>
    </div>
  );
});
