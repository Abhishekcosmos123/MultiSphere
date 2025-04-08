import { apiClient } from "../../client";

export interface LoginCredentials {
  email?: string;
  password?: string;
  country_code?: string;
  phone?: string;
  role?: string;
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
  data: {
    user: {
      id: string;
      name: string;
      phone: string;
      country_code: string;
      role: string;
      email: string;
      profileImage: string;
    };
    token: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
    status: boolean
  };
  message: string;
  success: boolean;
}

export interface OTPData {
  email?: string;
  otp: string;
  phone?: string;
  country_code?: string;
}

export interface LogoutToken {
  refreshToken?: string;
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

export interface SocialLoginData {
  idToken: string;
  provider: string;
  role: string;
  email: string;
  phone: string;
  name: string;
}

export interface UpdateProfilePayload {
  id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  profile: string;
}

export const adminAuthService = {
  async adminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/admin/login', credentials);
  },

  async verifyAdminOtpMobile(data: OTPDataMobile): Promise<void> {
    return apiClient.post('/admin/verify-otp-mobile', data);
  },

  async adminForgetPassword(data: ForgetPasswordData): Promise<{ message: string }> {
    return apiClient.post('/admin/forgot-password', data);
  },

  async adminVerifyforgetPasswordOTP(data: ForgetPasswordOTPData): Promise<{ message: string }> {
    return apiClient.post('/admin/forgot-password-verify-otp', data);
  },

  async adminResetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return apiClient.post('/admin/reset-password', data);
  },

  async adminLogout(data: LogoutToken): Promise<void> {
    return apiClient.post('/admin/logout', data);
  },
}; 