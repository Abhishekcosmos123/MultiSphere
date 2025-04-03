import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginCredentials, RegisterData, OTPData, OTPDataMobile, ForgetPasswordData, ForgetPasswordOTPData } from '@/lib/api/services/authService';

interface User {
  id: string;
  email?: string;
  name: string;
  role: string;
  profileImage?: string;
  phone?: string; 
  country_code?: string; 
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  } | null;
}

export interface ResetPasswordData {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginCredentials>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = null;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCurrentUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    getCurrentUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerRequest: (state, action: PayloadAction<RegisterData>) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = null; 
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; 
      state.error = action.payload;
    },
    verifyOtpRequest: (state, action: PayloadAction<OTPData>) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state, action: PayloadAction<{ message: string; token: { access: { token: string; expires: string }; refresh: { token: string; expires: string } }; user: User }>) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token; 
      state.user = action.payload.user; 
      state.isAuthenticated = true;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyOtpRequestMobile: (state, action: PayloadAction<OTPDataMobile>) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccessMobile: (state, action: PayloadAction<{ message: string; token: { access: { token: string; expires: string }; refresh: { token: string; expires: string } }; user: User }>) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token; 
      state.user = action.payload.user; 
      state.isAuthenticated = true;
    },
    verifyOtpFailureMobile: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: (state, action: PayloadAction<ForgetPasswordData>) => {
      state.loading = true;
      state.error = null;
    },
    forgetPasswordSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.error = null;
    },
    forgetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyForgetPasswordOtpRequest: (state, action: PayloadAction<ForgetPasswordOTPData>) => {
      state.loading = true;
      state.error = null;
    },
    verifyForgetPasswordOtpSuccess: (state, action: PayloadAction<{ message: string; user: User }>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user; 
      state.isAuthenticated = true;
    },
    verifyForgetPasswordOtpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest: (state, action: PayloadAction<ResetPasswordData>) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.error = null;
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  verifyOtpRequestMobile,
  verifyOtpSuccessMobile,
  verifyOtpFailureMobile,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  verifyForgetPasswordOtpRequest,
  verifyForgetPasswordOtpSuccess,
  verifyForgetPasswordOtpFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure
} = authSlice.actions;

export default authSlice.reducer; 