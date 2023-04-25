import type { V2_MetaFunction } from "@remix-run/cloudflare"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Video Editor" }]
}

export default function Index() {
  return (
    <div className="h-full bg-zinc-900">
      <h1 className="text-white">Welcome to Video Editor</h1>
    </div>
  )
}
