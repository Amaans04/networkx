import { useAppContext } from './context/AppContext';
import LandingPage from './components/landing/LandingPage';
import ProfileSection from './components/job-seeker/ProfileSection';
import JobSeekerPage from './components/job-seeker/JobSeekerPage';
import EmployerPage from './components/employer/EmployerPage';
import Dashboard from './components/dashboard/Dashboard';
import EmployerProfile from './components/employer/EmployerProfile';
import JobPostingsPage from './components/employer/JobPostingsPage';
import CompanyProfile from './components/employer/CompanyProfile';
import ShortlistedJobsPage from './components/job-seeker/ShortlistedJobsPage';
import SignInPage from './components/auth/SignInPage';
import ResourcesPage from './components/resources/ResourcesPage';
import SkillsPage from './components/skills/SkillsPage';
import DiscussionsPage from './components/discussions/DiscussionsPage';
import ProgressPage from './components/progress/ProgressPage';
import MockInterviewPage from './components/mock-interview/MockInterviewPage';
import TakeInterviewPage from './components/mock-interview/TakeInterviewPage';

export const Routes = () => {
  const { currentPage, activeInterviewId } = useAppContext();

  // If there's an active interview, show the TakeInterviewPage
  if (activeInterviewId && currentPage === 'mock-interview') {
    return <TakeInterviewPage />;
  }

  switch (currentPage) {
    case 'landing':
      return <LandingPage />;
    case 'profile':
      return <ProfileSection />;
    case 'job-seeker':
      return <JobSeekerPage />;
    case 'employer':
      return <EmployerPage />;
    case 'dashboard':
      return <Dashboard />;
    case 'postings':
      return <JobPostingsPage />;
    case 'company-profile':
      return <CompanyProfile />;
    case 'shortlisted':
      return <ShortlistedJobsPage />;
    case 'login':
      return <SignInPage />;
    case 'signup':
      return <SignInPage />;
    case 'resources':
      return <ResourcesPage />;
    case 'skills':
      return <SkillsPage />;
    case 'discussions':
      return <DiscussionsPage />;
    case 'progress':
      return <ProgressPage />;
    case 'mock-interview':
      return <MockInterviewPage />;
    default:
      return <Dashboard />;
  }
}; 