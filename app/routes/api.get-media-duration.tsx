import type { ActionArgs } from "@vercel/remix"
import { json } from "@vercel/remix"
import { getVideoDurationInSeconds } from "get-video-duration"

// export const config = { runtime: "edge" }
export const action = async ({ request }: ActionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405)
  }
  const { url } = await request.json()
  const duration = await getVideoDurationInSeconds(url)
  console.log(duration)
  return json({ duration })
}
