// --- IMPORTS ---
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../atoms/userAtom'; // Global state for the current user
import { Link, useNavigate, useParams } from 'react-router-dom'; // Hooks for routing/navigation
import { socketAtom } from '../atoms/socketAtom'; // Global state for the WebSocket connection
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiCode, FiUsers, FiUser, FiHash } from 'react-icons/fi'; // Icons for the UI
import { motion } from 'framer-motion'; // Library for smooth animations

export const Register = () => {
    // --- LOCAL STATE ---
    // Manages the input fields and loading state just for this screen
    const [name, setName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // --- GLOBAL STATE (RECOIL) ---
    // Accesses global state so the socket and user data can be shared with other components (like the code editor)
    const [socket, setSocket] = useRecoilState<WebSocket | null>(socketAtom);
    const [user, setUser] = useRecoilState(userAtom);

    // --- ROUTER HOOKS ---
    const params = useParams(); // Grabs variables from the URL (e.g., /register/123 -> 123 is the roomId)
    const navigate = useNavigate(); // Allows us to programmatically change pages

    // Helper function to generate a random 5-digit user ID
    function generateId() {
        const id = Math.floor(Math.random() * 100000);
        return id.toString();
    }

    // --- CORE LOGIC: WEBSOCKET CONNECTION ---
    // This function handles creating a user, connecting to the backend server, and joining a room
    const initializeSocket = (overrideRoomId?: string) => {
        // Guard clause: Ensure the user typed a name before attempting to connect
        if (name == "") {
            alert("Please enter a name to continue");
            return;
        }

        setLoading(true); // Disable buttons while connecting
        const currentUserId = user.id || generateId();
        const finalRoomId = overrideRoomId !== undefined ? overrideRoomId : roomId;

        // Only create a new WebSocket connection if one doesn't exist, or if the old one closed
        if (!socket || socket.readyState === WebSocket.CLOSED) {
            console.log("inside");

            // Establish the actual WebSocket connection to the backend server
            // Passes roomId, id, and name as query parameters in the URL
            const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?roomId=${finalRoomId}&id=${currentUserId}&name=${name}`);

            // Save this connection to global state so the rest of the app can use it
            setSocket(ws);

            // --- WEBSOCKET EVENT LISTENERS ---
            
            // Triggered when the connection is successfully opened
            ws.onopen = () => {
                console.log("Connected to WebSocket");
            }

            // Triggered whenever the backend sends a message to the client
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                // If the server confirms our room ID...
                if (data.type == "roomId") {
                    setRoomId(data.roomId);
                    console.log("Room ID: ", data.roomId);
                    
                    // Update global user state to include the confirmed room ID
                    setUser({
                        id: currentUserId,
                        name: name,
                        roomId: data.roomId
                    });
                    
                    setLoading(false);
                    // Navigate the user away from the register page and into the actual code editor room!
                    navigate("/code/" + data.roomId);
                }
            };

            // Triggered if the connection fails
            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
                alert("Failed to connect to the server. Please make sure the WebSocket server is running.");
                setLoading(false);
            };

            // Triggered when the connection drops
            ws.onclose = () => {
                console.log("WebSocket connnection closed from register page");
                setLoading(false);
            }
        } else {
            // If socket already existed and was open, just stop loading
            setLoading(false);
        }
    }

    // --- BUTTON HANDLERS ---
    
    // Called when user clicks "Create New Room"
    const handleNewRoom = () => {
        console.log("new room opened")
        if (!loading) {
            setRoomId("");
            initializeSocket(""); // Triggers socket init (empty roomId means server will generate a new one)
        }
    }

    // Called when user clicks "Join Existing Room"
    const handleJoinRoom = () => {
        if (roomId != "" && !loading) {
            initializeSocket(roomId); // Triggers socket init with the provided roomId
        } else {
            alert("Please enter a valid room ID"); // Prevents joining without an ID
        }
    }

    // --- INITIALIZATION ---
    // Runs exactly once when the component first loads onto the screen
    useEffect(() => {
        console.log(params.roomId)
        // If the user arrived via a shared link (e.g., domain.com/register/xyz), pre-fill the Room ID input
        setRoomId(params.roomId || "");
    }, [])

    return (
        <main className="relative min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground sm:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(75,126,255,.14),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(129,92,246,.1),transparent_28%)]" />
            <div className="relative mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col justify-center py-10 lg:grid lg:grid-cols-[1fr_440px] lg:gap-20">
                <section className="mb-12 max-w-xl lg:mb-0">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight"><span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20"><FiCode className="size-5" /></span> CodeSync</Link>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                        <p className="mt-14 text-sm font-medium text-blue-300">Your team is one room away</p>
                        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Build together, without losing the thread.</h1>
                        <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">Create a focused shared workspace for code, conversations, execution, and whiteboarding.</p>
                        <div className="mt-10 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                            <div className="rounded-xl border border-border bg-card/70 p-4"><FiUsers className="mb-3 size-5 text-blue-300" /><p className="font-medium text-foreground">Live presence</p><p className="mt-1 text-xs leading-5">Work in the same room.</p></div>
                            <div className="rounded-xl border border-border bg-card/70 p-4"><FiCode className="mb-3 size-5 text-emerald-300" /><p className="font-medium text-foreground">Instant feedback</p><p className="mt-1 text-xs leading-5">Run code as a team.</p></div>
                        </div>
                    </motion.div>
                </section>

                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-[0_24px_80px_rgba(0,0,0,.32)] sm:p-8">
                    <div className="mb-8"><p className="text-sm font-medium text-blue-300">Enter workspace</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Join your collaborators</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use an invite ID or start a new shared room.</p></div>
                    <div className="space-y-5">
                        <div><label htmlFor="name" className="mb-2 block text-sm font-medium">Your name</label><div className="relative"><FiUser className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="name" type="text" placeholder="How should your team know you?" value={name} onChange={(event) => setName(event.target.value)} className="h-12 pl-10" /></div></div>
                        <div><div className="mb-2 flex items-center justify-between"><label htmlFor="roomId" className="text-sm font-medium">Room ID</label><span className="text-xs text-muted-foreground">Optional for a new room</span></div><div className="relative"><FiHash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="roomId" type="text" placeholder="Paste an invite room ID" value={roomId} onChange={(event) => setRoomId(event.target.value)} className="h-12 pl-10 font-mono" /></div></div>
                        <div className="space-y-3 pt-2"><Button className="h-12 w-full" disabled={loading || !name} onClick={handleNewRoom}>{loading ? <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <FiCode />} {loading ? "Preparing workspace..." : "Create new workspace"}</Button><Button variant="outline" className="h-12 w-full" disabled={loading || !roomId || !name} onClick={handleJoinRoom}><FiUsers /> {loading ? "Connecting..." : "Join with invite"}</Button></div>
                    </div>
                    <p className="mt-7 border-t border-border pt-5 text-center text-xs leading-5 text-muted-foreground">By continuing, you will join a collaborative code session. Nothing to install.</p>
                </motion.section>
            </div>
        </main>
    );
};
