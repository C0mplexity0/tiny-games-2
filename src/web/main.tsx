import "../index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

import WebConnectPage from "./pages/Connect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebConnectPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
