
import useAxios from "../../hooks/useAxios"

export async function fetchUserProfile(url){
    const axiosHook = useAxios()
    try {
        const response = await axiosHook.get(url)
        console.log(response)
        if (response.data.success_status){
            return response.data.response_data
        }
        else{
            return Promise.reject(new Error(response.data.message_from_server))
        }
    }
    catch(err){
        // return Promise.reject(new Error("Something went wrong while fetching the data"))
        console.log("Got Error while fetching user profile")
    }
}