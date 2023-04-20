import type { TimelineState } from "@xzdarcy/react-timeline-editor"
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "react-aria-components"
type Props = {
  timelineState: React.MutableRefObject<TimelineState>
}
export default function MediaPlayer({ timelineState }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!timelineState.current) return
    const engine = timelineState.current
    engine.listener.on("play", () => setIsPlaying(true))
    engine.listener.on("paused", () => setIsPlaying(false))
    // engine.listener.on('afterSetTime', ({ time }) => setTime(time));
    // engine.listener.on('setTimeByTick', ({ time }) => {
    //   setTime(time);

    //   if (autoScrollWhenPlay.current) {
    //     const autoScrollFrom = 500;
    //     const left = time * (scaleWidth / scale) + startLeft - autoScrollFrom;
    //     timelineState.current.setScrollLeft(left)
    //   }
    // });

    return () => {
      if (!engine) return
      engine.pause()
      engine.listener.offAll()
      // lottieControl.destroy();
    }
  }, [])

  const onPlayorPauseBtnClick = () => {
    if (!timelineState.current) return;
    if (timelineState.current.isPlaying) {
      timelineState.current.pause();
    } else {
      timelineState.current.play({ autoEnd: true });
    }
  }

  return (
    <div className="h-full w-full p-4">
      {/* <Button className="text-white" onPress={() => timelineState.current.play({ autoEnd: true })}>
        Play
      </Button> */}
      <div className="mx-auto mt-auto flex h-16 w-[30rem] items-center justify-center space-x-2 rounded-md border border-zinc-700 bg-zinc-950/95">
        <Button
          className="text-zinc-500 data-[hovered]:text-white data-[pressed]:text-white focus:outline-none"
          onPress={() => timelineState.current.play({ autoEnd: true })}
        >
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button
          className="text-zinc-500 data-[hovered]:text-white data-[pressed]:text-white focus:outline-none"
          onPress={onPlayorPauseBtnClick}
        >
          {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
        </Button>
        <Button
          className="text-zinc-500 data-[hovered]:text-white data-[pressed]:text-white focus:outline-none"
          onPress={() => timelineState.current.play({ autoEnd: true })}
        >
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
