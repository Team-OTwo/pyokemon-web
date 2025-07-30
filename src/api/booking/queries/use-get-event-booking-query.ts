import { useQuery } from "@tanstack/react-query"

import { getEventBooking, getSeat_class } from "../fetchers/get-event-booking"

export const useGetEventBookingQuery = (eventScheduleId: number) => {
  return useQuery({
    queryKey: ["eventBooking", eventScheduleId],
    queryFn: () => getEventBooking(eventScheduleId),
  })
}

export const useGetSeatClassQuery = (eventScheduleId: number, seatGrade: string) => {
  return useQuery({
    queryKey: ["seatClass", eventScheduleId.toString(), seatGrade],
    queryFn: () => getSeat_class(eventScheduleId, seatGrade),
  })
}
