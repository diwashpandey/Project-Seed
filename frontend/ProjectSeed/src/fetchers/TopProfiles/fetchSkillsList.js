import useAxios from "../../hooks/useAxios";
import { SkillsListURL } from "../../utilities/apiEndpoints";

export async function fetchSkillsList() {
    const axiosHook = useAxios();
    const response = await axiosHook.get(SkillsListURL);

    if (response.data.success_status) {
        return response.data.response_data;
    } else {
        throw new Error(response.data.message_from_server);
    }
}