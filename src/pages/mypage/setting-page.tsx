import React, { useState } from "react"
import Swal from "sweetalert2"

import Button from "../../components/ui/button"
import PasswordChangeModal from "./_component/PasswordChangeModal"

const SettingPage = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const handlePasswordChange = (currentPassword: string, newPassword: string) => {
    console.log("현재 비밀번호:", currentPassword)
    console.log("새 비밀번호:", newPassword)
  }

  const handleWithdraw = () => {
    Swal.fire({
      title: "회원탈퇴",
      text: "정말로 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()

        Swal.fire({
          title: "탈퇴 완료",
          text: "회원탈퇴가 완료되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        }).then(() => {
          window.location.href = "/"
        })
      }
    })
  }

  return (
    <div className="px-160 py-64 relative">
      <p className="title-24-bold">계정 설정</p>

      <div className="mt-48 space-y-32">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-16-bold black mb-8">비밀번호 수정</p>
            <p className="text-16-medium text-gray-700">비밀번호를 변경할 수 있습니다.</p>
          </div>
          <Button
            text="수정하기"
            small
            border
            borderColor="primary"
            color="primary"
            bgColor="white"
            onClick={() => setIsPasswordModalOpen(true)}
          />
        </div>

        <div className="h-px bg-gray-300 my-32" />

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-16-bold black mb-8">회원탈퇴</p>
            <p className="text-16-medium text-gray-700">계정을 영구적으로 삭제합니다.</p>
          </div>
          <Button
            text="탈퇴하기"
            small
            border
            borderColor="error"
            color="error"
            bgColor="white"
            onClick={handleWithdraw}
          />
        </div>
      </div>

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  )
}

export default SettingPage
