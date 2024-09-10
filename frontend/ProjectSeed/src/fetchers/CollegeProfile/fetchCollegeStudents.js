import useAxios from "../../hooks/useAxios";
import { GetCollegeStudentsURL } from "../../utilities/apiEndpoints"

export async function fetchCollegeStudents(collegeIdentifier, start = 0, count = 25) {
    const axiosHook = useAxios();
    try {
        const response = await axiosHook.get(GetCollegeStudentsURL(collegeIdentifier, start, count));
        if (response.data.success_status) {
            return response.data.response_data;
        } else {
            return Promise.reject(new Error(response.data.message_from_server));
        }
    } catch (err) {
        console.log("Got Error", err);
        return Promise.reject(new Error("Something went wrong while fetching the data"));
    }
}
