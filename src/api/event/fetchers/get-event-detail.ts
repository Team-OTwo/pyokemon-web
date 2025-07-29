import baseClient from "../../client/base-client"

export const fetchEventDetail = async (eventId: number) => {
  try {
    const res = await baseClient.get(`http://localhost:8080/api/events/${eventId}`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
