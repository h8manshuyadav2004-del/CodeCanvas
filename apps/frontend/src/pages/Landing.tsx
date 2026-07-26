import { motion } from "framer-motion"
import { ArrowRight, Braces, CheckCircle2, Code2, GitBranch, Layers3, Play, Share2, Sparkles, Users, Video, WandSparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Users, title: "Live collaboration", description: "See your team, edit together, and keep the conversation next to the code." },
  { icon: Braces, title: "Multi-language runs", description: "Move from a shared draft to a working result without leaving the room." },
  { icon: WandSparkles, title: "A thinking canvas", description: "Switch to a shared whiteboard when an idea needs more than syntax." },
  { icon: Video, title: "Face-to-face flow", description: "Keep context with lightweight voice and video presence built into the room." },
]

export const Landing = () => (
  <main className="overflow-hidden bg-background text-foreground">
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,rgba(75,126,255,.16),transparent_30%),radial-gradient(circle_at_100%_30%,rgba(111,64,255,.08),transparent_24%)]" />
    <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Code2 className="size-4" /></span> CodeCanvas</Link>
      <Link to="/join"><Button variant="outline" size="sm">Open a room <ArrowRight /></Button></Link>
    </nav>

    <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 text-center sm:pb-32 sm:pt-24">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"><Sparkles className="size-3.5 text-blue-300" /> Built for teams that think in code</div>
        <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-7xl">The collaborative workspace your code deserves.</h1>
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">CodeCanvas brings your editor, execution, whiteboard, and team presence into one beautifully focused room.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/join"><Button size="lg" className="h-12 px-6">Start a workspace <ArrowRight /></Button></Link>
          <a href="#collaboration"><Button size="lg" variant="outline" className="h-12 px-6">Explore the product</Button></a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }} className="relative mx-auto mt-16 max-w-6xl rounded-2xl border border-white/10 bg-[#171717] p-2 shadow-[0_32px_100px_rgba(0,0,0,.5)]">
        <div className="overflow-hidden rounded-xl border border-white/5">
          <div className="flex h-12 items-center gap-2 border-b border-white/8 bg-[#1f1f1f] px-4"><span className="size-2 rounded-full bg-red-400/70" /><span className="size-2 rounded-full bg-amber-300/70" /><span className="size-2 rounded-full bg-emerald-400/70" /><div className="mx-auto rounded-md bg-white/5 px-16 py-1 text-xs text-zinc-500">product-ideas / workspace</div></div>
          <div className="grid min-h-[360px] grid-cols-1 text-left md:grid-cols-[1fr_260px]">
            <div className="bg-[#1e1e1e] p-6 font-mono text-sm leading-8 text-zinc-300"><p><span className="text-violet-300">const</span> team = <span className="text-blue-300">createRoom</span>({'{'}</p><p className="pl-5">idea: <span className="text-emerald-300">"Make collaboration effortless"</span>,</p><p className="pl-5">people: <span className="text-amber-200">4</span>,</p><p>{'}'});</p><p className="mt-8 text-zinc-500">// Every cursor, conversation, and run stays in sync.</p><span className="inline-block h-5 w-2 animate-pulse bg-blue-400 align-middle" /></div>
            <div className="border-t border-white/8 bg-[#191919] p-4 md:border-l md:border-t-0"><p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Collaborators</p>{["Maya Chen", "Jordan Lee", "You"].map((name, index) => <div key={name} className="mb-3 flex items-center gap-3"><span className={"flex size-8 items-center justify-center rounded-full text-xs font-semibold text-white " + (index === 0 ? "bg-violet-500" : index === 1 ? "bg-emerald-600" : "bg-blue-600")}>{name[0]}</span><span className="text-sm text-zinc-300">{name}</span><span className="ml-auto size-2 rounded-full bg-emerald-400" /></div>)}</div>
          </div>
        </div>
      </motion.div>
    </section>

    <section id="collaboration" className="border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-6"><div className="max-w-xl"><p className="text-sm font-medium text-blue-300">Everything in one focused room</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Less context switching. More momentum.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">A deliberately complete toolkit for pairing, reviewing, debugging, and building together.</p></div>
      <div className="mt-14 grid gap-4 md:grid-cols-2">{features.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-xl border border-border bg-background p-7 transition-transform duration-200 hover:-translate-y-1 hover:border-white/15"><span className="flex size-10 items-center justify-center rounded-lg bg-muted text-blue-300"><Icon className="size-5" /></span><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-2 max-w-sm leading-7 text-muted-foreground">{description}</p></article>)}</div></div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
      <div><p className="text-sm font-medium text-blue-300">Designed for real-time work</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A shared brain for every build session.</h2><div className="mt-8 space-y-5">{["Collaborate in the same file, at the same moment.", "Run code without breaking your team's flow.", "Sketch architectures before they become implementation."].map((item) => <div key={item} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-400" />{item}</div>)}</div></div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl"><div className="flex items-center gap-3 border-b border-border pb-5"><span className="flex size-10 items-center justify-center rounded-xl bg-muted text-blue-300"><GitBranch /></span><div><p className="font-semibold">From idea to execution</p><p className="text-sm text-muted-foreground">A continuous collaborative loop</p></div></div><div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground"><div className="rounded-lg bg-muted p-4"><Share2 className="mx-auto mb-2 size-5 text-blue-300" />Share context</div><div className="rounded-lg bg-muted p-4"><Layers3 className="mx-auto mb-2 size-5 text-violet-300" />Think together</div><div className="rounded-lg bg-muted p-4"><Play className="mx-auto mb-2 size-5 text-emerald-300" />Run together</div></div></div>
    </section>

    <section className="mx-6 mb-20 rounded-2xl border border-border bg-card px-6 py-16 text-center sm:mx-auto sm:max-w-7xl"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Bring your next build session together.</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">No setup ceremony. Create a room, invite the team, and start making progress.</p><Link to="/join" className="mt-8 inline-flex"><Button size="lg" className="h-12 px-6">Create your workspace <ArrowRight /></Button></Link></section>

    <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 font-medium text-foreground"><Code2 className="size-4 text-blue-300" /> CodeCanvas</span><span>Collaborative coding, beautifully focused.</span></div></footer>
  </main>
)
