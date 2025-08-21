import { PostEventBookingRequest, PostEventBookingResponse } from "../../../types/booking"
import { bookingClient, eventClient, setAuthorizationHeader } from "../../client"

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

export const postReidsBookiing = async (eventScheduleId: number, seatId: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const res = await eventClient.post(`/api/seats/${eventScheduleId}/${seatId}/hold`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
