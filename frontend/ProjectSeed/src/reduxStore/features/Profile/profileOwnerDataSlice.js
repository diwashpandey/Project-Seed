import { createSlice } from "@reduxjs/toolkit";


export const profileOwnerDataSlice = createSlice({
        name: "profileOwnerDataSlice",
        initialState:null,
        reducers:{
            setProfileOwnerData: (state, action) => action.payload,
            resetProfileOwnerData: (state) => null
        }
})

export const { setProfileOwnerData, resetProfileOwnerData } = profileOwnerDataSlice.actions

export default profileOwnerDataSlice.reducer
