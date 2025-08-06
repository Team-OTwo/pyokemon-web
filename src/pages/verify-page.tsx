import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

import { postVerify } from "../api/verify/fetchers/post-verify"
import Button from "../components/ui/button"

const VerifyPage = () => {
  const navigate = useNavigate()

  const verifyMutation = useMutation({
    mutationFn: postVerify,
    onSuccess: async (response) => {
      if (response.success) {
        console.log("본인인증 성공:", response.data)

        await Swal.fire({
          title: "본인인증 완료",
          html: "본인인증이 성공적으로 완료되었습니다.<br>메인 페이지로 이동합니다!",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "var(--color-success)",
        }).then(() => {
          navigate("/")
        })
      }
    },
    onError: async (error) => {
      console.error("본인인증 실패:", error)

      await Swal.fire({
        title: "본인인증 실패",
        text: "본인인증에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--color-error)",
      })
    },
  })

  const handleVerify = () => {
    verifyMutation.mutate()
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-392 p-50 rounded-lg shadow-container flex flex-col items-center justify-center">
        <div className="text-center mb-40">
          <h1 className="text-24-bold text-black mb-16">본인인증</h1>
          <p className="text-16-regular text-gray-700">
            서비스 이용을 위해 본인인증을 진행해주세요.
          </p>
        </div>

        <div className="mt-32">
          <Button
            text={verifyMutation.isPending ? "인증 중..." : "본인인증하기"}
            bgColor="primary"
            color="white"
            onClick={verifyMutation.isPending ? undefined : handleVerify}
            icon={
              verifyMutation.isPending ? (
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
              ) : undefined
            }
          />
        </div>
      </div>
    </div>
  )
}

export default VerifyPage
