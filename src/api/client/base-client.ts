import {
  getAccountApiUrl,
  getBffApiUrl,
  getBookingApiUrl,
  getEventApiUrl,
  getPaymentApiUrl,
} from "@/constants/env"
import axios, { AxiosError, AxiosInstance } from "axios"

// 클라이언트 생성 함수
const createClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({ baseURL })

  client.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {}
  )

  client.interceptors.response.use(
    (config) => {
      return config
    },
    (error) => {
      if (error instanceof AxiosError) {
        console.error(error)
      }

      return Promise.reject(error)
    }
  )

  return client
}

// 서비스별 클라이언트 인스턴스 생성
export const eventClient = createClient(getEventApiUrl())
export const accountClient = createClient(getAccountApiUrl())
export const paymentClient = createClient(getPaymentApiUrl())
export const bookingClient = createClient(getBookingApiUrl())
export const bffClient = createClient(getBffApiUrl())

// 기존 baseClient 호환성 유지 (이벤트 클라이언트로 매핑)
const baseClient = eventClient

// 공통 헤더 설정 함수
export const setAuthorizationHeader = (token: string) => {
  eventClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  accountClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  paymentClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  bookingClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  bffClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const removeAuthorizationHeader = () => {
  delete eventClient.defaults.headers.common["Authorization"]
  delete accountClient.defaults.headers.common["Authorization"]
  delete paymentClient.defaults.headers.common["Authorization"]
  delete bookingClient.defaults.headers.common["Authorization"]
  delete bffClient.defaults.headers.common["Authorization"]
}

export default baseClient
