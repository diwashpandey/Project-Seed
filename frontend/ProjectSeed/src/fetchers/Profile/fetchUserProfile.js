import { UserProfileURL, UserProfileNonAuthenticatedURL } from "../../utilities/apiEndpoints"
import useAxios from "../../hooks/useAxios"

export async function fetchUserProfile(url, username){
    const axiosHook = useAxios()
    try {
        const response = await axiosHook.get(`${url}?username=${username}`)
        if (response.data.success_status){
            console.log("Got the data")
            return response.data.response_data
        }
        else{
            console.log("Got the data but false success_status")
            return Promise.reject(new Error(response.data.message_from_server))
        }
    }
    catch(err){
        // return Promise.reject(new Error("Something went wrong while fetching the data"))
        console.log("Got Error",err)
    }
}