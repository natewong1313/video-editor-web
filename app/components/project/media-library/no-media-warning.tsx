import { FileWarning } from "lucide-react"

export default function NoMediaWarning() {
  return (
    <div className="flex h-64 flex-col items-center justify-center">
      <div className="text-4xl text-zinc-500">
        <FileWarning className="h-12 w-12" />
      </div>
      <div className="mt-2 text-lg text-zinc-300">No media found</div>
      <div className="mt-2 text-sm text-zinc-500">Drag and drop files to upload</div>
    </div>
  )
}
