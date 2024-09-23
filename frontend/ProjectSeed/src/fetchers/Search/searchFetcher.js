// fetchers/Settings/SearchFetcher.js
import useAxios from "../../hooks/useAxios";
import { SearchURL } from "../../utilities/apiEndpoints";

export async function searchFetcher(query) {
    const axiosHook = useAxios();
    const response = await axiosHook.get(SearchURL(query));

    if (response.data.success_status) {
        return response.data.response_data;
    } else {
        throw new Error(response.data.message_from_server);
    }
}
