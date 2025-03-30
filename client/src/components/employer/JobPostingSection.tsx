import { useState } from "react";
import { motion } from "framer-motion";
import { EmployerJobPosting } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JobPostingSection = () => {
  const [activePostings, setActivePostings] = useState<EmployerJobPosting[]>([
    {
      title: "Senior Frontend Developer",
      daysAgo: 2,
      applicantsCount: 45,
      skills: ["React", "TypeScript", "Node.js"],
      description: "We are looking for an experienced Frontend Developer to join our growing team. The ideal candidate should have strong experience with React and TypeScript.",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000"
    },
    {
      title: "UX/UI Designer",
      daysAgo: 5,
      applicantsCount: 32,
      skills: ["Figma", "UI/UX", "Prototyping"],
      description: "Join our design team to create beautiful and intuitive user experiences for our products. Strong portfolio and experience with Figma required.",
      location: "New York, NY",
      salary: "$90,000 - $120,000"
    },
    {
      title: "Product Manager",
      daysAgo: 1,
      applicantsCount: 28,
      skills: ["Product Strategy", "Agile", "User Research"],
      description: "Lead our product team in defining product vision, strategy, and roadmap. Experience with agile methodologies and user research is essential.",
      location: "Remote",
      salary: "$110,000 - $140,000"
    }
  ]);

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    type: "Full-time",
    experience: "Mid-level",
    skills: [] as string[],
    salary: ""
  });

  const handleCreatePost = () => {
    if (newPost.title) {
      setActivePostings(prev => [{
        title: newPost.title,
        daysAgo: 0,
        applicantsCount: 0,
        skills: newPost.skills,
        description: newPost.description,
        location: newPost.location,
        salary: newPost.salary
      }, ...prev]);
      setIsCreatingPost(false);
      setNewPost({
        title: "",
        description: "",
        requirements: "",
        location: "",
        type: "Full-time",
        experience: "Mid-level",
        skills: [],
        salary: ""
      });
    }
  };

  return (
    <motion.div 
      className="card bg-white p-6 rounded-xl mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center">
        <i className="ri-briefcase-line text-[#2A9D8F] mr-2"></i>
          Job Postings
      </h3>
        <Button
          onClick={() => setIsCreatingPost(true)}
          className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 flex items-center"
        >
          <i className="ri-add-line mr-2"></i>
          Create New Post
        </Button>
      </div>
      
      {/* Active Job Postings */}
      <div className="space-y-4">
        {activePostings.map((posting, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800 text-lg">{posting.title}</h4>
              <Badge variant="outline" className="bg-[#2A9D8F]/10 text-[#2A9D8F] border-[#2A9D8F]/20">
                {posting.daysAgo === 0 ? 'Today' : `${posting.daysAgo}d ago`}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-3 text-sm">{posting.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {posting.skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="bg-white border border-gray-200">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-map-pin-line mr-1"></i>
                  <span>{posting.location || "Remote"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-money-dollar-circle-line mr-1"></i>
                  <span>{posting.salary || "Competitive"}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-[#2A9D8F] font-medium">
                <i className="ri-user-line mr-1"></i>
                <span>{posting.applicantsCount} applicants</span>
              </div>
            </div>
            
            <div className="flex mt-4 pt-3 border-t border-gray-200">
              <Button variant="outline" size="sm" className="mr-2 border-[#2A9D8F] text-[#2A9D8F] hover:bg-[#2A9D8F]/10">
                <i className="ri-edit-line mr-1"></i> Edit
              </Button>
              <Button variant="outline" size="sm" className="border-[#2A9D8F] text-[#2A9D8F] hover:bg-[#2A9D8F]/10">
                <i className="ri-user-search-line mr-1"></i> View Applicants
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Create New Post Modal */}
      {isCreatingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Job Post</h3>
              <button
                onClick={() => setIsCreatingPost(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={newPost.description}
                  onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] h-24"
                  placeholder="Describe the role and responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  value={newPost.requirements}
                  onChange={(e) => setNewPost(prev => ({ ...prev, requirements: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] h-24"
                  placeholder="List the required qualifications and experience..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newPost.location}
                    onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={newPost.salary}
                  onChange={(e) => setNewPost(prev => ({ ...prev, salary: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                  placeholder="e.g. $100,000 - $130,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills
                </label>
                <input
                  type="text"
                  value={newPost.skills.join(", ")}
                  onChange={(e) => setNewPost(prev => ({ ...prev, skills: e.target.value.split(", ") }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                  placeholder="e.g. React, TypeScript, Node.js"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsCreatingPost(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <Button
                onClick={handleCreatePost}
                className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              >
                Create Post
              </Button>
            </div>
          </motion.div>
      </div>
      )}
    </motion.div>
  );
};

export default JobPostingSection;
