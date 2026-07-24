import * as React from "react"

import { cn } from "@/lib/utils"

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("rounded-xl border border-border bg-card p-5 shadow-sm", className)} {...props} />
}

export { Panel }
