import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import { RoomProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <RoomProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RoomProvider>
);
