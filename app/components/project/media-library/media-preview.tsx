import type { Media } from "@/lib/media.types"
import { MediaTypes } from "@/lib/media.types"
import { getMediaType } from "@/utils/media"
import { useState } from "react"
import VideoPreview from "./video-preview"

type Props = {
  media: Media
  addMediaToTimeline: (media: Media) => void
}

export default function MediaPreview({ media, addMediaToTimeline }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group flex w-[6.6rem] cursor-pointer flex-col overflow-hidden"
      onClick={() => addMediaToTimeline(media)}
    >
      <div className="flex h-[6.6rem] w-[6.6rem] items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 group-hover:border-sky-500">
        {getMediaType(media.pathName) === MediaTypes.VIDEO ? (
          <VideoPreview src={media.url} isHovering={isHovering} />
        ) : null}
        {getMediaType(media.pathName) === MediaTypes.IMAGE ? (
          <img src={media.url} alt={media.pathName} className="" />
        ) : null}
      </div>
      <span className="mt-1 truncate text-xs text-zinc-400 group-hover:text-zinc-200">{media.pathName}</span>
    </div>
  )
}
