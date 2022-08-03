import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allClients: [],
    clientById: {},
    offers: [],
}

export const workServiceSlice = createSlice({
    name: "workService",
    initialState,
    reducers:{
        setAllClients: function (state:any, action:any){
            state.allClients = action.payload;
        },
        setClientById: function (state:any, action:any){
            state.clientById = action.payload;
        },
        setAllOffers: function (state:any, action:any){
            console.log(action.payload)
            state.offers = action.payload;
        },
    }
})

export const { setAllClients, setClientById, setAllOffers } = workServiceSlice.actions;

export default workServiceSlice.reducer;

//aca van las actions

export const getClients = (clients:any) => (dispatch:any) =>{
    dispatch(setAllClients(clients))
}

export const getOffer = () => (dispatch:any) => {
    //{remuneration: number[], description: string, work_duration_time: string, photo: string, tags: string[], title: string}
    const offer:object[] = [{
        remuneration: [100, 150],
        description: "necesito que me hagan el front end de mi vida",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)"
      },
      {
        remuneration: [100, 150],
        description: "necesito que me hagan el front end de mi vida",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)"
      },
      {
        remuneration: [100, 150],
        description: "necesito que me hagan el front end de mi vida",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)"
      }]
    dispatch(setAllOffers(offer));
}