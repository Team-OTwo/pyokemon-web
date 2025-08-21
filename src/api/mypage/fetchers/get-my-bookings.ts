import { bffClient, setAuthorizationHeader } from "@/api/client/base-client"

export const fetchMyBooking = async (page: number = 0, size: number = 10) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const res = await bffClient.get(`/api/mypage/bookings`, {
      params: { page, size },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}
