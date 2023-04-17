import { User } from "iconoir-react"
type Props = {
  email: string
}
export default function Navbar({ email }: Props) {
  return (
    // border-b border-zinc-800
    <div className="px-12 justify-between flex items-center w-full bg-black ring-1 ring-zinc-400/20">
      <div className="py-4 ">
        <h1 className="text-sky-500 font-medium text-lg">video-editor</h1>
      </div>
      <div className="py-2 my-2 flex flex-row items-center space-x-3 hover:bg-zinc-900 rounded-md px-2 cursor-pointer border border-transparent hover:border-zinc-700">
        <h1 className="text-gray-500 text-sm">{email}</h1>
        <div className="h-10 w-10 flex items-center justify-center bg-zinc-700 border border-zinc-500 rounded-full">
          <User className="text-zinc-500 h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
