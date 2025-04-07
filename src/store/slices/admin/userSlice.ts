import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  role: string;
  created_at: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

interface SearchPayload {
    searchBy: string;
    searchValue: string;
  }

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUsersRequest(state, action: PayloadAction<SearchPayload>) {
      state.loading = true;
      state.error = null;
    },
    searchUsersSuccess(state, action: PayloadAction<{ success: boolean; message: string; data: { users: User[] } }>) {
      state.loading = false;
      state.users = action.payload.data.users;
    },
    searchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchUsersRequest, searchUsersSuccess, searchUsersFailure } = userSlice.actions;
export default userSlice.reducer;
