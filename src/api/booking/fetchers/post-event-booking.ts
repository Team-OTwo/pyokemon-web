import { PostEventBookingRequest, PostEventBookingResponse } from "../../../types/booking"
import { bookingClient, setAuthorizationHeader } from "../../client"

export const postEventBooking = async (
  requestData: PostEventBookingRequest
): Promise<PostEventBookingResponse> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const res = await bookingClient.post("/api/bookings/booking", requestData)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
