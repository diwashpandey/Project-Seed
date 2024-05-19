import useAxios from "../../hooks/useAxios"

export async function fetchUserProfileDowntown(url, username, section){
    const axiosHook = useAxios()
    console.log("about to fetch user downtown section")
    try {
        const response = await axiosHook.get(`${url}?username=${username}&section=${section}`)
        if (response.data.success_status){
            console.log("Got the data for section:",section,"data is:", response.data)
            return response.data.response_data
        }
        else{
            console.log("Got downtown data but with success_status = false")
            return Promise.reject(new Error(response.data.message_from_server))
        }
    }
    catch(err){
        console.log("Got Error",err)
        return Promise.reject(new Error("Something went wrong while fetching the data"))
    }
}