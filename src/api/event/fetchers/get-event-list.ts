import baseClient from "../../client/base-client"

export const fetchEventOpenToday = async () => {
  try {
    const res = await baseClient.get(`http://localhost:8080/api/events/open-today`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
