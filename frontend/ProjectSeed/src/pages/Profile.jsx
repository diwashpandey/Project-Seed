// imports from React

// imports from third party libraries
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useContext, createContext } from "react";

// Components and pages import
import MainProfile from "../components/Profile/MainProfile";
import ProfileDowntown from "../components/Profile/ProfileDowntown";
import PeopleSuggestionBox from "../components/Profile/PeopleSuggestionBox";
import Loading from "../pages/Loading"

// Additional imports
import { fetchUserProfile } from "../fetchers/Profile/fetchUserProfile";
import { UserProfileURL, UserProfileNonAuthenticatedURL } from "../utilities/apiEndpoints";
import { AuthContext } from "../authentication/AuthProvider"

export const userDataContext = createContext(null)

function Profile(){
    const { username } = useParams()
    const {isAuthenticated} = useContext(AuthContext)
    const url = isAuthenticated ? UserProfileURL : UserProfileNonAuthenticatedURL
    
    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey : ["userProfileQuery", {url, username}],
        queryFn: () =>{
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
                <userDataContext.Provider value={data} >
                    <main className="flex justify-center gap-2 pt-[70px] px-0 lg:px-24">
                        <MainProfile>
                            <ProfileDowntown />
                        </MainProfile>
                        <PeopleSuggestionBox />
                    </main> 
                </userDataContext.Provider>
                : null
            }
        </>
    )
}

export default Profile
