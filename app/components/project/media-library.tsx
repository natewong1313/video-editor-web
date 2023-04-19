import { FileWarning, Plus, Search } from "lucide-react"
import { Button } from "react-aria-components"
export default function MediaLibrary() {
  return (
    <div className="w-96 px-6 py-4 bg-zinc-950/95 border-r border-zinc-700 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-white">Media Library</h1>
        <div className="flex space-x-2">
          <IconBtn onPress={() => console.log()}>
            <Search className="h-4 w-4" />
          </IconBtn>
          <IconBtn onPress={() => console.log()}>
            <Plus className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>
      <div>
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-4xl text-zinc-500">
              <FileWarning className="h-12 w-12" />
            </div>
            <div className="text-lg text-zinc-300 mt-2">No media found</div>
            <div className="text-sm text-zinc-500 mt-2">Drag and drop files to upload</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconBtn({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  return (
    <Button
      onPress={onPress}
      className="py-2 px-2 bg-zinc-900 rounded-lg border-zinc-700 border data-[hovered]:border-zinc-500 text-zinc-500 data-[hovered]:text-zinc-300 focus:outline-none data-[pressed]:border-sky-500"
    >
      {children}
    </Button>
  )
}
