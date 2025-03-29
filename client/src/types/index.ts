export interface Preference {
  location: string;
  experience: string;
  role: string;
  workTypes?: string[];
  industry?: string;
  minSalary?: string;
  maxSalary?: string;
  [key: string]: any; // Allow for dynamic additional fields
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  location: string;
  salary: string;
  workType: "Remote" | "Hybrid" | "In-office";
  matchPercentage: number;
  skills: string[];
  profileImage?: string; // Optional profile image URL
}

export interface Applicant {
  id: string;
  name: string;
  position: string;
  experience: string;
  location: string;
  previousCompany: string;
  description: string;
  matchPercentage: number;
  skills: string[];
}

export interface Profile {
  name: string;
  position: string;
  location: string;
  about: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  documents: {
    name: string;
    icon: string;
    lastUpdated: string;
  }[];
  preferences: {
    location: string;
    jobTypes: string[];
    salaryRange: {
      min: string;
      max: string;
    };
    notifications: {
      jobs: boolean;
      status: boolean;
      messages: boolean;
    };
  };
  completeness: {
    percentage: number;
    completed: string[];
    pending: string[];
  };
  profileImage: string | null;
}

export interface EmployerJobPosting {
  title: string;
  daysAgo: number;
  applicantsCount: number;
  skills: string[];
}

export interface ShortlistedCandidate {
  id: string;
  name: string;
  position: string;
  location: string;
  matchPercentage: number;
}

export interface HiringUpdate {
  id: string;
  name: string;
  position: string;
  company: string;
  timeAgo: string;
}

export interface AppState {
  currentPage: "landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup";
  preferences: Preference;
  shortlistedJobs: Job[];
  shortlistedApplicants: Applicant[];
  setCurrentPage: (page: "landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup") => void;
  setPreferences: (preferences: Preference) => void;
  addShortlistedJob: (job: Job) => void;
  removeShortlistedJob: (jobId: string) => void;
  addShortlistedApplicant: (applicant: Applicant) => void;
  removeShortlistedApplicant: (applicantId: string) => void;
}
