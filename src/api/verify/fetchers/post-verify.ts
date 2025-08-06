import { VerifyResponse } from "../../../types/login"
import { accountClient } from "../../client"

export const postVerify = async (): Promise<VerifyResponse> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await accountClient.post(
    "/api/users/verify",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response.data
}
