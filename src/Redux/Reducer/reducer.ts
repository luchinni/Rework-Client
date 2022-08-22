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
  infoSearched: [],
  search: "",
  userById: {},
  offers: [],
  isLoading: false,
  favorites: [],
  userLogged: {},
  offerById: {},
  professions: [],
  skills: [],
  paymentInfo:"",
  currentUser: {
    id: "",
    isWorker: false,
    isAdmin: false,
    isPremium: false
  },
  userVerified: {
    isActive: false,
  },
  googleData:{
    email: '',
    name: '',
    photo: ''
  }
};

export const workServiceSlice = createSlice({
  name: "workService",
  initialState,
  reducers: {
    setAllUsers: function (state: any, action: any) {
      state.allUsers = action.payload;
    },
    setAllClients: function (state: any, action: any) {
      state.allClients = action.payload;
    },
    setPaymentInfo: function (state: any, action: any) {
      state.paymentInfo = action.payload;
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
      console.log("lo que llega", action.payload)
      state.currentUser = {
        id: action.payload.id,
        isWorker: action.payload.isWorker,
        isAdmin: action.payload.isAdmin,
        isPremium: action.payload.premium
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
      if (state.search === "") {
        state.offers = [...state.offers].sort((prev: any, next: any) => {
          if (prev.userClient.rating > next.userClient.rating) {
            return 1;
          }
          if (prev.userClient.rating < next.userClient.rating) {
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
            if (prev.userClient.rating > next.userClient.rating) {
              return 1;
            }
            if (prev.userClient.rating < next.userClient.rating) {
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
          if (prev.userClient.rating > next.userClient.rating) {
            return -1;
          }
          if (prev.userClient.rating < next.userClient.rating) {
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
            if (prev.userClient.rating > next.userClient.rating) {
              return -1;
            }
            if (prev.userClient.rating < next.userClient.rating) {
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
      console.log(action.payload)
      state.googleData = {
        name: action.payload.name,
        photo: action.payload.photo,
        email: action.payload.user_mail
      }
      console.log("data actualizada", state.googleData)
    }
  },
});

export const {
  setAllUsers,
  setAllClients,
  setUserById,
  setFavorite,
  removeFavorite,
  setLoading,
  setAllOffers,
  setUserLogged,
  sortAllOffers15,
  sortAllOffers51,
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
  setGoogleData
} = workServiceSlice.actions;

export default workServiceSlice.reducer;

//aca van las actions

export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    const users = await axios({
      method: "GET",
      url:"/admin/users"
    });
    console.log("action:",users.data)
    dispatch(setAllUsers(users.data))
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
  } catch (error) {
    Swal.fire("Error al requerir los clientes","","warning");
  };
};

export const postNewOffer = async (newOffer: type.newOfferType) => {
  try {
    return await axios({
      method: "post",
      url: "/offer",
      data: newOffer,
    });
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
  } catch (error) {
    Swal.fire("Error al requerir las ofertas","","warning");
  }

  //
};

export const getOfferId =
  (id: String | undefined) => async (dispatch: Dispatch<any>) => {
    try {
      const offerId = await axios.get(`/offer/${id}`);
      return dispatch(setOfferById(offerId.data));
    } catch (e) {
      Swal.fire("Error al requerir el detalle","","warning")
    }
  };

export const getAllProfession = () => async (dispatch: any) => {
  const profs = await axios("/profession");
  return dispatch(setAllProfessions(profs.data));
};

export const getAllSkills = () => async (dispatch: any) => {
  //http://localhost:3001/skills
  const skills = await axios("/skills");
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
      console.log(user);
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
      return e;
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
      if (input === "")
        return "";
      const workers = await axios.get(
        `/worker/search?q=${input}&r=${filters.rating}&p=${filters.profession}`
      );
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
        offers = await axios.get(`/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}&wdt=${filters.workDuration}`
        );
      } else {
        offers = await axios.get(`/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}&max=${filters.remuneration.max}&min=${filters.remuneration.min}&wdt=${filters.workDuration}`
          );
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
  //console.log(newReview)
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
      //console.log("reducer", data)
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
            return dispatch(setUserLogged(response.data));
          });
      } else if (!tokenDecode.isWorker) {
        return axios
          .get(`/client/${tokenDecode.id}`)
          .then((response) => {
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
        return dispatch(setUserById(worker.data));
      } else if (client.data) {
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
    let editProposal: object = {
      remuneration,
      proposal_description,
      worked_time,
    };
    return await axios({
      method: "PUT",
      url: `/proposal/${idProposal}`,
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
    if (worker.data !== null) {
      //console.log(worker.data.favorites);
      if (worker.data.favorites === undefined) {
        worker.data.favorites = [...value];
      } else {
        worker.data.favorites = [...worker.data.favorites, ...value];
      }
      await axios({
        method: "PUT",
        url: `/worker/${idUser}`,
        data: worker.data,
      });
      localStorage.removeItem("favorites");
      return dispatch(setUserLogged(worker.data));
    } else {
      if (client.favorites === undefined) {
        client.favorites = [value];
      } else {
        client.favorites = [...client.favorites, ...value];
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
        console.log("valid");
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
      console.log("entre: ", proposalState)
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

export const getPaymentLink = (newPayment:any) => async (dispatch: Dispatch<any>) => {
console.log(newPayment)
const infoMP:any = await axios({
  method: "POST",
  url: "/payments/payment",
  data: newPayment
})
  dispatch(setPaymentInfo(infoMP.data))

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

export const getGoogleWorker = () => async (dispatch: any) => {
  fetch("http://localhost:3001/auth/successWorker", {
      method: "GET",
      credentials: "include",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true"
      } 
  }).then((response) => {
      if(response.status === 200) {
        const respuesta = response.json()
        console.log(respuesta)
        return respuesta
      } else {
        throw new Error("Autenticación fallida, por favor intente de nuevo.")
      }
  }).then((resObject) => {
    console.log("resObject",resObject)
    localStorage.setItem("workerToken", JSON.stringify(resObject.token));
    console.log("resObject worker", resObject.worker)
    dispatch(setCurrentUser(resObject.worker))
  }
  ).catch((error) => {
      console.log(error)
  })
}

export const getGoogleClient = () => async (dispatch: any) => {
  fetch("http://localhost:3001/auth/successClient", {
      method: "GET",
      credentials: "include",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true"
      } 
  }).then((response) => {
      if(response.status === 200) {
        const respuesta = response.json()
        console.log(respuesta)
        return respuesta
      } else {
        throw new Error("Autenticación fallida, por favor intente de nuevo.")
      }
  }).then((resObject) => {
    console.log("resObject",resObject)
    localStorage.setItem("clientToken", JSON.stringify(resObject.token));
    console.log("resObject client", resObject.client)
    dispatch(setCurrentUser(resObject.client))
  }
  ).catch((error) => {
      console.log(error)
  })
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
      url: /* "https://rework.up.railway.app/auth/" || */ "http://localhost:3001/auth/",
      data: cleanUser
    })

    //console.log("response",response)
    if (response.data === 'usuario no encontrado'){
      console.log("entre al if", response.data)
      console.log("clean user", cleanUser)
      // sino guarda la data de google en el estado global y redirije a ruta para preguntar primer inicio: client o worker?
      localStorage.setItem("googleToken", JSON.stringify(cleanUser))
      window.open( /* "https://rework-xi.vercel.app/google/" || */ "http://localhost:3000/google/", "_self")
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
      url: /* "https://rework.up.railway.app/auth/worker" || */ "http://localhost:3001/auth/worker",
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

/* export const getGoogleWorker = () => async (dispatch: any) => {
    console.log("entre a googleWorker")
    try {
      const backResponse = await axios({
        method: "GET",
        url: `/auth/successWorker`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true"
        } 
      })
        dispatch(setCurrentUser(backResponse))
  
      
    } catch (error) {
      return error
    }*/


export const createGoogleClient = (user: any) => async (dispatch: any) => {
  try {
    const response: any = await axios({
      method: "post",
      url: /* "https://rework.up.railway.app/auth/client" || */ "http://localhost:3001/auth/client",
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
