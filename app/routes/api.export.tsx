import type { ActionArgs } from "@vercel/remix"
import { json } from "@vercel/remix"
// import { getVideoDurationInSeconds } from "get-video-duration"
import path from "path"
// import VideoLib from "node-video-lib"

// export const config = { runtime: "edge" }
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export const action = async ({ request }: ActionArgs) => {
  // const { url } = await request.json()
  console.log("OK")
  // console.log(path.resolve(process.cwd(), "app", "static", "js", "ffmpeg-core.js"))
  // const ffmpeg = createFFmpeg({
  //   log: true,
  //   corePath: "https://ffmpeg-online.vercel.app/static/v0.11.0/ffmpeg-core.js"
  // });

  // try {
  //   await ffmpeg.load()
  // } catch (error) {
  //   console.log(error)
  // }
  return json({ success: true })
}
