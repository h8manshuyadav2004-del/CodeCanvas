import * as React from "react"

import { cn } from "@/lib/utils"

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("inline-flex items-center gap-1 rounded-lg border border-border bg-muted p-1", className)} {...props} />
}

function TabsTrigger({ active = false, className, ...props }: React.ComponentProps<"button"> & { active?: boolean }) {
  return <button type="button" role="tab" aria-selected={active} className={cn("inline-flex min-h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:bg-white/5 hover:text-foreground", className)} {...props} />
}

export { TabsList, TabsTrigger }
