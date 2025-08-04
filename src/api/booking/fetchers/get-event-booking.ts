import { eventClient } from "../../client"

export const getEventBooking = async (eventScheduleId: number) => {
  try {
    const response = await eventClient.get(`/api/events/booking/${eventScheduleId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}

export const getSeatClass = async (eventScheduleId: number, seatGrade: string) => {
  try {
    const response = await eventClient.get(`/api/events/booking/${eventScheduleId}/${seatGrade}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch seats data:", error)
    throw error
  }
}
