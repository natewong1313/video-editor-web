import { useEffect, useRef, useState } from "react"

type Props = {
  pathName: string
  src: string
  isHovering: boolean
  mediaDurations: Record<string, number>
  setMediaDurations: (durations: Record<string, number>) => void
}
export default function VideoPreview({ pathName, src, isHovering, mediaDurations, setMediaDurations }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setIsPlaying] = useState(false)
  useEffect(() => {
    if (ref.current) {
      ref.current.pause()
      ref.current.onloadedmetadata = () => {
        if (ref.current) {
          console.log(ref.current.duration)
          setMediaDurations({ ...mediaDurations, [pathName]: ref.current.duration })
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
