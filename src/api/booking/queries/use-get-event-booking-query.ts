import { useQuery } from "@tanstack/react-query"

import { getEventBooking, getEventSeatGrade } from "../fetchers/get-event-booking"

export const useGetEventBookingQuery = (eventScheduleId: number) => {
  return useQuery({
    queryKey: ["eventBooking", eventScheduleId],
    queryFn: () => getEventBooking(eventScheduleId),
  })
}

export const useGetEventSeatGradeQuery = (eventScheduleId: number, seatGrade: string) => {
  return useQuery({
    queryKey: ["eventSeatGrade", eventScheduleId, seatGrade],
    queryFn: () => getEventSeatGrade(eventScheduleId, seatGrade),
    enabled: !!seatGrade,
  })
}
