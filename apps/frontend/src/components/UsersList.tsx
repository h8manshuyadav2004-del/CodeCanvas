import { Check, Copy, Mic, MicOff, Camera, CameraOff, Video as VideoIcon, X, Users, Link } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { IconButton } from "@/components/ui/icon-button";
import { ParticipantAvatar } from "@/components/ui/participant-avatar";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusChip } from "@/components/ui/status-chip";

interface User { id: string; name: string; }
interface UserListProps {
  users: User[]; roomId: string; localUserId?: string; localUserName?: string;
  localStream?: MediaStream | null; remoteStreams?: Record<string, MediaStream>;
  micEnabled?: boolean; videoEnabled?: boolean; toggleMic?: () => void; toggleVideo?: () => void;
}

const VideoStream = ({ stream, muted = false, onClick }: { stream: MediaStream | null, muted?: boolean, onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (videoRef.current && stream) videoRef.current.srcObject = stream; }, [stream]);
  return (
    <button type="button" onClick={onClick} className="relative mt-3 aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-white/20">
      {stream ? <video ref={videoRef} autoPlay playsInline muted={muted} className="size-full object-cover" /> : <span className="flex size-full items-center justify-center"><VideoIcon size={22} /></span>}
      <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-[11px] text-white">Expand</span>
    </button>
  );
};

export const UserList = ({ users, roomId, localUserId, localUserName, localStream, remoteStreams, micEnabled, videoEnabled, toggleMic, toggleVideo }: UserListProps) => {
  const [copied, setCopied] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});
  const [zoomedStream, setZoomedStream] = useState<{ stream: MediaStream | null; label: string } | null>(null);
  const remoteUsers = users.filter((user) => user.id !== localUserId && user.name !== localUserName);

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/" + roomId);
      setCopied(true);
      toast.message("Invite link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch { toast.error("Failed to copy invite link"); }
  };
  const toggleExpand = (id: string) => setExpandedUsers((previous) => ({ ...previous, [id]: !previous[id] }));

  const participant = (participant: User, isLocal: boolean) => (
    <div key={participant.id} className="rounded-lg px-3 py-3 transition-colors hover:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => toggleExpand(isLocal ? "local" : participant.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <ParticipantAvatar name={participant.name} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-foreground">{participant.name}{isLocal ? " (You)" : ""}</span>
            <StatusChip status="success" className="mt-0.5 text-xs">Online · {isLocal ? "Owner" : "Collaborator"}</StatusChip>
          </span>
        </button>
        {isLocal && <div className="flex items-center gap-1">
          <IconButton label={micEnabled ? "Mute microphone" : "Turn on microphone"} onClick={toggleMic}>{micEnabled ? <Mic /> : <MicOff />}</IconButton>
          <IconButton label={videoEnabled ? "Turn off camera" : "Turn on camera"} onClick={toggleVideo}>{videoEnabled ? <Camera /> : <CameraOff />}</IconButton>
        </div>}
      </div>
      {expandedUsers[isLocal ? "local" : participant.id] && <VideoStream stream={isLocal ? localStream || null : remoteStreams?.[participant.id] || null} muted={isLocal} onClick={() => setZoomedStream({ stream: isLocal ? localStream || null : remoteStreams?.[participant.id] || null, label: isLocal ? "You" : participant.name })} />}
    </div>
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 py-4">
        <SectionHeader title="People" description={users.length + " active in this workspace"} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {localUserName && participant({ id: localUserId || "local", name: localUserName }, true)}
        {remoteUsers.map((participantUser) => participant(participantUser, false))}
        {!localUserName && users.length === 0 && <div className="flex h-40 flex-col items-center justify-center text-center text-muted-foreground"><Users className="mb-3 size-8" />No collaborators yet</div>}
      </div>
      <div className="border-t border-border p-4">
        <p className="mb-1 text-sm font-medium text-foreground">Invite collaborators</p>
        <p className="mb-3 text-xs leading-5 text-muted-foreground">Share this workspace with your team.</p>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Room ID</p>
        <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
          <Link className="size-4 shrink-0 text-muted-foreground" />
          <code className="min-w-0 flex-1 truncate text-xs text-foreground">{roomId || "Loading..."}</code>
          <IconButton label="Copy invite link" onClick={copyInviteCode}>{copied ? <Check /> : <Copy />}</IconButton>
        </div>
      </div>
      {zoomedStream && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
        <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-card">
          <IconButton label="Close video" onClick={() => setZoomedStream(null)} className="absolute right-3 top-3 z-10 bg-black/60 text-white"><X /></IconButton>
          <VideoStream stream={zoomedStream.stream} muted={zoomedStream.label === "You"} />
          <span className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1.5 text-sm text-white">{zoomedStream.label}</span>
        </div>
      </div>}
    </div>
  );
};
