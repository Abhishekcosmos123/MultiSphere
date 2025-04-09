import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminProfilePayload, AdminProfileResponse } from '../../../../types/admin';

interface AdminState {
  profile: AdminProfileResponse | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AdminState = {
  profile: null,
  loading: false,
  error: null,
  successMessage: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateAdminProfileRequest: (
      state,
      _action: PayloadAction<{ id: string; payload: AdminProfilePayload }>
    ) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateAdminProfileSuccess: (state, action: PayloadAction<AdminProfileResponse>) => {
      state.loading = false;
      state.profile = action.payload;
      state.successMessage = action.payload.message;
    },
    updateAdminProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateAdminProfileRequest,
  updateAdminProfileSuccess,
  updateAdminProfileFailure,
} = adminSlice.actions;

export default adminSlice.reducer;
