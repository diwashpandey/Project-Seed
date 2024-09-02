import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import FormFoundation from "../../FormFoundations/FormFoundation";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";
import { updateBackgroundPhotoFetcher } from "../../../../fetchers/Settings/ProfileSection/updateBackgroundPhotoFetcher";
import { generatePhotoURL } from "../../../../utilities/apiEndpoints";
import DeleteIcon from "../../Icons/DeleteIcon";
import UploadIcon from "../../Icons/UploadIcon";

function UpdateBackgroundPhotoForm({ formTitle, description }) {
    const [image, setImage] = useState({ file: null, previewURL: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [commit, setCommit] = useState("update"); // default to "update" commit
    const user = useSelector((states) => states.userReducer);
    
    const dispatch = useDispatch();

    const mutation = useMutation(updateBackgroundPhotoFetcher, {
        onSuccess: () => {
            dispatch(resetSettingsFormNumber());
            console.log("Background photo updated successfully");
        },
        onError: (error) => {
            setErrorMessage("There was an issue processing your request.");
        },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        if (commit === "update" && !image.file) {
            setErrorMessage("Please select a background photo.");
            return;
        }

        mutation.mutate({ file: image.file, commit });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setImage({
                file: file,
                previewURL: URL.createObjectURL(file),
            });
        }
    };

    const handleRemovePhoto = () => {
        setCommit("remove");
        setImage({ file: null, previewURL: "" });
        mutation.mutate({ file: null, commit: "remove" });
    };

    return (
        <FormFoundation
            formTitle={formTitle}
            description={description}
            error={errorMessage}
        >
            <form onSubmit={submitHandler} className="flex center flex-col gap-16 pb-14 pt-4 w-[26rem]">
                <div className="h-28 w-96 rounded-3xl border border-dashed border-text-color relative">
                    <img src={generatePhotoURL(user.data.background_photo)} alt="" className="h-full w-full object-cover rounded-3xl"/>
                    <button type="button" onClick={handleRemovePhoto} className="btn-white-hollow absolute left-1/2 -translate-x-1/2 -bottom-10 space-x-1 w-20">
                        <p>Remove</p>
                        <DeleteIcon />
                    </button>
                </div>

                {/* Image Button */}
                <label htmlFor="background-photo" className="cursor-pointer inline-block relative">
                    <div className="h-28 w-96 border border-dashed rounded-3xl center flex-col relative border-text-color bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.25)] transition-all">
                        {image.previewURL ? (
                            <>
                                <img src={image.previewURL} alt="Uploaded" className="h-full w-full object-cover rounded-3xl" />
                                <div className="h-full w-full p-2 absolute center bg-[rgba(0,0,0,0.75)] rounded-md text-xs text-center font-extralight opacity-0 hover:opacity-100 transition-opacity duration-100">Click to change the picture</div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-extralight mb-1">Upload new photo</p>
                                <UploadIcon height="50px" />
                            </>
                        )}
                    </div>
                    <div className="btn-white-hollow absolute left-1/2 -translate-x-1/2 -bottom-10 space-x-1 w-20">
                        <p>Upload</p>
                        <UploadIcon />
                    </div>
                </label>
                
                <input
                    id="background-photo"
                    type="file"
                    accept=".jpg,.png"
                    className="hidden absolute"
                    onChange={handleImageUpload}
                />

                <button
                    type="submit"
                    className="btn-white-filled absolute bottom-3 right-3"
                    disabled={mutation.isLoading}
                >
                    Save
                </button>
            </form>
        </FormFoundation>
    );
}

export default UpdateBackgroundPhotoForm;
