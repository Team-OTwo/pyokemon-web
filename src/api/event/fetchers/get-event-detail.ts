import { eventClient } from "../../client"

export const fetchEventDetail = async (eventId: number) => {
  try {
    const res = await eventClient.get(`/api/events/${eventId}`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
