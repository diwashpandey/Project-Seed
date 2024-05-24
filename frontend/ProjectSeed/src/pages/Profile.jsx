// imports from React

// imports from third party libraries
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useState, createContext, useEffect } from "react";

// Components and pages import
import MainProfile from "../components/Profile/MainProfile";
import ProfileDowntown from "../components/Profile/ProfileDowntown";
import PeopleSuggestionBox from "../components/Profile/PeopleSuggestionBox";
import Loading from "../pages/Loading"

// Additional imports
import { fetchUserProfile } from "../fetchers/Profile/fetchUserProfile";
import { UserProfileURL, UserProfileNonAuthenticatedURL } from "../utilities/apiEndpoints";

export const profileOwnerDataContext = createContext(null)

function Profile(){
    const { username } = useParams()
    const user = useSelector((states)=>states.userReducer)
    const url = user.isAuthenticated ? UserProfileURL : UserProfileNonAuthenticatedURL
    const [profileOwnerData, setProfileOwnerData] = useState(null)
    
    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey : ["userProfileQuery", [url, username]],
        queryFn: () =>{
            return fetchUserProfile(url, username)
        },
        onSuccess:(data)=>{
            console.log("Gotthe data:", data)
        }
    })

    useEffect(()=>{
        console.log("truggered",isSuccess)
        if (isSuccess){
            setProfileOwnerData(data)
        }
    },[isSuccess])

    if(isLoading){
        return <Loading />
    }

    const value = {profileOwnerData, setProfileOwnerData}

    return (
        <>  
            {
                profileOwnerData ? 
                <profileOwnerDataContext.Provider value={value} >
                    <main className="flex justify-center gap-2 pt-[70px] px-0 lg:px-24">
                        <MainProfile>
                            <ProfileDowntown />
                        </MainProfile>
                        <PeopleSuggestionBox />
                    </main> 
                </profileOwnerDataContext.Provider>
                : null
            }
        </>
    )
}

export default Profile
