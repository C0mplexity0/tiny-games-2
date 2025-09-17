import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

import "../index.css";
import AppHomePage from "./pages/Home";
import { Button } from "@/components/ui/button";
import { LucideX } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHomePage />,
  },
]);

function WindowButton() {
  return (
    <Button variant={"secondary"} size={"icon"} className="size-7">
      <LucideX />
    </Button>
  )
}

function App() {
  return (
    <main className="size-full flex flex-col">
      <div className="bg-card h-9 p-1 w-full flex flex-row">
        <div 
          className="bg-card h-7 w-full flex-1"
          style={{
            userSelect: "none"
          }}
          data-tauri-drag-region
        ></div>
        <WindowButton />
      </div>
      <RouterProvider router={router} />
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
