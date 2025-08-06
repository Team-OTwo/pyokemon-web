import { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

import Button from "../components/ui/button"

type VerifyStatus = "initial" | "loading"

const VerifyPage = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<VerifyStatus>("initial")

  const handleVerify = useCallback(async () => {
    try {
      setStatus("loading")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      await Swal.fire({
        title: "본인인증 완료",
        html: "본인인증이 성공적으로 완료되었습니다.<br>로그인 해주세요!",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--color-success)",
      }).then(() => {
        navigate("/")
      })
    } catch (error) {
      await Swal.fire({
        title: "본인인증 실패",
        text: "본인인증에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--color-error)",
      })
      setStatus("initial")
    }
  }, [])

  const renderButton = () => {
    switch (status) {
      case "initial":
        return <Button text="본인인증" bgColor="primary" color="white" onClick={handleVerify} />
      case "loading":
        return (
          <div className="w-320 h-51 px-16 rounded-lg bg-primary text-white text-16-semibold flex justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white"></div>
            <span className="ml-8">인증 중...</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-392 bg-white rounded-lg shadow-container flex flex-col items-center justify-center p-32">
        <div className="flex flex-col items-center gap-24 m-30">
          <div className="text-center">
            <p className="text-16-regular text-gray-600 mb-8">
              {status === "initial" && "본인인증을 진행해주세요."}
              {status === "loading" && "본인인증을 진행하고 있습니다..."}
            </p>
          </div>

          {renderButton()}
        </div>
      </div>
    </div>
  )
}

export default VerifyPage
