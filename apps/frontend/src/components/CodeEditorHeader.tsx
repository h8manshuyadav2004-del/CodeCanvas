import { Code2, Play, Loader2, PenTool, Layout, Share2, Settings, Users } from "lucide-react"
import { LanguageDropdown } from "./LanguageDropDown"
import { Button } from "./ui/button"
import { IconButton } from "./ui/icon-button"
import { TabsList, TabsTrigger } from "./ui/tabs"

interface CodeEditorHeaderProps {
  language: string
  onLanguageChange: (language: string) => void
  onSubmit: () => void
  isLoading: boolean
  currentButtonState: string
  activeView: "editor" | "whiteboard"
  onViewChange: (view: "editor" | "whiteboard") => void
  participantCount: number
  onShare: () => void
}

export const CodeEditorHeader = ({
  language, onLanguageChange, onSubmit, isLoading, currentButtonState,
  activeView, onViewChange, participantCount, onShare,
}: CodeEditorHeaderProps) => {
  const runLabel = isLoading
    ? currentButtonState === "Submitting..." ? "Building..." : currentButtonState === "Compiling..." ? "Executing..." : currentButtonState
    : "Run"

  return (
    <header className="mb-4 flex min-h-16 items-center gap-3 border-b border-border px-1 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
          <Code2 className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">CodeCanvas</p>
          <p className="hidden text-xs text-muted-foreground sm:block">Collaborative workspace</p>
        </div>
      </div>

      <TabsList className="mx-auto hidden md:flex" role="tablist" aria-label="Workspace view">
        <TabsTrigger active={activeView === "editor"} onClick={() => onViewChange("editor")}>
          <Layout className="size-3.5" /> Editor
        </TabsTrigger>
        <TabsTrigger active={activeView === "whiteboard"} onClick={() => onViewChange("whiteboard")}>
          <PenTool className="size-3.5" /> Whiteboard
        </TabsTrigger>
      </TabsList>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground lg:flex">
          <Users className="size-4" />
          <span>{participantCount}</span>
        </div>
        <IconButton label="Share workspace" onClick={onShare}><Share2 /></IconButton>
        <div>
          <LanguageDropdown value={language} onChange={onLanguageChange} />
        </div>
        <Button onClick={onSubmit} disabled={isLoading} type="button" size="sm" className="min-w-20">
          {isLoading ? <Loader2 className="animate-spin" /> : <Play />}
          {runLabel}
        </Button>
        <IconButton label="Workspace settings"><Settings /></IconButton>
      </div>
    </header>
  )
}
