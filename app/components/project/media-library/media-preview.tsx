import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/ContextMenu"
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
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group flex w-[6.5rem] cursor-pointer flex-col overflow-hidden"
          onClick={() => addMediaToTimeline(media)}
        >
          <div className="flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 group-hover:border-sky-500">
            {getMediaType(media.pathName) === MediaTypes.VIDEO ? (
              <VideoPreview
                pathName={media.pathName}
                src={media.url}
                isHovering={isHovering}
              />
            ) : null}
            {getMediaType(media.pathName) === MediaTypes.IMAGE ? (
              <img src={media.url} alt={media.pathName} className="" />
            ) : null}
          </div>
          <span className="mt-1 truncate text-xs text-zinc-400 group-hover:text-zinc-200">{media.pathName}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="cursor-pointer text-zinc-300 hover:text-sky-500"
          onClick={() =>
            window.open(media.url, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes")
          }
        >
          Open in new window
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer text-zinc-300 hover:text-red-500">Delete</ContextMenuItem>
        {/* <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem> */}
      </ContextMenuContent>
    </ContextMenu>
  )
}
