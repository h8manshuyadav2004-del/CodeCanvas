import { ArrowLeft, Compass } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
    <div><div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-blue-300"><Compass /></div><p className="mt-6 text-sm font-medium text-blue-300">404</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">This room does not exist.</h1><p className="mx-auto mt-4 max-w-md text-muted-foreground">The link may be incomplete, or this workspace is no longer available.</p><Link to="/" className="mt-8 inline-flex"><Button><ArrowLeft /> Back to CodeSync</Button></Link></div>
  </main>
)
