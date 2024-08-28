import { createSlice } from "@reduxjs/toolkit"

const signUpPageNumSlice = createSlice({
    name : "signUpPageNumSlice",
    initialState:1,
    reducers:{
        increasePageNo:(state)=>state+1,
        decreasePageNo:(state)=>state-1,
        setPageNo:(state, action)=>action.payload
    }
})

export const { increasePageNo, decreasePageNo, setPageNo } = signUpPageNumSlice.actions

export default signUpPageNumSlice.reducer