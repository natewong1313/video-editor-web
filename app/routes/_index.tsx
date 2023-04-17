import type { V2_MetaFunction } from "@remix-run/react"

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }]
}

export const config = { runtime: "edge" }

export default function Index() {
  return (
    <div>
      <h1 className="text-red-500 text-2xl font-semibold">Welcome to Remix</h1>
    </div>
  )
}
