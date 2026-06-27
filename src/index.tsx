import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { CallbackPage } from "./Callback";

const root = ReactDOM.createRoot(document.getElementById("root")!);

if (window.location.pathname.startsWith("/callback")) {
  root.render(
    <React.StrictMode>
      <CallbackPage />
    </React.StrictMode>,
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
