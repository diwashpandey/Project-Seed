import useAxios from "../../../hooks/useAxios"
import { UpdateIntroURL } from "../../../utilities/apiEndpoints"

export async function updateIntroURLFetcher(data){
    const dataToSend = {"new_intro":data}
    const axiosHook = useAxios()

    const response = await axiosHook.post(UpdateIntroURL, dataToSend)
    
    if (response.data.success_status == true){
        return response.data.response_data
    }
    else{
        throw new Error(response.data.message_from_server)
    }
}