import type { Media } from "@/lib/media.types"
import { MediaTypes } from "@/lib/media.types"
import type { FileObject } from "@supabase/storage-js"
// import getVideoDurationInSeconds from "get-video-duration"
// import { FFprobeWorker } from "ffprobe-wasm"
import path from "path"

const allowedTypes = [".jpg", ".jpeg", ".png", ".mp4", ".mp3"]
const mediaTypesObj = {
  [MediaTypes.IMAGE]: [".jpg", ".jpeg", ".png"],
  [MediaTypes.VIDEO]: [".mp4"],
  [MediaTypes.AUDIO]: [".mp3"],
}

export async function createMediaArray(files: FileObject[], mediaUrls: { [key: string]: string }, currentUrl: string) {
  const mediaArray: Media[] = []
  for (const file of files) {
    const type = getMediaType(file.name)
    const media: Media = {
      pathName: file.name,
      storageId: file.id,
      url: mediaUrls[file.name],
      type,
    }
    if (type === MediaTypes.VIDEO) {
      // try {
      //   console.log(currentUrl + "/api/get-media-duration")
      //   const res = await fetch(currentUrl + "/api/get-media-duration", {
      //     method: "post",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       url: media.url,
      //     }),
      //   })
      //   const { duration } = await res.json()
      //   media.duration = duration
      // } catch (error) {
      //   console.error("error: ", error)
      // }
      // console.log(await worker.getFileInfo(media.url))
      // const duration = await getVideoDurationInSeconds(media.url)
      // media.duration = duration
    }
    mediaArray.push(media)
  }
  return mediaArray
}

export function mediaValidator(file: File) {
  if (path.extname(file.name).toLowerCase() in allowedTypes) {
    return {
      valid: false,
      code: "file-invalid-type",
      message: `File must be one of the following types: ${allowedTypes.join(", ")}`,
    }
  }

  return { valid: true }
}

export function getMediaType(fileName: string) {
  const ext = path.extname(fileName).toLowerCase()
  if (mediaTypesObj[MediaTypes.IMAGE].includes(ext)) {
    return MediaTypes.IMAGE
  } else if (mediaTypesObj[MediaTypes.VIDEO].includes(ext)) {
    return MediaTypes.VIDEO
  } else if (mediaTypesObj[MediaTypes.AUDIO].includes(ext)) {
    return MediaTypes.AUDIO
  }
  throw new Error("Unknown media type")
}

export function getMediaUrl(fileName: string, media: Media[]) {
  for (const m of media) {
    if (m.pathName === fileName) {
      return m.url
    }
  }
  return null
}

export function getMedia(srcUrl: string, media: Media[]) {
  for (const m of media) {
    if (m.url === srcUrl) {
      return m
    }
  }
  return null
}
