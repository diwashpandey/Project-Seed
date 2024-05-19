// Imports from third party libraries
import { Link } from "react-router-dom"

// Additional imports
import { generatePhotoURL } from "../../../../utilities/apiEndpoints"
import { generateProfileRoute } from "../../../../utilities/frontendRoutes"

export default function DowntownProfileCard({user}) {
  return (
    <div className="w-64 p-2 border border-gray-700 rounded-lg flex items-center sm:w-full md:h-16">
      <img src={generatePhotoURL(user.profile_photo)} alt="" className="profile-photo h-8 w-8 mr-2 md:h-12 md:w-12" />
      <div className="">
        <p className="text-sm md:text-base">{user.full_name}</p>
        <p className="text-[0.5rem] md:text-sm">@{user.username}</p>
      </div>
      <Link to={generateProfileRoute(user.username)} className="btn-white-filled h-5 w-18 ml-auto flex text-xs md:h-8 md:w-24">View Profile</Link>
    </div>
  )
}