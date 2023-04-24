import type { V2_MetaFunction } from "@remix-run/cloudflare"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Video Editor" }]
}

export default function Index() {
  return (
    <div className="underline">
      <h1>Welcome to Video Editor</h1>
    </div>
  )
}
