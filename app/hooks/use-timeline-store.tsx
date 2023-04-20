import { create } from 'zustand'

export type State = {
  currentClipPath: string
}
export type Action = {
  updateCurrentClipPath: (clipId: string) => void
}

export const useTimelineStore = create<State & Action>((set) => ({
  currentClipPath: "",
  updateCurrentClipPath: (clipPath: string) => set(() => ({ currentClipPath: clipPath }))
}))
