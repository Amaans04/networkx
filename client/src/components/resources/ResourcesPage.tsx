import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const ResourcesPage = () => {
  const { resources } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const isMobile = useIsMobile();

  // Mock data for resources
  const mockResources = [
    {
      id: "1",
      title: "Building an Effective Resume",
      description: "Learn how to craft a resume that stands out to recruiters and passes through ATS systems.",
      type: "Article",
      author: "Resume Expert",
      datePosted: "2 days ago",
      likes: 156,
      category: "Career Tips",
      tags: ["resume", "job search", "career advice"]
    },
    {
      id: "2",
      title: "Introduction to React Hooks",
      description: "A comprehensive guide to understanding and using React Hooks effectively in your projects.",
      type: "Tutorial",
      author: "Web Dev Master",
      datePosted: "1 week ago",
      likes: 243,
      category: "Technical Skills",
      tags: ["react", "javascript", "web development"]
    },
    {
      id: "3",
      title: "Mastering System Design Interviews",
      description: "Strategies and patterns for tackling complex system design questions in technical interviews.",
      type: "Course",
      author: "Tech Interview Pro",
      datePosted: "3 days ago",
      likes: 189,
      category: "Interview Prep",
      tags: ["system design", "interviews", "software engineering"]
    },
    {
      id: "4",
      title: "Networking for Introverts",
      description: "Practical networking strategies tailored specifically for introverted professionals.",
      type: "Article",
      author: "Career Coach",
      datePosted: "5 days ago",
      likes: 127,
      category: "Career Tips",
      tags: ["networking", "soft skills", "career growth"]
    },
    {
      id: "5",
      title: "AI Tools for Job Seekers",
      description: "How to leverage AI tools to enhance your job search and application process.",
      type: "Tool",
      author: "AI Career Expert",
      datePosted: "1 day ago",
      likes: 95,
      category: "Tools",
      tags: ["AI", "job search", "technology"]
    },
    {
      id: "6",
      title: "Industry Disruption Idea: Remote Work Platforms",
      description: "A proposal for next-generation remote work platforms that improve collaboration and work-life balance.",
      type: "Idea",
      author: "Future of Work Strategist",
      datePosted: "4 days ago",
      likes: 78,
      category: "Ideas",
      tags: ["remote work", "future of work", "innovation"]
    }
  ];

  const categories = ["All", "Career Tips", "Technical Skills", "Interview Prep", "Tools", "Ideas"];
  const types = ["Article", "Tutorial", "Course", "Tool", "Idea"];

  // Filter resources based on active category
  const filteredResources = activeCategory === "All" 
    ? mockResources 
    : mockResources.filter(resource => resource.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF5EE]">
      <Header 
        type="job-seeker" 
        activePage="resources" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D503A] mb-3">Resources & Idea Hub</h1>
          <p className="text-gray-600 md:text-lg">
            Discover valuable resources and share innovative ideas with the NetworkX community.
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#1D503A] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add New Resource Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90">
            <i className="ri-add-line"></i>
            <span>Share Resource or Idea</span>
          </button>
        </div>
        
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    resource.type === "Article" ? "bg-blue-100 text-blue-800" :
                    resource.type === "Tutorial" ? "bg-purple-100 text-purple-800" :
                    resource.type === "Course" ? "bg-green-100 text-green-800" :
                    resource.type === "Tool" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {resource.type}
                  </span>
                  <div className="text-gray-400 text-sm">{resource.datePosted}</div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#1D503A] rounded-full flex items-center justify-center text-white text-sm mr-2">
                      {resource.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{resource.author}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <button className="flex items-center space-x-1 text-sm hover:text-[#2A9D8F]">
                      <i className="ri-heart-line"></i>
                      <span>{resource.likes}</span>
                    </button>
                    <button className="ml-3 text-sm hover:text-[#2A9D8F]">
                      <i className="ri-share-line"></i>
                    </button>
                    <button className="ml-3 text-sm hover:text-[#2A9D8F]">
                      <i className="ri-bookmark-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Trending Topics</h2>
          <div className="flex flex-wrap gap-3">
            {["remote work", "AI in job search", "interview preparation", "salary negotiation", 
              "work-life balance", "skill development", "networking", "career change", 
              "personal branding", "resume tips"].map((topic, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>
        
        {/* Submit Resource CTA */}
        <div className="bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] rounded-xl shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Have a resource or idea to share?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contribute to the NetworkX community by sharing valuable resources or innovative ideas that could help others in their professional journey.
          </p>
          <button className="bg-white text-[#1D503A] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90">
            Submit Your Content
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcesPage; 