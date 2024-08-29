import useAxios from "../../../hooks/useAxios"
import { UpdateFirstAndLastNameURL } from "../../../utilities/apiEndpoints"

export async function updateFirstAndLastNameFetcher(data){
    const dataToSend = {"new_first_name":data.firstName,
                        "new_last_name":data.lastName}
    const axiosHook = useAxios()

    const response = await axiosHook.post(UpdateFirstAndLastNameURL, dataToSend)
    
    if (response.data.success_status == true){
        return response.data.response_data
    }
    else{
        throw new Error(response.data.message_from_server)
    }
}