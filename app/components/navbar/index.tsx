import UserInfo from "./user-info"
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
      <UserInfo email={email} />
    </div>
  )
}
