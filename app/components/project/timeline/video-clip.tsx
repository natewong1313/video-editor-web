import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/ContextMenu"
import type { TimelineAction, TimelineRow } from "@xzdarcy/react-timeline-editor"
import { MediaTypes } from "@/lib/media.types"

type Props = {
  action: TimelineAction
  row: TimelineRow
  deleteFromTimeline: (clipId: string, mediaType: MediaTypes) => void
}
export default function VideoClip({ action, row, deleteFromTimeline }: Props) {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-full cursor-pointer items-center justify-center bg-purple-700 font-sans">
            <div className=" text-white">{action.id}</div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="cursor-pointer hover:text-red-500"  onClick={() => deleteFromTimeline(action.id, MediaTypes.VIDEO)}>Delete</ContextMenuItem>
          {/* <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem> */}
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}