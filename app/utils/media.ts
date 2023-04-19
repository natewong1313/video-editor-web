import { MediaTypes } from "@/lib/media.types"
import type { FileObject } from "@supabase/storage-js"
import path from "path"

const allowedTypes = [".jpg", ".jpeg", ".png", ".mp4", ".mp3"]
const mediaTypesObj = {
  [MediaTypes.IMAGE]: [".jpg", ".jpeg", ".png"],
  [MediaTypes.VIDEO]: [".mp4"],
  [MediaTypes.AUDIO]: [".mp3"],
}

export function createMediaArray(files: FileObject[], mediaUrls: { [key: string]: string }) {
  return files.map((file) => {
    const type = getMediaType(file.name)
    return {
      pathName: file.name,
      storageId: file.id,
      url: mediaUrls[file.name],
      type,
    }
  })
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

// export function buildFileUrl(fileName: string) {

// }
