import { Toaster } from "@/components/ui/toaster";
import LandingPage from "./components/landing/LandingPage";
import JobSeekerPage from "./components/job-seeker/JobSeekerPage";
import EmployerPage from "./components/employer/EmployerPage";
import JobPostingsPage from "./components/employer/JobPostingsPage";
import CompanyProfile from "./components/employer/CompanyProfile";
import ProfileSection from "./components/job-seeker/ProfileSection";
import ShortlistedJobsPage from "./components/job-seeker/ShortlistedJobsPage";
import SignInPage from "./components/auth/SignInPage";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Switch } from "wouter";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/job-seeker" component={JobSeekerPage} />
        <Route path="/job-seeker/shortlisted" component={ShortlistedJobsPage} />
        <Route path="/employer" component={EmployerPage} />
        <Route path="/employer/postings" component={JobPostingsPage} />
        <Route path="/employer/company-profile" component={CompanyProfile} />
        <Route path="/profile" component={ProfileSection} />
        <Route path="/login" component={SignInPage} />
        <Route path="/signup" component={SignInPage} />
      </Switch>
      <Toaster />
    </AppProvider>
  );
}

export default App;
