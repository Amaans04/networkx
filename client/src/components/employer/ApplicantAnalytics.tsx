import { motion } from "framer-motion";

const ApplicantAnalytics = () => {
  return (
    <motion.div 
      className="card bg-white p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <i className="ri-line-chart-line text-[#2A9D8F] mr-2"></i>
        Applicant Analytics
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Experience Level</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#2A9D8F] h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Entry</span>
            <span>Mid</span>
            <span>Senior</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Top Skills</span>
          </div>
          <div className="flex justify-between text-xs">
            <div className="flex flex-col items-center">
              <div className="w-16 bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-[#2A9D8F] h-1.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span>React</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-[#2A9D8F] h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span>TS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-[#2A9D8F] h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span>UI/UX</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Location Preferences</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded-md">Remote (65%)</span>
            <span className="bg-gray-100 px-2 py-1 rounded-md">San Francisco (20%)</span>
            <span className="bg-gray-100 px-2 py-1 rounded-md">New York (15%)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicantAnalytics;
