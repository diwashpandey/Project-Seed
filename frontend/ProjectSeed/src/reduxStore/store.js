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

export const store = configureStore({
    reducer: {
        homeDataReducer,
        postsReducer,
        userReducer,
        topProfilesReducer,
        uploadPostActiveReducer,
        signUpFormReducer,
        signUpPageNumReducer,
        signUpFormFeedbackReducer,
        settingsFormNumberReducer,
        CollegeProfileReducer
    }
})
