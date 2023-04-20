import IconBtn from "@/components/ui/IconButton"
import { Search, Upload } from "lucide-react"

type Props = {
  onUploadBtnPress: () => void
  onSearchBtnPress: () => void
}
export default function Header({ onUploadBtnPress, onSearchBtnPress }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-white">Media Library</h1>
      <div className="flex space-x-2">
        <IconBtn onPress={onSearchBtnPress}>
          <Search className="h-4 w-4" />
        </IconBtn>
        <IconBtn onPress={onUploadBtnPress}>
          <Upload className="h-4 w-4" />
        </IconBtn>
      </div>
    </div>
  )
}
