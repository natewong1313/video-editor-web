import { useState } from "react"
import type { LoaderArgs } from "@vercel/remix"
import { createServerClient } from "@supabase/auth-helpers-remix"
import { redirect, json } from "@vercel/remix"
import Navbar from "@/components/navbar"
import type { V2_MetaFunction } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import Button from "@/components/ui/Button"
import { Plus, AddMediaVideo } from "iconoir-react"
import CreateProjectModal from "@/components/projects/create-project-modal"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Projects" }]
}

export async function loader({ request }: LoaderArgs) {
  const response = new Response()

  const supabaseClient = createServerClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response,
  })
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()
  if (!user) {
    return redirect("/auth/signin", {
      headers: response.headers,
    })
  }
  return json(user, {
    headers: response.headers,
  })
}

export default function Projects() {
  const user = useLoaderData<typeof loader>()
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <div className="h-full bg-zinc-950/95">
        <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Navbar email={user.email || ""} />
        <div className="flex flex-col px-24 py-8">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="text-white text-2xl">Your Projects</h1>
                <p className="text-md text-zinc-600 mt-1">View all of your projects below</p>
              </div>
              <div>
                <Button className="px-4 py-3 text-sm" onPress={() => setIsOpen(true)}>
                  <Plus className="mr-1 -ml-1 -mt-0.5" /> New Project
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col mt-4 gap-4 grid-cols-4">
            <div className="bg-black cursor-pointer w-80 h-44 rounded-lg border border-zinc-800 hover:border-zinc-700">
              <div className="flex justify-center text-center h-full items-center flex-col text-zinc-500">
                <AddMediaVideo className="text-zinc-400 h-12 mb-1 w-12" />
                <h1 className="text-lg">Add a New Project</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
