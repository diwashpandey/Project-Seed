import useAxios from "../../../hooks/useAxios"
import { UpdateSkillsURL } from "../../../utilities/apiEndpoints"

export async function updateSkillsFetcher(data){
    const axiosHook = useAxios()

    const response = await axiosHook.post(UpdateSkillsURL, data)
    
    if (response.data.success_status == true){
        return response.data.response_data
    }
    else{
        throw new Error(response.data.message_from_server)
    }
}