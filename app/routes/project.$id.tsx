import { Timeline } from "@xzdarcy/react-timeline-editor"

export default function Project() {
  return (
    <div className="h-full bg-black">
      <div className="flex flex-col p-6">
        <h1 className="text-white">Project</h1>
        <Timeline editorData={[]} effects={{}} />
      </div>
    </div>
  )
}
