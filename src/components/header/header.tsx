import { IoSearch } from "react-icons/io5"
import { Link, useSearchParams } from "react-router"

import logo from "../../assets/images/logo.svg"

function Header() {
  const [searchParams] = useSearchParams()
  const currentType = searchParams.get("type")

  const list = [
    { title: "콘서트", type: "concert" },
    { title: "뮤지컬", type: "musical" },
    { title: "연극", type: "play" },
    { title: "클래식", type: "classic" },
    { title: "스포츠", type: "sports" },
    { title: "행사", type: "exhibition" },
  ]
  return (
    <div className="flex bg-black h-70 w-full text-white items-center justify-between px-60">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="h-50" />
        </Link>

        <div className="w-270 h-40 mx-40 flex items-center border-primary border-1 rounded-full px-16 justify-between">
          <input
            type="text"
            className="focus:outline-none text-sm h-full placeholder:text-gray-500"
            placeholder="공연 검색"
          />
          <IoSearch className="text-gray-300" />
        </div>
        <nav className="flex gap-16 items-center">
          {list.map((genre) => {
            const isActive = currentType === genre.type
            return (
              <Link
                to={"/event?type=" + genre.type}
                key={genre.title}
                className={`hover:text-primary ${isActive ? "text-primary" : ""}`}
              >
                {genre.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <Link to="/login">로그인</Link>
    </div>
  )
}

export default Header
