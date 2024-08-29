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
        },
        updateUserData(state, action){
            state.data = {...state.data , ...action.payload}
            return state
        }
    }
})

export const {setIsAuthenticatedTrue, setIsAuthenticatedFalse, setUserData, removeUserData, updateUserData} = userSlice.actions

export default userSlice.reducer