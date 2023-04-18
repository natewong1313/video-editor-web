import { Link } from "@remix-run/react"
import { User } from "lucide-react"
import { useState } from "react"
import { Button, Dialog, DialogTrigger, Link as RALink, Popover } from "react-aria-components"
import ConfirmSignoutModal from "./confirm-signout-modal"

type Props = {
  email: string
}
export default function UserInfo({ email }: Props) {
  const [confirmSignoutModalOpen, setConfirmSignoutModalOpen] = useState(false)
  return (
    <>
      <DialogTrigger>
        <Button className="py-2 my-2 flex flex-row items-center space-x-3 data-[hovered]:bg-zinc-900/60 data-[pressed]:bg-zinc-900/60 rounded-md px-2 cursor-pointer border border-transparent data-[hovered]:border-zinc-700 data-[pressed]:border-zinc-700 focus:outline-none">
          <h1 className="text-zinc-500 text-sm font-medium">{email}</h1>
          <div className="h-10 w-10 flex items-center justify-center bg-zinc-800 border border-zinc-500 rounded-full">
            <User className="text-zinc-500 h-6 w-6" />
          </div>
        </Button>
        <Popover className="data-[entering]:animate-in data-[entering]:fade-in data-[exiting]:animate-out data-[exiting]:fade-out">
          <Dialog className="focus:outline-none bg-zinc-900 border border-zinc-700 w-48 rounded-md shadow-md p-3">
            <div className="flex flex-col space-y-2 text-center">
              <DialogLink text="Profile" />
              <DialogLink text="Settings" />
              <Button
                className="text-zinc-500 data-[hovered]:text-white text-sm font-medium rounded-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
                onPress={() => setConfirmSignoutModalOpen(true)}
              >
                Sign Out
              </Button>
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
      <ConfirmSignoutModal isOpen={confirmSignoutModalOpen} setIsOpen={setConfirmSignoutModalOpen}>
        hi
      </ConfirmSignoutModal>
    </>
  )
}

function DialogLink({ text, href }: { text: string; href?: string }) {
  return (
    <RALink className="text-zinc-500 data-[hovered]:text-white text-sm font-medium rounded-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900">
      <Link to={href as string}>{text}</Link>
    </RALink>
  )
}
