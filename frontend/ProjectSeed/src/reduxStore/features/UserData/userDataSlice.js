import { createSlice } from "@reduxjs/toolkit";

const authUserDataSlice = createSlice({
    name: "userDataSlice",
    initialState:null,
    reducers:{
        setAuthUserData: (state, action) =>{
            console.log("\n\n\nHere to set the auth data")
            return action.payload
        }
    }
})

export default authUserDataSlice.reducer

export const { setAuthUserData } = authUserDataSlice.actions