import { AuthResponse, FetchModulesResponse } from "@/lib/api/services/authService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileResponse, UserData } from "../../../types/profile";

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
  userProfile: UserData | null;
  modules: string[];
  useCoordinator: { [key: string]: boolean };
  useProducer: { [key: string]: boolean };
  currentModule: string;
  contentUrl: string;
}

interface UpdateProfilePayload {
  formData: FormData;
  id: string;
}

const initialState: ProfileState = {
  loading: false,
  user: null,
  error: null,
  successMessage: null,
  userProfile: null,
  modules: [] as string[],
  useCoordinator: {} as { [key: string]: boolean },
  useProducer: {} as { [key: string]: boolean },
  currentModule: '',
  contentUrl: '',
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
    updateUserRequest: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
    },
    updateUserSuccess: (state, action: PayloadAction<ProfileResponse>) => {
      state.loading = false
      state.userProfile = action.payload.data
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.userProfile = null;
      state.error = action.payload
    },
    fetchModulesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchModulesSuccess: (state, action: PayloadAction<FetchModulesResponse>) => {
      state.loading = false;
      state.modules = action.payload.data.allModules;
      state.currentModule = action.payload.data.currentModule;
      state.contentUrl = action.payload.data.content;
      state.useCoordinator = action.payload.data.useCoordinator;
      state.useProducer = action.payload.data.useProducers;
    },
    fetchModulesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  fetchModulesRequest,
  fetchModulesFailure,
  fetchModulesSuccess,
} = profileSlice.actions;

export default profileSlice.reducer;
