import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginCredentials, RegisterData, OTPData, OTPDataMobile, ForgetPasswordData, ForgetPasswordOTPData, SocialLoginData, LogoutToken } from '@/lib/api/services/authService';

export interface Education {
  logo: string;
  name: string;
  course_name: string;
  time_period: string;
  course_description: string;
}

export interface Experience {
  logo: string;
  skills: string;
  job_type: string;
  location: string;
  position: string;
  work_mode: string;
  time_period: string;
}

export interface Certification {
  logo: string;
  certificate_name: string;
  issuing_organization: string;
  issue_date: string;
  credential_id: string;
}

export interface SocialLink {
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  provider: string;
  role: string;
  profileImage?: File | null;
  // cover_profile: string;
  // education: Education[];
  // experience: Experience[];
  // headline: string;
  // biography: string;
  // user_location: string;
  // language: string;
  // website: string;
  // social_links: SocialLink[];
  // skills: string[];
  // license_certificate: Certification[];
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
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: Token | null;
  status: boolean;
  otpResponse: {
    success: boolean;
    message: string;
    data: {
      user?: User; 
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
      state.isAuthenticated = action.payload.success;
      state.user = action.payload.data.user;
      state.token = null;
      state.error = null;
      // state.status = action.payload.data.status;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      // state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logoutRequest: (state, action: PayloadAction<LogoutToken>) => {
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
      state.isAuthenticated = false;
      state.user = null;
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
      state.user = action.payload.data.user;
      state.registerResponse = action.payload;
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
    verifyOtpSuccess: (state, action: PayloadAction<{ success: boolean; message: string; data: { user: User; token: Token } }>) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.data.token; 
      state.user = action.payload.data.user; 
      state.isAuthenticated = action.payload.success;
      state.otpResponse = action.payload;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyOtpRequestMobile: (state, action: PayloadAction<OTPDataMobile>) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccessMobile: (state, action: PayloadAction<{ success: boolean; message: string; data: { user: User; token: Token } }>) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.data.token; 
      state.otpResponse = action.payload;
      state.user = action.payload.data.user; 
      state.isAuthenticated = action.payload.success;
    },
    verifyOtpFailureMobile: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: (state, action: PayloadAction<ForgetPasswordData>) => {
      state.loading = true;
      state.error = null;
    },
    forgetPasswordSuccess: (state, action: PayloadAction<{ success: boolean; message: string; data: Record<string, unknown> }>) => {
      state.loading = false;
      state.error = null;
      state.forgetPasswordResponse = action.payload;
    },
    forgetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyForgetPasswordOtpRequest: (state, action: PayloadAction<ForgetPasswordOTPData>) => {
      state.loading = true;
      state.error = null;
    },
    verifyForgetPasswordOtpSuccess: (state, action: PayloadAction<{ success: boolean; message: string; data: { user: User } }>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.data.user; 
      state.otpResponse = action.payload;
      state.isAuthenticated = action.payload.success;
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
    socialLoginRequest: (state, action: PayloadAction<SocialLoginData>) => {
      state.loading = true;
      state.error = null;
    },
    socialLoginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.error = null;
      // state.status = action.payload.data.status;
    },
    socialLoginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    getUsersRequest: (state, action: PayloadAction<{ role: string, page: number, limit: number }>) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action: PayloadAction<{ success: boolean; message: string; data: { filteredUsers: GetUsers[] } }>) => {
      state.loading = false;
      state.error = null;
      state.getUsers = action.payload.data.filteredUsers;
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resendOtpRequest(state, action: PayloadAction<{ email: string }>) {
      state.isLoading = true;
      state.error = null;
    },
    resendOtpSuccess(state, action: PayloadAction<{ success: boolean; message: string }>) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    resendOtpFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
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
  resetPasswordFailure,
  socialLoginRequest,
  socialLoginSuccess,
  socialLoginFailure,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  resendOtpRequest,
  resendOtpSuccess,
  resendOtpFailure,
} = authSlice.actions;

export default authSlice.reducer; 