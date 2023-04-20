import type { ActionArgs } from "@vercel/remix"
import { json } from "@vercel/remix"
// import { getVideoDurationInSeconds } from "get-video-duration"
// import path from "path"
// import VideoLib from "node-video-lib"

// export const config = { runtime: "edge" }
export const action = async ({ request }: ActionArgs) => {
  // if (request.method !== "POST") {
  //   return json({ message: "Method not allowed" }, 405)
  // }
  // const { url } = await request.json()
  // const duration = await getVideoDurationInSeconds(url, path.join(__dirname, "..", "bin", "ffprobe"))
  // console.log(duration)
  // return json({ duration })
  const { url } = await request.json()
  return json({ duration: 5 })
}
