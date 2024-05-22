import useAxios from "../../hooks/useAxios"
import { AuthUserDataURL } from "../../utilities/apiEndpoints"

export async function userDataFetcher(){
    const axiosHook = useAxios()

    try{
        const response = await axiosHook.get(AuthUserDataURL)
        if (response.data.success_status == true){
            return response.data.response_data

        }
        else{
            throw new Error("There was some problem while fetching user data")
        }
    }
    catch(err){
        console.log("Something went wrong while fetching the recommended posts", err)
    }
}

