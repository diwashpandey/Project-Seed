// imports from react
import { useState, useEffect, createContext, useRef } from "react";

// imports from third parties
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useAxios from "../hooks/useAxios";

// Additional imports
import { BaseURL, AuthUserDataURL } from "../utilities/apiEndpoints"
import { TokensHandler } from "./TokensHandler"
/*
    This manages and provides things like:
        1. isAuthenticated,
        2. setIsAuthenticated,

        3. authUserData,
        4. setAuthUserData
        
*/
export const AuthContext = createContext()

function AuthProvider({children}){

    const tokensHandler = new TokensHandler()

    const [isAuthenticated, setIsAuthenticated] = useState(tokensHandler.checkIfAuthenticated())
    const [authUserData, setAuthUserData] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)

    /*
    Working on Logged in user Data
    */
    const fetchUserData = async () =>{
        try{
            const axiosHook = useAxios()
            let response = await axiosHook.get(AuthUserDataURL)
            if (response.data.success_status){
                // Finally setting the quick user data
                setAuthUserData(response.data.response_data)
            }
        }
        catch(err){
            console.log("Error occured while fetching the auth User Data:", err)
            tokensHandler.removeTokens()
        }
    }

    if (isAuthenticated){
        if (! tokensHandler.isAccessExpired){
            fetchUserData();
        }
        else{
            tokensHandler.requestAccessToken()
        }
    }

    
    // These are the context that childrens can use
    const contextData = {
        isAuthenticated,
        setIsAuthenticated,

        authUserData,
        setAuthUserData
    }

    // Wrapping it's chilren with it's values
    return (
        <AuthContext.Provider value={contextData}>
            {children}                                      {/* This is too much important concept, Don't forget !!! */}
        </AuthContext.Provider>
    )
}

export default AuthProvider