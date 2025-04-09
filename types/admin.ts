// types/admin.ts
export interface AdminProfilePayload {
    name: string;
    phone: string;
    email: string;
    country_code: string;
  }
  
  export interface AdminProfileResponse {
    success: boolean;
    message: string;
    data: {
      id: string;
      name: string;
      email: string;
      phone: string;
      country_code: string;
      provider: string;
      role: string;
      created_at: string;
      updated_at: string;
      is_active: boolean;
      is_deleted: boolean;
    };
  }
  