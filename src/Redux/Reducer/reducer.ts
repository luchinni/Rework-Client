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
        title: "Página de paisajes (solo front)",
        name: "Jason",
        photoClient: "https://www.movilzona.es/app/uploads-movilzona.es/2019/07/Foto-de-Perfil-en-WhatsApp-650x340.jpg",
        rating: 3.7
      },
      {
        remuneration: [75, 90],
        description: "borrar a mi pareja de la foto y que no se note que estaba ahi",
        work_duration_time: "2 dias",
        photo: "https://st2.depositphotos.com/3143277/5385/i/450/depositphotos_53855469-stock-photo-silhouette-couple.jpg",
        tags: ["photoshop", "design", "illustrator"],
        title: "eliminar a mi pareja",
        name: "Moshep",
        photoClient: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.2
      },
      {
        remuneration: [160, 200],
        description: "quiero hacer una plataforma de ventas de productos con carrito y pagos electrónicos",
        work_duration_time: "3 semanas",
        photo: "https://www.imagar.com/wp-content/uploads/2020/07/Desarrollo-web-ecommerce-1.jpg",
        tags: ["front end developer", "design", "full stack", "css", "javaScript", "back end developer", "express"],
        title: "Página de ecommerce",
        name: "Molia",
        photoClient: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        rating: 4.8
      }]
    dispatch(setAllOffers(offer));
}