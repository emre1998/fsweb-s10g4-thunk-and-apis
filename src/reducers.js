import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(favs) {
  try {
    localStorage.setItem("favs", JSON.stringify(favs));
  } catch (error) {
    console.error("localStorage error:", error);
  }
}

function readFavsFromLocalStorage() {
  try {
    const favs = localStorage.getItem("favs");
    return favs ? JSON.parse(favs) : [];
  } catch (error) {
    console.error("localStorage error:", error);
    return [];
  }
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      writeFavsToLocalStorage([...state.favs, action.payload]);

      let isIncluded = false;
      if (Array.isArray(state.favs)) {
        isIncluded = state.favs.every(
          (fav) => fav.message !== action.payload.message
        );
      }

      return {
        ...state,
        favs: isIncluded ? [...state.favs, action.payload] : [...state.favs],
      };

    case FAV_REMOVE:
      const newFavs = state.favs.filter((item) => item.id !== action.payload);
      return {
        ...state,
        favs: [...newFavs],
      };

    case FETCH_SUCCESS:
      toast.success("YENİ BİR AKTİVİTE", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() };

    default:
      return state;
  }
}
