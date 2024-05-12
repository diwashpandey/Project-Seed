// Imports from react
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

// Imports from third parties
import axios from "axios";

// Imports from src
import { AuthContext } from "../authentication/AuthProvider";

const BASEURL = "http://127.0.0.1:8000"
const TokenRefreshURl = `${BASEURL}/account/token/refresh/`

function useAxios(){

    const {authTokens, setAuthTokens, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    console.log("here 1")
    
    /*
    Customizing the axios, Attatching the BASEURL and Headers
    */
   const customAxios = axios.create({
     baseURL: BASEURL,
     timeout: 6000,                                        // Now These will go with every request
     headers: {'Authorization': `Bearer ${authTokens}`} 
    });
    
    
    /*
    Overriding the axios request if user is Authenticated.
    Checking the tokens expiry before sending the axios request
    */
    if (isAuthenticated){

        customAxios.interceptors.request.use(async (request) => {
            const accessToken = jwtDecode(authTokens.access);  // decoded access token
            console.log("here 2")
            const isExpired = Date.now() >= accessToken.exp // checking if exipred
            if ( !isExpired ){ // is token is not expired
                return request   // Returning the request as it is
              }
              
              /*
                
                Now renewing the access token cause it's expired

                */
              // Sending the REFRESH request to the Backend
              const response = await axios.post(TokenRefreshURl, {
                refresh: authTokens.refresh
              });

              // Setting the authTokens to the local storage
              localStorage.setItem("access", response.data.access) // Disclaimer! Don't forget to put the reqeust.data.access ! Other wise it will go as object ! it fucking took me 1 day to debug this shit lol

              // Changing the authTokens state
              setAuthTokens({
                "refresh":authTokens.refresh,
                "access":response.access
              })

              /*
                Rewriting the header of the axios and putting new token
              */
              request.headers.Authorization = `Bearer ${response.data.access}`;
              return request; // returning the renewed request
          } )
          

          /* 
            Finally ! Returning the custom made Axios
          */
        }
    return customAxios
}

export default useAxios