import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useAppContext } from "@/context/AppContext";
import { Job } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

const ShortlistedJobsPage = () => {
  const { shortlistedJobs, removeShortlistedJob } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="job-seeker" activePage="shortlisted" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold font-poppins text-gray-800">Shortlisted Jobs</h1>
          <p className="text-gray-600 mt-2">
            {shortlistedJobs.length} {shortlistedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </motion.div>

        {shortlistedJobs.length === 0 ? (
          <motion.div 
            className="bg-white rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-bookmark-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No shortlisted jobs yet</h3>
            <p className="text-gray-600 mb-4">Jobs you swipe right on will appear here</p>
            <button 
              className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90"
              onClick={() => window.location.href = '/job-seeker'}
            >
              Browse Jobs
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Job Header */}
                <div className="relative h-32 bg-gradient-to-r from-gray-800 to-gray-900">
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  
                  {/* Company Logo */}
                  <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg flex items-center justify-center">
                      <i className={`${job.companyLogo} text-2xl text-[#1D503A]`}></i>
                    </div>
                  </div>
                  
                  {/* Match Percentage */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative group">
                      <div className="bg-gradient-to-r from-[#2A9D8F] to-[#1D503A] p-1 rounded-full">
                        <div className="text-white text-sm font-medium">
                          {job.matchPercentage}% Match
                        </div>
                      </div>
                      <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                        <p>Your resume matches {job.matchPercentage}% of the required skills and experience for this job profile.</p>
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                  <p className="text-gray-600 mb-3">{job.company}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <i className="ri-map-pin-line text-gray-500 block mb-1"></i>
                      <span className="text-xs text-gray-700">{job.location}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <i className="ri-money-dollar-circle-line text-gray-500 block mb-1"></i>
                      <span className="text-xs text-gray-700">{job.salary}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <i className={`${job.workType === 'Remote' ? 'ri-home-office-line' : job.workType === 'Hybrid' ? 'ri-home-office-line' : 'ri-building-line'} text-gray-500 block mb-1`}></i>
                      <span className="text-xs text-gray-700">{job.workType}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button 
                      className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90"
                      onClick={() => window.location.href = `/job-seeker/job/${job.id}`}
                    >
                      View Details
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeShortlistedJob(job.id)}
                    >
                      <i className="ri-bookmark-fill text-xl"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ShortlistedJobsPage; 