import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { profile } from "@/lib/mockData";

const ResumeBuilder = () => {
  const { preferences } = useAppContext();
  const [isBuilding, setIsBuilding] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const buildResume = () => {
    setIsBuilding(true);
    setProgressValue(0);
    
    // Simulate progressive resume building with intervals
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBuilding(false);
            setResumeGenerated(true);
          }, 500);
          return 100;
        }
        return newValue;
      });
    }, 500);
  };

  const downloadResume = () => {
    // In a real app, this would generate and download a PDF
    alert("Resume would download in a real app!");
    // Reset state to allow regenerating
    setResumeGenerated(false);
  };

  return (
    <motion.div 
      className="card bg-white p-6 mb-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <i className="ri-file-text-line text-[#2A9D8F] mr-2"></i>
        AI Resume Builder
      </h3>
      
      <AnimatePresence mode="wait">
        {!isBuilding && !resumeGenerated && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-600 text-sm mb-4">
              Generate a professional resume with our AI-powered tool. We'll use your profile data and preferences to create a tailored resume.
            </p>
            <motion.button 
              className="w-full bg-[#1D503A] text-white py-2 rounded-md font-medium hover:bg-opacity-90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={buildResume}
            >
              Create Resume
            </motion.button>
          </motion.div>
        )}
        
        {isBuilding && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4"
          >
            <p className="text-sm text-gray-600 mb-2">Building your resume...</p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <motion.div 
                className="bg-[#2A9D8F] h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressValue}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Building steps */}
            <div className="text-xs text-gray-500 space-y-2">
              {progressValue >= 10 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <i className="ri-check-line text-green-500 mr-1"></i> 
                  Analyzing profile data...
                </motion.div>
              )}
              {progressValue >= 40 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <i className="ri-check-line text-green-500 mr-1"></i> 
                  Formatting experience details...
                </motion.div>
              )}
              {progressValue >= 70 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <i className="ri-check-line text-green-500 mr-1"></i> 
                  Optimizing for {preferences.role || "your preferred role"}...
                </motion.div>
              )}
              {progressValue >= 90 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <i className="ri-check-line text-green-500 mr-1"></i> 
                  Finalizing document...
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {resumeGenerated && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 mb-4 flex items-start">
              <i className="ri-file-text-line text-xl text-[#2A9D8F] mr-3 mt-1"></i>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Resume Ready!</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Your resume has been generated based on your profile and preferences.
                </p>
                <div className="text-xs text-gray-500 space-y-1 mb-3">
                  <div><span className="font-medium">Name:</span> {profile.name}</div>
                  <div><span className="font-medium">Role:</span> {preferences.role || profile.position}</div>
                  <div><span className="font-medium">Location:</span> {preferences.location || profile.location}</div>
                  <div><span className="font-medium">Experience:</span> {preferences.experience || "Not specified"}</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <motion.button 
                className="flex-1 bg-[#1D503A] text-white py-2 rounded-md font-medium hover:bg-opacity-90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadResume}
              >
                <i className="ri-download-line mr-1"></i> Download
              </motion.button>
              <motion.button 
                className="flex-1 border border-[#1D503A] text-[#1D503A] py-2 rounded-md font-medium hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setResumeGenerated(false)}
              >
                <i className="ri-refresh-line mr-1"></i> Regenerate
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResumeBuilder;
