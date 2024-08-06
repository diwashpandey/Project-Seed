import useAxios from "../../hooks/useAxios"
import { GetTopProfilesURL } from "../../utilities/apiEndpoints"

export async function topProfilesFetcher(){
    const axiosHook = useAxios()

    try{
        const response = await axiosHook.get(GetTopProfilesURL)
        if (response.data.success_status == true){
            return response.data.response_data
        }
        else{
            throw new Error("There was some problem while fetching data")
        }
    }
    catch(err){
        console.log("Something went wrong while fetching the top profiles", err)
    }
}

