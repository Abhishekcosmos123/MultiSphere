import { apiClient } from '../client';

export interface LoginCredentials {
  email?: string;
  password?: string;
  country_code?: string;
  phone?: string;
}

export interface RegisterData {
  email?: string;
  password?: string;
  name: string;
  phone?: string;
  country_code?: string;
  role: string;
  provider: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    country_code: string;
    role: string;
  };
  token: string;
}

export interface OTPData {
  email?: string;
  otp: string;
  phone?: string;
  country_code?: string;
}

export interface OTPDataMobile {
  phone?: string;
  country_code?: string;
  otp: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ForgetPasswordOTPData {
  email: string;
  otp: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  async logout(): Promise<void> {
    return apiClient.post('/auth/logout');
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    return apiClient.get<AuthResponse['user']>('/auth/me');
  },

  async updateProfile(data: Partial<AuthResponse['user']>): Promise<AuthResponse['user']> {
    return apiClient.put<AuthResponse['user']>('/auth/profile', data);
  },

  async verifyOtp(data: OTPData): Promise<void> {
    return apiClient.post('/auth/verify-otp', data);
  },

  async verifyOtpMobile(data: OTPDataMobile): Promise<void> {
    return apiClient.post('/auth/verify-otp-mobile', data);
  },

  async forgetPassword(data: ForgetPasswordData): Promise<{ message: string }> {
    return apiClient.post('/auth/forgot-password', data);
  },

  async verifyforgetPasswordOTP(data: ForgetPasswordOTPData): Promise<{ message: string }> {
    return apiClient.post('/auth/forgot-password-verify-otp', data);
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return apiClient.post('/auth/reset-password', data);
  },
}; 