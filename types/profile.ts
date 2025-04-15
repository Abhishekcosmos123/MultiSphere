import { UserToken } from "@/lib/api/services/authService"
import { Education, SocialLink } from "@/store/slices/authSlice"

export interface EducationEntry {
  logo: File | null
    name: string
    course_name: string
    time_period: string
    course_description: string
  }
  
  export interface Experience {
    logo: File | null
    position: string
    companyName: string
    job_type: string
    time_period: string
    location: string
    work_mode: string
    skills: string
  }
  
  export interface Certification {
    logo: File | null
    certificate_name: string
    issuing_organization: string
    issue_date: string
    credential_id: string
  }

  export interface UserData {
    id: string;
    name: string;
    email: string;
    phone: string;
    country_code: string;
    provider: string;
    role: string;
    profileImage?: File | null;
    cover_profile: string;
    education: Education[];
    experience: Experience[];
    headline: string;
    biography: string;
    user_location: string;
    language: string;
    website: string;
    social_links: SocialLink[];
    skills: string[];
    license_certificate: Certification[];
  }

  export interface ProfileResponse {
    success: boolean;
    message: string;
    data: UserData;
  }
  