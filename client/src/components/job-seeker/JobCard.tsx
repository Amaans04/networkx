import { motion } from "framer-motion";
import { Job } from "@/types";
import SwipeContainer from "../common/SwipeContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobCardProps {
  job: Job;
  onSwipeLeft: (job: Job) => void;
  onSwipeRight: (job: Job) => void;
}

const JobCard = ({ job, onSwipeLeft, onSwipeRight }: JobCardProps) => {
  const isMobile = useIsMobile();
  
  // Card dimensions based on device
  const cardStyles = isMobile
    ? { height: "550px", maxWidth: "330px" }
    : { height: "500px", width: "450px" };
  
  return (
    <SwipeContainer
      onSwipeLeft={() => onSwipeLeft(job)}
      onSwipeRight={() => onSwipeRight(job)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full mx-auto"
      style={cardStyles}
    >
      {/* Card Header with Company Banner */}
      <div className={`relative ${isMobile ? 'h-44' : 'h-36'} bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] flex items-center justify-center`}>
        <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-30"></div>
        
        {/* Company Logo */}
        <div className="z-10 bg-white p-4 rounded-xl shadow-lg">
          <div className={`${isMobile ? 'w-16 h-16' : 'w-14 h-14'} bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg flex items-center justify-center`}>
            {job.profileImage ? (
              <img 
                src={job.profileImage} 
                alt="Company Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <i className={`${job.companyLogo} ${isMobile ? 'text-3xl' : 'text-2xl'} text-[#1D503A]`}></i>
            )}
          </div>
        </div>
        
        {/* Match Percentage */}
        <div className="absolute top-4 right-4 z-20">
          <div className="relative group">
            <div className="bg-white rounded-full p-0.5 shadow-md">
              <div className="bg-gradient-to-r from-[#2A9D8F] to-[#1D503A] rounded-full flex items-center justify-center w-12 h-12 text-white font-bold">
                {job.matchPercentage}%
              </div>
            </div>
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
              <p>Your resume matches {job.matchPercentage}% of the required skills and experience for this job profile.</p>
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Job Info */}
      <div className="px-5 py-4">
        <div className="text-center mb-3">
          <h3 className={`${isMobile ? 'text-xl' : 'text-lg'} font-bold text-gray-800 mb-1`}>{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-center">
          <div className="bg-gray-50 p-2 rounded-lg">
            <i className="ri-map-pin-line text-gray-500 block mb-1"></i>
            <span className="text-gray-800 text-xs md:text-sm">{job.location}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <i className="ri-money-dollar-circle-line text-gray-500 block mb-1"></i>
            <span className="text-gray-800 text-xs md:text-sm">{job.salary}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <i className={`${job.workType === 'Remote' ? 'ri-home-office-line' : job.workType === 'Hybrid' ? 'ri-home-office-line' : 'ri-building-line'} text-gray-500 block mb-1`}></i>
            <span className="text-gray-800 text-xs md:text-sm">{job.workType}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Job Description</h4>
          <p className={`text-gray-600 text-sm ${isMobile ? 'line-clamp-3' : 'line-clamp-2'} mb-2`}>
            {job.description}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Swipe Actions Guide */}
      <div className="mt-auto px-5 py-3 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400">
          <span className="inline-block mr-3">👈 Swipe left to skip</span>
          <span className="inline-block">Swipe right to save 👉</span>
        </p>
      </div>
    </SwipeContainer>
  );
};

export default JobCard;
