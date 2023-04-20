import MediaLibrary from "@/components/project/media-library"
import MediaPlayer from "@/components/project/media-player"
import Navbar from "@/components/project/navbar"
import VideoClip from "@/components/project/timeline/video-clip"
import type { Media } from "@/lib/media.types"
import { MediaTypes } from "@/lib/media.types"
import type { Database } from "@/lib/database.types"
import { getAuthenticatedUser, getMediaFromStorage, getProjectFromDb, updateProjectTimelineInDb } from "@/utils/supabase"
import { getEndTime, getClipPath } from "@/utils/timeline"
import type { V2_MetaFunction } from "@remix-run/react"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import type { LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import type { TimelineEffect, TimelineRow, TimelineState } from "@xzdarcy/react-timeline-editor"
import { Timeline } from "@xzdarcy/react-timeline-editor"
import { useRef, useState } from "react"
import { useDurationsStore } from "@/hooks/use-durations-store"
import { useTimelineStore } from "@/hooks/use-timeline-store"
import type { SupabaseClient } from "@supabase/auth-helpers-remix"

export const mockData: TimelineRow[] = [
  {
    id: "0",
    actions: [
      // {
      //   id: "action0",
      //   start: 0,
      //   end: 3,
      //   effectId: "video",
      // },
      // {
      //   id: "action1",
      //   start: 3,
      //   end: 5,
      //   effectId: "video",
      // },
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
  const media: Media[] = getMediaResult.data || []
  if (getMediaResult.error) {
    if (getMediaResult.error.message !== `{"size":0}`) {
      console.log(getMediaResult.error)
      return redirect("/", {
        headers: response.headers,
      })
    }
  }
  return json({ project: getProjectResult.data, media, userId: user.id }, { headers: response.headers })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.project.name }]
}

export default function Project() {
  const { project, media, userId } = useLoaderData<typeof loader>()
  const [timelineData, setTimelineData] = useState<TimelineRow[]>(project.timeline_json ? JSON.parse(project.timeline_json) : mockData)
  const { supabase } = useOutletContext<{ supabase: SupabaseClient<Database> }>()
  const timelineState = useRef<TimelineState>()
  const durations = useDurationsStore((state) => state.durations)
  const [currentClipId, updateCurrentClip] = useTimelineStore((state) => [state.currentClipId, state.updateCurrentClip])
  // for keeping track of how many times the same clip is in the timeline
  const [mediaOccurences, setMediaOccurences] = useState(
    media.reduce((acc, curr) => {
      acc[curr.pathName] = 0
      return acc
    }, {} as Record<string, number>),
  )
  media.reduce((acc, curr) => {
    acc[curr.pathName] = 0
    return acc
  }, {} as Record<string, number>)

  const addMediaToTimeline = async (media: Media) => {
    const newTimelineData = [...timelineData]
    const videoRowEndTime = getEndTime(timelineData[0].actions)
    let clipName = media.pathName
    if (mediaOccurences[media.pathName] > 0) {
      clipName = `${media.pathName} (${mediaOccurences[media.pathName]})`
    }
    newTimelineData[0].actions.push({
      id: clipName,
      start: videoRowEndTime,
      end: videoRowEndTime + durations[media.pathName],
      effectId: "video",
    })
    setMediaOccurences({
      ...mediaOccurences,
      [media.pathName]: mediaOccurences[media.pathName] + 1,
    })
    setTimelineData(newTimelineData)
    const { error } = await updateProjectTimelineInDb(supabase, project.id, timelineData)
    if (error) {
      console.log(error)
    }
  }
  const splitClip = (clipId: string) => {
    // let clipIndex = 0
    // let originalClip: TimelineAction
    // for(let i = 0; i < timelineData[0].actions.length; i++){
    //   if(timelineData[0].actions[i].id === clipId){
    //     clipIndex = i
    //     originalClip = timelineData[0].actions[i]
    //     break
    //   }
    // }
    // const newTimelineData = [...timelineData]

  }
  // delete clip from timeline
  const deleteFromTimeline = async (clipId: string, mediaType: MediaTypes) => {
    if (mediaType === MediaTypes.VIDEO) {
      const newTimelineData = [...timelineData]
      const videoRow = newTimelineData[0]
      const newActions = videoRow.actions.filter((action) => action.id !== clipId)
      videoRow.actions = newActions
      setTimelineData(newTimelineData)
      if (currentClipId === clipId) {
        updateCurrentClip("", "")
      }
    }
    const { error } = await updateProjectTimelineInDb(supabase, project.id, timelineData)
    if (error) {
      console.log(error)
    }
  }

  const effects: Record<string, TimelineEffect> = {
    video: {
      id: "video",
      name: "video",
      source: {
        start: ({ action, engine, isPlaying, time }) => {
          if (isPlaying) {
            console.log("start", action)
            // const src = (action as CustomTimelineAction).data.src;
            // audioControl.start({ id: src, src, startTime: action.start, engine, time });
          }
        },
        enter: ({ action, engine, isPlaying, time }) => {
          console.log("enter", action)
          updateCurrentClip(getClipPath(action.id), action.id)
        },
        leave: ({ action, engine }) => {
          console.log("leave", action)
          updateCurrentClip("", "")
          // const src = (action as CustomTimelineAction).data.src;
          // audioControl.stop({ id: src, engine });
        },
        stop: ({ action, engine }) => {
          console.log("stop", action)
          // const src = (action as CustomTimelineAction).data.src;
          // audioControl.stop({ id: src, engine });
        },
      }
    },
  }
  // const
  return (
    <div className="h-full bg-zinc-950/95">
      <div className="flex h-full flex-col">
        <Navbar projectName={project.name} />
        <div className="h-full w-full flex-1 overflow-hidden">
          <div className="flex h-full w-full">
            <MediaLibrary
              projectId={project.id}
              media={media}
              addMediaToTimeline={addMediaToTimeline}
            />
            <MediaPlayer
              timelineState={timelineState as React.MutableRefObject<TimelineState>}
              media={media}
              endTime={getEndTime(timelineData[0].actions)}
            />
          </div>
        </div>
        <div className="h-[20rem] border-t border-zinc-700">
          <Timeline
            style={{ width: "100%", height: "19.9rem", backgroundColor: "rgb(9 9 11)" }}
            onChange={(editorData: TimelineRow[]) => {
              setTimelineData(editorData)
              updateProjectTimelineInDb(supabase, project.id, timelineData)
            }}
            ref={timelineState as React.MutableRefObject<TimelineState>}
            editorData={timelineData}
            effects={effects}
            autoScroll={true}
            gridSnap={true}
            dragLine={true}
            getActionRender={(action, row) => {
              if (action.effectId === "video") {
                return <VideoClip action={action} row={row} splitClip={splitClip} deleteFromTimeline={deleteFromTimeline} />
              }
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
