import useAxios from "../../../hooks/useAxios";
import { UpdateAboutMeURL } from "../../../utilities/apiEndpoints";

export async function updateAboutMeFetcher({ about_me }) {
    const axiosHook = useAxios();

    const response = await axiosHook.post(UpdateAboutMeURL, { about_me });

    if (response.data.success_status === true) {
        return response.data.response_data;
    } else {
        throw new Error(response.data.message_from_server);
    }
}
