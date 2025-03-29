import { useAppContext } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";
import MobileNavbar from "./MobileNavbar";

interface HeaderProps {
  type: "job-seeker" | "employer" | "landing";
  activePage: string;
}

const Header = ({ type, activePage }: HeaderProps) => {
  const { setCurrentPage } = useAppContext();
  const isMobile = useIsMobile();
  const [, setLocation] = useLocation();

  // If mobile, render the iPhone notch-style navbar
  if (isMobile) {
    return <MobileNavbar type={type} activePage={activePage} />;
  }

  const jobSeekerLinks = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Jobs", path: "jobs" },
    { name: "Shortlisted", path: "shortlisted" },
    { name: "Profile", path: "profile" }
  ];

  const employerLinks = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Applicants", path: "applicants" },
    { name: "Job Postings", path: "postings" },
    { name: "Company Profile", path: "company-profile" }
  ];

  const landingLinks = [
    { name: "Login", path: "login" },
    { name: "Sign Up", path: "signup" },
    { name: "Dashboard", path: "dashboard" }
  ];

  const links = type === "landing" ? landingLinks : (type === "job-seeker" ? jobSeekerLinks : employerLinks);

  const handleProfileClick = () => {
    if (type === "job-seeker") {
      setCurrentPage("profile");
      setLocation("/profile");
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-[#1D503A] font-poppins cursor-pointer"
              onClick={() => {
                setCurrentPage("landing");
                setLocation("/");
              }}
            >
              NetworkX
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            {links.map((link) => (
              <a 
                key={link.path}
                href="#" 
                className={`${activePage === link.path 
                  ? "text-[#1D503A] font-medium" 
                  : "text-gray-600 hover:text-[#1D503A]"} 
                  px-3 py-2 rounded-md`}
                onClick={() => {
                  if (link.path === "profile") {
                    setCurrentPage("profile");
                    setLocation("/profile");
                  } else if (link.path === "dashboard") {
                    setCurrentPage("dashboard");
                    setLocation("/");
                  } else if (link.path === "jobs") {
                    setCurrentPage("job-seeker");
                    setLocation("/job-seeker");
                  } else if (link.path === "applicants") {
                    setCurrentPage("employer");
                    setLocation("/employer");
                  } else if (link.path === "postings") {
                    setCurrentPage("postings");
                    setLocation("/employer/postings");
                  } else if (link.path === "company-profile") {
                    setCurrentPage("company-profile");
                    setLocation("/employer/company-profile");
                  } else if (link.path === "shortlisted") {
                    setCurrentPage("shortlisted");
                    setLocation("/job-seeker/shortlisted");
                  } else if (link.path === "login") {
                    setCurrentPage("login");
                    setLocation("/login");
                  } else if (link.path === "signup") {
                    setCurrentPage("signup");
                    setLocation("/signup");
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            {type !== "landing" && (
              <button 
                className="bg-gray-200 p-2 rounded-full"
                onClick={handleProfileClick}
              >
                <i className="ri-user-line text-gray-600"></i>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
