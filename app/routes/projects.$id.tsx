import MediaLibrary from "@/components/project/media-library"
import MediaPlayer from "@/components/project/media-player"
import Navbar from "@/components/project/navbar"
import VideoClip from "@/components/project/timeline/video-clip"
import type { Media } from "@/lib/media.types"
import { MediaTypes } from "@/lib/media.types"
import { getAuthenticatedUser, getMediaFromStorage, getProjectFromDb } from "@/utils/supabase"
import { getEndTime } from "@/utils/timeline"
import type { V2_MetaFunction } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import type { LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import type { TimelineEffect, TimelineRow, TimelineState } from "@xzdarcy/react-timeline-editor"
import { Timeline } from "@xzdarcy/react-timeline-editor"
import { useRef, useState } from "react"

export const mockEffect: Record<string, TimelineEffect> = {
  video: {
    id: "video",
    name: "video",
  },
}

export const mockData: TimelineRow[] = [
  {
    id: "0",
    actions: [
      {
        id: "action0",
        start: 0,
        end: 3,
        effectId: "video",
      },
      {
        id: "action1",
        start: 3,
        end: 5,
        effectId: "video",
      },
    ],
  },
]

export async function loader({ params, request }: LoaderArgs) {
  const response = new Response()
  const projectId = params.id as string
  const { user, supabaseClient } = await getAuthenticatedUser(request, response)
  if (!user) {
    return redirect("/auth/signin", {
      headers: response.headers,
    })
  }
  const getProjectResult = await getProjectFromDb(supabaseClient, projectId)
  if (getProjectResult.error) {
    return redirect("/", {
      headers: response.headers,
    })
  }
  const currentUrl = process.env.VERCEL_URL || "http://localhost:3000"
  const getMediaResult = await getMediaFromStorage(supabaseClient, projectId, user.id, currentUrl)
  if (getMediaResult.error) {
    console.log(getMediaResult.error)
    return redirect("/", {
      headers: response.headers,
    })
  }
  return json({ project: getProjectResult.data, media: getMediaResult.data }, { headers: response.headers })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.project.name }]
}

export default function Project() {
  const { project, media } = useLoaderData<typeof loader>()
  const [timelineData, setTimelineData] = useState(mockData)
  const timelineState = useRef<TimelineState>()
  // for keeping track of how many times the same clip is in the timeline
  const [mediaOccurences, setMediaOccurences] = useState(
    media.reduce((acc, curr) => {
      acc[curr.pathName] = 0
      return acc
    }, {} as Record<string, number>),
  )
  const [mediaDurations, setMediaDurations] = useState(
    media.reduce((acc, curr) => {
      acc[curr.pathName] = 0
      return acc
    }, {} as Record<string, number>),
  )
  const deleteMedia = () => {
    console.log("OK")
  }
  const addMediaToTimeline = (media: Media) => {
    const newTimelineData = [...timelineData]
    const videoRowEndTime = getEndTime(timelineData[0].actions)
    let clipName = media.pathName
    if (mediaOccurences[media.pathName] > 0) {
      clipName = `${media.pathName} (${mediaOccurences[media.pathName]})`
    }
    // let duration = mediaDurations[media.pathName]
    newTimelineData[0].actions.push({
      id: clipName,
      start: videoRowEndTime,
      end: videoRowEndTime + mediaDurations[media.pathName],
      effectId: "video",
    })
    setMediaOccurences({
      ...mediaOccurences,
      [media.pathName]: mediaOccurences[media.pathName] + 1,
    })
    setTimelineData(newTimelineData)
  }
  // delete clip from timeline
  const deleteFromTimeline = (clipId: string, mediaType: MediaTypes) => {
    if (mediaType === MediaTypes.VIDEO) {
      const newTimelineData = [...timelineData]
      const videoRow = newTimelineData[0]
      const newActions = videoRow.actions.filter((action) => action.id !== clipId)
      videoRow.actions = newActions
      setTimelineData(newTimelineData)
    }
  }
  console.log(mediaDurations)
  return (
    <div className="h-full bg-zinc-950/95">
      <div className="flex h-full flex-col">
        <Navbar projectName={project.name} />
        {/* <div className="h-full w-full flex-1 overflow-hidden">
          <MediaLibrary
            projectId={project.id}
            media={media}
            addMediaToTimeline={addMediaToTimeline}
            mediaDurations={mediaDurations}
            setMediaDurations={setMediaDurations}
          />
          <MediaPlayer timelineState={timelineState as React.MutableRefObject<TimelineState>} />
        </div> */}
        <div className="h-full w-full flex-1 overflow-hidden">
          <div className="flex h-full w-full">
            <MediaLibrary
              projectId={project.id}
              media={media}
              addMediaToTimeline={addMediaToTimeline}
              mediaDurations={mediaDurations}
              setMediaDurations={setMediaDurations}
            />
            <MediaPlayer timelineState={timelineState as React.MutableRefObject<TimelineState>} />
          </div>
        </div>
        <div className="h-[20rem] border-t border-zinc-700">
          <Timeline
            style={{ width: "100%", height: "19.9rem", backgroundColor: "rgb(9 9 11)" }}
            onChange={(editorData: TimelineRow[]) => {
              // console.log(editorData)
              // setVideoRowEndTime(getEndTime(editorData[0].actions))
              setTimelineData(editorData)
            }}
            ref={timelineState as React.MutableRefObject<TimelineState>}
            editorData={timelineData}
            effects={mockEffect}
            autoScroll={true}
            gridSnap={true}
            dragLine={true}
            getActionRender={(action, row) => {
              if (action.effectId === "video") {
                return <VideoClip action={action} row={row} deleteFromTimeline={deleteFromTimeline} />
              }
              // else if (action.effectId === 'effect1') {
              //   return <CustomRender1 action={action} row={row}/>
              // }
            }}
          />
        </div>
      </div>
      {/* <div className="flex h-full space-x-1">
        <div>
          <MediaLibrary />
        </div>
        <div className="flex flex-1 flex-col space-y-1">
          <div className="flex-1">media player</div>
          timeline
        </div>
      </div> */}
    </div>
  )
}
