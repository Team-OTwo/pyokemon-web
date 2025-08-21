import { bookingClient, setAuthorizationHeader } from "@/api/client"

export const deleteBookiing = async (eventScheduleId: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const response = await bookingClient.delete(`/api/bookings/booking/${eventScheduleId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}
