import useAxios from "../../hooks/useAxios";
import { CollegesListURL } from "../../utilities/apiEndpoints";

export async function fetchCollegesList() {
    const axiosHook = useAxios();
    const response = await axiosHook.get(CollegesListURL);

    try{

        if (response.data.success_status) {
            return response.data.response_data;
        } else {
            throw new Error(response.data.message_from_server);
        }
    }
    catch {
        throw new Error("Error occured while fetching Colleges List")
    }
}