import baseClient from "../../client/base-client"

export const fetchEventOpenToday = async () => {
  try {
    const res = await baseClient.get(`http://localhost:8081/event/api/events/open-today`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchEventToBeOpened = async () => {
  try {
    const res = await baseClient.get(`http://localhost:8081/event/api/events/to-be-opened`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchEventlist = async (genre: string, page: number = 1, size: number = 8) => {
  try {
    const res = await baseClient.get(`http://localhost:8081/event/api/events`, {
      params: { genre, page, size },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error("이벤트 리스트 fetch 실패:", error)
    throw error
  }
}
