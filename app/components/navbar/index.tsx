import { Clapperboard } from "lucide-react"
import UserInfo from "./user-info"
type Props = {
  email: string
}
export default function Navbar({ email }: Props) {
  return (
    <div className="px-16 lg:px-24 justify-between flex items-center w-full bg-black ring-1 ring-zinc-400/20">
      <div className="flex text-sky-500 items-center">
        <Clapperboard className="mr-2 h-7 w-7" />
        <h1 className="font-medium text-xl">video-editor</h1>
      </div>
      <UserInfo email={email} />
    </div>
  )
}
