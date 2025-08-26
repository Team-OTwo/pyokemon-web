import React, { ReactNode } from "react"
import { postLogout } from "@/api/login/fetchers/post-login"
import {
  IoBookmarkOutline,
  IoChevronForwardOutline,
  IoLogOutOutline,
  IoShieldCheckmarkOutline,
  IoTicketOutline,
} from "react-icons/io5"
import { useNavigate } from "react-router"

interface MyPageModalProps {
  setShowMyPageModal: (value: boolean) => void
}

const MyPageModal: React.FC<MyPageModalProps> = ({ setShowMyPageModal }) => {
  const navigate = useNavigate()
  const userName = localStorage.getItem("name") || ""
  const isVerified = localStorage.getItem("isVerified") === "true"

  interface MenuItem {
    title: string
    path: string
    description?: string
    icon?: ReactNode
  }

  const menus: MenuItem[] = [
    {
      title: "예매 내역",
      path: "/mypage/bookings",
      icon: <IoTicketOutline size={20} className="text-gray-700" />,
    },
    {
      title: "관심 공연",
      path: "/mypage/saved",
      icon: <IoBookmarkOutline size={20} className="text-gray-700" />,
    },
    {
      title: "본인 인증",
      path: "/verify",
      description: isVerified ? "인증 완료" : "인증 미완료",
      icon: <IoShieldCheckmarkOutline size={20} className="text-gray-700" />,
    },
    { title: "로그아웃", path: "/", icon: <IoLogOutOutline size={20} className="text-error" /> },
  ]

  const handleClickMenu = async (menu: MenuItem) => {
    setShowMyPageModal(false)
    if (menu.title === "본인 인증" && isVerified) {
      return
    }

    if (menu.title === "로그아웃") {
      try {
        await postLogout()
        localStorage.clear()
      } catch (error) {
        console.error("Logout failed:", error)
        localStorage.clear()
      }
    }
    navigate(menu.path)
  }

  const listStyle = "text-sm text-gray-500 flex items-center justify-end gap-4"
  return (
    <div className="absolute z-10 right-0 top-48 w-320 shadow-container rounded-xl overflow-hidden border-1 border-gray-300">
      <ul className="w-full">
        <li
          className="px-16 py-20 bg-gray-100 flex justify-between items-center cursor-pointer"
          onClick={() => handleClickMenu({ title: "계정 설정", path: "/mypage/setting" })}
        >
          <p className="text-16-semibold">
            {userName}
            <span className="text-16-medium text-gray-500 ml-4">님</span>
          </p>
          <span className={listStyle}>
            계정 설정 <IoChevronForwardOutline className="text-gray-500" />
          </span>
        </li>
        {menus.map((menu) => {
          return (
            <li
              className="w-full px-16 py-12 flex justify-between items-center border-b-1 border-gray-100 cursor-pointer hover:bg-gray-100/50"
              key={menu.title}
              onClick={() => handleClickMenu(menu)}
            >
              <div className="flex items-center gap-8">
                {menu.icon}
                {menu.title}
              </div>
              <div className={listStyle}>
                {menu.description && <span>{menu.description}</span>}
                <IoChevronForwardOutline />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MyPageModal
