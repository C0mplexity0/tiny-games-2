import { ReactNode } from "react";
import { Button } from "./button";
import { open } from '@tauri-apps/plugin-shell';

export default function ExternalLink(
  { to, children, ...props }:
  { to: string, children?: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button 
      variant="link" 
      asChild {...props}
      className="text-muted-foreground"
      size="sm"
    >
      <a href="#" onClick={() => {
        open(to)
      }}>
        {children}
      </a>
    </Button>
  )
}
