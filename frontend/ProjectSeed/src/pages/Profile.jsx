// imports from React

// imports from third party libraries
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useContext } from "react";

// Components and pages import
import MainProfile from "../components/Profile/MainProfile";
import ProfileDowntown from "../components/Profile/ProfileDowntown";
import PeopleSuggestionBox from "../components/Profile/PeopleSuggestionBox";
import Loading from "../pages/Loading"

// Additional imports
import { fetchUserProfile } from "../fetchers/Profile/fetchUserProfile";
import { UserProfileURL, UserProfileNonAuthenticatedURL } from "../utilities/apiEndpoints";
import { AuthContext } from "../authentication/AuthProvider"

function Profile(){
    const { username } = useParams()
    const {isAuthenticated} = useContext(AuthContext)
    const url = isAuthenticated ? UserProfileURL : UserProfileNonAuthenticatedURL

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey : ["userProfileQuery", {url, username}],
        queryFn: (data) =>{
            const [_, {url, username}] = data.queryKey
            return fetchUserProfile(url, username)
        }
    })
    if(isLoading){
        return <Loading />
    }

    return (
        <>  
            {
                isSuccess ? 
                <main className="flex justify-center gap-2 pt-[70px] px-0 lg:px-24">
                    <MainProfile user={data} >
                        <ProfileDowntown user={data}/>
                    </ MainProfile >
                    <PeopleSuggestionBox />
                </main> :
                ""
            }
        </>
    )
}

export default Profile
