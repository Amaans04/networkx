import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const DiscussionsPage = () => {
  const { discussions } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const isMobile = useIsMobile();
  const [isNewDiscussionModalOpen, setIsNewDiscussionModalOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "Career Advice",
    tags: ""
  });
  const [localDiscussions, setLocalDiscussions] = useState([]);

  // Initialize local discussions with mock data on component mount
  useEffect(() => {
    setLocalDiscussions(mockDiscussions);
  }, []);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscussion({
      ...newDiscussion,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new discussion object
    const tagsArray = newDiscussion.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const newDiscussionObj = {
      id: `new-${Date.now()}`, // Generate a temporary ID
      title: newDiscussion.title,
      content: newDiscussion.content,
      category: newDiscussion.category,
      tags: tagsArray,
      author: "You", // Current user
      datePosted: "Just now",
      likes: 0,
      replies: []
    };
    
    // Add to local discussions at the beginning of the array
    setLocalDiscussions([newDiscussionObj, ...localDiscussions]);
    
    // Reset form and close modal
    setNewDiscussion({
      title: "",
      content: "",
      category: "Career Advice",
      tags: ""
    });
    setIsNewDiscussionModalOpen(false);
  };

  // Mock data for discussions
  const mockDiscussions = [
    {
      id: "1",
      title: "Transitioning from Frontend to Full Stack Development",
      content: "I've been working as a frontend developer for 3 years and want to expand my skillset to backend. What technologies should I prioritize learning?",
      author: "Frontend Dev",
      datePosted: "2 days ago",
      category: "Career Advice",
      tags: ["career transition", "full stack", "learning path"],
      likes: 24,
      replies: [
        {
          id: "r1",
          content: "Start with Node.js since you already know JavaScript. Then move to databases like MongoDB or PostgreSQL.",
          author: "Backend Engineer",
          datePosted: "1 day ago",
          likes: 18
        },
        {
          id: "r2",
          content: "I made this transition last year. I'd recommend learning about API design, authentication, and database modeling first.",
          author: "Full Stack Dev",
          datePosted: "1 day ago",
          likes: 12
        }
      ]
    },
    {
      id: "5",
      title: "The Rise of AI in Software Development",
      content: "How are AI coding assistants and automation tools reshaping the software development landscape? Are they enhancing productivity or potentially replacing roles?",
      author: "Tech Analyst",
      datePosted: "1 day ago",
      category: "Industry Trends",
      tags: ["AI", "future of work", "coding tools", "automation"],
      likes: 45,
      replies: [
        {
          id: "r9",
          content: "In our company, AI tools have increased developer productivity by about 30%, especially for routine tasks and boilerplate code.",
          author: "Dev Manager",
          datePosted: "12 hours ago",
          likes: 22
        },
        {
          id: "r10",
          content: "They're great assistants but still require human oversight. I see them augmenting rather than replacing developers in the foreseeable future.",
          author: "Senior Architect",
          datePosted: "8 hours ago",
          likes: 17
        }
      ]
    },
    {
      id: "6",
      title: "Microservices vs. Monoliths in 2025",
      content: "With the growing complexity of orchestration and maintenance, are companies trending back toward simplifying their architecture? What patterns are emerging?",
      author: "System Designer",
      datePosted: "3 days ago",
      category: "Industry Trends",
      tags: ["architecture", "microservices", "system design", "trends"],
      likes: 38,
      replies: [
        {
          id: "r11",
          content: "We're seeing a 'right-sizing' trend. Companies are more thoughtful about when to use microservices vs. when a well-designed monolith is more appropriate.",
          author: "Cloud Specialist",
          datePosted: "2 days ago",
          likes: 26
        },
        {
          id: "r12",
          content: "Serverless and edge computing are changing this conversation entirely. The boundaries between micro and monolithic are blurring.",
          author: "Infrastructure Lead",
          datePosted: "1 day ago",
          likes: 19
        }
      ]
    },
    {
      id: "2",
      title: "Remote Work Culture: Best Practices for Team Cohesion",
      content: "Our team has been fully remote for a year now, but we're struggling with maintaining team cohesion. What practices have worked for your remote teams?",
      author: "Team Lead",
      datePosted: "3 days ago",
      category: "Workplace",
      tags: ["remote work", "team building", "culture"],
      likes: 47,
      replies: [
        {
          id: "r3",
          content: "We do virtual coffee breaks twice a week where no work talk is allowed. It's been great for team bonding.",
          author: "Product Manager",
          datePosted: "2 days ago",
          likes: 23
        },
        {
          id: "r4",
          content: "Async communication tools with clear guidelines have been game-changers for us. Also, quarterly in-person meetups if possible.",
          author: "Remote Work Advocate",
          datePosted: "1 day ago",
          likes: 29
        }
      ]
    },
    {
      id: "3",
      title: "Ethical Considerations in AI Development",
      content: "As AI becomes more prevalent in our industry, what ethical frameworks or guidelines do you follow in your development process?",
      author: "AI Engineer",
      datePosted: "1 week ago",
      category: "Tech Ethics",
      tags: ["AI ethics", "responsible tech", "guidelines"],
      likes: 61,
      replies: [
        {
          id: "r5",
          content: "We've implemented a review board that includes diverse perspectives, not just technical ones. This has helped us catch bias issues early.",
          author: "Ethics Researcher",
          datePosted: "5 days ago",
          likes: 42
        },
        {
          id: "r6",
          content: "The IEEE has good guidelines that we follow. Documentation and transparency are key parts of our development process.",
          author: "Tech Lead",
          datePosted: "3 days ago",
          likes: 31
        }
      ]
    },
    {
      id: "4",
      title: "Work-Life Balance in Demanding Tech Roles",
      content: "I find myself working 60+ hours a week in my senior dev role. How do others maintain boundaries and still advance their careers?",
      author: "Burnout Dev",
      datePosted: "4 days ago",
      category: "Wellness",
      tags: ["work-life balance", "mental health", "career growth"],
      likes: 93,
      replies: [
        {
          id: "r7",
          content: "I started strictly timeboxing my work hours and communicating those boundaries clearly. It was uncomfortable at first but paid off.",
          author: "Balance Finder",
          datePosted: "3 days ago",
          likes: 56
        },
        {
          id: "r8",
          content: "Finding a company with a healthy culture is the most important thing. No technique will work if the expectations are unreasonable.",
          author: "CTO",
          datePosted: "2 days ago",
          likes: 78
        }
      ]
    }
  ];

  const categories = ["All", "Career Advice", "Workplace", "Tech Ethics", "Wellness", "Industry Trends"];

  // Filter discussions based on active category
  const filteredDiscussions = activeCategory === "All" 
    ? localDiscussions 
    : localDiscussions.filter(discussion => discussion.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF5EE]">
      <Header 
        type="job-seeker" 
        activePage="discussions" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D503A] mb-3">Industry & Workplace Discussions</h1>
          <p className="text-gray-600 md:text-lg">
            Connect with professionals, share insights, and explore industry trends.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto sm:overflow-visible">
              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all mb-2 sm:mb-0 ${
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
            
            {/* Start Discussion Button */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setIsNewDiscussionModalOpen(true)}
                className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90"
              >
                <i className="ri-chat-new-line"></i>
                <span>Start New Discussion</span>
              </button>
            </div>
            
            {/* Discussions List */}
            <div className="space-y-6">
              {filteredDiscussions.map((discussion) => (
                <motion.div
                  key={discussion.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {discussion.category}
                      </span>
                      <div className="text-gray-400 text-sm">{discussion.datePosted}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{discussion.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{discussion.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#1D503A] rounded-full flex items-center justify-center text-white text-sm mr-2">
                          {discussion.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{discussion.author}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <button className="flex items-center space-x-1 text-sm hover:text-[#2A9D8F]">
                          <i className="ri-heart-line"></i>
                          <span>{discussion.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm hover:text-[#2A9D8F]">
                          <i className="ri-chat-1-line"></i>
                          <span>{discussion.replies.length}</span>
                        </button>
                        <button className="text-sm hover:text-[#2A9D8F]">
                          <i className="ri-share-line"></i>
                        </button>
                        <button className="text-sm hover:text-[#2A9D8F]">
                          <i className="ri-bookmark-line"></i>
                        </button>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {discussion.replies.length > 0 && (
                      <div className="mt-6 bg-gray-50 rounded-lg p-4">
                        <div className="space-y-4">
                          {discussion.replies.map((reply) => (
                            <div key={reply.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                              <div className="flex items-start mb-2">
                                <div className="flex-shrink-0">
                                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs mr-2">
                                    {reply.author.charAt(0)}
                                  </div>
                                </div>
                                <div className="ml-2 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{reply.author}</span>
                                    <span className="text-xs text-gray-400">{reply.datePosted}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{reply.content}</p>
                                  <div className="flex items-center mt-2">
                                    <button className="flex items-center text-xs text-gray-500 hover:text-[#2A9D8F]">
                                      <i className="ri-heart-line mr-1"></i>
                                      <span>{reply.likes}</span>
                                    </button>
                                    <button className="ml-3 text-xs text-gray-500 hover:text-[#2A9D8F]">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex">
                          <input 
                            type="text" 
                            placeholder="Add your thoughts..." 
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#1D503A]"
                          />
                          <button className="bg-[#1D503A] text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90">
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4 mt-6 md:mt-0">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {["remote work culture", "salary negotiation", "tech industry layoffs", 
                  "diversity in tech", "AI ethics", "work-life balance"].map((topic, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer"
                  >
                    #{topic}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Top Contributors</h3>
              <div className="space-y-4">
                {[
                  { name: "Career Coach", contributions: 56, expertise: "Career Transition" },
                  { name: "Tech Lead", contributions: 42, expertise: "Development" },
                  { name: "HR Specialist", contributions: 38, expertise: "Workplace" },
                  { name: "Work-Life Expert", contributions: 31, expertise: "Wellness" }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-[#1D503A] bg-opacity-10 rounded-full flex items-center justify-center text-[#1D503A] text-sm mr-3">
                      {contributor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{contributor.name}</div>
                      <div className="text-xs text-gray-500">{contributor.expertise} • {contributor.contributions} posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#1D503A] to-[#2A9D8F] rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Workplace Culture Compass</h3>
              <p className="text-sm mb-4">
                Take our survey to see how your workplace culture compares to industry standards.
              </p>
              <button className="bg-white text-[#1D503A] w-full px-4 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90">
                Start Survey
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* New Discussion Modal */}
      {isNewDiscussionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1D503A]">Start a New Discussion</h2>
              <button 
                onClick={() => setIsNewDiscussionModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newDiscussion.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D503A]"
                    placeholder="What's your discussion about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={newDiscussion.content}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D503A]"
                    placeholder="Share your thoughts, questions, or insights..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={newDiscussion.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D503A]"
                  >
                    {categories.filter(cat => cat !== "All").map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={newDiscussion.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D503A]"
                    placeholder="e.g. career growth, remote work, mentorship"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNewDiscussionModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1D503A] text-white rounded-lg hover:bg-opacity-90"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default DiscussionsPage; 