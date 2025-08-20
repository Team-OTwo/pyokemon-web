import { useQuery } from "@tanstack/react-query"

import { fetchMyBooking } from "../fetchers/get-my-bookings"

export const useGetMyBookingsQuery = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: () => fetchMyBooking(),
  })
}
