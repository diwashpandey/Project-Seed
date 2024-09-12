import useAxios from "../../../hooks/useAxios"
import { UpdateInterestsURL } from "../../../utilities/apiEndpoints"

export async function updateInterestsFetcher(data){
    const axiosHook = useAxios()

    const response = await axiosHook.post(UpdateInterestsURL, data)
    
    if (response.data.success_status == true){
        return response.data.response_data
    }
    else{
        throw new Error(response.data.message_from_server)
    }
}