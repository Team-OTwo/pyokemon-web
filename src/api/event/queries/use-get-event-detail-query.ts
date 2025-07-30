import { useQuery } from "@tanstack/react-query"

import { EventType } from "@/types/event"

import { fetchEventDetail } from "../fetchers/get-event-detail"

export const useGetEventDetailQuery = (eventId: number) => {
  return useQuery<EventType>({
    queryKey: ["eventDetail", eventId],
    queryFn: () => fetchEventDetail(eventId),
  })
}
