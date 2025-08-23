import { useQuery } from "@tanstack/react-query"

import { fetchMyBooking } from "../fetchers/get-my-bookings"

export const useGetMyBookingsQuery = (page?: number, size?: number) => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: () => fetchMyBooking(page, size),
  })
}
