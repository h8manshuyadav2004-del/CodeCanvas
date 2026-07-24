import { Send, ImagePlus, X, Bot, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { IconButton } from "@/components/ui/icon-button";

export interface ChatMessage {
  id: string; text: string; senderId: string; senderName: string; timestamp: number; imageUrl?: string; isAi?: boolean;
}
interface ChatWindowProps { messages: ChatMessage[]; localUserId: string; onSendMessage: (text: string, imageUrl?: string) => void; }

export const ChatWindow = ({ messages, localUserId, onSendMessage }: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(1, 800 / Math.max(image.width, image.height));
        canvas.width = image.width * ratio; canvas.height = image.height * ratio;
        canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
        setSelectedImage(canvas.toDataURL("image/jpeg", 0.6));
      };
      image.src = loadEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSend = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!inputValue.trim() && !selectedImage) return;
    onSendMessage(inputValue.trim(), selectedImage || undefined);
    setInputValue(""); setSelectedImage(null);
  };
  const formatTime = (timestamp: number) => new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <div><h2 className="text-sm font-semibold text-foreground">Team chat</h2><p className="mt-0.5 text-xs text-muted-foreground">Messages are shared with everyone</p></div>
        <MessageSquare className="size-4 text-muted-foreground" />
      </div>
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5">
        {messages.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><MessageSquare className="mb-3 size-8 text-muted-foreground" /><p className="text-sm font-medium text-foreground">Start the conversation</p><p className="mt-1 text-sm text-muted-foreground">Share an idea, a snippet, or a question.</p></div> :
          messages.map((message) => {
            const isLocal = message.senderId === localUserId;
            const isAi = message.isAi || message.senderId === "ai-assistant";
            const wrapperClass = isLocal ? "ml-auto items-end" : "mr-auto items-start";
            const bubbleClass = isLocal ? "bg-primary text-primary-foreground" : isAi ? "border border-violet-400/20 bg-violet-400/10 text-violet-100" : "bg-muted text-foreground";
            return <article key={message.id} className={"flex max-w-[88%] flex-col " + wrapperClass}>
              <p className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">{isAi && <Bot className="size-3.5 text-violet-300" />}{isLocal ? "You" : message.senderName}<span>·</span>{formatTime(message.timestamp)}</p>
              <div className={"rounded-2xl px-3.5 py-2.5 text-sm leading-6 " + bubbleClass}>
                {message.imageUrl && <a href={message.imageUrl} target="_blank" rel="noopener noreferrer"><img src={message.imageUrl} alt="Shared attachment" className="mb-2 max-h-56 max-w-full rounded-lg object-contain" /></a>}
                {message.text && (isAi ? <ReactMarkdown components={{ code({ inline, children, ...props }: any) { return inline ? <code className="rounded bg-black/20 px-1 py-0.5 font-mono text-xs" {...props}>{children}</code> : <pre className="mt-2 overflow-x-auto rounded-lg bg-black/30 p-3 text-xs"><code {...props}>{children}</code></pre> }, p({ children }) { return <p className="mb-2 last:mb-0">{children}</p> } }}>{message.text}</ReactMarkdown> : <span>{message.text}</span>)}
              </div>
            </article>;
          })}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="border-t border-border bg-card p-3">
        {selectedImage && <div className="relative mb-3 w-fit"><img src={selectedImage} alt="Selected attachment preview" className="max-h-28 rounded-lg border border-border" /><IconButton label="Remove selected image" onClick={() => setSelectedImage(null)} className="absolute right-1 top-1 size-7 bg-black/60 text-white"><X className="size-3.5" /></IconButton></div>}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleImageSelect} />
          <IconButton label="Attach image" onClick={() => fileInputRef.current?.click()}><ImagePlus /></IconButton>
          <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="Message the team" className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-muted px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <IconButton label="Send message" type="submit" disabled={!inputValue.trim() && !selectedImage} variant="default" className="text-white"><Send /></IconButton>
        </form>
      </div>
    </div>
  );
};
