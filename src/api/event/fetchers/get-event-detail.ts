import { eventClient, setAuthorizationHeader } from "../../client"

export const fetchEventDetail = async (eventId: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }
  try {
    setAuthorizationHeader(accessToken)
    const res = await eventClient.get(`/api/events/${eventId}`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
