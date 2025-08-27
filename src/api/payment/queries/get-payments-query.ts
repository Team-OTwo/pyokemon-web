// hooks/useGetEventOpenTodayQuery.ts
import { useMutation } from "@tanstack/react-query"

import { PaymentsConfirmType } from "@/types/payments"

import { fetchPaymentsConfirm, fetchPaymentsInitiate } from "../fetchers/get-payment"

type PaymentInitiateParams = {
  payment: PaymentsConfirmType
  eventScheduleId: number
}

export const usePostPaymentInitiateMutation = () => {
  return useMutation({
    mutationFn: ({ payment, eventScheduleId }: PaymentInitiateParams) =>
      fetchPaymentsInitiate(payment, eventScheduleId),
  })
}

export const usePostPaymentConfirmMutation = () => {
  return useMutation({
    mutationFn: (payment: PaymentsConfirmType) => fetchPaymentsConfirm(payment),
  })
}
