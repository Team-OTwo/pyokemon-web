import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteBookiing } from "../fetchers/delete-event-booking"

export const useDeleteEventBookingQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventScheduleId: number) => deleteBookiing(eventScheduleId),
    onSuccess: () => {
      // 예매 목록과 예매 상세 정보를 무효화하여 최신 데이터를 가져오도록 함
      queryClient.invalidateQueries({ queryKey: ["myBookings"] })
      queryClient.invalidateQueries({ queryKey: ["bookingDetail"] })
    },
  })
}
