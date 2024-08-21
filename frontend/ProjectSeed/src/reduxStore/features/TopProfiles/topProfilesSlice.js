import { createSlice } from "@reduxjs/toolkit";

let initialState = []

let topProfilesSlice = createSlice({
    name:"topProfiles",
    initialState,
    reducers:{
        addTopProfiles:(state, action)=> state = action.payload
        
    }
})

export const { addTopProfiles } = topProfilesSlice.actions

export default topProfilesSlice.reducer