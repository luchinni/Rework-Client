import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as type from "../../Types"
import { Dispatch } from "redux";


const initialState = {
    allClients: [],
    infoSearched: [],
    search:"",
    clientById: {},
    offers: [],
    offerById: {},
    professions:[],
    skills: [],
    currentUser: {
      password: "",
      user_mail: ""
    }
}


export const workServiceSlice = createSlice({
    name: "workService",
    initialState,
    reducers:{
        setAllClients: function (state:any, action:any){
            state.allClients = action.payload;
        },
        setSearchedWorkers: function (state:any, action:any){
          state.infoSearched = action.payload;
      },
        setSearchedOffers: function (state:any, action:any){
        state.infoSearched = action.payload;
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
        },
        setAllSkills: function (state:any, action:any){
          state.skills = action.payload
        },
        setSearch: function (state:any, action:any){
          state.search = action.payload
        },
        setCurrentUser: function (state:any, action:any){
          state.currentUser = action.payload;
      }
    }
})

export const { setAllClients, setClientById, setAllOffers, setSearch, setAllSkills, setOfferById, setAllProfessions, setSearchedWorkers, setSearchedOffers, setCurrentUser } = workServiceSlice.actions;


export default workServiceSlice.reducer;

//aca van las actions

export const getClients = (clients:any) => (dispatch:Dispatch<any>) =>{
    dispatch(setAllClients(clients))
}

export const postNewOffer = async(newOffer:type.newOfferType) => {
  try {
     console.log(newOffer)
    return await axios({
      method:"post",
      url: "http://localhost:3001/offer",
      data:newOffer
      
    })
  }catch(error){
    return error
  }
}

 export const getOffers = () => async (dispatch:Dispatch<any>) => {
  try {
    const offers = await axios.get("http://localhost:3001/offer/")
    dispatch(setAllOffers(offers.data));
  } catch (error) {
    alert("Error al requerir las ofertas.")
  }
     
     //
 }

export const getOfferId = (id:String | undefined) => async (dispatch:Dispatch<any>) => {
  console.log(id)
  try{
    const offerId = await axios(`http://localhost:3001/offer/${id}`)
    console.log(offerId)
    return dispatch(setOfferById(offerId.data));
  }
  catch(e){
    alert("Error al requerir el detalle.")
  }
 
  // {
  //   remuneration: [100, 150],
  //   description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
  //   work_duration_time: "1 semana",
  //   photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
  //   tags: ["front end developer", "design", "full stack", "css", "javaScript"],
  //   title: "Página de paisajes (solo front)",
  //   name: "Esteban Longo",
  //   photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
  //   rating: 3.7,
  //   proposals: [{
  //     name: "Juan Carlos",
  //     remunerationProposal: 125,
  //     proposal_description: "experto en la materia",
  //     worked_time: "5 dias",
  //     idWorker: "159abc"
  //   },
  //   {
  //     name: "Jose Perez",
  //     remunerationProposal: 118,
  //     proposal_description: "tengo un portfolio repleto de lo que necesitas",
  //     worked_time: "4 dias",
  //     idWorker: "164dse"
  //   },
  //   {
  //     name: "Carlos Juan",
  //     remunerationProposal: 114,
  //     proposal_description: "puedo realizar ese trabajo",
  //     worked_time: "6 dias",
  //     idWorker: "147ase"
  //   }],   
  // }
    
 }

export const getAllProfession = () => async (dispatch: any) => {
  const profs = await axios(`http://localhost:3001/profession`)
  return dispatch(setAllProfessions(profs.data));
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

export const getAllSkills = () => async(dispatch: any) => {
  //http://localhost:3001/skills
  const skills = await axios(`http://localhost:3001/skills`)
  return dispatch(setAllSkills(skills.data));
  // [
  //   "Central",
  //   "Chief",
  //   "Corporate",
  //   "Customer",
  //   "Direct",
  //   "District",
  //   "Dynamic",
  //   "Forward",
  //   "Future",
  //   "Global",
  //   "Human",
  //   "Internal",
  //   "International",
  //   "Investor",
  //   "Lead",
  //   "Legacy",
  //   "National",
  //   "Principal",
  //   "Product",
  //   "Regional",
  //   "Senior"
  // ]
 
}

export const postNewClient = async (newClient:type.newClientType) => {
  try{
    return await axios({
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
 
export const postLogin = (user: type.userLogin) => async (dispatch: any) => {
try{
  // generamos el token conectando con el back
  const token = await axios({
    method:"post",
    url: "http://localhost:3001/login/",
    data: user
  })
  // lo pasamos a json y lo guardamos en la consola en application local storage
  localStorage.setItem("token", JSON.stringify(token.data))
  // alojamos el usuario logueado en el initialState.currentUser
  return dispatch(setCurrentUser(user))
} catch(e){
  return e
}
}

export const searchWorker =  (input:string) => async (dispatch:Dispatch<any>) => {
  try {
    if(input==="")return ""
    const workers = await axios.get(`http://localhost:3001/worker/search?q=${input}`)
    dispatch(setSearchedWorkers(workers.data))
    dispatch(setSearch("worker"));
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
    dispatch(setSearch("offer"));
  } catch (error) {
    alert("Hubo un error al intentar traer las ofertas")
  }
}

export const resetSearch = () => async (dispatch:Dispatch<any>) => {
    dispatch(setSearch(""));
}