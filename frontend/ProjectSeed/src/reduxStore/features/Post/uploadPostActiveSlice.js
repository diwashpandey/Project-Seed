import { createSlice } from "@reduxjs/toolkit";

const uploadPostActiveSlice = createSlice({
    name:"uploadPostActive",
    initialState:false,
    reducers:{
        changeUploadPostActive:(state)=>!state
        }
    })

export const { changeUploadPostActive } = uploadPostActiveSlice.actions

export default uploadPostActiveSlice.reducer