import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Subtitle from "@/components/ui/text";
import { ArrowUpRightIcon, LucideFolder, LucideGamepad, LucidePlus, LucideRefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { gamesManager } from "../main.ts";
import { openPath } from "@tauri-apps/plugin-opener";
import { applyPathPrefix } from "@/lib/files";
import { appDataDir, sep } from "@tauri-apps/api/path";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ExternalLink from "@/components/ui/link";
import { GamesManagerFetchedGamesEvent } from "../games/manager.ts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";

export default function AppHomePage() {
  const [selectedGame, setSelectedGame] = useState(0)
  const [games, setGames] = useState(gamesManager.getGames())
  
  useEffect(() => {
    const listener = (event: GamesManagerFetchedGamesEvent) => {
      const games = event.getGames()
      setGames(games)
      
      if (games[selectedGame] === undefined) {
        setSelectedGame(0)
      }
    }

    gamesManager.onFetchedGames(listener)

    return () => {
      gamesManager.offFetchedGames(listener)
    }
  }, [games])

  return (
    <ResizablePanelGroup direction="horizontal" className="size-full bg-card flex flex-row">
      <ResizablePanel 
        minSize={20}
        defaultSize={25}
        className="min-w-70 flex flex-col h-full"
      >
        <div className="flex flex-row p-2 pt-1 gap-1">
          <Subtitle>Games</Subtitle>
          <div className="flex-1" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={() => {
                  gamesManager.fetchGames()
                }}
              >
                <LucideRefreshCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={async () => {
                  const path = await appDataDir() + sep() + applyPathPrefix(gamesManager.getGamesPath());
                  await openPath(path);
                }}
              >
                <LucideFolder />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open folder</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ScrollArea className="p-2 pt-0  flex-1 overflow-hidden">
          <div className="gap-2 flex flex-col">
            {games.map((val, i) => (
              <Button 
                key={i} 
                variant="secondary" 
                className={`w-full ${selectedGame === i ? "bg-secondary border-none" : "bg-transparent border"}`}
                onClick={() => {
                  setSelectedGame(i)
                }}
              >
                {val.getConfig().displayName}
              </Button>
            ))}
            <Button 
              variant="secondary"
              className="flex flex-row h-7 w-full"
              size="sm"
            >
              <LucidePlus />
              <span>Add more games</span>
            </Button>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle className="border-none bg-transparent" />
      <ResizablePanel minSize={30} defaultSize={75} className="min-w-100 rounded-tl-lg border-t border-l size-full bg-background">
        {games[selectedGame] ? undefined : 
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
                  <Button variant="secondary">Create a game</Button>
                </div>
              </EmptyContent>
              <ExternalLink
                to="https://tiny-games.c0mplexity.com"
              >
                Learn more
                <ArrowUpRightIcon />
              </ExternalLink>
            </Empty>
          </div>
        }
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
