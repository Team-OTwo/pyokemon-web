import { useMutation } from "@tanstack/react-query"

import { PostEventBookingRequest, PostEventBookingResponse } from "../../../types/booking"
import { postEventBooking } from "../fetchers/post-event-booking"

export const usePostEventBookingQuery = () => {
  return useMutation<PostEventBookingResponse, Error, PostEventBookingRequest>({
    mutationFn: (requestData: PostEventBookingRequest) => postEventBooking(requestData),
  })
}
