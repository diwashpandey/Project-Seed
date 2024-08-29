import { createSlice } from "@reduxjs/toolkit"

const settingsFormNumberSlice = createSlice({
    name: "settingsFormNumberSlice",
    initialState:0,
    reducers:{
        updateSettingsFormNumber: (state, action)=> {
            return action.payload
        },
        resetSettingsFormNumber: (state)=>{
            return 0
        }
    }
})

export const {updateSettingsFormNumber, resetSettingsFormNumber} = settingsFormNumberSlice.actions
export default settingsFormNumberSlice.reducer