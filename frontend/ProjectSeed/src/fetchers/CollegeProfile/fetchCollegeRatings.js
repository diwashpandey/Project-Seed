import useAxios from "../../hooks/useAxios"

export async function fetchCollegeRatings(url){
    const axiosHook = useAxios()
    try {
        const response = await axiosHook.get(url)
        if (response.data.success_status){
            console.log("response data here is:", response)
            return response.data.response_data
        }
        else{
            console.log("Got response status Fasle")
            return Promise.reject(response.data.message_from_server)
        }
    }
    catch(err){
        // return Promise.reject(new Error("Something went wrong while fetching the data"))
        console.log("Got Error while fetching user profile")
    }
}