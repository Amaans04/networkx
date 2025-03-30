import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "./components/landing/LandingPage";
import SignInPage from "./components/auth/SignInPage";
import { Switch, Route } from "wouter";
import Dashboard from "./components/dashboard/Dashboard";
import { AppProvider } from "./context/AppContext";
import JobSeekerPage from "./components/job-seeker/JobSeekerPage";
import EmployerPage from "./components/employer/EmployerPage";
import DiscussionsPage from "./components/discussions/DiscussionsPage";
import ProgressPage from "./components/progress/ProgressPage";
import SkillsPage from "./components/skills/SkillsPage";
import MockInterviewPage from './components/mock-interview/MockInterviewPage';
import MockInterviewSession from './components/mock-interview/MockInterviewSession';
import ProfileSection from "./components/job-seeker/ProfileSection";
import ShortlistedJobsPage from "./components/job-seeker/ShortlistedJobsPage";
import ResourcesPage from "./components/resources/ResourcesPage";
import CompanyProfile from "./components/employer/CompanyProfile";
import EmployerProfile from "./components/employer/EmployerProfile";
import JobPostingsPage from "./components/employer/JobPostingsPage";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/signup" component={SignInPage} />
          <Route path="/job-seeker" component={JobSeekerPage} />
          <Route path="/job-seeker/shortlisted" component={ShortlistedJobsPage} />
          <Route path="/employer" component={EmployerPage} />
          <Route path="/employer/profile" component={EmployerProfile} />
          <Route path="/employer/company-profile" component={CompanyProfile} />
          <Route path="/employer/postings" component={JobPostingsPage} />
          <Route path="/profile" component={ProfileSection} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/skills" component={SkillsPage} />
          <Route path="/discussions" component={DiscussionsPage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/mock-interview" component={MockInterviewPage} />
          <Route path="/mock-interview/session" component={MockInterviewSession} />
        </Switch>
      </div>
      <Toaster />
    </AppProvider>
  );
}

export default App;
