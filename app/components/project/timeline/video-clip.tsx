import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/ContextMenu"
import type { TimelineAction, TimelineRow } from "@xzdarcy/react-timeline-editor"
import { MediaTypes } from "@/lib/media.types"
import { getClipPath } from "@/utils/timeline"

type Props = {
  action: TimelineAction
  row: TimelineRow
  splitClip: (clipId: string) => void
  deleteFromTimeline: (clipId: string, mediaType: MediaTypes) => void
}
export default function VideoClip({ action, row, splitClip, deleteFromTimeline }: Props) {
  const pathName = getClipPath(action.id)
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-full cursor-pointer items-center justify-start px-4 bg-purple-700 font-sans">
            <div className="text-white">{action.id}</div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="cursor-pointer text-zinc-500 hover:text-white" onClick={() => splitClip(action.id)}>Split at marker</ContextMenuItem>
          <ContextMenuItem className="cursor-pointer text-zinc-500 hover:text-red-500" onClick={() => deleteFromTimeline(action.id, MediaTypes.VIDEO)}>Delete clip</ContextMenuItem>
          {/* <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem> */}
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}
