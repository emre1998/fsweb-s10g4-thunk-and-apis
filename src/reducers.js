import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  DELETE_ALL_FAV_FROM_STORAGE,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

function clearFavsFromLocalStorage(){
  return localStorage.clear();
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
    const favAddValue = {
      ...state,
      favs : state.favs.find(item => item.id===action.payload.id)?state.favs:[...state.favs,action.payload]
    }
      writeFavsToLocalStorage(favAddValue);
      return favAddValue;

    case FAV_REMOVE:
      const favRemoveValue ={
        ...state,
        favs: state.favs.filter(item=> item.id!==action.payload),
      };
      writeFavsToLocalStorage(favRemoveValue);
      return favRemoveValue;

    case FETCH_SUCCESS:
      return {
        ...state,
        current : action.payload,
        loading :false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading :true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error : action.payload.message,
        loading :false,
      };


    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs:readFavsFromLocalStorage()||initial.favs,

      };

    case DELETE_ALL_FAV_FROM_STORAGE:
      clearFavsFromLocalStorage();
    return  { ...state,
    favs:initial.favs
    };

    default:
      return state;
  }
}
