import { IoLogoInstagram, IoLogoYoutube, IoMailOutline } from "react-icons/io5"

function Footer() {
  return (
    <footer className="bg-black text-gray-300 h-100 flex justify-between items-center px-160">
      <p className="text-center font-light text-sm">© 2025 PYOKEMON</p>

      <div className="flex gap-12 text-black">
        <div className="bg-white rounded-full p-8 w-32">
          <IoMailOutline />
        </div>
        <div className="bg-white rounded-full p-8 w-32">
          <IoLogoInstagram />
        </div>

        <div className="bg-white rounded-full p-8 w-32">
          <IoLogoYoutube />
        </div>
      </div>
    </footer>
  )
}

export default Footer
