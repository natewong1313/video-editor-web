import MediaLibrary from "@/components/project/media-library"
import Navbar from "@/components/project/navbar"
import VideoItem from "@/components/project/timeline/video-item"
import { getAuthenticatedUser } from "@/utils/supabase"
import type { V2_MetaFunction } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import type { LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import type { TimelineEffect, TimelineRow } from "@xzdarcy/react-timeline-editor"
import { Timeline } from "@xzdarcy/react-timeline-editor"
import { useEffect, useState } from "react"

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
        id: "action00",
        start: 0,
        end: 3,
        effectId: "video",
      },
      {
        id: "action10",
        start: 3,
        end: 5,
        effectId: "video",
      },
    ],
  },
]

export async function loader({ params, request }: LoaderArgs) {
  const response = new Response()
  const projectId = params.id
  const { user, supabaseClient } = await getAuthenticatedUser(request, response)
  if (!user) {
    return redirect("/auth/signin", {
      headers: response.headers,
    })
  }
  const { data, error } = await supabaseClient.from("projects").select().eq("id", projectId).single()
  if (error) {
    return redirect("/", {
      headers: response.headers,
    })
  }

  return json({ project: data }, { headers: response.headers })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.project.name }]
}

export default function Project() {
  const { project } = useLoaderData<typeof loader>()
  const [data, setData] = useState(mockData)
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="h-full bg-zinc-950/95">
      <div className="flex h-full flex-col">
        <Navbar projectName={project.name} />
        <div className="h-full flex-1">
          <MediaLibrary />
        </div>
        <div className="h-[20rem] border-t border-zinc-700">
          <Timeline
            style={{ width: "100%", height: "19.9rem", backgroundColor: "rgb(9 9 11)" }}
            onChange={(editorData: TimelineRow[]) => {
              console.log(editorData)
              setData(editorData)
            }}
            editorData={data}
            effects={mockEffect}
            autoScroll={true}
            gridSnap={true}
            dragLine={true}
            getActionRender={(action, row) => {
              if (action.effectId === "video") {
                return <VideoItem action={action} row={row} />
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
