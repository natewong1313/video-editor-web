import type { TimelineState } from "@xzdarcy/react-timeline-editor"
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "react-aria-components"
type Props = {
  timelineState: React.MutableRefObject<TimelineState>
}
export default function MediaPlayer({ timelineState }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!timelineState.current) return
    const engine = timelineState.current
    engine.listener.on("play", () => setIsPlaying(true))
    engine.listener.on("paused", () => setIsPlaying(false))
    engine.listener.on('afterSetTime', ({ time }) => setTime(time));
    engine.listener.on('setTimeByTick', ({ time }) => {
      setTime(time);

      // if (autoScrollWhenPlay.current) {
      //   const autoScrollFrom = 500;
      //   const left = time * (scaleWidth / scale) + startLeft - autoScrollFrom;
      //   timelineState.current.setScrollLeft(left)
      // }
    });

    return () => {
      if (!engine) return
      engine.pause()
      engine.listener.offAll()
      // lottieControl.destroy();
    }
  }, [])
  const timeRender = (time: number) => {
    const float = (parseInt((time % 1) * 100 + '') + '').padStart(2, '0')
    const min = (parseInt(time / 60 + '') + '').padStart(2, '0')
    const second = (parseInt((time % 60) + '') + '').padStart(2, '0')
    return <>{`${min}:${second}.${float.replace('0.', '')}`}</>
  }

  const onPlayorPauseBtnClick = () => {
    if (!timelineState.current) return;
    if (timelineState.current.isPlaying) {
      timelineState.current.pause();
    } else {
      timelineState.current.play({ autoEnd: true });
    }
  }

  return (
    <div className="h-full w-full p-4 flex justify-end">
      <div className="mx-auto mt-auto px-4 flex h-16 w-[30rem] items-center rounded-md border border-zinc-700 bg-zinc-950/95">
        <div className="text-zinc-500 flex-1">
          {timeRender(time)}
        </div>
        <div className="space-x-2 h-16 flex justify-center items-center">
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
        <div className="text-white flex-1" />
      </div>
    </div>
  )
}
