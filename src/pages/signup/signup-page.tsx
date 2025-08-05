import { useState } from "react"
import { useNavigate } from "react-router"

import { postSignUp } from "../../api/signup/fetchers/post-signup"
import signup from "../../assets/images/SIGN_UP.svg"
import Button from "../../components/ui/button"
import Input from "../../components/ui/input"

const SignUpPage = () => {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [birth, setBirth] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 유효성 검사 함수들
  const validateLoginId = (value: string): string => {
    if (!value.trim()) return "로그인 ID는 필수입니다."
    if (value.length < 4 || value.length > 20) return "로그인 ID는 4~20자여야 합니다."
    return ""
  }

  const validatePassword = (value: string): string => {
    if (!value.trim()) return "비밀번호는 필수입니다."
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(value)) {
      return "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    }
    return ""
  }

  const validatePasswordCheck = (value: string): string => {
    if (!value.trim()) return "비밀번호 확인은 필수입니다."
    if (value !== password) return "비밀번호가 일치하지 않습니다."
    return ""
  }

  const validateName = (value: string): string => {
    if (!value.trim()) return "이름은 필수입니다."
    const nameRegex = /^[가-힣a-zA-Z0-9]+$/
    if (!nameRegex.test(value)) return "이름은 한글, 영문, 숫자만 포함할 수 있습니다."
    return ""
  }

  const validatePhone = (value: string): string => {
    if (!value.trim()) return "전화번호는 필수입니다."
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/
    if (!phoneRegex.test(value)) return "전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
    return ""
  }

  const validateBirth = (value: string): string => {
    if (!value) return "생년월일은 필수입니다."
    const selectedDate = new Date(value)
    const today = new Date()
    if (selectedDate >= today) return "생년월일은 과거 날짜여야 합니다."
    return ""
  }

  // 전화번호 자동 포맷팅
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }

  // 실시간 검증 핸들러들
  const handleLoginIdChange = (value: string) => {
    setLoginId(value)
    const error = validateLoginId(value)
    setErrors((prev) => ({ ...prev, loginId: error }))
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    const error = validatePassword(value)
    setErrors((prev) => ({ ...prev, password: error }))

    // 비밀번호 확인도 재검증
    if (confirmPassword) {
      const confirmError = validatePasswordCheck(confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }))
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    const error = validatePasswordCheck(value)
    setErrors((prev) => ({ ...prev, confirmPassword: error }))
  }

  const handleNameChange = (value: string) => {
    setName(value)
    const error = validateName(value)
    setErrors((prev) => ({ ...prev, name: error }))
  }

  const handlePhoneChange = (value: string) => {
    const formattedValue = formatPhoneNumber(value)
    setPhone(formattedValue)
    const error = validatePhone(formattedValue)
    setErrors((prev) => ({ ...prev, phone: error }))
  }

  const handleBirthChange = (value: string) => {
    setBirth(value)
    const error = validateBirth(value)
    setErrors((prev) => ({ ...prev, birth: error }))
  }

  const handleSignUp = async () => {
    const loginIdError = validateLoginId(loginId)
    const passwordError = validatePassword(password)
    const confirmPasswordError = validatePasswordCheck(confirmPassword)
    const nameError = validateName(name)
    const phoneError = validatePhone(phone)
    const birthError = validateBirth(birth)

    const allErrors = {
      loginId: loginIdError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      name: nameError,
      phone: phoneError,
      birth: birthError,
    }

    setErrors(allErrors)

    if (Object.values(allErrors).some((error) => error !== "")) {
      return
    }

    try {
      const response = await postSignUp({
        loginId,
        password,
        passwordCheck: confirmPassword,
        name,
        phone,
        birth,
      })

      console.log("회원가입 성공:", response)
      if (response.success && response.data) {
        navigate("/login")
      }
    } catch (error) {
      console.error("회원가입 실패:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-392 h-700 bg-white rounded-lg shadow-container flex flex-col items-center justify-center p-32">
        <img src={signup} alt="signup" className="h-24 mb-40 mt-40" />

        <div className="flex flex-col gap-16 mb-24 w-full">
          <div>
            <Input
              placeholder="아이디"
              value={loginId}
              onChange={handleLoginIdChange}
              type="text"
              error={!!errors.loginId}
            />
            {errors.loginId && <p className="text-error text-12-regular mt-4">{errors.loginId}</p>}
          </div>

          <div>
            <Input
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              error={!!errors.password}
            />
            {errors.password && (
              <p className="text-error text-12-regular mt-4">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-error text-12-regular mt-4">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
              type="text"
              error={!!errors.name}
            />
            {errors.name && <p className="text-error text-12-regular mt-4">{errors.name}</p>}
          </div>

          <div>
            <Input
              placeholder="전화번호"
              value={phone}
              onChange={handlePhoneChange}
              type="tel"
              error={!!errors.phone}
            />
            {errors.phone && <p className="text-error text-12-regular mt-4">{errors.phone}</p>}
          </div>

          <div>
            <Input
              placeholder="생년월일"
              value={birth}
              onChange={handleBirthChange}
              type="date"
              error={!!errors.birth}
            />
            {errors.birth && <p className="text-error text-12-regular mt-4">{errors.birth}</p>}
          </div>
        </div>

        <div className="mt-32 w-full">
          <Button text="가입 완료" bgColor="primary" color="white" onClick={handleSignUp} />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
