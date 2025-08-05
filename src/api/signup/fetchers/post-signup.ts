import { accountClient } from "../../client"

interface SignUpRequest {
  loginId: string
  password: string
  passwordCheck: string
  name: string
  phone: string
  birth: string
}

interface SignUpResponse {
  success: boolean
  message: string
  data: {
    userId: string | null
    accountId: string | null
    loginId: string
    name: string
    phone: string
    birth: string
    isVerified: boolean | null
    createdAt: string | null
    updatedAt: string | null
  }
  errorCode: string | null
}

export const postSignUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await accountClient.post("/api/users", data)
  return response.data
}
