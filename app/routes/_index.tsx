import Navbar from "@/components/navbar"
import Projects from "@/components/projects"
import CreateProjectModal from "@/components/projects/create-project-modal"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import type { Projects as DBProjects } from "@/lib/supabase.types"
import { badRequest } from "@/utils/request.server"
import { getAuthenticatedUser } from "@/utils/supabase"
import type { V2_MetaFunction } from "@remix-run/react"
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react"
import type { ActionArgs, LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import { Plus } from "lucide-react"
import { useState } from "react"

// export const config = { runtime: "edge" }
export const meta: V2_MetaFunction = () => {
  return [{ title: "video-editor" }]
}

export async function loader({ request }: LoaderArgs) {
  const response = new Response()

  const { user, supabaseClient } = await getAuthenticatedUser(request, response)
  if (!user) {
    return redirect("/auth/signin", {
      headers: response.headers,
    })
  }
  const { data } = await supabaseClient.from("projects").select().order("updated_at", { ascending: false })

  return json(
    { user, projects: data as DBProjects[] },
    {
      headers: response.headers,
    },
  )
}

export async function action({ request }: ActionArgs) {
  const response = new Response()

  const form = await request.formData()
  const projectName = form.get("projectName") as string
  if (projectName.length === 0) {
    return badRequest({ error: "Please enter a project name" }, response.headers)
  }
  const { user, supabaseClient } = await getAuthenticatedUser(request, response)
  if (!user) {
    return redirect("/auth/signin", {
      headers: response.headers,
    })
  }
  const { data, error } = await supabaseClient
    .from("projects")
    .insert([{ name: projectName, user_id: user.id }])
    .select("id")
    .single()
  if (error) {
    let errorMsg = error.message
    if (errorMsg === 'duplicate key value violates unique constraint "projects_name_key"') {
      errorMsg = "A project with this name already exists"
    }
    return badRequest({ error: errorMsg }, response.headers)
  }
  console.log(data)
  return redirect(`/projects/${data.id}`, {
    headers: response.headers,
  })
  // return json({ success: true, error: null })
}

export default function Index() {
  const { user, projects } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const [isCreateNewProjectModalOpen, setIsCreateNewProjectModalOpen] = useState(false)
  const navigation = useNavigation()
  const isLoading = navigation.state !== "idle" && navigation.location.pathname === "/"

  return (
    <div className="h-full bg-zinc-950/95">
      <Navbar email={user.email || ""} />
      <div className="flex flex-col px-16 lg:px-24 py-8">
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
        <Projects setIsCreateNewProjectModalOpen={setIsCreateNewProjectModalOpen} projects={projects} />
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
  )
}
