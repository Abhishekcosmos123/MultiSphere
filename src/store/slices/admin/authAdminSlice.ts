import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginCredentials, OTPDataMobile, ForgetPasswordData, ForgetPasswordOTPData, LogoutToken } from '@/lib/api/services/admin/adminAuthService.ts';

interface AdminUser {
  id: string;
  email?: string;
  name: string;
  role: string;
  profileImage?: string;
  phone?: string;
  country_code?: string;
}

export interface GetUsers {
  id: string;
  email?: string;
  name: string;
  role: string;
  profileImage?: string;
  phone?: string;
  country_code?: string;
  is_verified: boolean;
  provider: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface Token {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: Token | null;
  status: boolean;
  otpResponse: {
    success: boolean;
    message: string;
    data: {
      user?: AdminUser;
      token?: Token;
    } | null;
  } | null;
  registerResponse: {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
  } | null;
  forgetPasswordResponse: {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
  } | null;
  getUsers: GetUsers[] | null;
  success: boolean;
  message: string;
  isLoading: boolean;
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
  status: false,
  otpResponse: null,
  registerResponse: null,
  forgetPasswordResponse: null,
  getUsers: null,
  success: false,
  message: '',
  isLoading: false,
};

const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    adminLoginRequest: (state, action: PayloadAction<LoginCredentials>) => {
      state.loading = true;
      state.error = null;
    },
    adminLoginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.token = null;
      state.error = null;
      state.status = action.payload.data.status;
    },
    adminLoginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    adminLogoutRequest: (state, action: PayloadAction<LogoutToken>) => {
      state.loading = true;
      state.error = null;
    },
    adminLogoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    adminLogoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    verifyAdminOtpRequestMobile: (state, action: PayloadAction<OTPDataMobile>) => {
      state.loading = true;
      state.error = null;
    },
    verifyAdminOtpSuccessMobile: (state, action: PayloadAction<{ success: boolean; message: string; data: { user: AdminUser; token: Token } }>) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.data.token;
      state.otpResponse = action.payload;
      state.user = action.payload.data.user;
      state.isAuthenticated = action.payload.success;
    },
    verifyAdminOtpFailureMobile: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminForgetPasswordRequest: (state, action: PayloadAction<ForgetPasswordData>) => {
      state.loading = true;
      state.error = null;
    },
    adminForgetPasswordSuccess: (state, action: PayloadAction<{ success: boolean; message: string; data: Record<string, unknown> }>) => {
      state.loading = false;
      state.error = null;
      state.forgetPasswordResponse = action.payload;
    },
    adminForgetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminVerifyForgetPasswordOtpRequest: (state, action: PayloadAction<ForgetPasswordOTPData>) => {
      state.loading = true;
      state.error = null;
    },
    adminVerifyForgetPasswordOtpSuccess: (state, action: PayloadAction<{ success: boolean; message: string; data: { user: AdminUser } }>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.data.user;
      state.otpResponse = action.payload;
      state.isAuthenticated = action.payload.success;
    },
    adminVerifyForgetPasswordOtpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminResetPasswordRequest: (state, action: PayloadAction<ResetPasswordData>) => {
      state.loading = true;
      state.error = null;
    },
    adminResetPasswordSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.error = null;
    },
    adminResetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminResendOtpRequest(state, action: PayloadAction<{ email: string }>) {
      state.isLoading = true;
      state.error = null;
    },
    adminResendOtpSuccess(state, action: PayloadAction<{ success: boolean; message: string }>) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    adminResendOtpFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
  adminLogoutRequest,
  adminLogoutSuccess,
  adminLogoutFailure,
  verifyAdminOtpRequestMobile,
  verifyAdminOtpSuccessMobile,
  verifyAdminOtpFailureMobile,
  adminForgetPasswordRequest,
  adminForgetPasswordSuccess,
  adminForgetPasswordFailure,
  adminVerifyForgetPasswordOtpRequest,
  adminVerifyForgetPasswordOtpSuccess,
  adminVerifyForgetPasswordOtpFailure,
  adminResetPasswordRequest,
  adminResetPasswordSuccess,
  adminResetPasswordFailure,
  adminResendOtpRequest,
  adminResendOtpSuccess,
  adminResendOtpFailure,
} = authAdminSlice.actions;

export default authAdminSlice.reducer; 