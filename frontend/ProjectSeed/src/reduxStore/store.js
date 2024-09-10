import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./features/Home/homeDataSlice"
import postsReducer from "./features/Post/postsSlice"
import userReducer from "./features/Authentication/userSlice"
import topProfilesReducer from "./features/TopProfiles/topProfilesSlice"
import uploadPostActiveReducer from "./features/Post/uploadPostActiveSlice"
import signUpFormReducer from "./features/Register/signUpFormSlice"
import signUpPageNumReducer from "./features/Register/signUpPageNumSlice"
import signUpFormFeedbackReducer from "./features/Register/signUpFormFeedbackSlice"
import settingsFormNumberReducer from "./features/Settings/settingsFormNumberSlice"
import CollegeProfileReducer from "./features/CollegeProfile/CollegeProfileSlice"
import profileOwnerDataReducer from "./features/Profile/profileOwnerDataSlice"

export const store = configureStore({
    reducer: {
        // Authentication
        userReducer,

        // Home Page
        homeDataReducer,
        postsReducer,

        // Profile Page
        profileOwnerDataReducer,

        // Top Profiles
        topProfilesReducer,

        // UploadPost Box
        uploadPostActiveReducer,

        // Signup
        signUpFormReducer,
        signUpPageNumReducer,
        signUpFormFeedbackReducer,

        // Settings
        settingsFormNumberReducer,

        // College Profile
        CollegeProfileReducer
    }
})
