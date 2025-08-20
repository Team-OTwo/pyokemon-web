import { useQuery } from "@tanstack/react-query"

import { fetchBookingDetail } from "../fetchers/get-booking-detail"

export const useGetBookingDetailQuery = (bookingId: number) => {
  return useQuery({
    queryKey: ["bookingDetail", bookingId],
    queryFn: () => fetchBookingDetail(bookingId),
  })
}
