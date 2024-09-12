import useAxios from "../../../hooks/useAxios";
import { UpdateLocationURL } from "../../../utilities/apiEndpoints";

export async function updateLocationFetcher({ city, state, country }) {
    const axiosHook = useAxios();

    const response = await axiosHook.post(UpdateLocationURL, { city, state, country });

    if (response.data.success_status === true) {
        return response.data.response_data;
    } else {
        throw new Error(response.data.message_from_server);
    }
}
