import { json } from "@vercel/remix"

export const badRequest = <T>(data: T, headers: Headers) => {
  return json(data, { status: 400, headers })
}

export const unauthorizedRequest = <T>(data: T, headers: Headers) => {
  return json(data, { status: 401, headers })
}
