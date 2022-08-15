import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as type from "../../Types";
import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

const initialState = {
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
  currentUser: {
    id: "",
    isWorker: false,
    isAdmin: false,
    isPremium: false
  },
  userVerified: {
    isActive: false,
  },
};

export const workServiceSlice = createSlice({
  name: "workService",
  initialState,
  reducers: {
    setAllClients: function (state: any, action: any) {
      state.allClients = action.payload;
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
  },
});

export const {
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
  setAllProfessions,
  setSearchedWorkers,
  setSearchedOffers,
  setCurrentUser,
  logOutCurrentUser,
  logOutUserLogged,
  setVerifiedUser,
} = workServiceSlice.actions;

export default workServiceSlice.reducer;

//aca van las actions

export const getClients = (clients: any) => (dispatch: Dispatch<any>) => {
  dispatch(setAllClients(clients));
};

export const postNewOffer = async (newOffer: type.newOfferType) => {
  try {
    return await axios({
      method: "post",
      url: "http://localhost:3001/offer",
      data: newOffer,
    });
  } catch (error) {
    return error;
  }
};

export const getOffers = () => async (dispatch: Dispatch<any>) => {
  let pagination = { multiplier: 2 };
  try {
    const offers = await axios.get("http://localhost:3001/offer?multiplier=50");
    // axios({
    //   method:"get",
    //   url: "http://localhost:3001/offer/",
    //   data: pagination
    //     })
    //axios.get("http://localhost:3001/offer/", {multiplier:50})
    dispatch(setAllOffers(offers.data));
  } catch (error) {
    alert("Error al requerir las ofertas.");
  }

  //
};

export const getOfferId =
  (id: String | undefined) => async (dispatch: Dispatch<any>) => {
    try {
      const offerId = await axios.get(`http://localhost:3001/offer/${id}`);
      return dispatch(setOfferById(offerId.data));
    } catch (e) {
      alert("Error al requerir el detalle.");
    }
  };

export const getAllProfession = () => async (dispatch: any) => {
  const profs = await axios(`http://localhost:3001/profession`);
  return dispatch(setAllProfessions(profs.data));
};

export const getAllSkills = () => async (dispatch: any) => {
  //http://localhost:3001/skills
  const skills = await axios(`http://localhost:3001/skills`);
  return dispatch(setAllSkills(skills.data));
};

export const postNewClient = async (newClient: type.newClientType) => {
  try {
    return await axios({
      method: "post",
      url: "http://localhost:3001/register/client",
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
      url: "http://localhost:3001/register/worker",
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
        url: "http://localhost:3001/login/",
        data: user,
      });
      // lo pasamos a json y lo guardamos en la consola en application local storage
      if (token.data) {
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
        `http://localhost:3001/worker/search?q=${input}&r=${filters.rating}&p=${filters.profession}`
      );
      dispatch(setSearchedWorkers(workers.data));
      dispatch(setSearch("worker"));
      return "";
    } catch (error) {
      alert("Hubo un error al intentar traer los trabajadores");
    }
  };
}

export function searchOffer(input: string, filters: filter) {
  return async (dispatch: Dispatch<any>) => {
    try {
      let offers: any;
      if (filters.remuneration.max === 0 && filters.remuneration.min === 0) {
        offers = await axios.get(
          `http://localhost:3001/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}&wdt=${filters.workDuration}`
        );
      } else {
        offers = await axios.get(
          `http://localhost:3001/offer/search?q=${input}&r=${filters.rating}&p=${filters.profession}&max=${filters.remuneration.max}&min=${filters.remuneration.min}&wdt=${filters.workDuration}`
        );
      }
      dispatch(setSearchedOffers(offers.data));
      dispatch(setSearch("offer"));
    } catch (error) {
      alert("Hubo un error al intentar traer las ofertas");
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
      url: `http://localhost:3001/portfolio/${idUser}`,
      data: newPortfolio,
    });
  } catch (error) {
    return error;
  }
};

export async function newReviewPost(newReview: type.reviewFormType) {
  //está incompleto hasta tener la ruta del back
  try {
    return await axios({
      method: "post",
      url: "http://localhost:3001/",
      data: newReview,
    });
  } catch (error) {
    return error;
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
          .get(`http://localhost:3001/worker/${tokenDecode.id}`)
          .then((response) => {
            return dispatch(setUserLogged(response.data));
          });
      } else if (!tokenDecode.isWorker) {
        return axios
          .get(`http://localhost:3001/client/${tokenDecode.id}`)
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
      const worker: any = await axios.get(`http://localhost:3001/worker/${id}`);
      const client: any = await axios.get(`http://localhost:3001/client/${id}`);
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
      url: "http://localhost:3001/proposal",
      data: newProposal2,
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
    let worker: any = await axios.get(`http://localhost:3001/worker/${idUser}`);
    let client: any = await axios.get(`http://localhost:3001/client/${idUser}`);
    if (worker.data !== null) {
      //console.log(worker.data.favorites);
      if (worker.data.favorites === undefined) {
        worker.data.favorites = [...value];
      } else {
        worker.data.favorites = [...worker.data.favorites, ...value];
      }
      await axios({
        method: "PUT",
        url: `http://localhost:3001/worker/${idUser}`,
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
        url: `http://localhost:3001/client/${idUser}`,
        data: client.data,
      });
      localStorage.removeItem("favorites");
      return dispatch(setUserLogged(client.data));
    }
  };
}

export async function getFavoritestoDB(value: any, idUser: string) {
  let worker: any = await axios.get(`http://localhost:3001/worker/${idUser}`);
  let client: any = await axios.get(`http://localhost:3001/client/${idUser}`);
  if (worker.data !== null) {
    if (worker.data.favorites?.find((f: any) => f.idOffer === value.idOffer))
      return;
    worker.data.favorites = [...worker.data.favorites, value];
    await axios({
      method: "PUT",
      url: `http://localhost:3001/worker/${idUser}`,
      data: worker.data,
    });
  } else {
    if (client.data.favorites?.find((f: any) => f.idOffer === value.idOffer))
      return;
    client.data.favorites = [...client.data.favorites, value];
    await axios({
      method: "PUT",
      url: `http://localhost:3001/client/${idUser}`,
      data: client.data,
    });
  }
}

export async function remFavoritestoDB(value: any, idUser: string) {
  let worker: any = await axios.get(`http://localhost:3001/worker/${idUser}`);
  let client: any = await axios.get(`http://localhost:3001/client/${idUser}`);
  if (worker.data !== null) {
    worker.data.favorites = [
      ...worker.data.favorites?.filter((g: any) => g.idOffer !== value.idOffer),
    ];
    await axios({
      method: "PUT",
      url: `http://localhost:3001/worker/${idUser}`,
      data: worker.data,
    });
  } else {
    client.data.favorites = [
      ...client.data.favorites?.filter((g: any) => g.idOffer !== value.idOffer),
    ];
    await axios({
      method: "PUT",
      url: `http://localhost:3001/client/${idUser}`,
      data: client.data,
    });
  }
}

export const verifyWorker = (id: any) => async (dispatch: any) => {
  try {
    await axios({
      method: "PUT",
      url: `http://localhost:3001/confirm/worker/${id}`,
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
      url: `http://localhost:3001/confirm/client/${id}`,
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
        url: `http://localhost:3001/tokenVerify/${expDate}`,
        data: expDate,
      });

      if (response.data && response.data === "destroy") {
        return localStorage.removeItem("token");
      } else if (response.data && response.data === "renew") {
        const newToken: type.token = {
          ...token,
          exp: token.exp + 7200,
        };
        const renewedToken = await axios({
          method: "POST",
          url: `http://localhost:3001/tokenVerify/renew/`,
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
    await axios.put(`http://localhost:3001/client/${id}`, value);
  } catch (error) {
    return error;
  }
}

export async function putEditProfileWorker(value: type.WorkerTypeUpdate, id: string) {
  try {
    await axios.put(`http://localhost:3001/worker/${id}`, value);
  } catch (error) {
    return error;
  }
}

  export const acceptProposal = async (proposalState:any) => {
    try{
      await axios({
        method:"PUT",
        url: `http://localhost:3001/proposal/state`,
        data: proposalState
        })
  } catch (error) {
    return error
  }
}
  
export const getOfferForHistory = async (id:string) => {
  const offerId = await axios.get(`http://localhost:3001/offer/${id}`)
  return offerId.data;
}

export const getOffersMoreRating = async () => {
  const offersRating:any = await axios.get("http://localhost:3001/offer/search?r=5")
  let response:{}[] = [];
  for (let x = 0; x < 10; x++) {
    response.push(offersRating.data[x]);
    
  }
  return response
}

export const getworkersMoreRating = async () => {
  const offersRating:any = await axios.get("http://localhost:3001/worker/search?r=5")
  let response:{}[] = [];
  for (let x = 0; x < 10; x++) {
    response.push(offersRating.data[x]);
    
  }
  return response
}