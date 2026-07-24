import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      neutral: "bg-secondary text-secondary-foreground",
      primary: "bg-primary/15 text-blue-300",
      success: "bg-success/15 text-green-300",
      warning: "bg-warning/15 text-amber-300",
      danger: "bg-destructive/15 text-red-300",
    },
  },
  defaultVariants: { variant: "neutral" },
})

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
