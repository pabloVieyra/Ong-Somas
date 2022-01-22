import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCategories,
  filterCategoriesbyTerm,
  deleteCategorybyId,
} from './categoriesAsyncThunks.js';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    error: null,
    categories: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.categories = null;
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.error = null;
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.categories = [];
        state.loading = false;
      })
      .addCase(filterCategoriesbyTerm.pending, (state) => {
        state.categories = null;
        state.loading = true;
      })
      .addCase(filterCategoriesbyTerm.fulfilled, (state, action) => {
        state.error = null;
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(filterCategoriesbyTerm.rejected, (state, action) => {
        state.error = action.payload;
        state.categories = [];
        state.loading = false;
      })
      .addCase(deleteCategorybyId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategorybyId.fulfilled, (state, action) => {
        state.error = null;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id,
        );
        state.loading = false;
      })
      .addCase(deleteCategorybyId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = categoriesSlice;

export default reducer;
