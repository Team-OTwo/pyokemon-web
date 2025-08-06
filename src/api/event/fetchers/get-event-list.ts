import { eventClient } from "../../client"

export const fetchEventOpenToday = async () => {
  try {
    const res = await eventClient.get(`/api/events/open-today`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchEventToBeOpened = async () => {
  try {
    const res = await eventClient.get(`/api/events/to-be-opened`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchEventlist = async (genre: string, page: number = 1, size: number = 9) => {
  try {
    const res = await eventClient.get(`/api/events`, {
      params: { genre, page, size },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error("이벤트 리스트 fetch 실패:", error)
    throw error
  }
}

export const fetchEventSearchlist = async (
  keyword: string,
  page: number = 1,
  genre: string,
  size: number = 9
) => {
  try {
    const res = await eventClient.get(`/api/events/keyword`, {
      params: { keyword, page, genre, size },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error("검색 실패:", error)
    throw error
  }
}
