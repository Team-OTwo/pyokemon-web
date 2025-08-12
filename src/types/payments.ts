export interface PaymentsConfirmType {
  paymentKey?: string
  orderId: string
  method?: string
  amount?: number
  bookingId?: number
  accountId?: number
}
