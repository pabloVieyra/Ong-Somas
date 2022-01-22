import { createSlice } from '@reduxjs/toolkit';
import {
  getAllNew,
  filterNewsbyTerm,
  deleteNewsbyId,
} from './novedadesAsyncThunks';

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    error: null,
    news: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNew.pending, (state) => {
        state.news = null;
        state.loading = true;
      })
      .addCase(getAllNew.fulfilled, (state, action) => {
        state.error = null;
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(getAllNew.rejected, (state, action) => {
        state.error = action.payload;
        state.news = [];
        state.loading = false;
      })
      .addCase(filterNewsbyTerm.pending, (state) => {
        state.news = null;
        state.loading = true;
      })
      .addCase(filterNewsbyTerm.fulfilled, (state, action) => {
        state.error = null;
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(filterNewsbyTerm.rejected, (state, action) => {
        state.error = action.payload;
        state.news = [];
        state.loading = false;
      })
      .addCase(deleteNewsbyId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNewsbyId.fulfilled, (state, action) => {
        state.error = null;
        state.news = state.news.filter((a) => a.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteNewsbyId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = newsSlice;

export default reducer;
