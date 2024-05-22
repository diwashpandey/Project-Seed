import useAxios from "../../hooks/useAxios"

import { PostRiseRequestURL } from "../../utilities/apiEndpoints"



async function fetchPostRiseRequest(commit, postId){
    try{
        const data = {
            "commit":commit,
            "postId":postId
        }
        const axiosHook = useAxios()
        const response = await axiosHook.post(PostRiseRequestURL, data)
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

export default fetchPostRiseRequest