import { bffClient, setAuthorizationHeader } from "@/api/client/base-client"

export const fetchBookingDetail = async (bookingId: number) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  try {
    setAuthorizationHeader(accessToken)
    const res = await bffClient.get(`/api/mypage/bookings/detail`, {
      params: {
        bookingId: bookingId,
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error("Failed to fetch booking data:", error)
    throw error
  }
}
