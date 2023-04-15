import type { V2_MetaFunction } from "@remix-run/react"

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }]
}

export const config = { runtime: "edge" }

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
    </div>
  )
}
