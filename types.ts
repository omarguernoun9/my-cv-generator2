export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  dateOfBirth: string
  nationality: string
  linkedIn: string
  website: string
}

export interface Education {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa: string
  description: string
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  location: string
}

export interface Skills {
  technical: string[]
  soft: string[]
  languages: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  expiryDate: string
  credentialId: string
}

export interface VolunteerExperience {
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export interface Reference {
  name: string
  position: string
  company: string
  email: string
  phone: string
  relationship: string
}

export interface CVData {
  personalInfo: PersonalInfo
  profileSummary: string
  education: Education[]
  workExperience: WorkExperience[]
  skills: Skills
  certifications: Certification[]
  volunteerExperience: VolunteerExperience[]
  references: Reference[]
}

export interface Template {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  features: string[]
  category: "professional" | "creative" | "academic" | "modern"
}

export type CVType = "canadian" | "european"
export type CVCategory = "student" | "skilled" | "unskilled" | "volunteer"
