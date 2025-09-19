import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideChevronUp, LucideMinus, LucideX } from "lucide-react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";

import AppHomePage from "./pages/Home";
import { ReactNode, useEffect, useState } from "react";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHomePage />,
  },
]);

function WindowButton({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
  return (
    <Button variant={"secondary"} size={"icon"} className="size-7" onClick={onClick}>
      {children}
    </Button>
  )
}

export function App() {
  const [window, setWindow] = useState<Window | null>(null)
  const [isMaximized, setIsMaximized] = useState<boolean>(false)

  useEffect(() => {
    const window = getCurrentWindow()
    setWindow(window)
    window.isMaximized().then((maximized) => {
      setIsMaximized(maximized)
    })
  }, [window])

  return (
    <main className="size-full flex flex-col">
      <div className="bg-card h-9 p-1 w-full flex flex-row gap-1">
        <div 
          className="bg-card h-7 w-full flex-1"
          style={{
            userSelect: "none"
          }}
          data-tauri-drag-region
        ></div>
        <WindowButton
          onClick={() => {
            if (window)
              window.minimize()
          }}
        >
            <LucideMinus />
        </WindowButton>
        <WindowButton
          onClick={() => {
            if (window)
              window.toggleMaximize()
          }}
        >
            {isMaximized ? <LucideChevronDown /> : <LucideChevronUp />}
        </WindowButton>
        <WindowButton>
            <LucideX />
        </WindowButton>
      </div>
      <RouterProvider router={router} />
    </main>
  )
}