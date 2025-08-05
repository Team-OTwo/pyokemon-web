import { useCallback, useState } from "react"
import { useNavigate } from "react-router"

import { postSignUp } from "../api/signup/fetchers/post-signup"
import signup from "../assets/images/SIGN_UP.svg"
import Button from "../components/ui/button"
import Input from "../components/ui/input"

interface SignUpForm {
  loginId: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  birth: string
}

interface FormErrors {
  [key: string]: string
}

function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/[^\d]/g, "")
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
}

function validateField(fieldName: keyof SignUpForm, value: string, form?: SignUpForm): string {
  switch (fieldName) {
    case "loginId":
      if (!value.trim()) return "로그인 ID는 필수입니다."
      if (value.length < 4 || value.length > 20) return "로그인 ID는 4~20자여야 합니다."
      break
    case "password": {
      if (!value.trim()) return "비밀번호는 필수입니다."
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordRegex.test(value)) {
        return "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
      }
      break
    }
    case "confirmPassword":
      if (!value.trim()) return "비밀번호 확인은 필수입니다."
      if (form && value !== form.password) return "비밀번호가 일치하지 않습니다."
      break
    case "name": {
      if (!value.trim()) return "이름은 필수입니다."
      const nameRegex = /^[가-힣a-zA-Z0-9]+$/
      if (!nameRegex.test(value)) return "이름은 한글, 영문, 숫자만 포함할 수 있습니다."
      break
    }
    case "phone":
      if (!value.trim()) return "전화번호는 필수입니다."
      if (!/^\d{3}-\d{3,4}-\d{4}$/.test(value))
        return "전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
      break
    case "birth":
      if (!value) return "생년월일은 필수입니다."
      if (new Date(value) >= new Date()) return "생년월일은 과거 날짜여야 합니다."
      break
  }
  return ""
}

function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SignUpForm>({
    loginId: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    birth: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleFieldChange = useCallback(
    (fieldName: keyof SignUpForm, value: string) => {
      let finalValue = value
      if (fieldName === "phone") {
        finalValue = formatPhoneNumber(value)
      }

      setForm((prev) => ({ ...prev, [fieldName]: finalValue }))
      const error = validateField(fieldName, finalValue, { ...form, [fieldName]: finalValue })
      setErrors((prev) => ({ ...prev, [fieldName]: error }))

      if (fieldName === "password" && form.confirmPassword) {
        const confirmError = validateField("confirmPassword", form.confirmPassword, {
          ...form,
          password: finalValue,
        })
        setErrors((prev) => ({ ...prev, confirmPassword: confirmError }))
      }
    },
    [form]
  )

  const handleSignUp = useCallback(async () => {
    const newErrors: FormErrors = {}
    Object.keys(form).forEach((fieldName) => {
      const error = validateField(
        fieldName as keyof SignUpForm,
        form[fieldName as keyof SignUpForm],
        form
      )
      if (error) newErrors[fieldName] = error
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    try {
      const response = await postSignUp({
        loginId: form.loginId,
        password: form.password,
        passwordCheck: form.confirmPassword,
        name: form.name,
        phone: form.phone,
        birth: form.birth,
      })

      console.log("회원가입 성공:", response)
      if (response.success && response.data) {
        navigate("/login")
      }
    } catch (error) {
      console.error("회원가입 실패:", error)
    }
  }, [form, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-392 h-700 bg-white rounded-lg shadow-container flex flex-col items-center justify-center p-32">
        <img src={signup} alt="signup" className="h-24 mb-40 mt-40" />

        <div className="flex flex-col gap-16 mb-24 w-full">
          <div>
            <Input
              placeholder="아이디"
              value={form.loginId}
              onChange={(value) => handleFieldChange("loginId", value)}
              type="text"
              error={!!errors.loginId}
            />
            {errors.loginId && <p className="text-error text-12-regular mt-4">{errors.loginId}</p>}
          </div>

          <div>
            <Input
              placeholder="비밀번호"
              value={form.password}
              onChange={(value) => handleFieldChange("password", value)}
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
              value={form.confirmPassword}
              onChange={(value) => handleFieldChange("confirmPassword", value)}
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
              value={form.name}
              onChange={(value) => handleFieldChange("name", value)}
              type="text"
              error={!!errors.name}
            />
            {errors.name && <p className="text-error text-12-regular mt-4">{errors.name}</p>}
          </div>

          <div>
            <Input
              placeholder="전화번호"
              value={form.phone}
              onChange={(value) => handleFieldChange("phone", value)}
              type="tel"
              error={!!errors.phone}
            />
            {errors.phone && <p className="text-error text-12-regular mt-4">{errors.phone}</p>}
          </div>

          <div>
            <Input
              placeholder="생년월일"
              value={form.birth}
              onChange={(value) => handleFieldChange("birth", value)}
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
