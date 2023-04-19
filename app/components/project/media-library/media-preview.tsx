import type { Media } from "@/lib/media.types"
import { MediaTypes } from "@/lib/media.types"
import { getMediaType } from "@/utils/media"
import { useState } from "react"
import VideoPreview from "./video-preview"

type Props = {
  media: Media
}

export default function MediaPreview({ media }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group flex w-24 cursor-pointer flex-col overflow-hidden"
      //   onClick={}
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 group-hover:border-zinc-700">
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
