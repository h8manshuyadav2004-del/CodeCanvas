import { Terminal, Trash2, FileText, Clock3, MemoryStick, CircleCheck } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { StatusChip } from "@/components/ui/status-chip";

interface CodeOutputProps { output: string[]; onClear: () => void; input: string; onInputChange: (value: any) => void; }

export const CodeOutput = ({ output, onClear, input, onInputChange }: CodeOutputProps) => {
  const hasOutput = output.length > 0;
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-foreground">Run console</h2><p className="mt-0.5 text-xs text-muted-foreground">Input, results, and diagnostics</p></div><IconButton label="Clear output" onClick={onClear} className="text-muted-foreground hover:text-red-300"><Trash2 /></IconButton></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-lg bg-muted px-2.5 py-2"><StatusChip status={hasOutput ? "success" : "neutral"} className="text-xs">{hasOutput ? "Completed" : "Ready"}</StatusChip></div>
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-2 text-muted-foreground"><Clock3 className="size-3.5" /> Time —</div>
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-2 text-muted-foreground"><MemoryStick className="size-3.5" /> Memory —</div>
        </div>
      </div>
      <div className="border-b border-border p-4">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"><FileText className="size-4 text-muted-foreground" /> Standard input</label>
        <textarea value={input} onChange={(event) => onInputChange(event)} placeholder={"Provide input for this run\n5\n10"} className="h-24 w-full resize-none rounded-lg border border-border bg-muted p-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-3 flex items-center gap-2"><Terminal className="size-4 text-muted-foreground" /><h3 className="text-sm font-medium text-foreground">Output</h3></div>
        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-[#111111] p-3 font-mono text-sm">
          {hasOutput ? <div className="space-y-1">{output.map((line, index) => <pre key={index} className="whitespace-pre-wrap break-all text-zinc-200">{line}</pre>)}</div> :
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground"><CircleCheck className="mb-3 size-7" /><p className="text-sm">Ready to run</p><p className="mt-1 text-xs">Your results and errors will appear here.</p></div>}
        </div>
      </div>
    </div>
  );
};
