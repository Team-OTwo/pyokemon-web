import baseClient from "@/api/client/base-client"

import { Booking_sidebar } from "@/types/booking"

export const getEventBooking = async (eventScheduleId: number): Promise<Booking_sidebar> => {
  const response = await baseClient.get(
    `http://localhost:8080/api/events/booking/${eventScheduleId}`
  )
  return response.data
}

// export const getSeat_class = async (
//   eventScheduleId: bigint,
//   seatGrade: string
// ): Promise<Seat_class[]> => {
//   const response = await baseClient.get(
//     `http://localhost:8080/api/events/booking/${eventScheduleId}/${seatGrade}`
//   );
//   return response.data;
// };
