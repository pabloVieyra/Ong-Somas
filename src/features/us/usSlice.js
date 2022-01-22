import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrganization } from '../../Services/organizationService';
import { getAllMembers } from '../../Services/membersService';
const initialState = {
  usData: {
    organization: {},
    membersList: [],
  },
  status: 'idle',
  error: null,
};

export const fetchUsData = createAsyncThunk('us/fetchUsData', async () => {
  const response = {
    organization: {},
    membersList: [],
  };

  response.organization = await getOrganization();
  response.membersList = await getAllMembers();

  return response;
});

const usSlice = createSlice({
  name: 'us',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsData.pending, (state, _action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.usData.membersList = state.usData.membersList.concat(
        action.payload.membersList,
      );
      state.usData.organization = { ...action.payload.organization.data };
    });
    builder.addCase(fetchUsData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default usSlice.reducer;

export const selectUsData = (state) => state.us.usData;
