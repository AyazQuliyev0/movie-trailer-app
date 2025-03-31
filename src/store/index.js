import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});


export default store;
