// Imports from third parties
import axios from "axios";

// Additional imports
import { BaseURL } from "../utilities/apiEndpoints";
import { TokensHandler } from "../authentication/TokensHandler"

function useAxios(){
    const tokensHandler = new TokensHandler()
    
    /* Customizing the axios, Attatching the BASEURL and Headers */
    const customAxios = axios.create({
      "baseURL": BaseURL,
      "timeout": 6000,                                        // Now These will go with every request
      "headers": {'Authorization': `Bearer ${tokensHandler.accessToken()}`} 
    });

    /*
      Overriding the axios request if user is Authenticated.
      to check tokens expiry before sending the axios request
    */
    if (tokensHandler.checkIfAuthenticated()){

        customAxios.interceptors.request.use(async (request) => {
            if ( ! tokensHandler.isAccessExpired() ){ // is token is not expired
              return request   // Returning the request as it is
            }
            localStorage.removeItem("access")
            
            /* Now renewing the access token cause it's expired */
            // Sending the REFRESH request to the Backend
            const newAccessToken = await tokensHandler.requestAccessToken();
            
            /* Rewriting the header of the axios and putting new token */
            request.headers.Authorization = `Bearer ${newAccessToken}`;
            
            return request; // returning the renewed request
          })
        }
  /* Finally ! Returning the custom made Axios */
  return customAxios
}

export default useAxios