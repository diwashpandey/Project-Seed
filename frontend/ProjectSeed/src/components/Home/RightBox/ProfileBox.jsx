// imports from react

// Import from third party libraries
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Additional imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints"
import { generateProfileRoute } from "../../../utilities/frontendRoutes"
import LoadingProfileBox from './LoadingProfileBox'

const ProfileBox = () => {
  // const user.data = false;

  const user = useSelector((state)=> state.userReducer)

  if ( user.data == null ){
    return <LoadingProfileBox />
  }

  return (
    <>
      <img src={generatePhotoURL(user.data.background_photo)} alt="" id="loggedin-user-background-photo" className="w-full h-24 rounded-lg absolute object-cover z-0 bg-gray-400" />
        <img src={generatePhotoURL(user.data.profile_photo)} alt="" id="loggedin-user-profile-photo" className="profile-photo h-16 w-16 mt-16 relative z-1 bg-gray-400" />
        <p className="loggedin-user-full-name text-2xl font-light">{user.data.full_name}</p>
        <p className="text-xs font-light  text-theme-color">@{user.data.username}</p>
        <p className="text-sm max-w-[80%] text-center">{user.data.intro}</p>
        <div className="flex w-full justify-between my-4">
            <div className="loggedin-user-following-count-box h-16 w-[45%] rounded-e-lg center flex-col bg-theme-lighter">
                <span className="text-3xl font-light text-white">{user.data.followers_count}</span>
                <span className="font-lgith text-xs text-white">Followers</span>
            </div>
            <div className="loggedin-user-rise-points-box w-[45%] rounded-s-lg center flex-col bg-theme-lighter">
                <span className="text-3xl font-light text-white">{user.data.following_count}</span>
                <span className="font-lgith text-xs text-white">Rises Earned</span>
            </div>
        </div>
        <Link to={generateProfileRoute(user.data.username)} className="btn-theme-hollow w-32 h-8 mb-2 rounded-lg">View my Profile</Link>
    </>
  )
}

export default ProfileBox
