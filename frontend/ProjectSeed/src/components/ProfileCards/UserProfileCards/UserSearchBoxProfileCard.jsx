// Imports from third-party-librairies
import {Link} from "react-router-dom"

// Additional Imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints"
import { generateProfileRoute } from "../../../utilities/frontendRoutes"


function UserSearchBoxProfileCard({user}) {
  return (
    <Link
    to={generateProfileRoute(user.username)}
    id="suggestion-user-profile-card"
    className="w-full my-1 p-2 rounded-xl border-gray-600 flex bg-main-box">
        <img src={generatePhotoURL(user.profile_photo)} alt="" className="profile-photo mr-2 h-10 w-10" />
        <div className="relative w-full">
            {/* <!-- Full Name --> */}
            <p className="h-5 text-sm">{user.full_name}</p>

            {/* <!-- Intro --> */}
            <p className="font-extralight text-sm mb-1">{user.intro?.slice(0, 35)}{user.intro?.length > 35 && '...'}</p> {/* If the intro has more than 35 characters, add "..." at the end */}

            {/* <!-- College or University, and RisePoints --> */}
            <div className="flex gap-2">
                {(user.college_name || user.university_name) && (
                  <p className="py-0.5 px-2 rounded-lg text-light-mode-opposite-color text-[0.6rem] font-light bg-black-white">
                    {user.college_name ? user.college_name : user.university_name}
                  </p>
                )}
                <p className="py-0.5 px-2 rounded-lg center text-white text-[0.6rem] font-light bg-theme-color">{user.rise_points} Rises</p>
            </div>
        </div>
    </Link>
  ) 
}

export default UserSearchBoxProfileCard