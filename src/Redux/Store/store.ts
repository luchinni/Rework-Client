import { configureStore } from "@reduxjs/toolkit";
import workService from "../Reducer/reducer"

const store = configureStore({
    reducer: {
        workService
    }
})

export default store;