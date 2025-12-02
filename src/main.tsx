import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; // will be auto-generated
import { BookingProvider } from "./context/BookingContext";
BookingProvider;

function NotFound() {
  return <div>404 — Page Not Found</div>;
}

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  </React.StrictMode>
);
