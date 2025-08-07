import { useState } from "react"
import { IoNotificationsOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5"
import { Link, useLocation, useNavigate } from "react-router"

import logo from "../../assets/images/logo.svg"
import MyPageModal from "../my-page-modal"
import Notification from "../notification"

function Header() {
  const currentPath = useLocation().pathname

  const navItem = [
    { title: "HOME", path: "/" },
    { title: "TICKETS", path: "/event" },
  ]

  const listStyle = "p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
  const iconStyle = "text-black w-24 h-24"

  const [showSearchBar, setShowSearchBar] = useState(false)
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(false)
  const [showMyPageModal, setShowMyPageModal] = useState(false)

  const handleClickMyPage = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      navigate("login")
    } else {
      setShowMyPageModal(!showMyPageModal)
    }
  }

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/event/search?keyword=${keyword}`)
    }
  }
  return (
    <div className="flex bg-white h-100 w-full text-black items-center justify-between px-160 shadow-container">
      <Link to="/">
        <img src={logo} alt="logo" className="h-24" />
      </Link>

      <div>
        <nav className="flex items-center">
          {navItem.map((item) => {
            const isActive = currentPath === item.path
            return (
              <Link
                to={item.path}
                className={`text-black ml-32 ${isActive ? "title-20-bold" : "title-20-medium"}`}
                key={item.title}
              >
                {item.title}
              </Link>
            )
          })}

          {/* search bar */}
          <div
            className="h-36 flex items-center border-black border-1 px-16 rounded-full justify-between transition-all duration-300 ease-in-out overflow-hidden"
            style={{
              opacity: showSearchBar ? 1 : 0,
              width: showSearchBar ? "240px" : "0px",
              margin: showSearchBar ? "0px 32px" : "0px",
            }}
          >
            <input
              type="text"
              className="focus:outline-none text-14-medium h-full placeholder:text-gray-500 transition-opacity duration-200"
              placeholder="공연 검색"
              style={{
                opacity: showSearchBar ? 1 : 0,
                width: showSearchBar ? "100%" : "0",
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
            />
          </div>

          {/* icons */}
          <ul className="flex gap-16 relative">
            <li className={listStyle} onClick={() => setShowSearchBar(!showSearchBar)}>
              <IoSearchOutline className={iconStyle} />
            </li>
            <li className={listStyle} onClick={() => setShowNotification(!showNotification)}>
              <IoNotificationsOutline className={iconStyle} />
            </li>
            {showNotification && <Notification />}
            <li className={listStyle} onClick={() => handleClickMyPage()}>
              <IoPersonOutline className={iconStyle} />
            </li>
            {showMyPageModal && <MyPageModal setShowMyPageModal={setShowMyPageModal} />}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
