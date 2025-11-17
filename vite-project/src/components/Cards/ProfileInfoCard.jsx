import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate("/")
  }

  return (
    user && (
      <div className="flex items-center space-x-3">
        <img
          src={user.profileImageUrl}
          alt="User avatar"
          className="w-11 h-11 rounded-full bg-gray-300 object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="text-[15px] text-black font-bold">
            {user.name || ""}
          </span>
          <button
            onClick={handleLogout}
            className="text-amber-600 text-sm font-semibold hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}

export default ProfileInfoCard
