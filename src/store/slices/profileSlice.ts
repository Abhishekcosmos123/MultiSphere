import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  phone: string;
  country_code: string;
  role: string;
  provider: string;
  is_verified: boolean;
  profile_pic: string | null;
}

interface ProfileState {
  loading: boolean;
  user: User | null;
  error: string | null;
  successMessage: string | null;
}

interface UpdateProfilePayload {
    id: string;
    name: string;
    email: string;
    phone: string;
    country_code: string;
    profile: string;
  }

const initialState: ProfileState = {
  loading: false,
  user: null,
  error: null,
  successMessage: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileRequest(state, action: PayloadAction<UpdateProfilePayload>) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateProfileSuccess(state, action: PayloadAction<{ user: User; message: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
