import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Booking_sidebar } from "@/types/booking"

import { getEventBooking } from "../fetchers/get-event-booking"

export const useGetEventBookingQuery = (
  eventScheduleId: number
): UseQueryResult<Booking_sidebar> => {
  return useQuery({
    queryKey: ["eventBooking", eventScheduleId],
    queryFn: () => getEventBooking(eventScheduleId),
    enabled: Boolean(eventScheduleId),
  })
}
