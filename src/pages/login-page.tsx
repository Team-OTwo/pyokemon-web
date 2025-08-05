import { useState } from "react"
import { useNavigate } from "react-router"

import { postLogin } from "../api/login/fetchers/post-login"
import login from "../assets/images/LOGIN.svg"
import Button from "../components/ui/button"
import Input from "../components/ui/input"

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const response = await postLogin({
        loginId,
        password,
      })

      console.log("로그인 성공:", response)

      if (response.success && response.data) {
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
        navigate("/")
      }
    } catch (error) {
      console.error("로그인 실패:", error)
    }
  }

  const handleSignupClick = () => {
    navigate(`/signup`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-392 h-480 bg-white rounded-lg shadow-container flex flex-col items-center justify-center">
        <img src={login} alt="login" className="h-24 mb-60 mt-60" />

        <div className="flex flex-col gap-16 mb-24">
          <Input placeholder="아이디" value={loginId} onChange={setLoginId} type="text" />
          <Input placeholder="비밀번호" value={password} onChange={setPassword} type="password" />
        </div>

        <div className="mt-32">
          <Button text="로그인" bgColor="primary" color="white" onClick={handleLogin} />
        </div>

        <div className="mt-24 text-center">
          <span className="text-black text-14-regular">아직 회원이 아니신가요? </span>
          <button
            onClick={handleSignupClick}
            className="text-black text-14-regular underline hover:opacity-80"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
