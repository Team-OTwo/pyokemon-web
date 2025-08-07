import { eventClient, setAuthorizationHeader } from "@/api/client"

export const fetchSavedEvent = async () => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }
  try {
    setAuthorizationHeader(accessToken)
    const res = await eventClient.get("/api/events/saved-events")

    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
  }
}
