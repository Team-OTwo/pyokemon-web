import { notificationClient, setAuthorizationHeader } from "@/api/client/base-client"

export const fetchNotifications = async (cursorId?: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const res = await notificationClient.get("/api/notifications", {
      params: { cursorId },
    })
    console.log(res.data)
    return res.data.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}
