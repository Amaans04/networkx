import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const SkillsPage = () => {
  const { skillMatches } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("persona");
  const isMobile = useIsMobile();

  // Check localStorage for active tab preference when component mounts
  useEffect(() => {
    const savedTab = localStorage.getItem("skills_active_tab");
    if (savedTab) {
      setActiveTab(savedTab);
      // Clear the localStorage value after setting it
      localStorage.removeItem("skills_active_tab");
    }
  }, []);

  // Mock data for skills and persona
  const mockPersonaData = {
    strengths: [
      { name: "JavaScript", score: 85, growth: "+15% in 3 months" },
      { name: "React", score: 78, growth: "+22% in 3 months" },
      { name: "UI/UX Design", score: 72, growth: "+8% in 3 months" },
      { name: "Problem Solving", score: 90, growth: "+5% in 3 months" },
      { name: "Communication", score: 82, growth: "+10% in 3 months" }
    ],
    growthAreas: [
      { name: "TypeScript", score: 45, growth: "+30% in 3 months" },
      { name: "System Design", score: 38, growth: "+25% in 3 months" },
      { name: "DevOps", score: 30, growth: "+15% in 3 months" }
    ],
    personalityTraits: [
      { trait: "Analytical", percentage: 85 },
      { trait: "Creative", percentage: 70 },
      { trait: "Detail-oriented", percentage: 75 },
      { trait: "Team Player", percentage: 80 },
      { trait: "Adaptable", percentage: 65 }
    ],
    careerMatchTypes: [
      { role: "Frontend Developer", matchScore: 92 },
      { role: "UX Engineer", matchScore: 87 },
      { role: "Product Designer", matchScore: 76 },
      { role: "Technical Writer", matchScore: 71 },
      { role: "Project Manager", matchScore: 65 }
    ]
  };

  // Mock data for people who match the user's persona
  const mockPeopleMatches = [
    {
      id: "p1",
      name: "Sarah Chen",
      position: "Senior Frontend Developer",
      company: "TechVision Inc.",
      matchScore: 92,
      commonSkills: ["React", "JavaScript", "UI/UX Design"],
      avatar: "SC",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800"
    },
    {
      id: "p2",
      name: "Alex Rodriguez",
      position: "UX Engineer",
      company: "DesignWorks Studio",
      matchScore: 88,
      commonSkills: ["UI/UX Design", "React", "Problem Solving"],
      avatar: "AR",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800"
    },
    {
      id: "p3",
      name: "Michael Park",
      position: "Frontend Team Lead",
      company: "Innovate Solutions",
      matchScore: 85,
      commonSkills: ["JavaScript", "React", "Communication"],
      avatar: "MP",
      bgColor: "bg-green-100",
      textColor: "text-green-800"
    },
    {
      id: "p4",
      name: "Priya Sharma",
      position: "Product Designer",
      company: "Creative Digital",
      matchScore: 82,
      commonSkills: ["UI/UX Design", "Problem Solving", "Communication"],
      avatar: "PS",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800"
    }
  ];

  const mockSkillRecommendations = [
    {
      id: "1",
      skillName: "TypeScript",
      matchScore: 92,
      reason: "Based on your JavaScript proficiency and career goals",
      relatedSkills: ["JavaScript", "Angular", "React"],
      resources: [
        { title: "TypeScript Fundamentals", type: "Course", provider: "Frontend Masters" },
        { title: "TypeScript for React Developers", type: "Tutorial", provider: "Scrimba" }
      ]
    },
    {
      id: "2",
      skillName: "System Design",
      matchScore: 88,
      reason: "Critical for senior developer positions you're interested in",
      relatedSkills: ["Architecture", "Scalability", "Databases"],
      resources: [
        { title: "System Design Interview", type: "Book", provider: "Alex Xu" },
        { title: "Grokking System Design", type: "Course", provider: "Educative" }
      ]
    },
    {
      id: "3",
      skillName: "AWS",
      matchScore: 85,
      reason: "In high demand for roles matching your profile",
      relatedSkills: ["Cloud Computing", "DevOps", "Serverless"],
      resources: [
        { title: "AWS Certified Developer", type: "Certification", provider: "AWS" },
        { title: "AWS for Frontend Developers", type: "Course", provider: "A Cloud Guru" }
      ]
    },
    {
      id: "4",
      skillName: "GraphQL",
      matchScore: 78,
      reason: "Complements your React skills and improves API efficiency",
      relatedSkills: ["REST APIs", "Apollo", "Data Fetching"],
      resources: [
        { title: "GraphQL Fundamentals", type: "Tutorial", provider: "How to GraphQL" },
        { title: "React with Apollo", type: "Documentation", provider: "Apollo Docs" }
      ]
    }
  ];

  const mockSkillChallenges = [
    {
      id: "1",
      title: "React Performance Challenge",
      description: "Optimize a React application to improve rendering performance",
      difficulty: "Intermediate",
      estimatedTime: "2-3 hours",
      participants: 128,
      skills: ["React", "Performance Optimization", "JavaScript"]
    },
    {
      id: "2",
      title: "TypeScript Migration Project",
      description: "Convert a JavaScript codebase to TypeScript with proper typing",
      difficulty: "Advanced",
      estimatedTime: "4-5 hours",
      participants: 87,
      skills: ["TypeScript", "JavaScript", "Type Systems"]
    },
    {
      id: "3",
      title: "UI Component Library",
      description: "Create a reusable UI component library with accessibility features",
      difficulty: "Intermediate",
      estimatedTime: "6-8 hours",
      participants: 56,
      skills: ["React", "CSS", "Accessibility", "Component Design"]
    }
  ];

  const renderPersonaTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Strengths Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Strengths</h3>
          <div className="space-y-4">
            {mockPersonaData.strengths.map((skill, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm font-medium text-[#2A9D8F]">{skill.growth}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#2A9D8F] h-2.5 rounded-full" 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Growth Areas Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Growth Areas</h3>
          <div className="space-y-4">
            {mockPersonaData.growthAreas.map((skill, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm font-medium text-[#E9C46A]">{skill.growth}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#E9C46A] h-2.5 rounded-full" 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <button className="mt-2 text-[#1D503A] font-medium flex items-center text-sm">
              <i className="ri-add-line mr-1"></i> Add more skills to develop
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personality Traits */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Work Personality</h3>
          <div className="space-y-4">
            {mockPersonaData.personalityTraits.map((trait, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{trait.trait}</span>
                  <span className="text-sm font-medium text-gray-500">{trait.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#1D503A] h-2.5 rounded-full" 
                    style={{ width: `${trait.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-[#2A9D8F] font-medium text-sm">Take personality assessment →</button>
          </div>
        </div>
        
        {/* Career Match Types */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Career Match Types</h3>
          <p className="text-gray-600 mb-6">Based on your skills and personality, you're most compatible with these roles</p>
          <div className="space-y-4">
            {mockPersonaData.careerMatchTypes.map((type, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-800">{type.role}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-[#2A9D8F] mr-2">{type.matchScore}% Match</span>
                  <svg className="w-5 h-5 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network CTA Section */}
      <div className="bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] rounded-xl shadow-md mt-6 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Connect with Similar Professionals</h3>
        <p className="mb-4">We've found 28 professionals who match your skills and career interests. Expand your network today!</p>
        <button 
          onClick={() => setActiveTab("network")}
          className="bg-white text-[#1D503A] px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
        >
          View Matching Professionals
        </button>
      </div>

      {/* People Matches Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Connect With Matching Professionals</h3>
        <p className="text-gray-600 mb-6">
          These professionals share similar skills and career interests. Connecting with them could lead to meaningful collaborations and growth opportunities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockPeopleMatches.map((person) => (
            <motion.div
              key={person.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-12 h-12 ${person.bgColor} rounded-full flex items-center justify-center ${person.textColor} text-xl font-bold`}>
                    {person.avatar}
                  </div>
                  <div className="bg-[#1D503A] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {person.matchScore}% Match
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 mb-1">{person.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{person.position}</p>
                <p className="text-xs text-gray-500 mb-3">{person.company}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Common skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {person.commonSkills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-[#1D503A] text-white text-sm px-3 py-1 rounded-lg flex-1 hover:bg-opacity-90">
                    Connect
                  </button>
                  <button className="border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg hover:bg-gray-50">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button className="text-[#2A9D8F] font-medium flex items-center justify-center mx-auto">
            View more matching professionals <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSkillMatchTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Skill Recommendations</h3>
        <p className="text-gray-600 mb-4">
          Based on your career goals, current skills, and market trends, we recommend focusing on these skills:
        </p>
        
        <div className="space-y-4 mt-6">
          {mockSkillRecommendations.map((skill) => (
            <div key={skill.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-bold text-gray-800">{skill.skillName}</h4>
                <div className="bg-[#1D503A] text-white text-sm font-bold px-2 py-1 rounded-full">
                  {skill.matchScore}% Match
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{skill.reason}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs text-gray-500">Related skills:</span>
                {skill.relatedSkills.map((related, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {related}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Learning Resources:</h5>
                <ul className="space-y-2">
                  {skill.resources.map((resource, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        resource.type === 'Course' ? 'bg-green-500' :
                        resource.type === 'Tutorial' ? 'bg-blue-500' :
                        resource.type === 'Documentation' ? 'bg-purple-500' :
                        'bg-yellow-500'
                      }`}></span>
                      <span className="text-gray-800">{resource.title}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-500">{resource.provider}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="bg-[#2A9D8F] text-white text-sm px-3 py-1 rounded-lg hover:bg-opacity-90">
                  Add to Learning Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderChallengesTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Skill Validation Challenges</h3>
          <button className="bg-[#1D503A] text-white px-3 py-1 rounded-lg text-sm hover:bg-opacity-90">
            View All Challenges
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSkillChallenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{challenge.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs mr-2">
                  {challenge.difficulty}
                </span>
                <i className="ri-time-line mr-1"></i>
                <span>{challenge.estimatedTime}</span>
                <span className="mx-2">•</span>
                <i className="ri-user-line mr-1"></i>
                <span>{challenge.participants} participants</span>
              </div>
              
              <button className="w-full mt-2 bg-[#2A9D8F] text-white py-2 rounded-lg text-sm hover:bg-opacity-90">
                Start Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] rounded-xl shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Create Your Own Challenge</h3>
        <p className="mb-4">
          Design a custom skill validation challenge and invite others to participate.
        </p>
        <button className="bg-white text-[#1D503A] px-4 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90">
          Create Challenge
        </button>
      </div>
    </motion.div>
  );

  const renderNetworkTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Your Professional Network</h3>
          <p className="text-gray-600">
            Expand your professional network by connecting with individuals who share similar skills, 
            interests, and career aspirations. Our AI-powered matching algorithm identifies professionals 
            who would make valuable additions to your network.
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h4 className="font-medium text-gray-800">Matching Professionals</h4>
            <p className="text-sm text-gray-500">Based on your skills, experience, and interests</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
              Filter
            </button>
            <button className="bg-[#1D503A] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-opacity-90">
              Sort by Match %
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockPeopleMatches.map((person) => (
            <motion.div
              key={person.id}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 ${person.bgColor} rounded-full flex items-center justify-center ${person.textColor} text-xl font-bold`}>
                  {person.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.position}</p>
                      <p className="text-xs text-gray-500">{person.company}</p>
                    </div>
                    <div className="bg-[#1D503A] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {person.matchScore}% Match
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Common skills:</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {person.commonSkills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="bg-[#1D503A] text-white text-sm px-3 py-1 rounded-lg flex-1 hover:bg-opacity-90">
                      Connect
                    </button>
                    <button className="border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg hover:bg-gray-50">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6">
          <button className="border border-[#1D503A] text-[#1D503A] rounded-lg text-sm font-medium py-2 px-4 hover:bg-[#1D503A] hover:bg-opacity-10 w-full">
            Load More Matches
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Growth Clusters</h3>
        <p className="text-gray-600 mb-6">
          Join professional growth clusters to connect with like-minded individuals and accelerate your career development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPersonaData.careerMatchTypes.map((type, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 hover:border-[#1D503A] hover:shadow-sm transition-all">
              <h4 className="font-medium text-gray-800 mb-1">{type.role} Network</h4>
              <p className="text-xs text-gray-500 mb-2">238 members • 24 active today</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs border-2 border-white">SC</div>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs border-2 border-white">MP</div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-xs border-2 border-white">AR</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 text-xs border-2 border-white">+42</div>
                </div>
                <button className="text-[#1D503A] text-sm font-medium">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FAF5EE]">
      <Header 
        type="job-seeker" 
        activePage="skills" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D503A] mb-3">AI Skill Matching & Persona</h1>
          <p className="text-gray-600 md:text-lg">
            Discover your professional strengths, growth areas, and personalized skill recommendations.
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("persona")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === "persona" 
                  ? "border-[#1D503A] text-[#1D503A]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Professional Persona
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === "recommendations" 
                  ? "border-[#1D503A] text-[#1D503A]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Skill Recommendations
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === "challenges" 
                  ? "border-[#1D503A] text-[#1D503A]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Skill Challenges
            </button>
            <button
              onClick={() => setActiveTab("network")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === "network" 
                  ? "border-[#1D503A] text-[#1D503A]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Network
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "persona" && renderPersonaTab()}
          {activeTab === "recommendations" && renderSkillMatchTab()}
          {activeTab === "challenges" && renderChallengesTab()}
          {activeTab === "network" && renderNetworkTab()}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkillsPage; 