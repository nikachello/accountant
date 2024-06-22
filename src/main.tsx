import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/orders", element: <OrdersPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
