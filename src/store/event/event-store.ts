import { create } from "zustand"

import { EventStore } from "./event-store.types"

export const useEventStore = create<EventStore>((set) => ({
  event: null,
  setEvent: (event) => set({ event: event }),
}))
