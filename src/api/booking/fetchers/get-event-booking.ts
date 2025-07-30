import baseClient from "@/api/client/base-client"

import { Booking_sidebar } from "../../../types/booking"

export const getEventBooking = async (eventScheduleId: bigint): Promise<Booking_sidebar> => {
  const response = await baseClient.get(
    `http://localhost:8080/api/events/booking/${eventScheduleId}`
  )
  return response.data
}
