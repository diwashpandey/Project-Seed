import useAxios from "../../../hooks/useAxios";
import { InterestsListURL } from "../../../utilities/apiEndpoints";

export async function fetchInterestsList() {
    const axiosHook = useAxios();
    const response = await axiosHook.get(InterestsListURL);

    if (response.data.success_status) {
        return response.data.response_data;
    } else {
        throw new Error(response.data.message_from_server);
    }
}
