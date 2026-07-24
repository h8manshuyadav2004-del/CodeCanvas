import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type IconButtonProps = ButtonProps & { label: string }

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ label, className, size = "icon", type = "button", ...props }, ref) => (
  <Button ref={ref} type={type} size={size} variant="ghost" aria-label={label} title={label} className={cn("text-muted-foreground hover:bg-accent hover:text-foreground", className)} {...props} />
))
IconButton.displayName = "IconButton"

export { IconButton }
