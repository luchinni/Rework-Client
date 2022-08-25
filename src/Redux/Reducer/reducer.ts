import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as type from "../../Types";
import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2'
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

const initialState = {
  allUsers: [],
  allClients: [],
  allOffersAdmin: [],
  infoSearched: [],
  search: "",
  userById: {},
  offers: [],
  isLoading: false,
  favorites: [],
  userLogged: {},
  offerById: {},
  proposalById: {},
  professions: [],
  skills: [],
  premiumInfo:"",
  paymentInfo:"",
  currentUser: {
    id: "",
    isWorker: false,
    isAdmin: false,
    isPremium: false,
    isSuper: false
  },
  userVerified: {
    isActive: false,
  },
  googleData:{
    email: '',
    name: '',
    photo: ''
  },
  userByEmail: {},
};

export const workServiceSlice = createSlice({
  name: "workService",
  initialState,
  reducers: {
    setAllUsers: function (state: any, action: any) {
      state.allUsers = action.payload;
    },
    setProposalById: function (state: any, action: any) {
      state.proposalById = action.payload;
    },
    setAllUsersAdmin: function (state: any, action:any) {
      state.allUsersAdmin = action.payload;
    },
    setAllClients: function (state: any, action: any) {
      state.allClients = action.payload;
    },
    setAllOffersAdmin: function (state: any, action: any) {
      state.allOffersAdmin = action.payload;
    },
    setPaymentInfo: function (state: any, action: any) {
      state.paymentInfo = action.payload;
    },
    setPremiumInfo: function (state: any, action: any) {
      state.premiumInfo = action.payload;
    },
    setSearchedWorkers: function (state: any, action: any) {
      state.infoSearched = action.payload;
    },
    setSearchedOffers: function (state: any, action: any) {
      state.infoSearched = action.payload;
    },
    setUserLogged: function (state: any, action: any) {
      state.userLogged = action.payload;
    },
    setUserById: function (state: any, action: any) {
      state.userById = action.payload;
    },
    setAllOffers: function (state: any, action: any) {
      state.offers = action.payload;
    },
    setOfferById: function (state: any, action: any) {
      state.offerById = action.payload;
    },
    setAllProfessions: function (state: any, action: any) {
      state.professions = action.payload;
    },
    setAllSkills: function (state: any, action: any) {
      state.skills = action.payload;
    },
    setLoading: function (state: any, action: any) {
      state.isLoading = action.payload;
    },
    setFavorite: function (state: any, action: any) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...state.favorites, action.payload])
      );
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: function (state: any, action: any) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([
          ...state.favorites.filter(
            (g: any) => g.idOffer !== action.payload.idOffer
          ),
        ])
      );
      state.favorites = [
        ...state.favorites.filter(
          (g: any) => g.idOffer !== action.payload.idOffer
        ),
      ];
    },
    setSearch: function (state: any, action: any) {
      state.search = action.payload;
    },
    setCurrentUser: function (state: any, action: any) {
      state.currentUser = {
        id: action.payload.id,
        isWorker: action.payload.isWorker,
        isAdmin: action.payload.isAdmin,
        isPremium: action.payload.premium,
        isSuper: action.payload.superAdmin
      };
    },
    sortAllOffersAZ: function (state: any) {
      if (state.search === "") {
        state.offers = [...state.offers].sort((prev: any, next: any) => {
          if (prev.title > next.title) {
            return 1;
          }
          if (prev.title < next.title) {
            return -1;
          }
          return 0;
        });
      } else if (state.search === "offer") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.title > next.title) {
              return 1;
            }
            if (prev.title < next.title) {
              return -1;
            }
            return 0;
          }
        );
      } else if (state.search === "worker") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.name > next.name) {
              return 1;
            }
            if (prev.name < next.name) {
              return -1;
            }
            return 0;
          }
        );
      }
    },
    sortAllOffersZA: function (state: any) {
      if (state.search === "") {
        state.offers = [...state.offers].sort((prev: any, next: any) => {
          if (prev.title > next.title) {
            return -1;
          }
          if (prev.title < next.title) {
            return 1;
          }
          return 0;
        });
      } else if (state.search === "offer") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.title > next.title) {
              return -1;
            }
            if (prev.title < next.title) {
              return 1;
            }
            return 0;
          }
        );
      } else if (state.search === "worker") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.name > next.name) {
              return -1;
            }
            if (prev.name < next.name) {
              return 1;
            }
            return 0;
          }
        );
      }
    },
    sortAllOffers15: function (state: any) {
      console.log("entre al sort")
      if (state.search === "") {
        state.offers = [...state.offers].sort((prev: any, next: any) => {
          if (prev.userClient?.rating > next.userClient?.rating) {
            return 1;
          }
          if (prev.userClient?.rating < next.userClient?.rating) {
            return -1;
          }
          return 0;
        });
      } else if (state.search === "worker") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.rating > next.rating) {
              return 1;
            }
            if (prev.rating < next.rating) {
              return -1;
            }
            return 0;
          }
        );
      } else if (state.search === "offer") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.userClient?.rating > next.userClient?.rating) {
              return 1;
            }
            if (prev.userClient?.rating < next.userClient?.rating) {
              return -1;
            }
            return 0;
          }
        );
      }
    },
    sortAllOffers51: function (state: any) {
      if (state.search === "") {
        state.offers = [...state.offers].sort((prev: any, next: any) => {
          if (prev.userClient?.rating > next.userClient?.rating) {
            return -1;
          }
          if (prev.userClient?.rating < next.userClient?.rating) {
            return 1;
          }
          return 0;
        });
      } else if (state.search === "worker") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.rating > next.rating) {
              return -1;
            }
            if (prev.rating < next.rating) {
              return 1;
            }
            return 0;
          }
        );
      } else if (state.search === "offer") {
        state.infoSearched = [...state.infoSearched].sort(
          (prev: any, next: any) => {
            if (prev.userClient?.rating > next.userClient?.rating) {
              return -1;
            }
            if (prev.userClient?.rating < next.userClient?.rating) {
              return 1;
            }
            return 0;
          }
        );
      }
    },
    logOutCurrentUser: function (state: any) {
      state.currentUser = {
        id: "",
        isWorker: false,
        isAdmin: false,
        isPremium: false
      };
    },
    logOutUserLogged: function (state: any) {
      state.userLogged = {};
    },
    setVerifiedUser: function (state: any) {
      state.userVerified = {
        isActive: true,
      };
    },
    setGoogleData: function (state: any, action: any){
      state.googleData = {
        name: action.payload.name,
        photo: action.payload.photo,
        email: action.payload.user_mail
      }
      console.log("data actualizada", state.googleData)
    },
    setUserByEmail: function (state: any, action: any) {
      state.userByEmail = action.payload;
    },
  },
});

export const {
  setAllUsers,
  setAllClients,
  setAllOffersAdmin,
  setUserById,
  setFavorite,
  removeFavorite,
  setProposalById,
  setLoading,
  setAllOffers,
  setUserLogged,
  sortAllOffers15,
  sortAllOffers51,
  setPremiumInfo,
  sortAllOffersZA,
  sortAllOffersAZ,
  setSearch,
  setAllSkills,
  setOfferById,
  setPaymentInfo,
  setAllProfessions,
  setSearchedWorkers,
  setSearchedOffers,
  setCurrentUser,
  logOutCurrentUser,
  logOutUserLogged,
  setVerifiedUser,
  setGoogleData,
  setUserByEmail
} = workServiceSlice.actions;

export default workServiceSlice.reducer;

//aca van las actions

export const getAllUsers = (isActive: any) => async (dispatch: Dispatch<any>) => {
  try {
    console.log("isActive:", isActive)
    const users = await axios({
      method: "GET",
      url:`/admin/users?isActive=${isActive}`
    });
    dispatch(setAllUsers(users.data))
    setLoading(true);
  } catch(error) {
    return error;
  }
}

export const getClients = () => async (dispatch: Dispatch<any>) => {
  try {
    const clients = await axios({
      method: "GET",
      url: "/client"
    });
    dispatch(setAllClients(clients));
    setLoading(true);
  } catch (error) {
    Swal.fire("Error al requerir los clientes","","warning");
  };
};

export const getAllOffersAdmin = (isActive: string) => async (dispatch: Dispatch<any>) => {
  try {
    const offersAdmin = await axios.get(`/admin/offers?isActive=${isActive}`);
    dispatch(setAllOffersAdmin(offersAdmin.data));
    setLoading(true);
  } catch (error) {
    return error
  }
}

export const postNewOffer = async (newOffer: type.newOfferType) => {
  try {
    return await axios({
      method: "post",
      url: "/offer",
      data: newOffer,
    });
    setLoading(true);
  } catch (error) {
    return error;
  }
};

export const getOffers = () => async (dispatch: Dispatch<any>) => {
  let pagination = { multiplier: 2 };
  try {
    const offers = await axios.get("/offer?multiplier=50");
    // axios({
    //   method:"get",
    //   url: "http://localhost:3001/offer/",
    //   data: pagination
    //     })
    //axios.get("http://localhost:3001/offer/", {multiplier:50})
    dispatch(setAllOffers(offers.data));
    setLoading(true);

  } catch (error) {
    Swal.fire("Error al requerir las ofertas","","warning");
  }

  //
};

export const getOfferId =
  (id: String | undefined) => async (dispatch: Dispatch<any>) => {
    try {
    const offerId = await axios.get(`/offer/${id}`);
    setLoading(true);
    return dispatch(setOfferById(offerId.data));

    } catch (e) {
      Swal.fire("Error al requerir el detalle","","warning")
    }
  };

export const getAllProfession = () => async (dispatch: any) => {
  const profs = await axios("/profession");
  setLoading(true);
  return dispatch(setAllProfessions(profs.data));

};

export const getAllSkills = () => async (dispatch: any) => {
  //http://localhost:3001/skills
  const skills = await axios("/skills");
  setLoading(true);
  return dispatch(setAllSkills(skills.data));
};

export const postNewClient = async (newClient: type.newClientType) => {
  try {
    return await axios({
      method: "post",
      url: "/register/client",
      data: newClient,
    });
  } catch (error) {
    return error;
  }
};

export const postNewWorker = async (newWorker: type.newWorkerType) => {
  try {
    return await axios({
      method: "post",
      url: "/register/worker",
      data: newWorker,
    });
  } catch (error) {
    return error;
  }
};

export function postLogin(user: type.userLogin) {
  return async (dispatch: any) => {
    try {
      // generamos el token conectando con el back
      const token: any = await axios({
        method: "post",
        url: "/login/",
        data: user,
      });
      // lo pasamos a json y lo guardamos en la consola en application local storage
      if (token.data === 'invalid'){
        Swal.fire("Email o contraseña incorrectos", "Recuerda activar tu cuenta si es la primera vez que inicias sesion","warning")
      } else if (token.data){
        localStorage.setItem("token", JSON.stringify(token.data));
      }
      //desencryptamos el token
      const data = jwtDecode(token.data);
      // alojamos el id del usuario y los datos relevantes en el estado
      return dispatch(setCurrentUser(data));
    } catch (e) {
      Swal.fire("Email o contraseña incorrectos", "Recuerda activar tu cuenta si es la primera vez que inicias sesión","warning")
    }
  };
}

interface filter {
  rating: string;
  profession: string;
  remuneration: { min: number | null; max: number | null };
  workDuration: string;
}

export function searchWorker(input: string, filters: filter) {
  return async (dispatch: Dispatch<any>) => {
    try {
      /* if (input === "")
        return ""; */
      const workers = await axios.get(
        `/worker/search?q=${input}&r=${filters.rating}&p=${filters.profession}`
      );
      setLoading(true);
      dispatch(setSearchedWorkers(workers.data));
      dispatch(setSearch("worker"));
      return "";
    } catch (error) {
      Swal.fire("Hubo un error al intentar traer los trabajadores","intenta nuevamente en unos minutos","warning");
    }
  };
}

export function searchOffer(input: string, filters: filter) {
  return async (dispatch: Dispatch<any>) => {
    try {
      let offers: any;
      if (filters.remuneration.max === 0 && filters.remuneration.min === 0) {
        console.log("entre al 1")
        offers = await axios.get(`/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}&wdt=${filters.workDuration}`
        );
        setLoading(true);
      } else {
        console.log("entre al 2")
        offers = await axios.get(`/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}&max=${filters.remuneration.max}&min=${filters.remuneration.min}&wdt=${filters.workDuration}`
          );
          setLoading(true);
      }
      dispatch(setSearchedOffers(offers.data));
      dispatch(setSearch("offer"));
    } catch (error) {
      Swal.fire("Hubo un error al intentar traer las ofertas","","warning");
    }
  };
}

export const resetSearch = () => async (dispatch: Dispatch<any>) => {
  dispatch(setSearch(""));
};

export const orderAZ = () => async (dispatch: Dispatch<any>) => {
  dispatch(sortAllOffersAZ());
};

export const orderZA = () => async (dispatch: Dispatch<any>) => {
  dispatch(sortAllOffersZA());
};

export const order15 = () => async (dispatch: Dispatch<any>) => {
  dispatch(sortAllOffers15());
};

export const order51 = () => async (dispatch: Dispatch<any>) => {
  dispatch(sortAllOffers51());
};

export const postNewPortfolio = async (
  newPortfolio: type.newPortfolioType,
  idUser: string
) => {
  try {
    return await axios({
      method: "POST",
      url: `/portfolio/${idUser}`,
      data: newPortfolio,
    });
  } catch (error) {
    return error;
  }
};

export async function newReviewPost(newReview: type.reviewFormType, type:string) {
  //está incompleto hasta tener la ruta del back
  if(type==="worker"){
    try {
      return await axios({
        method: "post",
        url: "/review/client",
        data: newReview,
      });
    } catch (error) {
      return error;
    }
  }else{
    try {
      return await axios({
        method: "post",
        url: "/review/worker",
        data: newReview,
      });
    } catch (error) {
      return error;
    }
  }
 
}

export const logOut = () => (dispatch: any) => {
  try {
    localStorage.removeItem("token");
    dispatch(logOutCurrentUser());
    return dispatch(logOutUserLogged());
  } catch (e) {
    return e;
  }
};

export function checkSession() {
  return async (dispatch: any) => {
    try {
      const token: any = localStorage.getItem("token");
      let data = {};
      if (token !== "undefined")
        data = jwtDecode(token);
      // alojamos el id del usuario y los datos relevantes en el estado
      return dispatch(setCurrentUser(data));
    } catch (e) {
      return e;
    }
  };
}

export function getUserById(tokenDecode: any) {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (tokenDecode.isWorker) {
        return axios
          .get(`/worker/${tokenDecode.id}`)
          .then((response) => {
            setLoading(true);
            return dispatch(setUserLogged(response.data));
          });
      } else if (!tokenDecode.isWorker) {
        return axios
          .get(`/client/${tokenDecode.id}`)
          .then((response) => {
            setLoading(true);
            return dispatch(setUserLogged(response.data));
          });
      }
    } catch (error) { }
  };
}

export function getUserByIdOther(id: any) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const worker: any = await axios.get(`/worker/${id}`);
      const client: any = await axios.get(`/client/${id}`);
      if (worker.data) {
        setLoading(true);
        return dispatch(setUserById(worker.data));
      } else if (client.data) {
        setLoading(true);
        return dispatch(setUserById(client.data));
      }
    } catch (error) { }
  };
}

export async function newProposalPost(newProposal: type.FormProposalType) {
  try {
    let { remuneration, proposal_description, worked_time, idWorker, idOffer } = newProposal;
    let newProposal2: object = {
      idWorker,
      idOffer,
      remuneration,
      proposal_description,
      worked_time,
    };
    return await axios({
      method: "post",
      url: "/proposal",
      data: newProposal2,
    });
  } catch (error) {
    return error;
  }
}

export async function editProposalWorkerPremium(newProposal: type.FormProposalType) {
  try {
    let { remuneration, proposal_description, worked_time, idProposal } = newProposal;
    const id = idProposal
    let editProposal: object = {
      remuneration,
      proposal_description,
      worked_time,
    };
    return await axios({
      method: "PUT",
      url: `/proposal/${id}`,
      data: editProposal,
    });
  } catch (error) {
    return error;
  }
}

export const changeLoading = (value: boolean) => (dispatch: Dispatch<any>) => {
  dispatch(setLoading(value));
};

export const getFavorites = (value: any) => (dispatch: Dispatch<any>) => {
  dispatch(setFavorite(value));
};

export const remFavorite = (value: any) => (dispatch: Dispatch<any>) => {
  dispatch(removeFavorite(value));
};

export function favoritesToDB(value: any, idUser: string) {
  return async (dispatch: Dispatch<any>) => {
    let worker: any = await axios.get(`/worker/${idUser}`);
    let client: any = await axios.get(`/client/${idUser}`);
    setLoading(true);
    if (worker.data !== null) {
      if (worker.data?.favorites && worker.data?.favorites?.length === 0) {
        worker.data.favorites = [...value];
      } else {
        value.forEach((fav: any) => {
        if (!worker.data.favorites.find((e: any) => e.idOffer === fav.idOffer))
          worker.data.favorites = [...worker.data.favorites, ...value];
        })
        }
        await axios({
          method: "PUT",
          url: `/worker/${idUser}`,
          data: worker.data,
        });
        localStorage.removeItem("favorites");
        return dispatch(setUserLogged(worker.data));
    } else {
      if (client.data?.favorites && client.data?.favorites?.length === 0){
        client.data.favorites = [...value];
      } else {
        value.forEach((fav:any) =>{
          if (!client.data.favorites.find((e: any) => e.idOffer === fav.idOffer))
          client.data.favorites = [...client.data.favorites, ...value];
        })
      }
      await axios({
        method: "PUT",
        url: `/client/${idUser}`,
        data: client.data,
      });
      localStorage.removeItem("favorites");
      return dispatch(setUserLogged(client.data));
    }
  };
}

export async function getFavoritestoDB(value: any, idUser: string) {
  let worker: any = await axios.get(`/worker/${idUser}`);
  let client: any = await axios.get(`/client/${idUser}`);
  setLoading(true);
  if (worker.data !== null) {
    if (worker.data.favorites?.find((f: any) => f.idOffer === value.idOffer))
      return;
    worker.data.favorites = [...worker.data.favorites, value];
    await axios({
      method: "PUT",
      url: `/worker/${idUser}`,
      data: worker.data,
    });
  } else {
    if (client.data.favorites?.find((f: any) => f.idOffer === value.idOffer))
      return;
    client.data.favorites = [...client.data.favorites, value];
    await axios({
      method: "PUT",
      url: `/client/${idUser}`,
      data: client.data,
    });
  }
}

export async function remFavoritestoDB(value: any, idUser: string) {
  let worker: any = await axios.get(`/worker/${idUser}`);
  let client: any = await axios.get(`/client/${idUser}`);
  if (worker.data !== null) {
    worker.data.favorites = [
      ...worker.data.favorites?.filter((g: any) => g.idOffer !== value.idOffer),
    ];
    await axios({
      method: "PUT",
      url: `/worker/${idUser}`,
      data: worker.data,
    });
  } else {
    client.data.favorites = [
      ...client.data.favorites?.filter((g: any) => g.idOffer !== value.idOffer),
    ];
    await axios({
      method: "PUT",
      url: `/client/${idUser}`,
      data: client.data,
    });
  }
}

export const verifyWorker = (id: any) => async (dispatch: any) => {
  try {
    await axios({
      method: "PUT",
      url: `/confirm/worker/${id}`,
      data: id,
    });
    dispatch(setVerifiedUser());
  } catch (error) {
    return error;
  }
};

export const verifyClient = (id: any) => async (dispatch: any) => {
  try {
    await axios({
      method: "PUT",
      url: `/confirm/client/${id}`,
      data: id,
    });
    dispatch(setVerifiedUser());
  } catch (error) {
    return error;
  }
};

export const verifyToken =
  (token: type.token) => async (dispatch: Dispatch<any>) => {
    try {
      const expDate: any = token.exp;
      let response: any;
      response = await axios({
        method: "GET",
        url: `/tokenVerify/${expDate}`,
        data: expDate,
      });

      if (response.data && response.data === "destroy") {
        return localStorage.removeItem("token");
      } else if (response.data && response.data === "renew") {
        const newToken: type.token = {
          ...token,
          exp: token.exp + 14400,
        };
        const renewedToken = await axios({
          method: "POST",
          url: `/tokenVerify/renew/`,
          data: newToken,
        });
        return localStorage.setItem("token", JSON.stringify(renewedToken.data));
      } else if (response.data && response.data === "valid") {
        return "Sesion válida";
      } else {
        return "No hay sesion";
      }
    } catch (e) {
      return e;
    }
  };

export async function putEditProfileClient(
  value: type.ClientTypeUpdate,
  id: string
) {
  try {
    await axios.put( `/client/${id}`, value);
  } catch (error) {
    return error;
  }
}

export async function putEditProfileWorker(value: type.WorkerTypeUpdate, id: string) {
  try {
    await axios.put( `/worker/${id}`, value);
  } catch (error) {
    return error;
  }
}

  export const acceptProposal = async (proposalState:any) => {
    try{
      await axios({
        method:"PUT",
        url: `/proposal/state`,
        data: proposalState
        })
  } catch (error) {
    return error
  }
}
  
export const getOfferForHistory = async (id:string) => {
  const offerId = await axios.get(`/offer/${id}`)
  return offerId.data;
}

export const getOffersMoreRating = async () => {
  const offersRating:any = await axios.get("/offer/search?r=5")
  let response:{}[] = [];
  for (let x = 0; x < 10 && x < offersRating.data.length -1; x++) {
    response.push(offersRating.data[x]);
    
  }
  return response
}

export const getworkersMoreRating = async () => {
  const offersRating:any = await axios.get("/worker/search?r=5")
  let response:{}[] = [];
  for (let x = 0; x < 10 && x < offersRating.data.length -1; x++) {
    response.push(offersRating.data[x]);
    
  }
  return response
}

export const getPaymentLink = (newPayment:any, type:string) => async (dispatch: Dispatch<any>) => {
  if(type==="client"){
    const infoMP:any = await axios({
      method: "POST",
      url: "/payments/payment",
      data: newPayment
    })
      dispatch(setPaymentInfo(infoMP.data))
  }else{
    const infoMP:any = await axios({
      method: "POST",
      url: "/payments/subscription",
      data: newPayment
    })
      dispatch(setPremiumInfo(infoMP.data))
  }

}

export const stateCancelledOfferPost = async (id: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/offer/state",
      data: {
        id,
        state: "cancelled",
      },
    })
  } catch (error) {
    return error;
  };
};

export const isActiveFalseOfferPost = async (id: string ) => {
  try {
    await axios({
      method: "PUT",
      url: "/offer/isActive",
      data: {
        id,
        isActive: false,
      },
    })
  } catch (error) {
    return error;
  };
};

export const isActiveOffer = async (id: string, isActive: boolean ) => {
  try {
    await axios({
      method: "PUT",
      url: "/offer/isActive",
      data: {
        id,
        isActive,
      },
    })
  } catch (error) {
    return error;
  };
};

export const stateCancelledProposal = async (id: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/proposal/state",
      data: {
        id,
        state: "cancelled",
      },
    })
  } catch (error) {
    return error;
  };
};

export const isActiveFalseProposal = async (id: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/proposal/isActive",
      data: {
        id,
        isActive: false,
      },
    })
  } catch (error) {
    return error;
  };
};

export const userIsActivePut = async (id: string, isActive: string, /* isAdmin: string, */ isWorker: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/admin/users/isActive",
      data: {
        id,
        isActive,
        // isAdmin,
        isWorker
      }
    })
  } catch(error) {
    return error;
  }
}

export const userIsAdminChange = async (id: string, isAdmin: string, /* isAdmin: string, */ isWorker: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/admin/users/isAdmin",
      data: {
        id,
        isAdmin,
        isWorker
      }
    })
  } catch(error) {
    return error;
  }
}

export const googleLog = (user: any) => async (dispatch: Dispatch<any>) => {
  try{ 
    // "limpiamos" la data de google
    const cleanUser = {
      name: user.displayName,
      user_mail: user.email,
      photo: user.photoURL,
      password: user.uid
    }
    const response: any = await axios({
      method: "post",
      url: /* "https://rework.up.railway.app/auth/" || */ "/auth/",
      data: cleanUser
    })

    if (response.data === 'usuario no encontrado'){
      // sino guarda la data de google en el estado global y redirije a ruta para preguntar primer inicio: client o worker?
      localStorage.setItem("googleToken", JSON.stringify(cleanUser))
      window.open( /* "https://rework-xi.vercel.app/google/" || */ "/google/", "_self")
    } else {
      localStorage.setItem("token", JSON.stringify(response.data))
      // lo pasamos a json y lo guardamos en la consola en application local storage
      //si tiene mail (client o worker) devuelve un token y se guarda, y luego se guarda el currentUser con la data del token
      const data = jwtDecode(response.data);
      return dispatch(setCurrentUser(data));
    }
    } catch (e){
      return e
    }
  }

export const createGoogleWorker = (user: any) => async (dispatch: any) => {
  try {
    const response: any = await axios({
      method: "post",
      url: "/auth/worker",
      data: user
    })
    const token = response?.data
    localStorage.setItem("token", JSON.stringify(token))
    const data = jwtDecode(token);
    return dispatch(setCurrentUser(data))
  } catch(error) {
    return error
  }
} 

export const createGoogleClient = (user: any) => async (dispatch: any) => {
  try {
    const response: any = await axios({
      method: "post",
      url: "/auth/client",
      data: user
    })
    const token = response?.data
    localStorage.setItem("token", JSON.stringify(token))
    const data = jwtDecode(token);
    return dispatch(setCurrentUser(data))
  } catch(error) {
    return error
  }
} 


export const modifyOfferState = async (offerState:any) => {
  try{
    await axios({
      method:"PUT",
      url: `/offer/state`,
      data: offerState
      })
  } catch (error) {
    return error
  }
}

export const forgotPassword = (user_mail: any, type: any) => async (dispatch: any) => {
  try {
    const response = await axios({
      method:"POST",
      url: `/login/forgot-password`,
      data: {user_mail, type}
    })
    if (response.data === 'Usuario inválido'){
      console.log("soy invalid reducer")
      Swal.fire("Usuario incorrecto.","warning")
    } else if (response.data === 'Correo enviado'){
      console.log(response.data)
      dispatch(setUserByEmail(response.data))
    }
  } catch(error){
    return error
  }
}

export const resetPassword = (token:any, password:any) => async (dispatch: any) =>{
  try {
    const response = await axios({
      method:"POST",
      url: `/login/reset-password`,
      data: {token, password},
      headers: { Authorization: `Bearer ${token}`}
    })
    if(response.data === "Id inválida"){
      Swal.fire("Usuario incorrecto.","warning")
    } else if(response.data === "restablecer contraseña"){
      dispatch(setUserByEmail(response.data))
    }
  } catch(error){
    return error
  }
}

export const setBankInfo = async (info:any, id:any) =>{
  try{
    console.log(info)
    console.log(id)
    const objeto = {id, bank_data:info}
    const response = await axios({
      method:"PUT",
      url: `/worker/bank`,
      data: objeto
      })
      console.log(response)
} catch (error) {
  return error
}
}

export const changePassword = (user_mail: any, oldPassword:any, newPassword:any) => async (dispatch: any) =>{
  try {
    const response = await axios({
      method:"POST",
      url: `/auth/change-password`,
      data: {user_mail, oldPassword, newPassword}
    })
    if(response.data === "Usuario incorrecto"){
      Swal.fire("Usuario incorrecto. Intente nuevamente.","warning")
    } else if(response.data === "Contraseña incorrecta"){
      Swal.fire("Contraseña incorrecta. Intente nuevamente.","warning")
    } else if(response.data === "Contraseña reestablecida"){
      dispatch(setUserLogged(response.data))
    }
  } catch(error){
    return error
  }
}

export const deleteProfession = async (array: string[], profession: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/admin/profession/delete",
      data: {
        array,
        profession
      }
    })
  } catch(error) {
    return error;
  }
}

export const addNewProfession = async (profession: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/admin/profession",
      data: profession
    })
  } catch(error) {
    return error;
  }
}

export const deleteSkill = async (array: string[], skill: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/admin/skills/delete",
      data: {
        array,
        skill
      }
    })
  } catch(error) {
    return error;
  }
}

export const addNewSkill = async (skill: string) => {
  try {
    await axios({
      method: "PUT",
      url: "/admin/skills",
      data: skill
    })
  } catch(error) {
    return error;
  }
}

export const getProposalById = (id: String | undefined) => async (dispatch: Dispatch<any>) => {
  try {
  const offerId = await axios.get(`/proposal/${id}`);
  setLoading(true);
  return dispatch(setProposalById(offerId.data));

  } catch (e) {
    Swal.fire("Error al requerir el detalle","","warning")
  }
}

