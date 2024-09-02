import useAxios from "../../../hooks/useAxios";
import { UpdateBackgroundPhotoURL } from "../../../utilities/apiEndpoints";

export async function updateBackgroundPhotoFetcher({ file, commit }) {
    const formData = new FormData();
    formData.append("commit", commit); // "update" or "remove"
    
    if (file) {
        formData.append("background_photo", file);
    }

    const axiosHook = useAxios();

    const response = await axiosHook.post(UpdateBackgroundPhotoURL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    if (response.data.success_status === true) {
        return response.data.response_data;
    } else {
        throw new Error(response.data.message_from_server);
    }
}