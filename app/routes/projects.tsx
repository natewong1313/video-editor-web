import Navbar from "@/components/navbar"

export default function Projects() {
  return (
    <div className="h-full bg-black">
      <Navbar />
      <div className="flex flex-col px-10 py-4">
        <h1 className="text-white text-2xl font-medium">Welcome to video-editor 👋</h1>
        <div className="mt-2">
          <h2 className="text-gray-200">Your Videos</h2>
        </div>
      </div>
    </div>
  )
}
