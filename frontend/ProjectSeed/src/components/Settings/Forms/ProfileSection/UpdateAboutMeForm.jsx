import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import FormFoundation from "../../FormFoundations/FormFoundation";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";
import { updateAboutMeFetcher } from "../../../../fetchers/Settings/ProfileSection/updateAboutMeFetcher";

function UpdateAboutMeForm({ formTitle, description, initialAboutMe }) {
    console.log("Here i am")
    const [aboutMe, setAboutMe] = useState(initialAboutMe || "");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const mutation = useMutation(updateAboutMeFetcher, {
        onSuccess: () => {
            dispatch(resetSettingsFormNumber());
            console.log("About Me updated successfully");
        },
        onError: (error) => {
            setErrorMessage("There was an issue processing your request.");
        },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        if (!aboutMe.trim()) {
            setErrorMessage("About Me section cannot be empty.");
            return;
        }

        mutation.mutate({ about_me: aboutMe?.trim() });
    };

    return (
        <FormFoundation
            formTitle={formTitle}
            description={description}
            error={errorMessage}
        >
            <form onSubmit={submitHandler} className="pb-14 pt-4 w-[26rem]">
                <textarea
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    placeholder="Write something about yourself..."
                    className="textarea textarea-bordered w-full h-40 resize-none rounded-lg p-2 bg-theme-lighter focus-visible:outline-none"
                />

                <button
                    type="submit"
                    className="btn-white-filled mt-4 float-right"
                    disabled={mutation.isLoading}
                >
                    Save
                </button>
            </form>
        </FormFoundation>
    );
}

export default UpdateAboutMeForm;
