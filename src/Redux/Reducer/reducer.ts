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
         description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
         work_duration_time: "1 semana",
         photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
         tags: ["front end developer", "design", "full stack", "css", "javaScript"],
         title: "Página de paisajes (solo front)",
         name: "Esteban Longo",
         photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
         rating: 3.7
       }]
     dispatch(setAllOffers(offer));
 }

// export const getOffer = () => (dispatch:any) => {
//     //{remuneration: number[], description: string, work_duration_time: string, photo: string, tags: string[], title: string}
//     const offer:string[] = ["hola", "chau"]
//     dispatch(setAllOffers(offer));
// }