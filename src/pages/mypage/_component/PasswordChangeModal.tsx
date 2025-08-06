import React, { useState } from "react"

import Button from "../../../components/ui/button"

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (currentPassword: string, newPassword: string) => void
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false)
  const [isPasswordCheckFocused, setIsPasswordCheckFocused] = useState(false)

  const resetForm = () => {
    setCurrentPassword("")
    setNewPassword("")
    setPasswordCheck("")
    setIsNewPasswordFocused(false)
    setIsPasswordCheckFocused(false)
  }

  const newPasswordError =
    !newPassword.trim() && isNewPasswordFocused
      ? "새 비밀번호는 필수입니다."
      : !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword) &&
          newPassword.trim()
        ? "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
        : ""

  const passwordCheckError =
    !passwordCheck.trim() && isPasswordCheckFocused
      ? "비밀번호 확인은 필수입니다."
      : passwordCheck && passwordCheck !== newPassword
        ? "비밀번호가 일치하지 않습니다."
        : ""

  const isFormValid = !newPasswordError && !passwordCheckError

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(currentPassword, newPassword)
      resetForm()
      onClose()
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="shadow-container rounded-lg p-40 w-520 max-w-90vw shadow-xl">
        <div className="flex justify-between items-center mb-32">
          <h2 className="title-20-bold text-black">비밀번호 수정</h2>
          <button
            onClick={handleClose}
            className="w-32 h-32 flex items-center justify-center text-gray-300 hover:text-gray-700 transition-colors"
          >
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-24">
          <div>
            <label className="block text-14-medium text-gray-700 mb-8">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-16 border border-gray-300 rounded-12 text-14 transition-colors focus:border-primary focus:outline-none"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>

          <div>
            <label className="block text-14-medium text-gray-700 mb-8">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => setIsNewPasswordFocused(true)}
              className={`w-full p-16 border rounded-12 text-14 transition-colors ${
                newPasswordError
                  ? "border-error focus:border-error"
                  : "border-gray-300 focus:border-primary"
              } focus:outline-none`}
              placeholder="새 비밀번호를 입력하세요"
            />
            {newPasswordError && <p className="text-12 text-error mt-8">{newPasswordError}</p>}
          </div>

          <div>
            <label className="block text-14-medium text-gray-700 mb-8">비밀번호 확인</label>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              onFocus={() => setIsPasswordCheckFocused(true)}
              className={`w-full p-16 border rounded-12 text-14 transition-colors ${
                passwordCheckError
                  ? "border-error focus:border-error"
                  : "border-gray-300 focus:border-primary"
              } focus:outline-none`}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {passwordCheckError && <p className="text-12 text-error mt-8">{passwordCheckError}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-12 mt-40">
          <Button
            text="취소"
            small
            border
            borderColor="gray-300"
            color="gray-700"
            bgColor="white"
            onClick={handleClose}
          />
          <Button text="완료" small color="white" bgColor="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default PasswordChangeModal
