// imports from third party libraries
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { TokenRefreshURl } from "../utilities/apiEndpoints";

export class TokensHandler{

    checkIfAuthenticated(){
        if (this.refreshToken() && this.accessToken()){
            if(!this.isRefreshExpired()){
                return true
            }
        }
        return false
    }
    
    refreshToken(){
        return localStorage.getItem("refresh");
    }

    accessToken(){
        return localStorage.getItem("access");
    }

    removeTokens(){
        localStorage.removeItem("refresh")
        localStorage.removeItem("access")
    }

    async requestAccessToken(){
        try {
            const response = await axios.post(TokenRefreshURl, {"refresh": this.refreshToken()});
            localStorage.setItem("access", response.data.access)
            return response.data.access
        }
        catch (error) {
            if(isRefreshExpired()){
                this.removeTokens()
                alert("Your Session has Ended. Please Login back")
            }else{
                alert("Something went wrong! Please refresh the page")
            }
        }
    }

    isAccessExpired(){
        const decodedToken = jwtDecode(this.accessToken())
        const isExpired = decodedToken.exp < Math.floor(Date.now() / 1000)

        if (isExpired){
            return true
        }
        return false
    }

    isRefreshExpired(){
        try{
            const refresh = jwtDecode(this.refreshToken())
            const isExipred = refresh.exp < Math.floor(Date.now() / 1000) // checking if expired
            
            if(isExipred){
                this.removeTokens() // Removing the JSON Web Tokens if expired
                return true
            }
            return false
        }
        catch(error){
            // Removing the JSON Web Tokens if some glitch happened while decoding them
            this.removeTokens()
            return false
        }
    }

    tokensExists(){
        const refresh = this.refreshToken();
        const access = this.accessToken();
    
        return (refresh !== null && access !== null); // Will be FALSE if not null else TRUE
    }


}

