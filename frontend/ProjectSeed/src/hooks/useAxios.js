// Imports from react
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

// Imports from third parties
import axios from "axios";

// Imports from src
import AuthContext from "../authentication/AuthProvider";
import { jwtDecode } from "jwt-decode";

const BASEURL = "http://127.0.0.1:8000/"
const TokenRefreshURl = `${BASEURL}/authentication/token/refresh`

function useAxios(){

    const {authTokens, setAuthTokens} = useContext(AuthContext)

    /*
        Customizing the axios, Attatching the BASEURL and Headers
    */
    const customAxios = axios.create({
        baseURL: BASEURL,
        timeout: 6000,                                        // Now These will go with every request
        headers: {'Authorization': `Bearer ${authTokens}`} 
      });


    /*
      Overriding the axios request.
      Checking the tokens expiry before sending the axios request
    */
    customAxios.interceptors.request.use( async (request) => {
      
      const accessToken = jwtDecode(authTokens.access);  // decoded access token
      const isExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1; // checking if exipred

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
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // Changing the authTokens state
      setAuthTokens = JSON.stringify(response.data)

      /*
        Rewriting the header of the axios and putting new token
      */
      req.headers.Authorization = `Bearer ${response.data.access}`;

      return request; // returning the renewed request
    } )
    

    /* 
      Finally ! Returning the custom made Axios
    */
      return customAxios
}

export default useAxios