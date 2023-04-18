import type { Database } from "@/lib/database.types"
import { useNavigate } from "@remix-run/react"
import { PlusSquare } from "lucide-react"
import { Button as RAButton } from "react-aria-components"

type Props = {
  projects: Database["public"]["Tables"]["projects"]["Row"][]
  setIsCreateNewProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Projects({ projects, setIsCreateNewProjectModalOpen }: Props) {
  const navigate = useNavigate()
  return (
    <div className="flex mt-4 gap-4 flex-wrap">
      <RAButton
        onPress={() => setIsCreateNewProjectModalOpen(true)}
        className="bg-black cursor-pointer w-80 h-52 rounded-lg border border-zinc-800 data-[hovered]:border-zinc-700 data-[pressed]:border-sky-500 focus:outline-none"
      >
        <div className="flex justify-center text-center h-full items-center flex-col text-zinc-500">
          <PlusSquare className="text-zinc-400 h-12 mb-1 w-12" />
          <h1 className="text-lg">Add a New Project</h1>
        </div>
      </RAButton>
      {projects?.map((project) => (
        <RAButton
          onPress={() => navigate(`/projects/${project.id}`)}
          key={project.id}
          className="bg-black cursor-pointer w-80 h-52 rounded-lg border border-zinc-800 data-[hovered]:border-zinc-700 data-[pressed]:border-sky-500 focus:outline-none"
        >
          <div className="flex justify-start h-full p-4">
            <div className="mt-auto text-left">
              <h1 className="text-lg text-zinc-200">{project.name}</h1>
              <p className="text-sm text-zinc-500">
                Last updated at:
                {project.updated_at ? new Date(project.updated_at).toLocaleString() : "Never"}
              </p>
            </div>
          </div>
        </RAButton>
      ))}
    </div>
  )
}
