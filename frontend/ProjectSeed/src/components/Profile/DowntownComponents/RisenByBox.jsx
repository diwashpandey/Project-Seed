// Imports from react
import { useContext } from "react"

// Imports from third party libraries
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

// Components Imports
import BaseProfilesContainer from "./BaseProfilesContainer"

// Additional Imports
import { profileOwnerDataContext } from "../../../pages/Profile"
import {UserProfileDowntownURL, UserProfileDowntownNonAuthenticatedURL} from "../../../utilities/apiEndpoints"
import { fetchUserProfileDowntown } from "../../../fetchers/Profile/fetchProfileDowntown"

export default function RisenByBox() {

  const isAuthenticated = useSelector((states)=>states.isAuthenticatedReducer)
  let {profileOwnerData} = useContext(profileOwnerDataContext)

  const url = isAuthenticated ? UserProfileDowntownURL : UserProfileDowntownNonAuthenticatedURL
  let section = "risenBy"  // Warning ! don't change ! it's required for server

  const {data, isLoading, isSuccess} = useQuery({
      queryKey : ["userRisenByProfilesQuery", profileOwnerData.username],
      queryFn: () => fetchUserProfileDowntown(url, profileOwnerData.username, section)
  })

  return (
    <div id="profile-downtown-risen-by-container" className="user_profile_downtown_sections">
        <div id="downtown-risen-by-container-header" className="flex justify-between p-1 sm:p-4">
            <h2 className="text-lg sm:text-2xl md:text-3xl">Risen By</h2>
            
            {/* <!-- This feature will be added later -->
            <!-- <button className="hidden white-btn w-40 text-[0.5em] sm:text-sm sm:block">Teacher | Student</button> --> */}
            
        </div>
        <BaseProfilesContainer usersData={data} isLoading={isLoading} isSuccess={isSuccess} />
    </div>
  )
}
