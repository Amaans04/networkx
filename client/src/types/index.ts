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
  // New profile enhancement features
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    earned: boolean;
    earnedDate?: string;
  }[];
  careerHighlights: {
    id: string;
    title: string;
    description: string;
    year: string;
  }[];
  profileInsights: {
    careerFitScore: {
      score: number;
      industry: string;
      topMatches: {
        role: string;
        score: number;
      }[];
    };
    recommendations: {
      id: string;
      type: "skill" | "connection" | "job-role" | "certification";
      title: string;
      reason: string;
    }[];
    endorsements: {
      skill: string;
      count: number;
    }[];
  };
}

export interface EmployerJobPosting {
  title: string;
  daysAgo: number;
  applicantsCount: number;
  skills: string[];
  description?: string;
  location?: string;
  salary?: string;
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

// New interfaces for connection-building features
export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: "Article" | "Tutorial" | "Course" | "Tool" | "Idea";
  author: string;
  datePosted: string;
  likes: number;
  category: string;
  tags: string[];
  url?: string;
}

export interface SkillMatch {
  id: string;
  userId: string;
  skillName: string;
  matchScore: number;
  recommendedResources: ResourceItem[];
  relatedSkills: string[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  datePosted: string;
  category: string;
  tags: string[];
  likes: number;
  replies: {
    id: string;
    content: string;
    author: string;
    datePosted: string;
    likes: number;
  }[];
}

export interface ProgressStats {
  points: number;
  level: number;
  completedActivities: string[];
}

export interface MockInterview {
  id: string;
  title: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  duration: number; // in minutes
  questions: InterviewQuestion[];
  dateCreated: string;
  completedOn?: string;
  score?: number;
  feedback?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  sampleAnswer?: string;
  userAnswer?: string;
  feedback?: string;
  score?: number;
  tips?: string[];
  keypoints?: string[];
}

export interface AppState {
  currentPage: "landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup" | "resources" | "skills" | "discussions" | "progress" | "mock-interview";
  preferences: Preference;
  shortlistedJobs: Job[];
  shortlistedApplicants: Applicant[];
  // New connection-building features
  resources: ResourceItem[];
  skillMatches: SkillMatch[];
  discussions: Discussion[];
  progressStats: ProgressStats;
  mockInterviews: MockInterview[];
  activeInterviewId: string | null;
  // State setters
  setCurrentPage: (page: "landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup" | "resources" | "skills" | "discussions" | "progress" | "mock-interview") => void;
  setPreferences: (preferences: Preference) => void;
  addShortlistedJob: (job: Job) => void;
  removeShortlistedJob: (jobId: string) => void;
  addShortlistedApplicant: (applicant: Applicant) => void;
  removeShortlistedApplicant: (applicantId: string) => void;
  // New state setters
  addResource: (resource: ResourceItem) => void;
  removeResource: (resourceId: string) => void;
  updateSkillMatches: (matches: SkillMatch[]) => void;
  addDiscussion: (discussion: Discussion) => void;
  updateProgressStats: (stats: Partial<ProgressStats>) => void;
  addMockInterview: (interview: MockInterview) => void;
  updateMockInterview: (interview: MockInterview) => void;
  startMockInterview: (interviewId: string) => void;
  completeMockInterview: (
    interviewId: string, 
    completionData: {
      score: number,
      feedback: string,
      completedOn: string
    }
  ) => void;
}
