import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import JobPreferenceBar from "./JobPreferenceBar";
import JobCard from "./JobCard";
import ResumeBuilder from "./ResumeBuilder";
import ShortlistedJobs from "./ShortlistedJobs";
import LiveUpdates from "./LiveUpdates";
import { jobs } from "@/lib/mockData";
import { Job, Preference } from "@/types";
import { useAppContext } from "@/context/AppContext";

const JobSeekerPage = () => {
  const { addShortlistedJob, preferences } = useAppContext();
  const [availableJobs, setAvailableJobs] = useState<Job[]>(jobs);
  const [lastAction, setLastAction] = useState<"left" | "right" | null>(null);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [jobBatchCount, setJobBatchCount] = useState(1);

  // Generate a new job based on preferences
  const generateNewJob = (batchId: number): Job => {
    const companies = ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Tesla", "Netflix", "Adobe", "Spotify", "Dropbox"];
    const locations = ["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA", "Remote"];
    const workTypes = ["Remote", "In-office", "Hybrid"];
    const salaryRanges = ["$80k - $100k", "$100k - $120k", "$120k - $150k", "$150k - $180k"];
    const titles = ["Frontend Developer", "UX Designer", "Product Manager", "Backend Engineer", "Data Scientist", "Full Stack Developer"];
    const skills = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "SQL", "AWS", "UI/UX", "Figma", "GraphQL", "Redux"];
    
    // Generate a random selection of 3-5 skills
    const numSkills = Math.floor(Math.random() * 3) + 3;
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
    const selectedSkills = shuffledSkills.slice(0, numSkills);
    
    // Use the preferences to make a match percentage
    const matchPercentage = preferences ? 
      calculateMatchPercentage(preferences, {
        location: locations[Math.floor(Math.random() * locations.length)],
        role: titles[Math.floor(Math.random() * titles.length)],
        skills: selectedSkills,
      }) : 
      Math.floor(Math.random() * 31) + 70; // Random match between 70-100%

    // Randomly decide if this job should have a profile image
    const hasProfileImage = Math.random() > 0.5;
    const profileImage = hasProfileImage ? `https://picsum.photos/seed/${Date.now()}/200` : undefined;
    
    return {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${batchId}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      companyLogo: "ri-building-line",
      description: `We are looking for a talented professional to join our team. You will be responsible for designing, developing, and implementing solutions for our clients. This is an exciting opportunity to work with cutting-edge technology and contribute to innovative projects.`,
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
      workType: workTypes[Math.floor(Math.random() * workTypes.length)] as "Remote" | "Hybrid" | "In-office",
      matchPercentage: matchPercentage,
      skills: selectedSkills,
      profileImage,
    };
  };

  // Calculate match percentage based on preferences
  const calculateMatchPercentage = (userPref: Preference, jobAttr: any): number => {
    let score = 70; // Base score
    
    // Location match
    if (userPref.location && userPref.location === jobAttr.location) {
      score += 10;
    }
    
    // Role match
    if (userPref.role && userPref.role === jobAttr.role) {
      score += 10;
    }
    
    // Skills match - add up to 10% more
    if (userPref.experience && jobAttr.skills && jobAttr.skills.includes(userPref.experience)) {
      score += 10;
    }
    
    return Math.min(score, 98); // Cap at 98%
  };

  // Load more jobs when running low
  useEffect(() => {
    if (availableJobs.length <= 5 && !loadingMore) {
      setLoadingMore(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const batchId = jobBatchCount;
        const newJobs = Array(10).fill(null).map(() => generateNewJob(batchId));
        setAvailableJobs(prevJobs => [...prevJobs, ...newJobs]);
        setJobBatchCount(batchId + 1);
        setLoadingMore(false);
      }, 1000);
    }
  }, [availableJobs.length, loadingMore]);

  // Handle swipe left (reject job)
  const handleSwipeLeft = (job: Job) => {
    console.log("Swiped left on job:", job.title);
    setLastAction("left");
    setCurrentJobIndex(prev => Math.min(prev + 1, availableJobs.length - 1));
    
    // Remove the job after animation is complete
    setTimeout(() => {
      setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
    }, 300);
  };

  // Handle swipe right (shortlist job)
  const handleSwipeRight = (job: Job) => {
    console.log("Swiped right on job:", job.title);
    setLastAction("right");
    addShortlistedJob(job);
    setCurrentJobIndex(prev => Math.min(prev + 1, availableJobs.length - 1));
    
    // Remove the job after animation is complete
    setTimeout(() => {
      setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="job-seeker" activePage="jobs" />
      <JobPreferenceBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Job Cards Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-gray-800">Recommended Jobs</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-500">Sort by:</span>
                <select className="border border-gray-300 rounded-md text-xs sm:text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]">
                  <option>Match %</option>
                  <option>Latest</option>
                  <option>Salary</option>
                </select>
              </div>
            </div>

            {/* Stacked Card Container */}
            <div className="relative h-[550px] sm:h-[600px] flex justify-center items-center mb-6 sm:mb-8">
              {loadingMore && availableJobs.length <= 3 && (
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
                    <span>Finding more jobs for you...</span>
                  </div>
                </motion.div>
              )}
              
              <div className="cards-container w-full max-w-sm mx-auto relative">
                <AnimatePresence mode="popLayout">
                  {availableJobs.slice(0, 3).map((job, index) => (
                    <motion.div
                      key={job.id}
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
                      <JobCard
                        job={job}
                        onSwipeLeft={handleSwipeLeft}
                        onSwipeRight={handleSwipeRight}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {availableJobs.length === 0 && !loadingMore && (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="ri-search-line text-4xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">No more jobs to show. Check back later!</p>
                  <button 
                    className="mt-4 bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                    onClick={() => {
                      setLoadingMore(true);
                      setTimeout(() => {
                        const batchId = jobBatchCount;
                        const newJobs = Array(10).fill(null).map(() => generateNewJob(batchId));
                        setAvailableJobs(newJobs);
                        setJobBatchCount(batchId + 1);
                        setLoadingMore(false);
                      }, 1500);
                    }}
                  >
                    Refresh Job List
                  </button>
                </motion.div>
              )}
            </div>

            {/* Swipe Instruction */}
            <div className="text-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
              <p>Swipe left to pass, swipe right to shortlist</p>
              <div className="flex justify-center gap-6 sm:gap-8 mt-3 sm:mt-4">
                <button 
                  onClick={() => availableJobs.length > 0 && handleSwipeLeft(availableJobs[0])}
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 text-red-500 shadow-md transition-all hover:scale-105"
                  disabled={availableJobs.length === 0 || loadingMore}
                >
                  <i className="ri-close-line text-lg sm:text-xl"></i>
                </button>
                <button 
                  onClick={() => availableJobs.length > 0 && handleSwipeRight(availableJobs[0])}
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 text-green-500 shadow-md transition-all hover:scale-105"
                  disabled={availableJobs.length === 0 || loadingMore}
                >
                  <i className="ri-check-line text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <ResumeBuilder />
            <ShortlistedJobs />
            <LiveUpdates />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobSeekerPage;
