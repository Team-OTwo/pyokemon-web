import { notificationClient, setAuthorizationHeader } from "@/api/client/base-client"

export const putReadNotification = async (notificationId?: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const res = await notificationClient.put(`/api/notifications/${notificationId}`)
    console.log(res.data)
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}
