import path from "path"
const allowedTypes = [".jpg", ".jpeg", ".png", ".mp4"]

export default function mediaValidator(file: File) {
  if (path.extname(file.name).toLowerCase() in allowedTypes) {
    return {
      valid: false,
      code: "file-invalid-type",
      message: `File must be one of the following types: ${allowedTypes.join(", ")}`,
    }
  }

  return { valid: true }
}
