import useAxios from "../../hooks/useAxios"

export async function topProfilesFetcher(url){
    const axiosHook = useAxios()

    const response = await axiosHook.get(url)
    if (response.data.success_status == true){
        return response.data.response_data
    }
    else{
        throw new Error("There was some problem while fetching data")
    }

}

