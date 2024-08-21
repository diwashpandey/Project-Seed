// Third Parties Imports
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

// Additional Imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints"
import { loginRoute } from "../../../utilities/frontendRoutes"

function ProfileSection() {
  const user = useSelector((state)=> state.userReducer)

  return (
      <div className="header-profile center gap-1">
      {
          // Rendering this part according to the authentication
          user.isAuthenticated ?
          <>
              
              <a href="" className="hidden md:block">
                  <img src={user.data ? `${generatePhotoURL(user.data.profile_photo)}` : ""} alt="" className="profile-photo h-10 w-10 bg-slate-400"/>
              </a>
              <div className="ellipsis-btn h-7 w-7 center flex-col cursor-pointer rounded-full p-1 hover:bg-slate-600">
                  <div className="rounded-full h-1 w-1 m-auto bg-white"></div>
                  <div className="rounded-full h-1 w-1 m-auto bg-white"></div>
                  <div className="rounded-full h-1 w-1 m-auto bg-white"></div>
              </div>
          </> :
          // Else
          <>
              <Link className="rise-btn" to={loginRoute}>Login</Link>
          </>
      }
      </div>
  )
}

export default ProfileSection