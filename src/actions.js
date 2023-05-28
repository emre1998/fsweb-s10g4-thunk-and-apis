import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";
export const DELETE_ALL_FAV_FROM_STORAGE = "DELETE_ALL_FAV_FROM_STORAGE";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS }
}

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info }
}

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id }
}

export const fetchSuccess = (data) => {
  return {type:FETCH_SUCCESS, payload: data }
}

export const fetchError = (error) =>{
  return {type:FETCH_ERROR, payload: error }
}

export const deleteAllFavs = (error) =>{
  return {type:DELETE_ALL_FAV_FROM_STORAGE }
}


export const fetchAnother = () => (dispatch)  => {
  dispatch({type:FETCH_LOADING})
  return  axios
    .get("https://official-joke-api.appspot.com/random_joke")
    .then((response) => {
      console.log("response.data", response.data);
      dispatch(fetchSuccess(response.data))
      
    })
    .catch((err) => {
      dispatch(fetchError(err))
    });
}