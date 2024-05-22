import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    "isAuthenticated":false,
    "data":null
}

const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        setIsAuthenticatedTrue(state){
            state.isAuthenticated = true
        },
        setIsAuthenticatedFalse(state){
            state.isAuthenticated = false
        },
        setUserData(state, action){
            state.data = action.payload
        },
        removeUserData(state){
            state.data=null
        }
    }
})

export const {setIsAuthenticatedTrue, setIsAuthenticatedFalse, setUserData, removeUserData} = userSlice.actions

export default userSlice.reducer