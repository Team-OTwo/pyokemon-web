import React, { useRef, useState } from "react"
import { usePostPaymentConfirmMutation } from "@/api/payment/queries/get-payments-query"
import { useSearchParams } from "react-router"

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null)
  const hasConfirmedRef = useRef(false)
  const { mutateAsync } = usePostPaymentConfirmMutation()
  const paymentKey = searchParams.get("paymentKey") ?? ""
  const orderId = searchParams.get("orderId") ?? ""
  const amount = Number(searchParams.get("amount") ?? "0")

  if (!hasConfirmedRef.current) {
    hasConfirmedRef.current = true

    if (!paymentKey || !orderId || isNaN(amount) || amount <= 0) {
      setIsConfirmed(false)
    } else {
      mutateAsync({ paymentKey, orderId, amount })
        .then((res) => {
          setIsConfirmed(true)
        })
        .catch((err) => {
          setIsConfirmed(false)
        })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      {isConfirmed === null && <p className="text-gray-600 text-lg">⏳ 결제 승인 중입니다...</p>}
      {isConfirmed === true && (
        <>
          <h2 className="text-2xl text-green-500 font-bold mb-2">✅ 결제가 완료되었습니다!</h2>
          <p className="text-gray-800">예매 내역은 마이페이지에서 확인하실 수 있습니다.</p>
        </>
      )}
      {isConfirmed === false && (
        <>
          <h2 className="text-2xl text-red-500 font-bold mb-2">❌ 결제 승인 실패</h2>
          <p className="text-gray-700">문제가 계속되면 고객센터로 문의해주세요.</p>
        </>
      )}
    </div>
  )
}

export default PaymentSuccessPage
