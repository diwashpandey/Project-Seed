import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    errorStatus:false,
    errorMessage:"",
    errorCode:0,

    successStatus:false,
    successMessage:"",
    successCode:0
}

const signUpFormFeedbackSlice = createSlice({
    name : "signUpFormFeedbackSlice",
    initialState,
    reducers:{
        setSignUpFormStatus:(state, action)=>{
            return {
                ...state,
                ...action.payload
            }
        },
        resetSignUpFormStatus: () => {
            console.log("I'm here in resetSignUpForm")
            return initialState
        }
        
    }
})

export const { setSignUpFormStatus, resetSignUpFormStatus } = signUpFormFeedbackSlice.actions

export default signUpFormFeedbackSlice.reducer