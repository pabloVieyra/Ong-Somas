import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllNews,
  getNewsByKeyword,
  deleteNews,
} from '../../Services/NewsService';

const getAllNew = createAsyncThunk('categories/getAllCategories', async () => {
  const response = await getAllNews();

  return response;
});

const filterNewsbyTerm = createAsyncThunk(
  'news/getCategoriesbyTerm',
  async (term) => {
    const response = await getNewsByKeyword(term);

    return response;
  },
);

const deleteNewsbyId = createAsyncThunk('news/deleteCategory', async (id) => {
  const response = await deleteNews(id);

  return { id, response };
});

export { getAllNew, filterNewsbyTerm, deleteNewsbyId };
