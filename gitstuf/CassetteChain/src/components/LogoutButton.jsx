// components/LogoutButton.js
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LogoutButton = ({ setToken }) => {
  const navigate = useNavigate()

  const logout = () => {
    setToken("")
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <button
      onClick={logout}
      className="flex items-center text-white space-x-1 bg-plum hover:bg-pink-300 hover:text-black press-start text-sm px-4 py-2 rounded-lg transition-colors"
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </button>
  )
}

export default LogoutButton
