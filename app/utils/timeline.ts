import type { TimelineAction } from "@xzdarcy/react-timeline-editor"

export function getEndTime(actions: TimelineAction[]) {
  return actions.reduce((acc, cur) => {
    const endTime = cur.end
    return endTime > acc ? endTime : acc
  }, 0)
}
