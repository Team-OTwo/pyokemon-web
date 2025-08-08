import { useQuery } from "@tanstack/react-query"

import { fetchSavedEvent } from "../fetchers/get-saved-event"

export const useGetSavedEventQuery = () => {
  return useQuery({
    queryKey: ["savedEvent"],
    queryFn: () => fetchSavedEvent(),
  })
}
