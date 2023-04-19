import type { TimelineAction, TimelineRow } from "@xzdarcy/react-timeline-editor"

type Props = {
  action: TimelineAction
  row: TimelineRow
}
export default function VideoItem({ action, row }: Props) {
  return (
    <div className="cursor-pointer h-full bg-purple-700 flex justify-center items-center font-sans">
      <div className=" text-white">{action.id}</div>
    </div>
  )
}
