import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import genresReducer from "./genresSlice"
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genresReducer,
    favorites: favoritesReducer,
  },
});


export default store;
