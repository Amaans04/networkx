import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AppState, Preference, Job, Applicant, ResourceItem, SkillMatch, Discussion, ProgressStats, MockInterview } from "../types";
import { jobs, applicants, mockInterviews as initialMockInterviews } from "../lib/mockData";

const initialPreferences: Preference = {
  location: "",
  experience: "",
  role: ""
};

// Create initial state for the context
const initialState: AppState = {
  currentPage: "dashboard",
  preferences: initialPreferences,
  shortlistedJobs: [],
  shortlistedApplicants: [],
  // New connection-building features
  resources: [],
  skillMatches: [],
  discussions: [],
  progressStats: { points: 0, level: 1, completedActivities: [] },
  mockInterviews: [],
  activeInterviewId: null,
  // State setters
  setCurrentPage: () => {},
  setPreferences: () => {},
  addShortlistedJob: () => {},
  removeShortlistedJob: () => {},
  addShortlistedApplicant: () => {},
  removeShortlistedApplicant: () => {},
  // New state setters
  addResource: () => {},
  removeResource: () => {},
  updateSkillMatches: () => {},
  addDiscussion: () => {},
  updateProgressStats: () => {},
  addMockInterview: () => {},
  updateMockInterview: () => {},
  startMockInterview: () => {},
  completeMockInterview: () => {},
};

const AppContext = createContext<AppState>(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPageState] = useState<"landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup" | "resources" | "skills" | "discussions" | "progress" | "mock-interview">("dashboard");
  const [preferences, setPreferences] = useState<Preference>(initialPreferences);
  const [shortlistedJobs, setShortlistedJobs] = useState<Job[]>([]);
  const [shortlistedApplicants, setShortlistedApplicants] = useState<Applicant[]>([]);
  
  // New states for connection-building features
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [skillMatches, setSkillMatches] = useState<SkillMatch[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [progressStats, setProgressStats] = useState({ points: 0, level: 1, completedActivities: [] });
  const [mockInterviews, setMockInterviews] = useState<MockInterview[]>(initialMockInterviews);
  const [activeInterviewId, setActiveInterviewId] = useState<string | null>(null);

  // Debug logging for page changes
  useEffect(() => {
    console.log("Current page in context: ", currentPage);
  }, [currentPage]);

  // Handle page changes
  const setCurrentPage = (page: "landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup" | "resources" | "skills" | "discussions" | "progress" | "mock-interview") => {
    console.log("Setting current page to: ", page);
    setCurrentPageState(page);
  };

  const addShortlistedJob = (job: Job) => {
    if (!shortlistedJobs.find(j => j.id === job.id)) {
      setShortlistedJobs(prev => [...prev, job]);
    }
  };

  const removeShortlistedJob = (jobId: string) => {
    setShortlistedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const addShortlistedApplicant = (applicant: Applicant) => {
    if (!shortlistedApplicants.find(a => a.id === applicant.id)) {
      setShortlistedApplicants(prev => [...prev, applicant]);
    }
  };

  const removeShortlistedApplicant = (applicantId: string) => {
    setShortlistedApplicants(prev => prev.filter(applicant => applicant.id !== applicantId));
  };

  // New methods for connection-building features
  const addResource = (resource: ResourceItem) => {
    setResources(prev => [...prev, resource]);
  };

  const removeResource = (resourceId: string) => {
    setResources(prev => prev.filter(resource => resource.id !== resourceId));
  };

  const updateSkillMatches = (matches: SkillMatch[]) => {
    setSkillMatches(matches);
  };

  const addDiscussion = (discussion: Discussion) => {
    setDiscussions(prev => [...prev, discussion]);
  };

  const updateProgressStats = (stats: Partial<ProgressStats>) => {
    setProgressStats(prev => ({ ...prev, ...stats }));
  };

  // Mock interview methods
  const addMockInterview = (interview: MockInterview) => {
    setMockInterviews(prev => [...prev, interview]);
  };

  const updateMockInterview = (interview: MockInterview) => {
    setMockInterviews(prev => prev.map(i => i.id === interview.id ? interview : i));
  };

  const startMockInterview = (interviewId: string) => {
    // Set the current interview as active
    setActiveInterviewId(interviewId);
  };

  const completeMockInterview = (
    interviewId: string, 
    completionData: {
      score: number,
      feedback: string,
      completedOn: string
    }
  ) => {
    // Update the interview with completion details    
    setMockInterviews(prev => prev.map(interview => {
      if (interview.id === interviewId) {
        // Update interview with completion data
        return {
          ...interview,
          ...completionData
        };
      }
      return interview;
    }));
    
    // Add points to progress stats for completing an interview
    updateProgressStats({
      points: progressStats.points + 50,
      completedActivities: [...progressStats.completedActivities, `Completed mock interview: ${interviewId}`]
    });
  };

  return (
    <AppContext.Provider 
      value={{
        currentPage,
        preferences,
        shortlistedJobs,
        shortlistedApplicants,
        resources,
        skillMatches,
        discussions,
        progressStats,
        mockInterviews,
        activeInterviewId,
        setCurrentPage,
        setPreferences,
        addShortlistedJob,
        removeShortlistedJob,
        addShortlistedApplicant,
        removeShortlistedApplicant,
        addResource,
        removeResource,
        updateSkillMatches,
        addDiscussion,
        updateProgressStats,
        addMockInterview,
        updateMockInterview,
        startMockInterview,
        completeMockInterview
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
