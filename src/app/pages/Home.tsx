import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Subtitle from "@/components/ui/text";
import { ArrowUpRightIcon, LucideFolder, LucideGamepad, LucidePlus, LucideRefreshCcw } from "lucide-react";
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
          <Subtitle>Games</Subtitle>
          <div className="flex-1" />
          <Button
            variant="secondary"
            size="icon-sm"
          >
            <LucideRefreshCcw />
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
            <span>Add more games</span>
          </Button>
        </div>
      </ResizablePanel>
      <ResizableHandle className="border-none bg-transparent" />
      <ResizablePanel minSize={30} defaultSize={75} className="min-w-100 rounded-tl-lg border-t border-l size-full bg-background">
        {selectedGame ? null : 
          <div className="flex justify-center items-center size-full">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <LucideGamepad />
                </EmptyMedia>
                <EmptyTitle>No Games Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t added any games yet. Get started by importing or creating your first game.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex gap-2">
                  <Button>Import a game</Button>
                  <Button variant="outline">Create a game</Button>
                </div>
              </EmptyContent>
              <Button
                variant="link"
                asChild
                className="text-muted-foreground"
                size="sm"
              >
                <a href="#">
                  Learn more <ArrowUpRightIcon />
                </a>
              </Button>
            </Empty>
          </div>
        }
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
