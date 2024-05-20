import useAxios from "../../hooks/useAxios"
import { AuthUserDataURL } from "../../utilities/apiEndpoints"

export async function authUserDataFetcher(){
    const axiosHook = useAxios()
    console.log("I'm about to fetch auth user data")

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

