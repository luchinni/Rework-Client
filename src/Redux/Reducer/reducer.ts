import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as type from "../../Types";
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
        },
        sortAllOffersAZ: function (state:any){
          if(state.search ===""){
          state.offers = [...state.offers].sort((prev:any, next:any) => {
            if (prev.title > next.title) {
              return 1;
            }
            if (prev.title < next.title) {
              return -1;
            }
            return 0;
          });
        }else if(state.search==="offer"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.title > next.title) {
              return 1;
            }
            if (prev.title < next.title) {
              return -1;
            }
            return 0;
          });
        }else if(state.search==="worker"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.name > next.name) {
              return 1;
            }
            if (prev.name < next.name) {
              return -1;
            }
            return 0;
          });
        }
        },
        sortAllOffersZA: function (state:any){
          if(state.search ===""){
          state.offers = [...state.offers].sort((prev:any, next:any) => {
            if (prev.title > next.title) {
              return -1;
            }
            if (prev.title < next.title) {
              return 1;
            }
            return 0;
          });
        }else if(state.search==="offer"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.title > next.title) {
              return -1;
            }
            if (prev.title < next.title) {
              return 1;
            }
            return 0;
          });
        }else if(state.search==="worker"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.name > next.name) {
              return -1;
            }
            if (prev.name < next.name) {
              return 1;
            }
            return 0;
          });
        }
        },
        sortAllOffers15: function (state:any){
          if(state.search ===""){
          state.offers = [...state.offers].sort((prev:any, next:any) => {
            if (prev.userClient.rating > next.userClient.rating) {
              return 1;
            }
            if (prev.userClient.rating < next.userClient.rating) {
              return -1;
            }
            return 0;
          });
        }else if(state.search==="worker"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.rating > next.rating) {
              return 1;
            }
            if (prev.rating < next.rating) {
              return -1;
            }
            return 0;
          });
        }else if(state.search==="offer"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.userClient.rating > next.userClient.rating) {
              return 1;
            }
            if (prev.userClient.rating < next.userClient.rating) {
              return -1;
            }
            return 0;
          });
        }

        },
        sortAllOffers51: function (state:any){
          if(state.search ===""){
          state.offers = [...state.offers].sort((prev:any, next:any) => {
            if (prev.userClient.rating > next.userClient.rating) {
              return -1;
            }
            if (prev.userClient.rating < next.userClient.rating) {
              return 1;
            }
            return 0;
          });
        }else if(state.search==="worker"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.rating > next.rating) {
              return -1;
            }
            if (prev.rating < next.rating) {
              return 1;
            }
            return 0;
          });
        }else if(state.search==="offer"){
          state.infoSearched = [...state.infoSearched].sort((prev:any, next:any) => {
            if (prev.userClient.rating > next.userClient.rating) {
              return -1;
            }
            if (prev.userClient.rating < next.userClient.rating) {
              return 1;
            }
            return 0;
          });
        }
        },
        logOutCurrentUser: function (state:any){
          state.currentUser = undefined;
        },
    }
})

export const { setAllClients, setClientById, setAllOffers, sortAllOffers15, sortAllOffers51, sortAllOffersZA, sortAllOffersAZ, setSearch, setAllSkills, setOfferById, setAllProfessions, setSearchedWorkers, setSearchedOffers, setCurrentUser, logOutCurrentUser } = workServiceSlice.actions;


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
  let pagination = {multiplier:2}
  try {
    const offers = await axios.get("http://localhost:3001/offer?multiplier=50")
    // axios({
    //   method:"get",
    //   url: "http://localhost:3001/offer/",
    //   data: pagination
    //     })
    //axios.get("http://localhost:3001/offer/", {multiplier:50})
    dispatch(setAllOffers(offers.data));
  } catch (error) {
    alert("Error al requerir las ofertas.")
  }
     
     //
 }

export const getOfferId = (id:String | undefined) => async (dispatch:Dispatch<any>) => {
  console.log(id)
  try{
    const offerId = await axios.get(`http://localhost:3001/offer/${id}`)
    console.log(offerId)
    return dispatch(setOfferById(offerId.data));
  }
  catch(e){
    alert("Error al requerir el detalle.")
  }
    
 }

export const getAllProfession = () => async (dispatch: any) => {
  const profs = await axios(`http://localhost:3001/profession`)
  return dispatch(setAllProfessions(profs.data));

}

export const getAllSkills = () => async(dispatch: any) => {
  //http://localhost:3001/skills
  const skills = await axios(`http://localhost:3001/skills`)
  return dispatch(setAllSkills(skills.data));
 
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

interface filter{
  rating:string,
  profession:string
}

export const searchWorker =  (input:string, filters:filter) => async (dispatch:Dispatch<any>) => {
  try {
    if(input==="")return ""
    const workers = await axios.get(`http://localhost:3001/worker/search?q=${input}&r=${filters.rating}&p=${filters.profession}`)
    dispatch(setSearchedWorkers(workers.data))
    dispatch(setSearch("worker"));
    return ""
  } catch (error) {
    alert("Hubo un error al intentar traer los trabajadores")
  }
}

export const searchOffer = (input:string, filters:filter) => async (dispatch:Dispatch<any>) => {
  try {
    if(input==="")return
    const offers = await axios.get(`http://localhost:3001/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}`)
    dispatch(setSearchedOffers(offers.data))
    dispatch(setSearch("offer"));
  } catch (error) {
    alert("Hubo un error al intentar traer las ofertas")
  }
}

export const resetSearch = () => async (dispatch:Dispatch<any>) => {
    dispatch(setSearch(""));
}

export const orderAZ = () => async (dispatch:Dispatch<any>) => {
  dispatch(sortAllOffersAZ());
}

export const orderZA = () => async (dispatch:Dispatch<any>) => {
  dispatch(sortAllOffersZA());
}

export const order15 = () => async (dispatch:Dispatch<any>) => {
  dispatch(sortAllOffers15());
}

export const order51 = () => async (dispatch:Dispatch<any>) => {
  dispatch(sortAllOffers51());
}


export const postNewPortfolio = async (newPortfolio:type.newPortfolioType) => {
  try{
    return await axios({
      method:"POST",
      url: "http://localhost:3001/portfolio/91bd2aec-925e-4ec3-9d13-8981f2beeed0",
      data: newPortfolio
      })
      }catch(error){
    return error
  }
}


export const newReviewPost = async(newReview:type.reviewFormType) => {
  //está incompleto hasta tener la ruta del back
  try{
    return await axios({
      method: "post",
      url: "http://localhost:3001/", //completar la ruta
      data: newReview
    })
  }catch(error){
    return error
  }
}

export const logOut = () => (dispatch: any) => {
  try{
    localStorage.removeItem("token")
    return dispatch(logOutCurrentUser())
  } catch (e) {
    return e
  }
}

