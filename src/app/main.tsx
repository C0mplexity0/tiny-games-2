import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

import "../index.css";
import AppHomePage from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
