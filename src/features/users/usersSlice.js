import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../../Services/userService';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const res = await getAllUsers();

    return res;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllUsers.pending, (state, _action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.list = state.list.concat(action.payload);
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.list;
