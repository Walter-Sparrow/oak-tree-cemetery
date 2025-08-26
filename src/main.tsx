import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { rootStore, StoreContext } from "./stores/root-store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext value={rootStore}>
      <App />
    </StoreContext>
  </StrictMode>
);
