import { eventClient } from "@/api/client"

export const postSavedEvent = async (eventId: number) => {
  try {
    // 테스트용 헤더 설정
    eventClient.defaults.headers.common["X-Auth-AccountId"] = "1"
    const res = await eventClient.post(`/api/events/save/${eventId}`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
