import { motion } from "framer-motion";
import { Applicant } from "@/types";
import SwipeContainer from "../common/SwipeContainer";
import CircularProgress from "../ui/circular-progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface ApplicantCardProps {
  applicant: Applicant;
  onSwipeLeft: (applicant: Applicant) => void;
  onSwipeRight: (applicant: Applicant) => void;
}

const ApplicantCard = ({ applicant, onSwipeLeft, onSwipeRight }: ApplicantCardProps) => {
  const isMobile = useIsMobile();
  
  // Card dimensions based on device
  const cardStyles = isMobile
    ? { height: "550px", maxWidth: "100%", width: "310px" }
    : { height: "500px", width: "450px" };
  
  return (
    <SwipeContainer
      onSwipeLeft={() => onSwipeLeft(applicant)}
      onSwipeRight={() => onSwipeRight(applicant)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full"
      style={cardStyles}
    >
      {/* Card Header with Applicant Profile */}
      <div className={`relative ${isMobile ? 'h-40' : 'h-36'} bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] flex items-center justify-center`}>
        <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-30"></div>
        
        {/* Applicant Initials */}
        <div className="z-10 bg-white p-3 rounded-xl shadow-lg">
          <div className={`w-16 h-16 bg-[#2A9D8F] bg-opacity-10 rounded-full flex items-center justify-center text-xl font-medium text-[#2A9D8F]`}>
            {applicant.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        
        {/* Match Percentage - Highlighted */}
        <div className="absolute top-3 right-3 z-20">
          <div className="relative group">
            <div className="bg-gradient-to-r from-[#2A9D8F] to-[#1D503A] p-1 rounded-full">
              <CircularProgress 
                percentage={applicant.matchPercentage} 
                size={isMobile ? "md" : "md"} 
                className="text-white" 
              />
            </div>
            <div className="absolute right-0 mt-2 w-52 sm:w-64 bg-gray-900 text-white text-xs sm:text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
              <p>This candidate's profile matches {applicant.matchPercentage}% of your job requirements.</p>
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Applicant Info */}
      <div className="px-3 sm:px-5 py-3 sm:py-4">
        <div className="text-center mb-2 sm:mb-3">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{applicant.name}</h3>
          <p className="text-gray-600 text-sm">{applicant.position}</p>
          <p className="text-gray-500 text-xs mt-1">{applicant.previousCompany} · {applicant.experience}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-2 mb-2 sm:mb-4 text-sm">
          <div className="bg-gray-50 p-2 rounded-lg flex items-center">
            <i className="ri-map-pin-line text-gray-500 mr-2"></i>
            <span className="text-gray-800 text-xs sm:text-sm">{applicant.location}</span>
          </div>
        </div>
        
        <div className="mb-2 sm:mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1 sm:mb-2">About</h4>
          <p className="text-gray-600 text-xs line-clamp-3 mb-2">
            {applicant.description}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {applicant.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Adding some padding at the bottom to replace the removed swipe actions */}
      <div className="mt-auto pb-4"></div>
    </SwipeContainer>
  );
};

export default ApplicantCard;
