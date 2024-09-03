import { createSlice } from "@reduxjs/toolkit"

const collegeProfileSlice = createSlice({
    name:"collegeProfileSlice",
    initialState:null,
    reducers:{
        setCollegeProfileData:(state, action)=>{
            return action.payload
        },
    }
})

export const { setCollegeProfileData } = collegeProfileSlice.actions

export default collegeProfileSlice.reducer