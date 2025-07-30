// hooks/useGetEventOpenTodayQuery.ts
import { useQuery } from "@tanstack/react-query"

import { EventType } from "@/types/event"

import { fetchEventOpenToday } from "../fetchers/get-event-list"

export const useGetEventOpenTodayQuery = () => {
  return useQuery<EventType[]>({
    queryKey: ["eventOpenToday"],
    queryFn: () => fetchEventOpenToday(),
  })
}
