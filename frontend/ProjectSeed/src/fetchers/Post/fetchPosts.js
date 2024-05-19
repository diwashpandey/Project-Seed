import useAxios from "../../hooks/useAxios"


async function fetchPosts(url){
    const offset = 0
    const limit = 25
    const axiosHook = useAxios()

    try{
        const response = await axiosHook.get(`${url}?offset=${offset}&limit=${limit}`)
        if (response.data.success_status == true){
            return response.data.response_data
        }
        else{
            throw new Error("There was some problem while fetching the data")
        }
    }
    catch(err){
        console.log("Something went wrong while fetching the recommended posts")
    }
}

export default fetchPosts