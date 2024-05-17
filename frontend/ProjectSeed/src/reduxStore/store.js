import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./features/Home/homeDataSlice"
import postsReducer from "./features/Post/postsSlice"
import authUserDataReducer from "./features/UserData/userDataSlice"


export const store = configureStore({
    reducer: {
        homeDataReducer,
        postsReducer,
        authUserDataReducer
    }
})
