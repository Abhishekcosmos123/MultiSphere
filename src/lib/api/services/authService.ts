import { apiClient } from '../client';

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

export interface UpdateUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  is_active: boolean;
  provider: string;
  created_by: string;
  updated_by: string;
  is_deleted: boolean;
  profile_pic: string;
  role: string;
  created_at?: string; 
  updated_at?: string;
}

export interface UpdateUserPayload {
  userId: string;
  userData: Partial<UpdateUser>;
}

export interface CreateUserPayload {
  provider: string;
  name: string;
  email?: string;
  password?: string;
  phone?: string;
  country_code?: string;
  role: string;
  created_by: string;
}

export interface CreatedUserResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    country_code: string | null;
    provider: string;
    role: string;
    profile_pic: string | null;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  async logout(data: LogoutToken): Promise<void> {
    return apiClient.post('/auth/logout', data);
  },

  // async getCurrentUser(): Promise<AuthResponse['user']> {
  //   return apiClient.get<AuthResponse['user']>('/auth/me');
  // },

  // async updateProfile(data: Partial<AuthResponse['user']>): Promise<AuthResponse['user']> {
  //   return apiClient.put<AuthResponse['user']>('/auth/profile', data);
  // },

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

  async socialLogin(data: SocialLoginData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/social-login', data);
  },

  async getUsers(role: string): Promise<{ success: boolean; message: string; data: { users: AuthResponse['data']['user'][] } }> {
    return apiClient.post<{ success: boolean; message: string; data: { users: AuthResponse['data']['user'][] } }>(`/admin/users?role=${role}`);
  },

  async updateUserProfile({ id, ...body }: UpdateProfilePayload): Promise<{ message: string }> {
    return apiClient.put(`/users/profile/${id}`, body);
  },

  async searchUsers(searchBy: string, searchValue: string) {
    return apiClient.post(`/admin/users/search?searchBy=${searchBy}&searchValue=${searchValue}`);
  },

  async deleteUser(userId: string): Promise<{ message: string }> {
    return apiClient.delete(`/admin/users/${userId}`);
  },

  async updateUser(payload: UpdateUserPayload): Promise<UpdateUser> {
    const { userId, userData } = payload;
    return apiClient.put(`/admin/users/${userId}`, userData);
  },  

  async createUser(payload: CreateUserPayload): Promise<CreatedUserResponse> {
    return apiClient.post("/admin/create-users", payload);
  },
}; 