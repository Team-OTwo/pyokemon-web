import { useQuery } from "@tanstack/react-query"

import { getEventBooking } from "../fetchers/get-event-booking"

export const useGetEventBookingQuery = (eventScheduleId: number) => {
  return useQuery({
    queryKey: ["eventBooking", eventScheduleId],
    queryFn: () => getEventBooking(eventScheduleId),
  })
}
