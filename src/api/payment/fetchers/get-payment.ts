import { PaymentsConfirmType } from "@/types/payments"

import { paymentClient } from "../../client"

export const fetchPaymentsInitiate = async (payment: PaymentsConfirmType) => {
  try {
    const res = await paymentClient.post("/api/payments/initiate", payment)
    return res.data
  } catch (err) {
    throw new Error("임시 저장 실패")
  }
}

export const fetchPaymentsConfirm = async (payment: PaymentsConfirmType) => {
  console.log("요청보내기", payment)
  try {
    const res = await paymentClient.post("/api/payments/confirm-save", payment)
    console.log("axios응답", res)
    return res.data
  } catch (err) {
    console.log("axios 에러", err)
    throw new Error("결제 승인 실패")
  }
}
