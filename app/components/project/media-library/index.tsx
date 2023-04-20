import TextField from "@/components/ui/TextField"
import type { Database } from "@/lib/database.types"
import type { Media } from "@/lib/media.types"
import { MediaTypes } from "@/lib/media.types"
import { cn } from "@/utils/cn"
import { getMediaType, mediaValidator } from "@/utils/media"
import { getMediaFromStorage } from "@/utils/supabase"
import { useNavigate, useOutletContext } from "@remix-run/react"
import type { SupabaseClient } from "@supabase/auth-helpers-remix"
import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import Header from "./header"
import MediaPreview from "./media-preview"
import NoMediaWarning from "./no-media-warning"
import StatusBar from "./status-bar"

type Props = {
  projectId: string
  media: Media[]
  addMediaToTimeline: (media: Media) => void
  mediaDurations: Record<string, number>
  setMediaDurations: (durations: Record<string, number>) => void
}

export default function MediaLibrary({
  projectId,
  media,
  addMediaToTimeline,
  mediaDurations,
  setMediaDurations,
}: Props) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [statusBarMsg, setStatusBarMsg] = useState("")
  const { supabase, currentUrl } = useOutletContext<{ supabase: SupabaseClient<Database>; currentUrl: string }>()
  const [projectMedia, setProjectMedia] = useState(media)
  const hasMedia = projectMedia.length > 0
  const [showSearchInput, setShowSearchInput] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      navigate("/auth/signin")
      return
    }
    let filesAdded = 0
    for (let i = 0; i < acceptedFiles.length; i++) {
      setStatusBarMsg(`Uploading ${i + 1} of ${acceptedFiles.length} files...`)
      const file = acceptedFiles[i]
      const result = mediaValidator(file)
      if (!result.valid) {
        console.log(result.message)
        continue
      }
      const { data, error } = await supabase.storage.from("media").upload(`${user.id}/${projectId}/${file.name}`, file)
      if (error) {
        console.error(error)
        continue
      }
      filesAdded++
    }
    setStatusBarMsg("")
    if (filesAdded > 0) {
      const getMediaResult = await getMediaFromStorage(supabase, projectId, user.id, currentUrl)
      if (getMediaResult.data) {
        await setProjectMedia(getMediaResult.data)
      }
    }
  }
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
      "video/*": [".mp4"],
      "audio/*": [".mp3"],
    },
    noClick: hasMedia,
  })
  useEffect(() => {
    setOffsetHeight(containerRef.current?.offsetHeight ?? 0)
  }, [containerRef])
  return (
    <div
      className={cn(
        "flex h-full w-[30.05rem] flex-col overflow-auto border border-r border-transparent border-r-zinc-700 bg-zinc-950/95 px-6 py-4",
        isDragActive ? "border border-dashed border-sky-500" : null,
      )}
      {...getRootProps()}
      ref={containerRef}
    >
      <input {...getInputProps()} />
      <Header
        onUploadBtnPress={open}
        onSearchBtnPress={() => {
          setShowSearchInput(!showSearchInput)
        }}
      />
      <TextField className={cn("mt-1", showSearchInput ? null : "hidden")} placeholder="Search for media..." />
      <div className="mt-4">
        {hasMedia ? (
          <div className="flex flex-wrap gap-3">
            {projectMedia.map((media) => (
              <MediaPreview
                key={media.storageId}
                media={media}
                addMediaToTimeline={addMediaToTimeline}
                mediaDurations={mediaDurations}
                setMediaDurations={setMediaDurations}
              />
            ))}
          </div>
        ) : (
          <NoMediaWarning />
        )}
      </div>
      <StatusBar msg={statusBarMsg} marginTop={offsetHeight - 80} />
    </div>
  )
}
