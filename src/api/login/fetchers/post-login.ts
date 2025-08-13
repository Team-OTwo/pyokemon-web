import { LoginRequest, LoginResponse } from "../../../types/login"
import { accountClient, setAuthorizationHeader } from "../../client"

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await accountClient.post("/api/login", data)
  return response.data
}

export const postLogout = async () => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }
  try {
    setAuthorizationHeader(accessToken)
    const res = await accountClient.post(`/api/logout`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
