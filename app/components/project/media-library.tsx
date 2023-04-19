import type { Database } from "@/lib/database.types"
import { cn } from "@/utils/cn"
import mediaValidator from "@/utils/media-validator"
import { useNavigate, useOutletContext } from "@remix-run/react"
import type { SupabaseClient } from "@supabase/auth-helpers-remix"
import type { FileObject } from "@supabase/storage-js"
import { FileWarning, Plus, Search } from "lucide-react"
import { useCallback } from "react"
import { Button } from "react-aria-components"
import { useDropzone } from "react-dropzone"

type Props = {
  projectId: string
  media: FileObject[]
}

export default function MediaLibrary({ projectId, media }: Props) {
  const navigate = useNavigate()
  const { supabase } = useOutletContext<{ supabase: SupabaseClient<Database> }>()
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      navigate("/auth/signin")
    }
    for (const file of acceptedFiles) {
      const result = mediaValidator(file)
      if (!result.valid) {
        console.log(result.message)
        continue
      }
      const { data, error } = await supabase.storage.from("media").upload(`${user?.id}/${projectId}/${file.name}`, file)
      console.log(error)
      console.log(data)
    }
  }, [])
  const hasMedia = media.length > 0
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
      "video/*": [".mp4"],
      "audio/*": [".mp3"],
    },
    noClick: hasMedia,
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
          <IconBtn onPress={open}>
            <Plus className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>
      <div>
        <div className="mt-4">
          {hasMedia ? null : (
            <div className="flex h-64 flex-col items-center justify-center">
              <div className="text-4xl text-zinc-500">
                <FileWarning className="h-12 w-12" />
              </div>
              <div className="mt-2 text-lg text-zinc-300">No media found</div>
              <div className="mt-2 text-sm text-zinc-500">Drag and drop files to upload</div>
            </div>
          )}
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
