import { User } from "iconoir-react"

export default function Navbar() {
  return (
    <div className="py-4 px-8 justify-between flex items-center w-full bg-zinc-900 border-b border-zinc-700">
      <div>
        <h1 className="text-sky-500 font-medium text-lg">video-editor</h1>
      </div>
      <div>
        <div className="h-10 w-10 flex items-center justify-center bg-zinc-700 border border-zinc-500 rounded-full">
          <User className="text-zinc-500 h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
