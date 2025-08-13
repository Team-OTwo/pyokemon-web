export interface LoginRequest {
  loginId: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
    userName: string
    role: string
    accountId: number
    isVerified: boolean
  }
  errorCode: string | null
}

export interface SignUpRequest {
  loginId: string
  password: string
  passwordCheck: string
  name: string
  phone: string
  birth: string
}

export interface SignUpResponse {
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

export interface VerifyResponse {
  success: boolean
  message: string
  data: {
    userId: number
    accountId: number | null
    loginId: string | null
    name: string
    phone: string
    birth: string
    isVerified: boolean
    createdAt: string | null
    updatedAt: string | null
  }
  errorCode: string | null
}
