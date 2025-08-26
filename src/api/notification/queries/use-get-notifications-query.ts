import { useInfiniteQuery } from "@tanstack/react-query"

import { fetchNotifications } from "../fetchers/get-notifications"

export const useGetNotificationsQuery = (cursorId?: number) => {
  return useInfiniteQuery({
    queryKey: ["notifications", cursorId],
    queryFn: async ({ pageParam }) => {
      return fetchNotifications(pageParam?.cursorId)
    },
    getNextPageParam: (lastPage) =>
      lastPage.lastCursorId
        ? {
            cursorId: lastPage.lastCursorId,
          }
        : undefined,
    initialPageParam: { cursorId: undefined },
  })
}
