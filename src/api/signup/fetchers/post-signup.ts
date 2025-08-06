import { SignUpRequest, SignUpResponse } from "../../../types/mypage"
import { accountClient } from "../../client"

export const postSignUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await accountClient.post("/api/users", data)
  return response.data
}
