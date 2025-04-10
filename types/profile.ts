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
  