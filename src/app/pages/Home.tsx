import { Button } from "@/components/ui/button";
import Subtitle from "@/components/ui/text";
import { LucideFolder, LucidePlus } from "lucide-react";

export default function AppHomePage() {
  return (
    <div className="size-full bg-card flex flex-row">
      <div 
        className="w-100"
      >
        <div className="flex flex-row p-2 gap-1">
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
      </div>
      <div className="rounded-tl-lg border-t border-l size-full bg-background">
        
      </div>
    </div>
  )
}
