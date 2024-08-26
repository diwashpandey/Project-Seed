import { createSlice } from "@reduxjs/toolkit"

const homeDataSlice = createSlice({
    name:"homeDataSlice",
    initialState:null,
    reducers:{
        setHomeData:(state, action)=>{
            return state = action.payload
        },
    }
})

export const { setHomeData } = homeDataSlice.actions

export default homeDataSlice.reducer