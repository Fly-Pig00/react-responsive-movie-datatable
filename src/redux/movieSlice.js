import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    watchlaters: [],
    loading: true,
    first: 0,
    rows: 20,
    totalRecords: 20,
    listSelected: true
  },
  reducers: {
    onPage: (state, action) => {
      state.loading = true;
      state.first = action.payload.first;
    },
    dataLoaded: (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    },
    setTotalRecords: (state, action) => {
      state.totalRecords = action.payload;
    },
    toggleSelect: (state, action) => {
      state.listSelected = action.payload;
    },
    toggleFavorite: (state, action) => {
      const idx = state.movies.findIndex(movie => movie.id === action.payload);
      state.movies[idx].favorite = !state.movies[idx].favorite;
    },
    addWatchLater: (state, action) => {
      const idx = state.watchlaters.findIndex(movie => movie.id === action.payload.id);
      if(idx === -1) state.watchlaters.push(action.payload);
    },
    removeWatchLater: (state, action) => {
      const idx = state.watchlaters.findIndex(movie => movie.id === action.payload);
      if(idx !== -1) state.watchlaters.splice(idx, 1);
    },
  },
})

export const { onPage, dataLoaded, setTotalRecords, toggleSelect, toggleFavorite, addWatchLater, removeWatchLater } = movieSlice.actions

export default movieSlice.reducer