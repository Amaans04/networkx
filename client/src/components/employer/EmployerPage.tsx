import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ApplicantCard from "./ApplicantCard";
import JobPostingSection from "./JobPostingSection";
import ShortlistedApplicants from "./ShortlistedApplicants";
import ApplicantAnalytics from "./ApplicantAnalytics";
import { applicants } from "@/lib/mockData";
import { Applicant } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";

const EmployerPage = () => {
  const { addShortlistedApplicant } = useAppContext();
  const [availableApplicants, setAvailableApplicants] = useState<Applicant[]>(applicants);
  const [lastAction, setLastAction] = useState<"left" | "right" | null>(null);
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [applicantBatchCount, setApplicantBatchCount] = useState(1);
  const isMobile = useIsMobile();
  const [currentSection, setCurrentSection] = useState("matching");

  // Generate a new applicant profile
  const generateRandomApplicant = (batchId: number): Applicant => {
    const names = ["Emma Johnson", "Noah Williams", "Olivia Smith", "Liam Brown", "Ava Jones", "Jackson Miller", "Sophia Davis", "Lucas Garcia", "Isabella Rodriguez", "Aiden Martinez"];
    const positions = ["Frontend Developer", "UX Designer", "Product Manager", "Backend Engineer", "Data Scientist", "Full Stack Developer"];
    const experiences = ["1-2 years", "3-5 years", "5+ years", "2-3 years", "4-6 years"];
    const locations = ["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA", "Remote"];
    const companies = ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Tesla", "Netflix", "Adobe", "Spotify", "Dropbox"];
    const descriptions = [
      "Passionate technologist with expertise in building scalable web applications. Experience with agile methodologies and cross-functional team collaboration.",
      "Creative problem solver with a track record of delivering user-centric solutions. Detail-oriented and focused on optimization and performance.",
      "Innovative developer with a strong foundation in computer science principles. Quick learner who stays updated with the latest technologies.",
      "Experienced professional bringing technical expertise and leadership to development teams. Skilled at mentoring junior developers and improving processes.",
      "Results-driven individual with excellent communication skills. Strong ability to translate business requirements into technical solutions."
    ];
    const skills = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "SQL", "AWS", "UI/UX", "Figma", "GraphQL", "Redux", "CSS", "HTML", "Git", "REST API"];
    
    // Generate a random selection of 3-5 skills
    const numSkills = Math.floor(Math.random() * 3) + 3;
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
    const selectedSkills = shuffledSkills.slice(0, numSkills);
    
    // Random match between 70-98%
    const matchPercentage = Math.floor(Math.random() * 29) + 70;
    
    return {
      id: `applicant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${batchId}`,
      name: names[Math.floor(Math.random() * names.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      experience: experiences[Math.floor(Math.random() * experiences.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      previousCompany: companies[Math.floor(Math.random() * companies.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      matchPercentage: matchPercentage,
      skills: selectedSkills,
    };
  };

  // Load more applicants when running low
  useEffect(() => {
    if (availableApplicants.length <= 5 && !loadingMore) {
      setLoadingMore(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const batchId = applicantBatchCount;
        const newApplicants = Array(8).fill(null).map(() => generateRandomApplicant(batchId));
        setAvailableApplicants(prevApplicants => [...prevApplicants, ...newApplicants]);
        setApplicantBatchCount(batchId + 1);
        setLoadingMore(false);
      }, 1000);
    }
  }, [availableApplicants.length, loadingMore]);

  // Handle swipe left (reject applicant)
  const handleSwipeLeft = (applicant: Applicant) => {
    console.log("Swiped left on applicant:", applicant.name);
    setLastAction("left");
    setCurrentApplicantIndex(prev => Math.min(prev + 1, availableApplicants.length - 1));
    
    // Remove the applicant after animation is complete
    setTimeout(() => {
      setAvailableApplicants(availableApplicants.filter(a => a.id !== applicant.id));
    }, 300);
  };

  // Handle swipe right (shortlist applicant)
  const handleSwipeRight = (applicant: Applicant) => {
    console.log("Swiped right on applicant:", applicant.name);
    setLastAction("right");
    addShortlistedApplicant(applicant);
    setCurrentApplicantIndex(prev => Math.min(prev + 1, availableApplicants.length - 1));
    
    // Remove the applicant after animation is complete
    setTimeout(() => {
      setAvailableApplicants(availableApplicants.filter(a => a.id !== applicant.id));
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="employer" activePage="applicants" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Applicant Matching Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-gray-800">Applicant Matching</h2>
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentSection("postings")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-initial ${
                    currentSection === "postings"
                      ? "bg-[#2A9D8F] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <i className="ri-briefcase-line mr-1 sm:mr-2"></i>
                  <span>Job Postings</span>
                </button>
                <button
                  onClick={() => setCurrentSection("matching")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-initial ${
                    currentSection === "matching"
                      ? "bg-[#2A9D8F] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <i className="ri-user-search-line mr-1 sm:mr-2"></i>
                  <span>Find Applicants</span>
                </button>
              </div>
            </div>

            {currentSection === "postings" ? (
              <JobPostingSection />
            ) : (
              <>
                {/* Stacked Card Container */}
                <div className="relative h-[550px] sm:h-[600px] flex justify-center items-center mb-6 sm:mb-8">
                  {loadingMore && availableApplicants.length <= 3 && (
                    <motion.div 
                      className="absolute z-30 bg-black bg-opacity-60 rounded-lg text-white px-4 py-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Finding more applicants...</span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="cards-container w-full max-w-sm mx-auto relative">
                    <AnimatePresence mode="popLayout">
                      {availableApplicants.slice(0, 3).map((applicant, index) => (
                        <motion.div
                          key={applicant.id}
                          className="absolute top-0 left-0 right-0"
                          initial={{ 
                            scale: 1 - (index * 0.05), 
                            y: index * 10,
                            opacity: 1 - (index * 0.15),
                            zIndex: 10 - index 
                          }}
                          animate={{ 
                            scale: 1 - (index * 0.05), 
                            y: index * 10,
                            opacity: 1 - (index * 0.15),
                            zIndex: 10 - index
                          }}
                          exit={{ 
                            x: lastAction === "left" ? -300 : 300, 
                            opacity: 0, 
                            transition: { duration: 0.3 } 
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ 
                            pointerEvents: index === 0 ? "auto" : "none" 
                          }}
                        >
                          <ApplicantCard
                            applicant={applicant}
                            onSwipeLeft={handleSwipeLeft}
                            onSwipeRight={handleSwipeRight}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {availableApplicants.length === 0 && !loadingMore && (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <i className="ri-user-search-line text-4xl text-gray-300 mb-2"></i>
                      <p className="text-gray-500">No more applicants to review. Check back later!</p>
                      <button 
                        className="mt-4 bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                        onClick={() => {
                          setLoadingMore(true);
                          setTimeout(() => {
                            const batchId = applicantBatchCount;
                            const newApplicants = Array(10).fill(null).map(() => generateRandomApplicant(batchId));
                            setAvailableApplicants(newApplicants);
                            setApplicantBatchCount(batchId + 1);
                            setLoadingMore(false);
                          }, 1500);
                        }}
                      >
                        Find More Applicants
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Swipe Instruction */}
                <div className="text-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
                  <p>Swipe left to pass, swipe right to shortlist</p>
                  <div className="flex justify-center gap-6 sm:gap-8 mt-3 sm:mt-4">
                    <button 
                      onClick={() => availableApplicants.length > 0 && handleSwipeLeft(availableApplicants[0])}
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 text-red-500 shadow-md transition-all hover:scale-105"
                      disabled={availableApplicants.length === 0 || loadingMore}
                    >
                      <i className="ri-close-line text-lg sm:text-xl"></i>
                    </button>
                    <button 
                      onClick={() => availableApplicants.length > 0 && handleSwipeRight(availableApplicants[0])}
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 text-green-500 shadow-md transition-all hover:scale-105"
                      disabled={availableApplicants.length === 0 || loadingMore}
                    >
                      <i className="ri-check-line text-lg sm:text-xl"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Sidebar - Hidden on mobile unless in postings mode */}
          <div className={`lg:col-span-1 ${isMobile && currentSection !== "postings" ? 'hidden' : 'block'}`}>
            {isMobile && currentSection === "matching" ? null : (
              <>
                <JobPostingSection />
                <ShortlistedApplicants />
                <ApplicantAnalytics />
              </>
            )}
          </div>
        </div>
        
        {/* Show mobile sidebar components at the bottom on mobile when in matching mode */}
        {isMobile && currentSection === "matching" && (
          <div className="mt-6 sm:mt-8">
            <ShortlistedApplicants />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default EmployerPage;