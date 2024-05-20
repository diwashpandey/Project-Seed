// imports from third party libraries
import { Link } from "react-router-dom"

// Additional imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints"
import { generateProfileRoute } from "../../../utilities/frontendRoutes"

function Top2And3ProfileCard({profile}) {
  return (
    <Link to={generateProfileRoute(profile.username)} className="top-2-3-stu-card h-20 w-38 rounded-2xl relative flex flex-col items-center p-2">
      <div className="1st-section flex gap-1">
          <img src={generatePhotoURL(profile.profile_photo)} alt="" className="profile-photo h-9 w-9" />
          <div>
              <div className="1st-stu-full-name text-sm font-light text-white">{profile.full_name}</div>
              <div className="1st-stu-username text-[0.6rem] font-extralight text-white">@{profile.username}</div>
          </div>
      </div>
      <div className="top-2-3-stu-rise-points-box h-10 w-[80%] center gap-1 mt-1 rounded-lg">
          <span className="text-inherit text-sm">{profile.rise_points} Rises</span>
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <g id="rise-icon">
                  <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
              </g>
          </svg>
      </div>
    </Link>
  )
}

export default Top2And3ProfileCard
