import {
  getAccountApiUrl,
  getBffApiUrl,
  getBookingApiUrl,
  getEventApiUrl,
  getNotificationApiUrl,
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

  let isRefreshing = false
  let refreshSubscribers: ((token: string) => void)[] = []

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb)
  }

  const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token))
    refreshSubscribers = []
  }

  client.interceptors.response.use(
    (config) => {
      return config
    },
    async (error) => {
      console.log(error)
      const originalRequest = error.config
      const status = error.response.status

      if (status == 401 && !originalRequest._retry) {
        originalRequest._retry = true

        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(axios(originalRequest))
            })
          })
        }

        isRefreshing = true

        try {
          const refreshToken = localStorage.getItem("refreshToken")
          const res = await axios.post(
            `${getAccountApiUrl()}/api/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
          console.log(res)
          const newAccessToken = res.data.data.accessToken
          localStorage.setItem("accessToken", newAccessToken)

          onRefreshed(newAccessToken)
          isRefreshing = false

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(originalRequest)
        } catch (error) {
          isRefreshing = false
          localStorage.clear()

          // TODO: login 페이지로 이동
          window.location.href = "/user/login"

          return Promise.reject(error)
        }
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
export const notificationClient = createClient(getNotificationApiUrl())

// 기존 baseClient 호환성 유지 (이벤트 클라이언트로 매핑)
const baseClient = eventClient

// 공통 헤더 설정 함수
export const setAuthorizationHeader = (token: string) => {
  eventClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  accountClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  paymentClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  bookingClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  bffClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  notificationClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const removeAuthorizationHeader = () => {
  delete eventClient.defaults.headers.common["Authorization"]
  delete accountClient.defaults.headers.common["Authorization"]
  delete paymentClient.defaults.headers.common["Authorization"]
  delete bookingClient.defaults.headers.common["Authorization"]
  delete bffClient.defaults.headers.common["Authorization"]
  delete notificationClient.defaults.headers.common["Authorization"]
}

export default baseClient
