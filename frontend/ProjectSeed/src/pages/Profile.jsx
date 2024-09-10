// imports from React
import { useEffect } from "react";

// imports from third party libraries
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useSelector, useDispatch } from "react-redux"

// Components and pages import
import MainProfile from "../components/Profile/MainProfile";
import ProfileDowntown from "../components/Profile/ProfileDowntown";
import PeopleSuggestionBox from "../components/Profile/PeopleSuggestionBox";
import Loading from "../pages/Loading"

// Additional imports
import { fetchUserProfile } from "../fetchers/Profile/fetchUserProfile";
import { UserProfileURL, UserProfileNonAuthURL } from "../utilities/apiEndpoints";
import { setProfileOwnerData, resetProfileOwnerData } from "../reduxStore/features/Profile/profileOwnerDataSlice";

function Profile(){
    const { username } = useParams()
    const user = useSelector((states)=>states.userReducer)
    const url = user.isAuthenticated ? UserProfileURL(username) : UserProfileNonAuthURL(username)
    const profileOwnerData = useSelector((states)=>states.profileOwnerDataReducer)
    const dispatch = useDispatch()
    
    const { isLoading } = useQuery({
        queryKey : ["userProfileQuery", url],
        queryFn: () => fetchUserProfile(url),
        onSuccess:(data)=>dispatch(setProfileOwnerData(data)),
        refetchOnWindowFocus:false
    })

    if(isLoading){
        return <Loading />
    }

    return (
        <>  
            {
                profileOwnerData ? 
                    <main className="flex justify-center gap-2 pt-[70px] px-0 lg:px-24">
                        <MainProfile />
                        <PeopleSuggestionBox />
                    </main>
                : null
            }
        </>
    )
}

export default Profile
