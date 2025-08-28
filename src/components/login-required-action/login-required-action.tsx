import React, { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router"

interface LoginRequiredActionProps {
  children: ReactNode
  onAction: () => void
  targetSource?: string | undefined
}

const LoginRequiredAction = ({ children, onAction, targetSource }: LoginRequiredActionProps) => {
  const isLoggedIn = localStorage.getItem("accessToken") !== null

  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    if (isLoggedIn) {
      onAction()
    } else {
      // 로그인 페이지로 이동 + 현재 위치 기억
      navigate("/login", {
        state: {
          from: targetSource || location.pathname,
        },
      })
    }
  }

  return <div onClick={handleClick}>{children}</div>
}

export default LoginRequiredAction
