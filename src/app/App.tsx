import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideChevronUp, LucideMinus, LucideX } from "lucide-react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";

import AppHomePage from "./pages/Home";
import { ReactNode, useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { TinyGamesLogoWithText } from "@/components/ui/logo";
import LoadingScreen from "@/components/ui/loading-screen";
import { Toaster } from "sonner";
import { init } from "./main";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

let loaded = false;
let setLoaded: (loaded: boolean) => void;

export function App() {
  [loaded, setLoaded] = useState(false)
  const window = getCurrentWindow()
  const [isMaximized, setIsMaximized] = useState<boolean>(false)

  useEffect(() => {
    if (!loaded) {
      init().then(() => {
        setLoaded(true)
      })
    }
  })

  const fetchIsMaximised = async () => {
    setIsMaximized(await window.isMaximized())
  }

  useEffect(() => {
    const listener = window.onResized(() => {
      fetchIsMaximised()
    })

    return () => {
      listener.then((f) => f())
    }
  }, [])

  return (
    <main className="size-full flex flex-col">
      <LoadingScreen loaded={loaded} />
      <div className="bg-card h-9 p-1 w-full flex flex-row gap-1">
        <div 
          className="bg-card h-7 w-full flex-1 flex items-center p-1"
          style={{
            userSelect: "none"
          }}
          data-tauri-drag-region
        >
          <TinyGamesLogoWithText className="pointer-events-none w-28" />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <WindowButton
              onClick={() => {
                window.minimize()
              }}
            >
                <LucideMinus />
            </WindowButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Minimise window</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <WindowButton
              onClick={() => {
                window.toggleMaximize()
              }}
            >
                {isMaximized ? <LucideChevronDown /> : <LucideChevronUp />}
            </WindowButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle maximise</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <WindowButton
              onClick={() => {
                window.close()
              }}
            >
                <LucideX />
            </WindowButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </main>
  )
}
