// Imports from third-party-librairies
import {Link} from "react-router-dom"

// Additional Imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints"
import { generateCollegeProfileRoute } from "../../../utilities/frontendRoutes"


function CollegeSearchBoxProfileCard({college}) {
  return (
    <Link
    to={generateCollegeProfileRoute(college.college_identifier)}
    id="suggestion-user-profile-card"
    className="w-full my-1 p-2 rounded-xl border-gray-600 flex bg-main-box">
        <img src={generatePhotoURL(college.profile_photo)} alt="" className="profile-photo mr-2 h-10 w-10" />
        <div className="relative w-full">
            {/* <!-- Full Name --> */}
            <div className="flex items-center flex-wrap">
              <p className="text-sm">{college.name}</p>
              <p className="ml-1 text-[0.6rem] font-light">{college.state}, {college.country}</p>
            </div>

            {/* <!-- Intro --> */}
            <p className="font-extralight text-sm mb-1">{college.slogan}</p>

            {/* <!-- College or University, and RisePoints --> */}
            <p className="py-0.5 px-2 w-fit rounded-lg center text-white text-[0.6rem] font-light bg-theme-color">{college.rise_points} Rises</p>
            
        </div>
    </Link>
  )
}

export default CollegeSearchBoxProfileCard