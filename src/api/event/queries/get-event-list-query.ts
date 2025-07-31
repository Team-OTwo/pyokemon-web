// hooks/useGetEventOpenTodayQuery.ts
import { useQuery } from "@tanstack/react-query"

import { EventType } from "@/types/event"

import {
  fetchEventlist,
  fetchEventOpenToday,
  fetchEventToBeOpened,
} from "../fetchers/get-event-list"

export const useGetEventOpenTodayQuery = () => {
  return useQuery<EventType[]>({
    queryKey: ["eventOpenToday"],
    queryFn: () => fetchEventOpenToday(),
  })
}

export const useGetEventToBeOpenedQuery = () => {
  return useQuery<EventType[]>({
    queryKey: ["eventToBeOpened"],
    queryFn: () => fetchEventToBeOpened(),
  })
}

export const useGetEventListQuery = (genre: string, page: number = 1) => {
  return useQuery<EventType[]>({
    queryKey: ["eventList", genre, page],
    queryFn: () => fetchEventlist(genre, page),
  })
}
