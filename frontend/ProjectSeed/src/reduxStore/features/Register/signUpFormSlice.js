import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    profession:"",
    firstName:"",
    lastName:"",
    gender:"",
    email:"",
    username:"",
    password:"",
    confirmPassword:"",

    usernameAlreadyExists:null,  // If username is available or not ( This is used for both form regestration and Page change too)
    emailAlreadyExists:null,  // if email is available or not ( This is used for both form regestration and Page change too)

    isValidUsername:false,
    isValidEmail:false
}

const signUpFormSlice = createSlice({
    name : "signUpFormSlice",
    initialState,
    reducers:{
        addInSignUpForm:(state, action)=>{
            // Adding the coming data to the state and returning
            return {
                ...state,
                ...action.payload
            };
        },
        resetSignUpForm:()=> initialState
    }
})

export const { addInSignUpForm, resetSignUpForm } = signUpFormSlice.actions

export default signUpFormSlice.reducer