import {createSlice} from "@reduxjs/toolkit"

const isAuthenticatedSlice = createSlice({
    name:"isAuthenticatedSlice",
    initialState:false,
    reducers:{
        setIsAuthenticatedFalse: (state)=>{
            state = false
        },
        setIsAuthenticatedTrue: (state)=>{
            state = true
        },
    }
})

export default isAuthenticatedSlice.reducer

export const {setIsAuthenticatedFalse, setIsAuthenticatedTrue} = isAuthenticatedSlice.actions