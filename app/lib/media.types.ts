export enum MediaTypes {
  IMAGE,
  VIDEO,
  AUDIO,
}

export type Media = {
  pathName: string
  storageId: string
  url: string
  type: MediaTypes
  duration?: number
}
