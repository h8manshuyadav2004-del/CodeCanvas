import { cn } from "@/lib/utils"

function ParticipantAvatar({ name, className }: { name: string; className?: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?"
  const hue = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5
  const colors = ["bg-slate-600", "bg-zinc-600", "bg-indigo-700", "bg-emerald-700", "bg-rose-700"]

  return <span aria-label={name} className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white", colors[hue], className)}>{initial}</span>
}

export { ParticipantAvatar }
