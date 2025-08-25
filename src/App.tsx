import { useState } from "react";
import styles from "./app.module.scss";
import { MainMenu, type MenuElements } from "./components/main-menu/MainMenu";
import { ProcessManager } from "./routes/process-manager";

export function App() {
  const [view, setView] = useState<MenuElements>("home");

  return (
    <div className={styles.container}>
      <MainMenu value={view} onChange={setView} />
      <main className={styles.content}>
        {view === "home" && <ProcessManager />}
      </main>
    </div>
  );
}
