import { create } from 'zustand'
export type Durations = {
  [key: string]: number
}
export type State = {
  durations: Durations
}
export type Action = {
  updateDuration: (pathName: string, duration: number) => void
}

export const useDurationsStore = create<State & Action>((set) => ({
  durations: {},
  updateDuration: (pathName: string, duration: number) => set((state) => ({ durations: { ...state.durations, [pathName]: duration } })),
}))
