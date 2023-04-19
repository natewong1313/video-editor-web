import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
  isHovering: boolean
}
export default function VideoPreview({ src, isHovering }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setIsPlaying] = useState(false)
  useEffect(() => {
    if (ref.current) {
      ref.current.pause()
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
