import { DeleteAccountResponse } from "../../../types/mypage"
import { accountClient } from "../../client"

export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  const response = await accountClient.delete<DeleteAccountResponse>("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}
