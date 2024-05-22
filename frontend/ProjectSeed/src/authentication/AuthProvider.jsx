// imports from react
import { useEffect } from "react";

// imports from third parties
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query"

// Additional imports
import { TokensHandler } from "./TokensHandler"
import {setIsAuthenticatedTrue, setUserData} from "../reduxStore/features/Authentication/userSlice"
import { userDataFetcher } from "../fetchers/userData/userDataFetcher";

/*
    This manages and provides things like:
        1. isAuthenticated,
        2. setIsAuthenticated,

        3. userData,
        4. setuserData
        
*/

function AuthenticationHadler({children}){
    console.log("Main auth provider called")
    const dispatch = useDispatch()
    const user = useSelector((states)=>states.userReducer)
    console.log("user is:", user)
    const TH = new TokensHandler()

    /*
    Working on Logged in user Data
    !!! Using raw axios. Cause we don't want this to stick in the cache !!!
    */
    const {data:userData, isSuccess} = useQuery({
        queryKey:["userData"],
        queryFn:userDataFetcher,
        enabled:user.isAuthenticated // Setting isAuthenticated in enabled to prevent it to fetch when not authenticated
    })

    useEffect(() => {
        if (TH.checkIfAuthenticated()) {
            dispatch(setIsAuthenticatedTrue());
        }
    }, [dispatch, TH]);
    
    useEffect(() => {
        if (isSuccess && userData) {
            dispatch(setUserData(userData));
        }
    }, [isSuccess, userData, dispatch]);
    
    // Returning the Children after the authentication step
    return (
        <>
        {children}
        </>
    )
}

export default AuthenticationHadler