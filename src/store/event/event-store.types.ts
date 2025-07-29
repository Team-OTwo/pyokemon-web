import { EventType } from "@/types/event"

export interface EventStore {
  event: EventType | null
  setEvent: (event: EventType) => void
}
