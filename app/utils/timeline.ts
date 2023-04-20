import type { TimelineAction } from "@xzdarcy/react-timeline-editor"

export function getEndTime(actions: TimelineAction[]) {
  return actions.reduce((acc, cur) => {
    const endTime = cur.end
    return endTime > acc ? endTime : acc
  }, 0)
}

export function getClipPath(clipName: string) {
  const isANumberedClip = /\(\d+\)$/
  if (isANumberedClip.test(clipName)) {
    const matches = clipName.match(/\((\d+)\)$/)
    if (matches !== null) {
      const number = parseInt(matches[1])
      const index = clipName.lastIndexOf(`(${number})`)
      return clipName.slice(0, index).trim()
    }
  }
  return clipName
}
