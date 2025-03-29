import { useState } from "react";
import { motion } from "framer-motion";
import { EmployerJobPosting } from "@/types";

const JobPostingSection = () => {
  const [activePostings, setActivePostings] = useState<EmployerJobPosting[]>([
    {
      title: "Senior Frontend Developer",
      daysAgo: 2,
      applicantsCount: 45,
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      title: "UX/UI Designer",
      daysAgo: 5,
      applicantsCount: 32,
      skills: ["Figma", "UI/UX", "Prototyping"]
    },
    {
      title: "Product Manager",
      daysAgo: 1,
      applicantsCount: 28,
      skills: ["Product Strategy", "Agile", "User Research"]
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
    skills: [] as string[]
  });

  const handleCreatePost = () => {
    if (newPost.title) {
      setActivePostings(prev => [{
        title: newPost.title,
        daysAgo: 0,
        applicantsCount: 0,
        skills: newPost.skills
      }, ...prev]);
      setIsCreatingPost(false);
      setNewPost({
        title: "",
        description: "",
        requirements: "",
        location: "",
        type: "Full-time",
        experience: "Mid-level",
        skills: []
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
        <button
          onClick={() => setIsCreatingPost(true)}
          className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 flex items-center"
        >
          <i className="ri-add-line mr-2"></i>
          Create New Post
        </button>
      </div>
      
      {/* Active Job Postings */}
      <div className="space-y-4">
        {activePostings.map((posting, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800">{posting.title}</h4>
              <span className="text-xs text-gray-500">{posting.daysAgo}d ago</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {posting.skills.map((skill, idx) => (
                <span key={idx} className="bg-white px-2 py-1 rounded-full text-xs text-gray-600">
                  {skill}
                </span>
          ))}
        </div>
            <div className="flex items-center text-sm text-gray-500">
              <i className="ri-user-line mr-1"></i>
              <span>{posting.applicantsCount} applicants</span>
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
              <button
                onClick={handleCreatePost}
                className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              >
                Create Post
              </button>
            </div>
          </motion.div>
      </div>
      )}
    </motion.div>
  );
};

export default JobPostingSection;
