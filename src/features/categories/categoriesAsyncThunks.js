import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategories,
  getCategoriesbyTerm,
  deleteCategory,
} from '../../Services/CategoriesService';

const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async () => {
    const response = await getCategories();

    return response;
  },
);

const filterCategoriesbyTerm = createAsyncThunk(
  'categories/getCategoriesbyTerm',
  async (term) => {
    const response = await getCategoriesbyTerm(term);

    return response;
  },
);

const deleteCategorybyId = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    const response = await deleteCategory(id);

    return { id, response };
  },
);

export { getAllCategories, filterCategoriesbyTerm, deleteCategorybyId };
