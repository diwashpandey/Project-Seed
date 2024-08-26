import useAxios from "../../hooks/useAxios"

import { UploadPostRequestURL } from "../../utilities/apiEndpoints"


async function fetchUploadPostRequest(caption, images){
    const formData = new FormData();

    formData.append('caption', caption);
    
    if (images) {
        formData.append('images', images); // Append the file object
    }

    try{
        const axiosHook = useAxios()
        const response = await axiosHook.post(UploadPostRequestURL, formData)
        if (response.data.success_status == true){
            return response.data.response_data
        }else{
            return Promise.reject(response.data.message_from_server)
        }
    }
    catch(err){
        return Promise.reject("Something went wrong while uploading your post")
    }
}

export default fetchUploadPostRequest