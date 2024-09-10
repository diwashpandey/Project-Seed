import useAxios from "../../hooks/useAxios"

export async function fetchUserProfileDowntown(url, username, section){
    const axiosHook = useAxios()
    try {
        const response = await axiosHook.get(`${url}?username=${username}&section=${section}`)
        if (response.data.success_status){
            return response.data.response_data
        }
        else{
            return Promise.reject(new Error(response.data.message_from_server))
        }
    }
    catch(err){
        console.log("Got Error",err)
        return Promise.reject(new Error("Something went wrong while fetching the data"))
    }
}