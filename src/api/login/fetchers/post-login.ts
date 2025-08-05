import { accountClient } from "../../client"

interface LoginRequest {
  loginId: string
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
    role: string
    accountId: number
  }
  errorCode: string | null
}

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await accountClient.post("/api/login", data)
  return response.data
}
