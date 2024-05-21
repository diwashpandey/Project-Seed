// imports from react
import { useEffect } from "react";

// imports from third parties
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query"

// Additional imports
import { AuthUserDataURL } from "../utilities/apiEndpoints"
import { TokensHandler } from "./TokensHandler"
import { setAuthUserData } from "../reduxStore/features/Authentication/authUserDataSlice"
import {setIsAuthenticatedFalse, setIsAuthenticatedTrue} from "../reduxStore/features/Authentication/isAuthenticatedSlice"
import { authUserDataFetcher } from "../fetchers/AuthUserData/authUserDataFetcher";

/*
    This manages and provides things like:
        1. isAuthenticated,
        2. setIsAuthenticated,

        3. authUserData,
        4. setAuthUserData
        
*/

function AuthenticationHadler({children}){
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((states)=>states.isAuthenticatedReducer)
    const TH = new TokensHandler()

    
    /*
    Working on Logged in user Data
    !!! Using raw axios. Cause we don't want this to stick in the cache !!!
    */
    const {data:authUserData, isSuccess} = useQuery({
        queryKey:["authUserData"],
        queryFn:authUserDataFetcher,
        enabled:isAuthenticated // Setting isAuthenticated in enabled to prevent it to fetch when not authenticated
    })

    useEffect(() => {
        if (TH.checkIfAuthenticated()) {
            dispatch(setIsAuthenticatedTrue());
        }
    }, [dispatch, TH]);
    
    useEffect(() => {
        if (isSuccess && authUserData) {
            dispatch(setAuthUserData(authUserData));
        }
    }, [isSuccess, authUserData, dispatch]);
    
    // Returning the Children after the authentication step
    return (
        <>
        {children}
        </>
    )
}

export default AuthenticationHadler