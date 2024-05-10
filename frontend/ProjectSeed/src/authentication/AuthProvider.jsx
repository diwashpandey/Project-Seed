import { useState, useEffect, createContext } from "react";


/*
    This manages things like:
        1. isAuthenticated
        2. setIsAuthenticated
        
        3. authTokens
        4. setAuthTokens
        
*/

export const AuthContext = createContext()

function AuthProvider({children}){

    // isAuthenticated will be set to true if tokens exists in the local storage
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        localStorage.getItem("authTokens") ? true : false
    })

    // setting the authTokens
    const [authTokens, setAuthTokens] = useState(JSON.stringify(localStorage.getItem("authTokens")))

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
            {children}                                      /* This is too much important concept, Don't forget !!! */
        </AuthContext.Provider>
    )
}

export default AuthProvider