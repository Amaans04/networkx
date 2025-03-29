import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AppState, Preference, Job, Applicant } from "../types";
import { jobs, applicants } from "../lib/mockData";

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
  setCurrentPage: () => {},
  setPreferences: () => {},
  addShortlistedJob: () => {},
  removeShortlistedJob: () => {},
  addShortlistedApplicant: () => {},
  removeShortlistedApplicant: () => {}
};

const AppContext = createContext<AppState>(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPageState] = useState<"landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup">("dashboard");
  const [preferences, setPreferences] = useState<Preference>(initialPreferences);
  const [shortlistedJobs, setShortlistedJobs] = useState<Job[]>([]);
  const [shortlistedApplicants, setShortlistedApplicants] = useState<Applicant[]>([]);

  // Debug logging for page changes
  useEffect(() => {
    console.log("Current page in context: ", currentPage);
  }, [currentPage]);

  // Handle page changes
  const setCurrentPage = (page: "landing" | "job-seeker" | "employer" | "profile" | "dashboard" | "postings" | "company-profile" | "shortlisted" | "login" | "signup") => {
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

  return (
    <AppContext.Provider 
      value={{
        currentPage,
        preferences,
        shortlistedJobs,
        shortlistedApplicants,
        setCurrentPage,
        setPreferences,
        addShortlistedJob,
        removeShortlistedJob,
        addShortlistedApplicant,
        removeShortlistedApplicant
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
