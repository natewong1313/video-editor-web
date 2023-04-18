import type { Database } from "@/lib/database.types"
import type { OutletSupabaseClient } from "@/lib/supabase.types"
import { useOutletContext } from "@remix-run/react"
import type { User } from "@supabase/auth-helpers-remix"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { Button as RAButton } from "react-aria-components"
type Props = {
  projects: Database["public"]["Tables"]["projects"]["Row"][]
  setIsCreateNewProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Projects({ projects, setIsCreateNewProjectModalOpen }: Props) {
  console.log(projects)
  // const [projects, setProjects] = useState<Database["public"]["Tables"]["project"]["Row"][]>([
  //   {
  //     id: 1,
  //     inserted_at: "test",
  //     name: "test",
  //     updated_at: "test",
  //     user_id: "test",
  //   },
  // ])
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
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-black cursor-pointer w-80 h-52 rounded-lg border border-zinc-800 data-[hovered]:border-zinc-700 data-[pressed]:border-sky-500 focus:outline-none"
        >
          <div className="flex justify-center text-center h-full items-center flex-col text-zinc-500">
            <h1 className="text-lg">{project.name}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
