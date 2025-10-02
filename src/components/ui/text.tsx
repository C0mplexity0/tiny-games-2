import { cn } from "@/lib/utils";
import React from "react";

export default function Subtitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn(
      "text-xl font-semibold",
      className
    )} {...props} ></h2>
  )
}