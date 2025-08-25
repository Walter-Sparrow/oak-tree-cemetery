import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Login } from "./routes/login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
