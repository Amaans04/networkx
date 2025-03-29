import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import CircularProgress from "../ui/circular-progress";
import { shortlistedJobs } from "@/lib/mockData";

const ShortlistedJobs = () => {
  const { shortlistedJobs: stateShortlistedJobs } = useAppContext();
  
  // Use either the context state or fall back to mock data
  const jobs = stateShortlistedJobs.length > 0 ? stateShortlistedJobs : shortlistedJobs;

  return (
    <motion.div 
      className="card bg-white p-6 mb-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <i className="ri-bookmark-line text-[#2A9D8F] mr-2"></i>
        Shortlisted Jobs
      </h3>
      
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-3 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{job.title}</h4>
                <p className="text-gray-600 text-sm">{job.company}</p>
              </div>
              <CircularProgress percentage={job.matchPercentage} size="sm" />
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">{job.location}</span>
              <button className="text-xs bg-[#2A9D8F] text-white px-2 py-1 rounded">Apply</button>
            </div>
          </div>
        ))}
        
        {jobs.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No jobs shortlisted yet. Swipe right on jobs you're interested in!
          </div>
        )}
      </div>
      
      {jobs.length > 0 && (
        <a href="#" className="mt-4 block text-center text-[#2A9D8F] font-medium text-sm">View All Shortlisted</a>
      )}
    </motion.div>
  );
};

export default ShortlistedJobs;
