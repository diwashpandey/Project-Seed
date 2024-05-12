import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";


/*
    This manages things like:
        1. isAuthenticated
        2. setIsAuthenticated
        
        3. authTokens
        4. setAuthTokens
        
*/

export const AuthContext = createContext()

function tokensExists(){
    const refresh = localStorage.getItem("refresh")
    const access = localStorage.getItem("access")

    return (refresh !== null && access !== null) // Will be FALSE if not null else TRUE
}

function checkIfRefreshTokenIsValid(){
    try{
        
        // Getting the refresh token
        const refresh = jwtDecode(localStorage.getItem("refresh"))
        
        // Checking if the refresh token expiry date
        if(Date.now() >= refresh.exp){
            return true
        }
        else {
            // // Removing the JSON Web Tokens if expired
            localStorage.removeItem("refresh")
            localStorage.removeItem("access")
            return false
        }
    }
    catch(error){
        // Removing the JSON Web Tokens if some glitch happened while decoding them
        localStorage.removeItem("refresh")
        localStorage.removeItem("access")
        return false
    }
}

function AuthProvider({children}){

    if (tokensExists()){
        checkIfRefreshTokenIsValid()
    }

    // isAuthenticated will be set to true if tokens exists in the local storage
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return localStorage.getItem("refresh") ? true : false
    })

    // setting the authTokens
    const [authTokens, setAuthTokens] = useState({
        "access":localStorage.getItem("access"),
        "refresh":localStorage.getItem("refresh")
    })
    
    // These are the context that childrens can use
    const contextData = {
        isAuthenticated,
        setIsAuthenticated,

        authTokens,
        setAuthTokens
    }

    // Wrapping it's chilren with it's values
    return (
        <AuthContext.Provider value={contextData}>
            {children}                                      {/* This is too much important concept, Don't forget !!! */}
        </AuthContext.Provider>
    )
}

export default AuthProvider