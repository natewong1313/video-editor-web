import Button from "@/components/ui/Button"
import { Link } from "@remix-run/react"
import { ArrowLeft } from "lucide-react"
import { Link as RALink } from "react-aria-components"

type Props = {
  projectName: string
  onExportBtnPress: () => void
}
export default function Navbar({ projectName, onExportBtnPress }: Props) {
  return (
    <div className="h-16 w-full border-b border-zinc-700 bg-black px-4">
      <div className="flex h-full items-center justify-between">
        <div>
          {/* back button */}
          <RALink className="flex items-center text-zinc-500 focus:outline-none group data-[hovered]:text-zinc-200">
            <Link to="/">
              <ArrowLeft className="h-5 w-5 hover:text-zinc-200" />
              <span className="ml-1 font-medium">Back</span>
            </Link>
          </RALink>
        </div>
        <div className="flex ">
          <RALink className="text-zinc-500 focus:outline-none data-[hovered]:text-zinc-200 data-[pressed]:text-sky-500">
            <Link to="/">Projects</Link>
          </RALink>
          <span className="ml-1 mr-2 font-bold text-zinc-500">/</span>
          <h1 className="font-medium text-white">{projectName}</h1>
        </div>
        <div>
          <Button className="px-6 py-2" onPress={onExportBtnPress}>Export</Button>
        </div>
      </div>
    </div>
  )
}
