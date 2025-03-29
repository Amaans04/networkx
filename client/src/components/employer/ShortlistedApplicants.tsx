import { motion } from "framer-motion";
import CircularProgress from "../ui/circular-progress";
import { shortlistedApplicants } from "@/lib/mockData";
import { useAppContext } from "@/context/AppContext";

const ShortlistedApplicants = () => {
  const { shortlistedApplicants: stateShortlistedApplicants } = useAppContext();
  
  // Either use state or fallback to mock data
  const applicants = stateShortlistedApplicants.length > 0 
    ? stateShortlistedApplicants.map(a => ({
        id: a.id,
        name: a.name,
        position: a.position,
        location: a.location,
        matchPercentage: a.matchPercentage
      })) 
    : shortlistedApplicants;

  return (
    <motion.div 
      className="card bg-white p-6 mb-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <i className="ri-user-star-line text-[#2A9D8F] mr-2"></i>
        Shortlisted Applicants
      </h3>
      
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div key={applicant.id} className="border rounded-lg p-3 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <i className="ri-user-line text-gray-500"></i>
                </div>
                <div>
                  <h4 className="font-medium">{applicant.name}</h4>
                  <p className="text-gray-600 text-xs">{applicant.position}</p>
                </div>
              </div>
              <CircularProgress
                percentage={applicant.matchPercentage}
                size="sm"
                className="scale-75"
              />
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">{applicant.location}</span>
              <button className="text-xs bg-[#2A9D8F] text-white px-2 py-1 rounded">Message</button>
            </div>
          </div>
        ))}
        
        {applicants.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No applicants shortlisted yet. Swipe right on applicants you're interested in!
          </div>
        )}
      </div>
      
      {applicants.length > 0 && (
        <a href="#" className="mt-4 block text-center text-[#2A9D8F] font-medium text-sm">View All Shortlisted</a>
      )}
    </motion.div>
  );
};

export default ShortlistedApplicants;
