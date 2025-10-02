import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Subtitle from "@/components/ui/text";
import { LucideFolder, LucidePlus } from "lucide-react";
import { useState } from "react";

export default function AppHomePage() {
  const [selectedGame] = useState<number | undefined>()

  return (
    <ResizablePanelGroup direction="horizontal" className="size-full bg-card flex flex-row">
      <ResizablePanel 
        minSize={20}
        defaultSize={25}
        className="min-w-70"
      >
        <div className="flex flex-row p-2 pt-1 gap-1">
          <Subtitle>Installed</Subtitle>
          <div className="flex-1" />
          <Button
            variant="secondary"
            size="icon-sm"
          >
            <LucidePlus className="size-4.5" />
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
          >
            <LucideFolder />
          </Button>
        </div>
        <div className="flex flex-col p-2 pt-0">
          <Button 
            variant="secondary"
            className="flex flex-row h-7"
            size="sm"
          >
            <LucidePlus />
            <span>Add more content</span>
          </Button>
        </div>
      </ResizablePanel>
      <ResizableHandle className="border-none bg-transparent" />
      <ResizablePanel minSize={30} defaultSize={75} className="rounded-tl-lg border-t border-l size-full bg-background">
        {selectedGame ? null : 
        <div className="size-full flex justify-center items-center">
          <div>
            <p>No games :(</p>
          </div>
        </div>
        }
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
