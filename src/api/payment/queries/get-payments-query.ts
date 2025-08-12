// hooks/useGetEventOpenTodayQuery.ts
import { useMutation } from "@tanstack/react-query"

import { PaymentsConfirmType } from "@/types/payments"

import { fetchPaymentsConfirm, fetchPaymentsInitiate } from "../fetchers/get-payment"

export const usePostPaymentInitiateMutation = () => {
  return useMutation({
    mutationFn: (payment: PaymentsConfirmType) => fetchPaymentsInitiate(payment),
  })
}

export const usePostPaymentConfirmMutation = () => {
  return useMutation({
    mutationFn: (payment: PaymentsConfirmType) => fetchPaymentsConfirm(payment),
  })
}
