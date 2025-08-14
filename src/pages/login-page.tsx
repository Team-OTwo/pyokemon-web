import { useCallback, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { postLogin } from "../api/login/fetchers/post-login"
import login from "../assets/images/LOGIN.svg"
import Button from "../components/ui/button"
import Input from "../components/ui/input"
import { LoginRequest } from "../types/login"

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => postLogin(data),
    onSuccess: (response) => {
      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
        localStorage.setItem("name", response.data.userName)
        localStorage.setItem("isVerified", response.data.isVerified.toString())

        if (response.data.isVerified) {
          navigate("/")
        } else {
          navigate("/verify")
        }
      }
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })

  const handleLogin = useCallback(() => {
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.")
      return
    }

    loginMutation.mutate({
      loginId,
      password,
    })
  }, [loginId, password, loginMutation])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleLogin()
      }
    },
    [handleLogin]
  )

  const handleSignupClick = () => {
    navigate(`/signup`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-392 h-480 bg-white rounded-lg shadow-container flex flex-col items-center justify-center">
        <img src={login} alt="login" className="h-24 mb-60 mt-60" />

        <div className="flex flex-col gap-16 mb-24" onKeyDown={handleKeyDown} tabIndex={0}>
          <Input placeholder="아이디" value={loginId} onChange={setLoginId} type="text" />
          <Input placeholder="비밀번호" value={password} onChange={setPassword} type="password" />
        </div>

        <div className="mt-32">
          <Button
            text={loginMutation.isPending ? "로그인 중..." : "로그인"}
            bgColor="primary"
            color="white"
            onClick={loginMutation.isPending ? undefined : handleLogin}
          />
        </div>

        {loginMutation.isError && (
          <div className="mt-16 text-red-500 text-14-regular">
            로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
          </div>
        )}

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
