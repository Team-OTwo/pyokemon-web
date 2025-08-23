import { accountClient } from "../../client"

export const getDuplicateId = async (loginId: string) => {
  const response = await accountClient.get(`/api/users/check-duplicate?loginId=${loginId}`)
  return response.data
}
