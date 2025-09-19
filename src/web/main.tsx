import "../index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

import WebHomePage from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebHomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
