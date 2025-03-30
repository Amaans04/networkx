import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/common/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";
import Footer from "../common/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart, User, Video } from "lucide-react";

const Dashboard = () => {
  const { currentPage, setCurrentPage } = useAppContext();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("technical");
  const [, setLocation] = useLocation();

  // Mock data for the dashboard UI
  const trending = [
    { id: 1, company: "Google", logo: "search", positions: 156 },
    { id: 2, company: "Microsoft", logo: "windows", positions: 89 },
    { id: 3, company: "Amazon", logo: "shopping-bag", positions: 120 },
    { id: 4, company: "Apple", logo: "apple", positions: 78 },
    { id: 5, company: "Meta", logo: "facebook", positions: 43 },
    { id: 6, company: "Netflix", logo: "play-circle", positions: 34 },
    { id: 7, company: "Tesla", logo: "car", positions: 56 },
    { id: 8, company: "Airbnb", logo: "home", positions: 28 },
  ];

  const partners = [
    { id: 1, company: "Adobe", logo: "palette", positions: 45 },
    { id: 2, company: "Spotify", logo: "music", positions: 32 },
    { id: 3, company: "Slack", logo: "chat-1", positions: 67 },
    { id: 4, company: "Twitter", logo: "twitter", positions: 89 },
    { id: 5, company: "Uber", logo: "car", positions: 78 },
    { id: 6, company: "Lyft", logo: "car", positions: 54 },
    { id: 7, company: "LinkedIn", logo: "linkedin", positions: 92 },
    { id: 8, company: "Dropbox", logo: "cloud", positions: 38 },
  ];

  const events = [
    {
      id: 1,
      title: "Global Tech Summit 2025",
      date: "Apr 15-17, 2025",
      company: "Microsoft",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "AI & ML Conference",
      date: "May 8-10, 2025",
      company: "Google",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Web3 Hackathon",
      date: "Jun 22-24, 2025",
      company: "Ethereum Foundation",
      location: "Virtual",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const interviewQuestions = [
    {
      id: 1,
      category: "Technical",
      questions: [
        "Explain the difference between var, let, and const in JavaScript.",
        "What is the Virtual DOM and how does React use it?",
        "Describe your experience with RESTful APIs.",
        "How do you handle state management in a large application?",
        "What are closures and how do they work?"
      ]
    },
    {
      id: 2,
      category: "HR Round",
      questions: [
        "Tell me about yourself and your background.",
        "Why do you want to work for our company?",
        "Describe a challenge you faced and how you overcame it.",
        "Where do you see yourself in 5 years?",
        "What are your strengths and weaknesses?"
      ]
    },
    {
      id: 3,
      category: "Aptitude",
      questions: [
        "If a train travels at 60 mph, how long will it take to travel 240 miles?",
        "If 5 workers can complete a task in 3 days, how many workers are needed to complete it in 1 day?",
        "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
        "A project is 40% complete and has used $12,000. What is the total budget?",
        "If a product costs $85 with a 15% discount, what is the original price?"
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-[#FAF5EE]">
      {/* Header */}
      <Header 
        type="landing" 
        activePage="dashboard" 
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-[#1D503A] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your Dream Job is Just a Swipe Away!
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {currentPage === "employer" ? "5 Lakh+ Talented Applicants" : "5 Lakh+ Jobs Available"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button 
              className="bg-[#1D503A] text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage("job-seeker");
                setLocation("/job-seeker");
              }}
            >
              Find Jobs
            </motion.button>
            <motion.button 
              className="bg-white text-[#1D503A] border-2 border-[#1D503A] px-8 py-3 rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage("employer");
                setLocation("/employer");
              }}
            >
              Find Employees
            </motion.button>
          </motion.div>
        </motion.section>
        
        {/* Connection Building Features Section - Now moved up for more prominence */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-[#1D503A] mb-4 text-center">Connect, Grow & Network</h2>
          <p className="text-xl text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Unlock powerful features to build your professional network, showcase your skills, and accelerate your career growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resources & Idea Hub */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setCurrentPage("resources");
                setLocation("/resources");
              }}
            >
              <div className="h-32 bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] flex items-center justify-center">
                <i className="ri-book-open-line text-5xl text-white opacity-80"></i>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Resources & Idea Hub</h3>
                <p className="text-gray-600 text-sm mb-4">Discover and share industry resources, tools, and innovative ideas.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#2A9D8F] font-medium">200+ resources</span>
                  <button className="text-[#1D503A] hover:underline text-sm flex items-center">
                    Explore <i className="ri-arrow-right-s-line ml-1"></i>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Skills & Persona */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setCurrentPage("skills");
                setLocation("/skills");
              }}
            >
              <div className="h-32 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] flex items-center justify-center">
                <i className="ri-tools-line text-5xl text-white opacity-80"></i>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Skills & Persona</h3>
                <p className="text-gray-600 text-sm mb-4">Build your professional persona and discover skills that match your career goals.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#2A9D8F] font-medium">AI-powered matching</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage("skills");
                      setLocation("/skills");
                    }}
                    className="text-[#1D503A] hover:underline text-sm flex items-center"
                  >
                    Discover <i className="ri-arrow-right-s-line ml-1"></i>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Discussions */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setCurrentPage("discussions");
                setLocation("/discussions");
              }}
            >
              <div className="h-32 bg-gradient-to-r from-[#E9C46A] to-[#F4A261] flex items-center justify-center">
                <i className="ri-discuss-line text-5xl text-white opacity-80"></i>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Industry Discussions</h3>
                <p className="text-gray-600 text-sm mb-4">Join conversations about workplace culture, career growth, and industry trends.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#2A9D8F] font-medium">Active discussions</span>
                  <button className="text-[#1D503A] hover:underline text-sm flex items-center">
                    Join <i className="ri-arrow-right-s-line ml-1"></i>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Progress Tracking */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setCurrentPage("progress");
                setLocation("/progress");
              }}
            >
              <div className="h-32 bg-gradient-to-r from-[#F4A261] to-[#E76F51] flex items-center justify-center">
                <i className="ri-line-chart-line text-5xl text-white opacity-80"></i>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Progress Tracking</h3>
                <p className="text-gray-600 text-sm mb-4">Track your professional growth, earn badges, and benchmark against peers.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#2A9D8F] font-medium">Set growth goals</span>
                  <button className="text-[#1D503A] hover:underline text-sm flex items-center">
                    Track <i className="ri-arrow-right-s-line ml-1"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* AI Career Growth Section */}
        <motion.section 
          className="mt-12 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D503A] text-center mb-12">Boost Your Career With AI</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Build Your Resume Card */}
            <div 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg h-[380px]"
              onClick={() => {
                setCurrentPage("profile");
                setLocation("/profile");
              }}
            >
              <div className="h-28 bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] flex items-center justify-center">
                <i className="ri-file-list-3-line text-5xl text-white"></i>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Build Your Resume With AI</h3>
                <p className="text-gray-600 mb-6">
                  Create a professional resume in minutes with our AI tools. Highlight your skills, experience, and achievements to stand out to employers.
                </p>
                <Button className="w-full bg-[#1D503A] hover:bg-[#1D503A]/90 text-white">
                  Build Resume
                </Button>
              </div>
            </div>

            {/* Strengthen Your Profile Card - pushed up */}
            <div 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg h-[380px] -mt-4"
              onClick={() => {
                setCurrentPage("profile");
                setLocation("/profile");
              }}
            >
              <div className="h-28 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] flex items-center justify-center">
                <User className="h-14 w-14 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Strengthen Your Profile</h3>
                <p className="text-gray-600 mb-6">
                  Complete your profile to boost visibility with potential employers. Our AI tools help highlight your strengths and identify growth areas.
                </p>
                <Button className="w-full bg-[#1D503A] hover:bg-[#1D503A]/90 text-white">
                  Update Profile
                </Button>
              </div>
            </div>

            {/* Practice Interviews Card */}
            <div 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg h-[380px]"
              onClick={() => {
                setCurrentPage("mock-interview");
                setLocation("/mock-interview");
              }}
            >
              <div className="h-28 bg-gradient-to-r from-[#E9C46A] to-[#F4A261] flex items-center justify-center">
                <i className="ri-video-line text-5xl text-white"></i>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Practice Interviews</h3>
                <p className="text-gray-600 mb-6">
                  Prepare for real interviews with AI-powered mock interview sessions. Get instant feedback and improve your interview skills with each practice.
                </p>
                <Button className="w-full bg-[#1D503A] hover:bg-[#1D503A]/90 text-white">
                  Start Practice
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Company Highlights (Marquee UI) */}
        <motion.section 
          className="mb-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Companies on NetworkX</h2>
          
          {/* Trending Companies Marquee */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pl-4">Trending Hiring Companies</h3>
            <div className="relative overflow-hidden w-full">
              <div className="animate-marquee flex whitespace-nowrap py-4">
                {trending.map((company, index) => (
                  <div 
                    key={`${company.id}-1-${index}`} 
                    className="flex-shrink-0 w-48 mx-4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <i className={`ri-${company.logo}-fill text-2xl text-[#1D503A]`}></i>
                    </div>
                    <h4 className="font-medium">{company.company}</h4>
                    <p className="text-sm text-[#2A9D8F]">{company.positions} open positions</p>
                  </div>
                ))}
                {trending.map((company, index) => (
                  <div 
                    key={`${company.id}-2-${index}`} 
                    className="flex-shrink-0 w-48 mx-4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <i className={`ri-${company.logo}-fill text-2xl text-[#1D503A]`}></i>
                    </div>
                    <h4 className="font-medium">{company.company}</h4>
                    <p className="text-sm text-[#2A9D8F]">{company.positions} open positions</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Partner Companies Marquee (opposite direction) */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pl-4">Our Partner Companies</h3>
            <div className="relative overflow-hidden w-full">
              <div className="animate-marquee-reverse flex whitespace-nowrap py-4">
                {partners.map((company, index) => (
                  <div 
                    key={`${company.id}-1-${index}`} 
                    className="flex-shrink-0 w-40 mx-4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <i className={`ri-${company.logo}-fill text-2xl text-gray-600`}></i>
                    </div>
                    <h4 className="font-medium">{company.company}</h4>
                  </div>
                ))}
                {partners.map((company, index) => (
                  <div 
                    key={`${company.id}-2-${index}`} 
                    className="flex-shrink-0 w-40 mx-4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <i className={`ri-${company.logo}-fill text-2xl text-gray-600`}></i>
                    </div>
                    <h4 className="font-medium">{company.company}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Upcoming Events & Hackathons */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Upcoming Events & Hackathons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <motion.div 
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="h-40 relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1D503A] to-transparent opacity-80 flex flex-col justify-end p-4">
                    <span className="bg-white text-[#1D503A] text-xs font-bold px-2 py-1 rounded-full w-fit">
                      {event.date}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <i className="ri-building-line mr-1"></i>
                    <span>{event.company}</span>
                    <span className="mx-2">•</span>
                    <i className="ri-map-pin-line mr-1"></i>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="bg-[#1D503A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90">
                      Register Now
                    </button>
                    <button className="text-[#1D503A] font-medium text-sm flex items-center">
                      Learn More <i className="ri-arrow-right-line ml-1"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-white text-[#1D503A] border-2 border-[#1D503A] px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
              View All Events
            </button>
          </div>
        </motion.section>
        
        {/* Top Interview & Aptitude Questions */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Prepare for Your Interviews</h2>
          
          {/* Question Categories Tabs */}
          <div className="flex justify-center mb-6 border-b">
            {interviewQuestions.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.category.toLowerCase())}
                className={`px-6 py-3 font-medium text-lg transition-all ${
                  activeTab === category.category.toLowerCase() 
                    ? "text-[#1D503A] border-b-2 border-[#1D503A]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          {/* Questions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <AnimatePresence mode="wait">
              {interviewQuestions.map((category) => (
                activeTab === category.category.toLowerCase() && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-4">
                      {category.questions.map((question, index) => (
                        <li key={index} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex">
                            <span className="flex-shrink-0 w-6 h-6 bg-[#1D503A] bg-opacity-10 rounded-full flex items-center justify-center text-[#1D503A] font-medium text-sm mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-gray-800 font-medium">{question}</p>
                              <button className="text-[#2A9D8F] text-sm mt-2 flex items-center">
                                View Sample Answer <i className="ri-arrow-right-s-line ml-1"></i>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center mt-6">
                      <button className="bg-[#1D503A] text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all">
                        Practice {category.category} Questions
                      </button>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
        
        {/* Call-to-Action */}
        <motion.section 
          className="mb-16 bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to take your career to the next level?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have already found their dream jobs through NetworkX.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              className="bg-white text-[#1D503A] px-8 py-3 rounded-lg font-medium text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage("job-seeker");
                setLocation("/job-seeker");
              }}
            >
              Start Swiping
            </motion.button>
            <motion.button 
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;