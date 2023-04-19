import { cn } from "@/utils/cn"
import { FileWarning, Plus, Search } from "lucide-react"
import { useCallback } from "react"
import { Button } from "react-aria-components"
import { useDropzone } from "react-dropzone"

export default function MediaLibrary() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
      "video/*": [".mp4"],
      "audio/*": [".mp3"],
    },
  })
  return (
    <div
      className={cn(
        "h-full w-96 border border-r border-transparent border-r-zinc-700 bg-zinc-950/95 px-6 py-4",
        isDragActive ? "border border-dashed border-sky-500" : null,
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
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
          <div className="flex h-64 flex-col items-center justify-center">
            <div className="text-4xl text-zinc-500">
              <FileWarning className="h-12 w-12" />
            </div>
            <div className="mt-2 text-lg text-zinc-300">No media found</div>
            <div className="mt-2 text-sm text-zinc-500">Drag and drop files to upload</div>
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
      className="rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-2 text-zinc-500 focus:outline-none data-[hovered]:border-zinc-500 data-[pressed]:border-sky-500 data-[hovered]:text-zinc-300"
    >
      {children}
    </Button>
  )
}
