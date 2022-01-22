import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMembers } from '../../Services/membersService';

const initialState = {
  membersList: [],
  status: 'idle',
  error: null,
};

export const fetchAllMembers = createAsyncThunk(
  'members/fetchAllMembers',
  async () => {
    const response = await getAllMembers();

    return response;
  },
);

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllMembers.pending, (state, _action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllMembers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.membersList = state.membersList.concat(action.payload);
    });
    builder.addCase(fetchAllMembers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default membersSlice.reducer;

export const selectAllMembers = (state) => state.members.membersList;
