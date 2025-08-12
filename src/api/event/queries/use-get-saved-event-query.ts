import { useQuery } from "@tanstack/react-query"

import { fetchSavedEvent } from "../fetchers/get-saved-event"

export const useGetSavedEventQuery = (page: number = 1, size: number = 9) => {
  return useQuery({
    queryKey: ["savedEvent", page],
    queryFn: () => fetchSavedEvent(page, size),
  })
}
