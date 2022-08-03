import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allClients: [],
    clientById: {},
}

export const workServiceSlice = createSlice({
    name: "workService",
    initialState,
    reducers:{
        setAllClients: function (state:any, action:any){
            state.allClients = action.payload;
        },
    }
})

export const { setAllClients } = workServiceSlice.actions;

export default workServiceSlice.reducer;

//aca van las actions