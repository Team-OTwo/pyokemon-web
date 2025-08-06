export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
}

export interface PasswordChangeResponse {
  success: boolean
  message: string
  data: null
  errorCode: string | null
}
