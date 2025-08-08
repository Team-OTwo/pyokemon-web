import React from "react"
import { IoChevronForwardOutline } from "react-icons/io5"
import { useNavigate } from "react-router"

interface MyPageModalProps {
  setShowMyPageModal: (value: boolean) => void
}

const MyPageModal: React.FC<MyPageModalProps> = ({ setShowMyPageModal }) => {
  const navigate = useNavigate()
  const menus = [
    { title: "예매 내역", path: "/mypage/tickets" },
    { title: "관심 공연", path: "/mypage/saved" },
    { title: "본인 인증", path: "", description: "인증 완료" },
  ]

  const handleClickMenu = (path: string) => {
    setShowMyPageModal(false)
    navigate(path)
  }

  const listStyle = "text-sm text-gray-500 flex items-center justify-end gap-4"
  return (
    <div className="absolute z-10 right-0 top-48 w-320 shadow-container rounded-xl overflow-hidden border-1 border-gray-300">
      <ul className="w-full">
        <li
          className="px-16 py-20 bg-gray-100 flex justify-between items-center cursor-pointer"
          onClick={() => handleClickMenu("/mypage/setting")}
        >
          <p className="text-16-semibold">
            하하하<span className="text-16-medium text-gray-500 ml-4">님</span>
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
              onClick={() => handleClickMenu(menu.path)}
            >
              {menu.title}{" "}
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
