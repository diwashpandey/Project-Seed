// imports from React
import { useState, useRef } from "react";

// imports from third-party library
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query"

// Additional imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints";
import { changeUploadPostActive } from "../../../reduxStore/features/Post/uploadPostActiveSlice"
import fetchUploadPostRequest from "../../../fetchers/Post/fetchUploadPostRequest";
import { generateProfileRoute } from "../../../utilities/frontendRoutes";

function UploadPost() {

    // Redux States
    const uploadPostActive = useSelector((state)=>state.uploadPostActiveReducer) // Activity states
    const user = useSelector((states)=>states.userReducer) // Will be used for authentication

    // returning null if not active or user is not Verified
    if (!uploadPostActive || !user.isAuthenticated){
        return null
    }

    const textAreaRef = useRef(null)

    // Form States
    const [text, setText] = useState("")
    const [image, setImage] = useState({
                                        "file":null,
                                        "previewURL":null
                                    }); // State to store the uploaded image
    const maxLength = 300; // This max length is for the post caption limitation


    const dispatch = useDispatch()
    const mutation = useMutation(({ caption, images }) => fetchUploadPostRequest(caption, images));
    
    // Closing the box if the mutation is success
    if (mutation.isSuccess){
        dispatch(changeUploadPostActive())
    }

    // This is to handle when the user selects any image
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setImage({
                file: file, // Store the file object
                previewURL: URL.createObjectURL(file) // Create a URL for the preview
            });
        }
    };

    // This is to handle when the user submits the post
    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.length < 1 && image.file === null){
            textAreaRef.current.style.border = '2px solid red'
        }
        else if (!mutation.isLoading){
            textAreaRef.current.style.border = "none"
            mutation.mutate({ caption: text, images: image.file });
        }
    };

    // This is made as a function cause it's being used from multiple place
    
    return (
        // Background box
        <div className="absolute center z-10 h-full w-full bg-[rgba(0,0,0,0.468)]"
        onClick={ ()=> dispatch(changeUploadPostActive()) }>
            {/* Main Box */}
            <div id="post" className="h-[80%] w-[25rem] max-h-[45rem] p-8 rounded-2xl relative bg-main-box shadow-2xl sm:w-[35rem] md:h-[80%] md:max-h-[35rem] lg:w-[50rem] lg:max-h-[40rem]"
            onClick={(e)=>e.stopPropagation()}>{/* putting stopPropagation top prevent the box close when clicked */}
                {/* Cross Button */}
                <div className="h-10 w-10 z-50 center absolute right-4 rounded-full top-2 bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.25)] opacity-25 hover:opacity-75 transition-opacity duration-100 cursor-pointer"
                onClick={ ()=> dispatch(changeUploadPostActive()) }>
                {/* Changing the previous boolean value */}
                    
                    <div className="h-[50%] w-1 rounded-md absolute rotate-45 bg-white"></div>
                    <div className="h-[50%] w-1 rounded-md absolute -rotate-45  bg-white"></div>
                </div>

                {/* Top Stuffs */}
                <div className="flex items-center relative bottom-3 sm:bottom-4">
                {/* Photo Box */}
                <Link to={generateProfileRoute(user.data.username)} className="post-user-profile-photo-container h-[80px] w-[80px] mr-1 rounded-full center relative bottom-9 bg-main-box md:bottom-8 md:mr-2 md:h-[95px] md:w-[95px]">
                    {/* User Profile Photo */}
                    <img src={generatePhotoURL(user.data.profile_photo)} alt="" className="profile-photo h-[80%] w-[80%] bg-gray-500" />
                </Link>
                {/* User FullName */}
                <Link to={generateProfileRoute(user.data.username)} className="relative bottom-2 font-light text-2lg mb-16 md:text-2xl">{user.data.full_name}</Link>
                </div>

                {/* Header */}
                <p className="relative bottom-8 text-base font-light md:text-lg">Share Your Achievement</p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <textarea
                        ref = {textAreaRef}
                        placeholder="Talk something about your achievement..."
                        className="h-56 w-full p-4 rounded-2xl bg-theme-lighter focus:outline-none focus:ring-0 resize-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={maxLength}
                    ></textarea>

                    {/* Character Limit */}
                    <div className="text-right text-sm font-light mt-1">
                        {text.length}/{maxLength}
                    </div>

                    {/* Image Button */}
                    <label htmlFor="achievement-image" className="cursor-pointer inline-block">
                        <div className="h-20 w-20 border border-dashed rounded-md center flex-col relative bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,0.25)] transition-all">
                            {image.previewURL ? (
                                <>
                                    <img src={image.previewURL} alt="Uploaded" className="h-full w-full object-cover rounded-md" />
                                    <div className="h-full w-full p-2 absolute center bg-[rgba(0,0,0,0.75)] rounded-md text-xs text-center font-extralight opacity-0 hover:opacity-100 transition-opacity duration-100">Click to change the picture</div>
                                </>
                            ) : (
                                <>
                                <p className="text-sm font-extralight">Add Image</p>
                                <p className="font-extralight text-3xl">+</p>
                                </>
                            )}
                        </div>
                    </label>
                    <input id="achievement-image" type="file" accept=".jpg,.png" className="hidden absolute" onChange={handleImageUpload} multiple/>
                    
                    {/* Post Button */}
                    <button type="submit" className="btn-white-hollow h-10 w-20 absolute bottom-10 right-10 text-base">
                        {mutation.isLoading ? 'Posting...' : 'Post'}
                    </button>
                </form>
            </div>
            </div>
    );
}

export default UploadPost;
