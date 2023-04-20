import { create } from 'zustand'

export type State = {
  currentClipPath: string
  currentClipId: string
}
export type Action = {
  updateCurrentClip: (clipPath: string, clipId: string) => void
}

export const useTimelineStore = create<State & Action>((set) => ({
  currentClipPath: "",
  currentClipId: "",
  updateCurrentClip: (clipPath: string, clipId: string) => set(() => ({ currentClipPath: clipPath, currentClipId: clipId }))
}))
