import * as React from "react"

import { cn } from "@/lib/utils"

function Dialog({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className={cn("relative w-full rounded-xl border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,.55)]", className)} {...props} />
    </div>
  )
}

export { Dialog }
