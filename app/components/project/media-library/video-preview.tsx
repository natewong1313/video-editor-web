import { useEffect, useRef, useState } from "react"
import { useDurationsStore } from "@/hooks/use-durations-store"

type Props = {
  pathName: string
  src: string
  isHovering: boolean
}
export default function VideoPreview({ pathName, src, isHovering }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setIsPlaying] = useState(false)
  const updateDuration = useDurationsStore((state) => state.updateDuration)
  useEffect(() => {
    if (ref.current) {
      ref.current.pause()
      ref.current.onloadedmetadata = () => {
        if (ref.current) {
          updateDuration(pathName, ref.current.duration)
        }
      }
    }
  }, [])
  if (isHovering && !playing) {
    setIsPlaying(true)
    ref.current?.play()
  } else if (!isHovering && playing) {
    setIsPlaying(false)
    ref.current?.pause()
  }

  return (
    <video loop preload="none" ref={ref} muted={true} onFocus={() => null} onBlur={() => null} autoPlay>
      <source src={src} type="video/mp4" />
    </video>
  )
}
