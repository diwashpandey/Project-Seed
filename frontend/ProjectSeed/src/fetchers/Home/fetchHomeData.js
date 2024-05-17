import useAxios from "../../hooks/useAxios"

// This required url according to the user Authentication
export const fetchHomeData = async (url) => {
    const axios = useAxios()
    const response = await axios.get(url)
    if (response.data.success_status){
        return response.data.response_data
    }
    else{
        throw new Error(response.data.message_from_server)
    }
}
