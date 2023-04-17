import Navbar from "@/components/navbar"
import CreateProjectModal from "@/components/projects/create-project-modal"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { badRequest } from "@/utils/request.server"
import type { V2_MetaFunction } from "@remix-run/react"
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react"
import { createServerClient } from "@supabase/auth-helpers-remix"
import type { ActionArgs, LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import { Plus, PlusSquare } from "lucide-react"
import { useState } from "react"

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

export async function action({ request }: ActionArgs) {
  const response = new Response()

  const form = await request.formData()
  const projectName = form.get("projectName") as string
  if (projectName.length === 0) {
    return badRequest({ error: "Please enter a project name" }, response.headers)
  }
  return json({ success: true, error: null })
}

export default function Projects() {
  const user = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const [isCreateNewProjectModalOpen, setIsCreateNewProjectModalOpen] = useState(false)
  const navigation = useNavigation()
  const isLoading = navigation.state !== "idle" && navigation.location.pathname === "/projects"

  return (
    <>
      <div className="h-full bg-zinc-950/95">
        <Navbar email={user.email || ""} />
        <div className="flex flex-col px-24 py-8">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="text-white text-2xl">Your Projects</h1>
                <p className="text-md text-zinc-600 mt-1">View all of your projects below</p>
              </div>
              <div>
                <Button className="px-4 py-3 text-sm" onPress={() => setIsCreateNewProjectModalOpen(true)}>
                  <Plus className="mr-1 -ml-1 -mt-0.5" /> New Project
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col mt-4 gap-4 grid-cols-4">
            <div className="bg-black cursor-pointer w-80 h-44 rounded-lg border border-zinc-800 hover:border-zinc-700">
              <div className="flex justify-center text-center h-full items-center flex-col text-zinc-500">
                <PlusSquare className="text-zinc-400 h-12 mb-1 w-12" />
                <h1 className="text-lg">Add a New Project</h1>
              </div>
            </div>
          </div>
        </div>
        <CreateProjectModal isOpen={isCreateNewProjectModalOpen} setIsOpen={setIsCreateNewProjectModalOpen}>
          <Form method="post">
            <div className="mt-4">
              <TextField placeholder="Enter project name" name="projectName" className="text-center" />
            </div>
            <div className="mt-3">
              <Button disabled={isLoading} className="w-full h-10 py-6" type="submit">
                {isLoading ? "Submitting..." : "Create New"}
              </Button>
            </div>
            <div className="mt-2">
              <span className="text-red-500 text-sm">{actionData?.error}</span>
            </div>
          </Form>
        </CreateProjectModal>
      </div>
    </>
  )
}
