import { configureStore } from "@reduxjs/toolkit"
import homeDataReducer from "./features/Home/homeDataSlice"
import postsReducer from "./features/Post/postsSlice"
import authUserDataReducer from "./features/Authentication/authUserDataSlice"
import isAuthenticatedReducer from "./features/Authentication/isAuthenticatedSlice"


export const store = configureStore({
    reducer: {
        isAuthenticatedReducer,
        homeDataReducer,
        postsReducer,
        authUserDataReducer
    }
})
