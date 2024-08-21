import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./features/Home/homeDataSlice"
import postsReducer from "./features/Post/postsSlice"
import userReducer from "./features/Authentication/userSlice"
import topProfilesReducer from "./features/TopProfiles/topProfilesSlice"

export const store = configureStore({
    reducer: {
        homeDataReducer,
        postsReducer,
        userReducer,
        topProfilesReducer
    }
})
