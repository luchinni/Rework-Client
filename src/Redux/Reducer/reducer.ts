import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as type from "../../Types"
import { Dispatch } from "redux";


const initialState = {
    allClients: [],
    searchedWorkers: [],
    searchedOffers: [],
    clientById: {},
    offers: [],
    offerById: {},
    professions:[],
    skills: []
}


export const workServiceSlice = createSlice({
    name: "workService",
    initialState,
    reducers:{
        setAllClients: function (state:any, action:any){
            state.allClients = action.payload;
        },
        setSearchedWorkers: function (state:any, action:any){
          state.searchedWorkers = action.payload;
      },
        setSearchedOffers: function (state:any, action:any){
        state.searchedOffers = action.payload;
    },
        setClientById: function (state:any, action:any){
            state.clientById = action.payload;
        },
        setAllOffers: function (state:any, action:any){
            state.offers = action.payload;
        },
        setOfferById: function (state:any, action:any){
          state.offerById = action.payload;
      },
        setAllProfessions: function (state:any, action:any){
          state.professions = action.payload
        }
    }
})


export const { setAllClients, setClientById, setAllOffers, setOfferById, setAllProfessions, setSearchedWorkers, setSearchedOffers } = workServiceSlice.actions;


export default workServiceSlice.reducer;

//aca van las actions

export const getClients = (clients:any) => (dispatch:any) =>{
    dispatch(setAllClients(clients))
}

 export const getOffers = () => async (dispatch:any) => {
  try {
    const offers = await axios.get("http://localhost:3001/offer/")
    console.log(offers.data)
    dispatch(setAllOffers(offers.data));
  } catch (error) {
    alert("Error al requerir las ofertas.")
  }
     
     //
 }

export const getOfferId = () => (dispatch: any) => {
  const offerId: object = {
    remuneration: [100, 150],
    description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
    work_duration_time: "1 semana",
    photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
    tags: ["front end developer", "design", "full stack", "css", "javaScript"],
    title: "Página de paisajes (solo front)",
    name: "Esteban Longo",
    photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
    rating: 3.7,
    proposals: [{
      name: "Juan Carlos",
      remunerationProposal: 125,
      proposal_description: "experto en la materia",
      worked_time: "5 dias",
      idWorker: "159abc"
    },
    {
      name: "Jose Perez",
      remunerationProposal: 118,
      proposal_description: "tengo un portfolio repleto de lo que necesitas",
      worked_time: "4 dias",
      idWorker: "164dse"
    },
    {
      name: "Carlos Juan",
      remunerationProposal: 114,
      proposal_description: "puedo realizar ese trabajo",
      worked_time: "6 dias",
      idWorker: "147ase"
    }],   
  }
    dispatch(setOfferById(offerId));
 }

export const getAllProfession = () => async (dispatch: any) => {
  let profs: string[] = await (await axios(`http://localhost:3001/profession`)).data
  return dispatch(setAllProfessions(profs));
//   const profs: String[] = 
//   [
//     "Administrator",
//     "Agent",
//     "Analyst",
//     "Architect",
//     "Assistant",
//     "Associate",
//     "Consultant",
//     "Coordinator",
//     "Designer",
//     "Developer",
//     "Director",
//     "Engineer",
//     "Executive",
//     "Facilitator",
//     "Liaison",
//     "Manager",
//     "Officer",
//     "Orchestrator",
//     "Planner",
//     "Producer",
//     "Representative",
//     "Specialist",
//     "Strategist",
//     "Supervisor",
//     "Technician",
//     "Other"
// ]

}

export const postNewClient = (newClient:type.newClientType) => {
  try{
    return axios({
      method:"post",
      url: "http://localhost:3001/register/client",
      data:newClient
    })
  }catch(error){
    return error
  }
}

export const postNewWorker = async (newWorker:type.newWorkerType) => {
  try{
    return await axios({
      method:"post",
      url: "http://localhost:3001/register/worker",
      data:newWorker
    })
  }catch(error){
    return error
  }
}

export const loginUser = (newLoggedUser:type.loginType) => {
  try{
    return axios({
      method:"get",
      url: "http://localhost:3001/login/in",
      data:newLoggedUser
    })
  }catch(error){
    return error
  }
}

export const searchWorker =  (input:string) => async (dispatch:Dispatch<any>) => {
  try {
    if(input==="")return ""
    const workers = await axios.get(`http://localhost:3001/worker/search?q=${input}`)
    dispatch(setSearchedWorkers(workers.data))
    return ""
  } catch (error) {
    alert("Hubo un error al intentar traer los trabajadores")
  }
}

export const searchOffer = (input:string) => async (dispatch:Dispatch<any>) => {
  try {
    if(input==="")return
    const offers = await axios.get(`http://localhost:3001/offer/search?q=${input}`)
    dispatch(setSearchedOffers(offers.data))
  } catch (error) {
    alert("Hubo un error al intentar traer las ofertas")
  }
}