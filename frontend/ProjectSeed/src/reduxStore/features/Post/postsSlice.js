import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const postsSlice = createSlice({
        name: "postsSlice",
        initialState,
        reducers:{
            addPosts: (state, action) => {
                state.push(action.payload)
            }
        }
})

export const { addPosts } = postsSlice.actions

export default postsSlice.reducer
