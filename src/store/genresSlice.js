import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
    params: {
      api_key: "8210bf58af0326bff3d6ef3d33c2c864",
      language: "en-US"
    }
  });
  return response.data.genres;
});

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default genresSlice.reducer;

