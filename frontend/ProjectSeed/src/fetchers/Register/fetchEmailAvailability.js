import axios from "axios";
import { EmailAvailabilityServiceURL } from "../../utilities/apiEndpoints";

async function fetchUsernameAvailability(emailAskedFor) {

    const dataForServer = { asked_for_email: emailAskedFor }

    try {
        const response = await axios.post(EmailAvailabilityServiceURL, dataForServer);
        if (response.data.success_status === true) {
            return response.data.response_data;
        } else {
            return Promise.reject(response.data.message_from_server);
        }
    } catch (err) {
        console.error(err); // Log the actual error for debugging
        return Promise.reject("Something went wrong while uploading your post");
    }
}
export default fetchUsernameAvailability;