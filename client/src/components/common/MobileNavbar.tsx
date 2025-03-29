import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionValue, useSpring, useTransform } from 'framer-motion';
import { useAppContext } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

interface MobileNavbarProps {
  type: "job-seeker" | "employer" | "landing";
  activePage: string;
}

const MobileNavbar = ({ type, activePage }: MobileNavbarProps) => {
  const { setCurrentPage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Set the active tab to match the current page by default
  const [activeTab, setActiveTab] = useState<string | null>(activePage);
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);
  const expandTimeout = useRef<NodeJS.Timeout | null>(null);
  const [, setLocation] = useLocation();

  // Track scroll position to auto-collapse navbar
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && window.scrollY > 10) {
        setIsOpen(false);
        setIsExpanded(false);
        setActiveTab(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
        setIsExpanded(false);
        setActiveTab(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
      setIsExpanded(false);
      setActiveTab(null);
    }
  }, [isMobile]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (expandTimeout.current) {
        clearTimeout(expandTimeout.current);
      }
    };
  }, []);

  const jobSeekerLinks = [
    { name: "Dashboard", path: "dashboard", icon: "ri-dashboard-line" },
    { name: "Jobs", path: "jobs", icon: "ri-briefcase-line" },
    { name: "Shortlisted", path: "shortlisted", icon: "ri-heart-line" },
    { name: "Profile", path: "profile", icon: "ri-user-line" }
  ];

  const employerLinks = [
    { name: "Dashboard", path: "dashboard", icon: "ri-dashboard-line" },
    { name: "Applicants", path: "applicants", icon: "ri-team-line" },
    { name: "Job Postings", path: "job-postings", icon: "ri-file-list-line" },
    { name: "Company Profile", path: "company-profile", icon: "ri-building-line" }
  ];

  const landingLinks = [
    { name: "Login", path: "login", icon: "ri-login-box-line" },
    { name: "Sign Up", path: "signup", icon: "ri-user-add-line" },
    { name: "Dashboard", path: "dashboard", icon: "ri-dashboard-line" }
  ];

  const links = type === "landing" ? landingLinks : (type === "job-seeker" ? jobSeekerLinks : employerLinks);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    setIsExpanded(false);
    setActiveTab(null);
    
    if (path === "profile") {
      setCurrentPage("profile");
      setLocation("/profile");
    } else if (path === "dashboard") {
      setCurrentPage("dashboard");
      setLocation("/");
    } else if (path === "jobs") {
      setCurrentPage("job-seeker");
      setLocation("/job-seeker");
    } else if (path === "applicants") {
      setCurrentPage("employer");
      setLocation("/employer");
    } else if (path === "login") {
      setCurrentPage("login");
      setLocation("/login");
    } else if (path === "signup") {
      setCurrentPage("signup");
      setLocation("/signup");
    } else if (path === "shortlisted") {
      setCurrentPage("shortlisted");
      setLocation("/job-seeker/shortlisted");
    } else if (path === "company-profile") {
      setCurrentPage("company-profile");
      setLocation("/employer/company-profile");
    } else if (path === "job-postings") {
      setCurrentPage("postings");
      setLocation("/employer/postings");
    }
  };

  const handleDynamicIslandClick = () => {
    if (!isOpen) {
      // Open and expand immediately
      setIsOpen(true);
      setIsExpanded(true);
    } else {
      // Close with animation sequence
      setIsExpanded(false);
      expandTimeout.current = setTimeout(() => {
        setIsOpen(false);
        setActiveTab(null);
      }, 300);
    }
  };

  const handleTabClick = (path: string) => {
    if (activeTab === path) {
      setActiveTab(null);
    } else {
      setActiveTab(path);
    }
  };

  // Animation variants for the Dynamic Island
  const islandVariants = {
    closed: {
      width: "50%",
      height: "45px",
      y: 15,
      borderRadius: "25px",
    },
    open: {
      width: "90%", 
      height: "60px",
      y: 15,
      borderRadius: "30px",
    },
    expanded: {
      width: "90%",
      height: "auto",
      y: 15,
      borderRadius: "30px",
    }
  };

  return (
    <div>
      {/* Spacer to push content below navbar */}
      <div className="h-16"></div>
      
      <div className="fixed top-0 left-0 w-full z-[999] will-change-transform transform-gpu">
        <div className="flex justify-center relative">
          {/* Dynamic Island Navbar */}
          <motion.div
            ref={navRef}
            className="bg-black text-white shadow-xl backdrop-blur-lg bg-opacity-95 flex flex-col border border-gray-800 shadow-[0_0_15px_rgba(42,157,143,0.3)] z-[999] will-change-transform transform-gpu"
            variants={islandVariants}
            initial="closed"
            animate={isExpanded ? "expanded" : isOpen ? "open" : "closed"}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              duration: 0.3 
            }}
            style={{
              position: 'fixed',
              transformOrigin: 'top center',
            }}
          >
            {/* Main Island Button */}
            <motion.div 
              className={`flex items-center justify-between px-4 ${isExpanded ? 'py-4 border-b border-gray-700' : 'h-full'}`}
              onClick={handleDynamicIslandClick}
            >
              {/* Logo or Icon */}
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "loop" }}
                />
                {isOpen && (
                  <motion.span 
                    className="font-bold text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    NetworkX
                  </motion.span>
                )}
              </div>

              {/* Status Icons */}
              <div className="flex items-center space-x-3">
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex space-x-2"
                    >
                      <i className="ri-notification-3-line text-xl"></i>
                      <i className="ri-message-3-line text-xl"></i>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  animate={{ 
                    rotate: isOpen ? 45 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <i className="ri-add-line text-xl"></i>
                  ) : (
                    <i className="ri-apps-line text-xl"></i>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Expanded Navigation Menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="px-3 py-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Navigation Tabs */}
                  <motion.div className="grid grid-cols-4 gap-2 mb-4">
                    {links.map((link) => (
                      <motion.div
                        key={link.path}
                        className={`p-3 flex flex-col items-center justify-center rounded-xl cursor-pointer ${
                          activeTab === link.path 
                            ? 'bg-[#1D503A] bg-opacity-90 shadow-md' 
                            : 'bg-gray-800 bg-opacity-70 hover:bg-opacity-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabClick(link.path)}
                      >
                        <i className={`${link.icon} text-xl mb-1 ${activePage === link.path ? 'text-[#2A9D8F]' : 'text-white'}`}></i>
                        <span className="text-xs">{link.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeTab && (
                      <motion.div
                        key={activeTab}
                        className="bg-gray-800 rounded-xl p-4 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">
                            {links.find(link => link.path === activeTab)?.name}
                          </h3>
                          <motion.button
                            className="bg-[#1D503A] text-white px-3 py-1 rounded-lg text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigation(activeTab)}
                          >
                            Go to {links.find(link => link.path === activeTab)?.name}
                          </motion.button>
                        </div>
                        
                        {/* Quick Info */}
                        <div className="text-gray-300 text-sm">
                          {activeTab === "dashboard" && (
                            <p>View your personalized dashboard with job insights and trends.</p>
                          )}
                          {activeTab === "jobs" && (
                            <p>Explore job opportunities with our unique swipe interface.</p>
                          )}
                          {activeTab === "shortlisted" && (
                            <p>See all jobs you've marked as favorites during your search.</p>
                          )}
                          {activeTab === "profile" && (
                            <p>Update your profile information and job preferences.</p>
                          )}
                          {activeTab === "applicants" && (
                            <p>Review potential candidates for your open positions.</p>
                          )}
                          {activeTab === "job-postings" && (
                            <p>Manage your active job postings and create new listings.</p>
                          )}
                          {activeTab === "company-profile" && (
                            <p>Update your company information and branding.</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Actions */}
                  <motion.div 
                    className="flex justify-between items-center pt-2 border-t border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button 
                      className="text-gray-300 text-sm flex items-center"
                      onClick={() => {
                        setCurrentPage("dashboard");
                        setLocation("/");
                        setIsExpanded(false);
                        setTimeout(() => {
                          setIsOpen(false);
                          setActiveTab(null);
                        }, 300);
                      }}
                    >
                      <i className="ri-home-line mr-1"></i>
                      Home
                    </button>
                    <button 
                      className="text-gray-300 text-sm flex items-center"
                      onClick={() => {
                        setCurrentPage("dashboard");
                        setLocation("/");
                        setIsExpanded(false);
                        setTimeout(() => {
                          setIsOpen(false);
                          setActiveTab(null);
                        }, 300);
                      }}
                    >
                      <i className="ri-settings-line mr-1"></i>
                      Settings
                    </button>
                    <button 
                      className="text-gray-300 text-sm flex items-center"
                      onClick={() => {
                        setCurrentPage("dashboard");
                        setLocation("/");
                        setIsExpanded(false);
                        setTimeout(() => {
                          setIsOpen(false);
                          setActiveTab(null);
                        }, 300);
                      }}
                    >
                      <i className="ri-logout-box-line mr-1"></i>
                      Sign Out
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Backdrop when menu is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsExpanded(false);
                setTimeout(() => {
                  setIsOpen(false);
                  setActiveTab(null);
                }, 300);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileNavbar;