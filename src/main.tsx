import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; // will be auto-generated


function NotFound() {
  return <div>404 — Page Not Found</div>
}

const router = createRouter({ 
  routeTree,
  defaultNotFoundComponent: NotFound,
 });

 declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
