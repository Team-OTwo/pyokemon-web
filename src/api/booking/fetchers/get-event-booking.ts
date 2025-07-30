import baseClient from "../../client/base-client"

export const getEventBooking = async (eventScheduleId: number) => {
  try {
    const response = await baseClient.get(
      `http://localhost:8080/api/events/booking/${eventScheduleId}`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}

export const getSeat_class = async (eventScheduleId: number, seatGrade: string) => {
  try {
    const response = await baseClient.get(
      `http://localhost:8080/api/events/booking/${eventScheduleId}/${seatGrade}`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch seats data:", error)
    throw error
  }
}
