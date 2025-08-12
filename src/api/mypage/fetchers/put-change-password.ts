import { PasswordChangeRequest, PasswordChangeResponse } from "../../../types/mypage"
import { accountClient } from "../../client"

export const putChangePassword = async (
  request: PasswordChangeRequest
): Promise<PasswordChangeResponse> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  const response = await accountClient.put<PasswordChangeResponse>("/api/password", request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}
