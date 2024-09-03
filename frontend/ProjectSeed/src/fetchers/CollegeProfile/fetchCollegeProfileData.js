import { CollegeProfileURL } from "../../utilities/apiEndpoints"
import useAxios from "../../hooks/useAxios"

export async function fetchCollegeProfileData(college_identifier){
    const axiosHook = useAxios()
    try {
        const response = await axiosHook.get(`${CollegeProfileURL}?college_identifier=${college_identifier}`)
        if (response.data.success_status){
            return response.data.response_data
        }
        else{
            return Promise.reject(response.data.message_from_server)
        }
    }
    catch(err){
        // return Promise.reject(new Error("Something went wrong while fetching the data"))
        console.log("Got Error while fetching user profile")
    }
}