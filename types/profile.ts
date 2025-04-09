export interface EducationEntry {
    universityLogo: File | null
    universityName: string
    courseName: string
    timePeriod: string
    courseDescription: string
  }
  
  export interface Experience {
    logo: File | null
    position: string
    companyName: string
    jobType: string
    timePeriod: string
    location: string
    workMode: string
    skills: string
  }
  
  export interface Certification {
    logo: File | null
    name: string
    companyName: string
    issuedDate: string
    credentialId: string
  }
  