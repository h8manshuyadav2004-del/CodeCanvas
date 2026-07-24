import * as React from "react"

import { cn } from "@/lib/utils"

type Status = "neutral" | "success" | "warning" | "danger" | "active"

const statusStyles: Record<Status, string> = {
  neutral: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
  active: "bg-primary",
}

function StatusChip({ status = "neutral", className, children, ...props }: React.ComponentProps<"span"> & { status?: Status }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)} {...props}>
      <span aria-hidden="true" className={cn("size-2 rounded-full", statusStyles[status])} />
      {children}
    </span>
  )
}

export { StatusChip }
