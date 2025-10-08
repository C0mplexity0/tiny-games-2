import { cn } from "@/lib/utils";
import React from "react";

export function Subtitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn(
      "text-xl font-semibold",
      className
    )} {...props} ></h2>
  );
}

export function Title({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn(
      "text-3xl font-semibold",
      className
    )} {...props} ></h1>
  );
}
