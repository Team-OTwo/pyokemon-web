import { EventBookingResponse, SelectedSeat } from "../../../types/booking"
import { eventClient, setAuthorizationHeader } from "../../client"

export const getEventBooking = async (eventScheduleId: number): Promise<EventBookingResponse[]> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const response = await eventClient.get(`/api/events/booking-info/${eventScheduleId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}

export const getEventSeatGrade = async (
  eventScheduleId: number,
  seatGrade: string
): Promise<SelectedSeat[]> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const response = await eventClient.get(
      `/api/events/booking-info/${eventScheduleId}/${seatGrade}`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch seat grade data:", error)
    throw error
  }
}
