import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/style/config/tailwind_config.css";

import App from "./App.tsx";

import "./assets/style/config/style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
