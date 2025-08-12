import { eventClient, setAuthorizationHeader } from "@/api/client"

export const postSavedEvent = async (eventId: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }
  try {
    setAuthorizationHeader(accessToken)
    const res = await eventClient.post(`/api/events/save/${eventId}`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
