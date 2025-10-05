import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideChevronUp, LucideMinus, LucidePlus, LucideX } from "lucide-react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";

import AppHomePage from "./pages/Home";
import { ReactNode, useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { TinyGamesLogoWithText } from "@/components/ui/logo";
import LoadingScreen from "@/components/ui/loading-screen";
import { Toaster } from "sonner";
import { init } from "./main.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { DialogDescription } from "@radix-ui/react-dialog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHomePage />,
  },
]);

function WindowButton({ children, onClick, tooltip }: { children: ReactNode, onClick?: () => void, tooltip: string }) {
  return (
    <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"secondary"} size={"icon"} className="rounded-full" onClick={onClick}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
    </Tooltip>
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
      <div className="bg-card h-11 p-1 w-full flex flex-row gap-1">
        <div 
          className="bg-card h-full w-full flex-1 flex items-center p-1.5"
          style={{
            userSelect: "none"
          }}
          data-tauri-drag-region
        >
          <TinyGamesLogoWithText className="pointer-events-none w-28" />
        </div>
        <div className="h-9 border rounded-full flex flex-row p-0.75 gap-0.5">
          <Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button size="icon-sm" variant="secondary" className="rounded-full">
                    <LucidePlus />
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>
                <p>Connect device</p>
              </TooltipContent>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect a device</DialogTitle>
                  <DialogDescription>Scan the QR code below to add a device.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Tooltip>
        </div>
        <WindowButton
          onClick={() => {
            window.minimize()
          }}
          tooltip="Minimise"
        >
            <LucideMinus />
        </WindowButton>
        <WindowButton
          onClick={() => {
            window.toggleMaximize()
          }}
          tooltip="Toggle maximise"
        >
            {isMaximized ? <LucideChevronDown /> : <LucideChevronUp />}
        </WindowButton>
        <WindowButton
          tooltip="Close"
          onClick={() => {
            window.close()
          }}
        >
            <LucideX />
        </WindowButton>
      </div>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </main>
  )
}
