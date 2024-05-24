import useAxios from "../../hooks/useAxios";

import { UserProfileRiseURL } from "../../utilities/apiEndpoints"

async function fetchProfileRiseRequest(commit, username){
    try{
        const data = {
            "commit":commit,
            "username":username
        }
        const axiosHook = useAxios()
        const response = await axiosHook.post(UserProfileRiseURL, data)
        if (response.data.success_status == true){
            return response.data.response_data
        }else{
            return Promise.reject("Sorry, you rise/unrise request couldn't happen")
        }
    }
    catch(err){
        return Promise.reject("Something went wrong")
    }
}

export default fetchProfileRiseRequest