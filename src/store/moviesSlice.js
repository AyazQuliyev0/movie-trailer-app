import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async () => {
    const allMovies = [];
    for (let page = 1; page <= 7; page++) {
      const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: "8210bf58af0326bff3d6ef3d33c2c864",
          language: "en-En",
          page: page,
        },
      });
      allMovies.push(...response.data.results);
    }
    return allMovies;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
