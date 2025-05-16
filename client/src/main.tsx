import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/style/config/tailwind_config.css";

import App from "./App.tsx";

// prime
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/tailwind-light/theme.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";

// start toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./assets/style/config/style.css";
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  </AuthProvider>
);
