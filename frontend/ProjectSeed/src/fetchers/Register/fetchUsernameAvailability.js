import axios from "axios";
import { UsernameAvailabilityServiceURL } from "../../utilities/apiEndpoints";

async function fetchUsernameAvailability(usernameAskedFor) {

    const dataForServer = { asked_for_username: usernameAskedFor }

    try {
        const response = await axios.post(UsernameAvailabilityServiceURL, dataForServer);
        if (response.data.success_status === true) {
            return response.data;
        } else {
            return Promise.reject(response.data.message_from_server);
        }
    } catch (err) {
        console.error(err); // Log the actual error for debugging
        return Promise.reject("Something went wrong while uploading your post");
    }
}
export default fetchUsernameAvailability;