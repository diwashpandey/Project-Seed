import useAxios from "../../hooks/useAxios";
import { GetCollegeMembersURL } from "../../utilities/apiEndpoints"

export async function fetchCollegeMembers(collegeIdentifier, start = 0, count = 25) {
    const axiosHook = useAxios();
    try {
        const response = await axiosHook.get(GetCollegeMembersURL(collegeIdentifier, start, count));
        console.log("Response in fetchCollegeMembers:", response)
        if (response.data.success_status) {
            return response.data.response_data;
        } else {
            return Promise.reject(new Error(response.data.message_from_server));
        }
    } catch (err) {
        console.log("Got Error while fetching college members", err);
        return Promise.reject(new Error("Something went wrong while fetching the data"));
    }
}
