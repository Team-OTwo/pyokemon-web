import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Booking_sidebar, Seat_class } from "../../../types/booking"
import { getEventBooking, getSeat_class } from "../fetchers/get-event-booking"

export const useGetEventBookingQuery = (
  eventScheduleId: bigint
): UseQueryResult<Booking_sidebar> => {
  return useQuery({
    queryKey: ["eventBooking", eventScheduleId],
    queryFn: () => getEventBooking(eventScheduleId),
    enabled: Boolean(eventScheduleId),
  })
}
export const useGetSeatClassQuery = (
  eventScheduleId: bigint,
  seatGrade: string
): UseQueryResult<Seat_class[]> => {
  return useQuery({
    queryKey: ["seatClass", eventScheduleId.toString(), seatGrade],
    queryFn: () => getSeat_class(eventScheduleId, seatGrade),
    enabled: Boolean(eventScheduleId && seatGrade),
  })
}
