type Environment = "local" | "dev"

const ENV: Environment = (import.meta.env.VITE_ENVIRONMENT as Environment) || "local"

// 게이트웨이 URL 상수
const GATEWAY_URL: Record<Environment, string> = {
  local: "http://localhost:8086",
  dev: "https://pyokemon.synology.me:8086",
}

// 각 서비스별 API URL은 게이트웨이 URL을 기반으로 구성
const EVENT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/event`,
  dev: `${GATEWAY_URL.dev}/event`,
}

const ACCOUNT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/account`,
  dev: `${GATEWAY_URL.dev}/account`,
}

const PAYMENT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/payment`,
  dev: `${GATEWAY_URL.dev}/payment`,
}

const TOSS_CLIENT_KEY: Record<Environment, string> = {
  local: "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq", // 테스트용 키 (실제 키로 대체 필요)
  dev: "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq", // 개발 환경용 키 (실제 키로 대체 필요)
}

export const getGatewayUrl = () => GATEWAY_URL[ENV]
export const getEventApiUrl = () => EVENT_API_URL[ENV]
export const getAccountApiUrl = () => ACCOUNT_API_URL[ENV]
export const getPaymentApiUrl = () => PAYMENT_API_URL[ENV]
export const getTossClientKey = () => TOSS_CLIENT_KEY[ENV]

export default {
  ENV,
  GATEWAY_URL,
  EVENT_API_URL,
  ACCOUNT_API_URL,
  PAYMENT_API_URL,
  TOSS_CLIENT_KEY,
  getGatewayUrl,
  getEventApiUrl,
  getAccountApiUrl,
  getPaymentApiUrl,
  getTossClientKey,
}
