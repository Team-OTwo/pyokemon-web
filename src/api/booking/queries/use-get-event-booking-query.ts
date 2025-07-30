import { useQuery } from "@tanstack/react-query"

import { getEventBooking, getSeatClass } from "../fetchers/get-event-booking"

export const useGetEventBookingQuery = (eventScheduleId: number) => {
  return useQuery({
    queryKey: ["eventBooking", eventScheduleId],
    queryFn: () => getEventBooking(eventScheduleId),
  })
}

export const useGetSeatClassQuery = (eventScheduleId: number, seatGrade: string) => {
  return useQuery({
    queryKey: ["seatClass", eventScheduleId, seatGrade],
    queryFn: () => getSeatClass(eventScheduleId, seatGrade),
  })
}
