import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/common/Header";
import { profile as initialProfile } from "@/lib/mockData";
import { useAppContext } from "@/context/AppContext";
import { Profile } from "@/types";

// Clone the initial profile for local mutations
const ProfileSection = () => {
  const { setCurrentPage, preferences, setPreferences } = useAppContext();
  const [profile, setProfile] = useState<Profile>({...initialProfile});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Profile>(profile);
  const [skillInput, setSkillInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(profile.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Track profile completeness
  const [completeness, setCompleteness] = useState({
    percentage: profile.completeness.percentage,
    completed: [...profile.completeness.completed],
    pending: [...profile.completeness.pending]
  });

  // Calculate profile completeness whenever profile changes
  useEffect(() => {
    updateProfileCompleteness();
  }, [profile]);

  const updateProfileCompleteness = () => {
    const fields = {
      "Basic Info": profile.name && profile.position && profile.location,
      "About Me": profile.about && profile.about.length > 20,
      "Skills": profile.skills && profile.skills.length >= 3,
      "Experience": profile.experience && profile.experience.length > 0,
      "Resume": profile.documents && profile.documents.length > 0,
      "Job Preferences": profile.preferences && profile.preferences.location,
    };
    
    const completed = Object.keys(fields).filter(key => fields[key as keyof typeof fields]);
    const pending = Object.keys(fields).filter(key => !fields[key as keyof typeof fields]);
    const percentage = Math.round((completed.length / Object.keys(fields).length) * 100);
    
    setCompleteness({
      percentage,
      completed,
      pending
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof Profile;
      
      setFormData({
        ...formData,
        [parentKey]: {
          ...(formData[parentKey] as any),
          [child]: value
        } as Profile[typeof parentKey]
      });
    } else {
      setFormData({
        ...formData,
        [name as keyof Profile]: value as any
      });
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name.includes('.')) {
      // Handle nested properties
      const [parent, child, subchild] = name.split('.');
      const parentKey = parent as keyof Profile;
      
      if (subchild) {
        // For handling deeply nested properties like preferences.notifications.jobs
        setFormData({
          ...formData,
          [parentKey]: {
            ...(formData[parentKey] as any),
            [child]: {
              ...(formData[parentKey] as any)[child],
              [subchild]: checked
            }
          } as Profile[typeof parentKey]
        });
      } else {
        // For handling single-level nested properties
        setFormData({
          ...formData,
          [parentKey]: {
            ...(formData[parentKey] as any),
            [child]: checked
          } as Profile[typeof parentKey]
        });
      }
    }
  };

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    const currentJobTypes = [...formData.preferences.jobTypes];
    if (checked && !currentJobTypes.includes(jobType)) {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          jobTypes: [...currentJobTypes, jobType]
        }
      });
    } else if (!checked && currentJobTypes.includes(jobType)) {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          jobTypes: currentJobTypes.filter(type => type !== jobType)
        }
      });
    }
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      experience: updatedExperience
    });
  };

  const addExperienceEntry = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          position: "",
          period: "",
          description: ""
        }
      ]
    });
  };

  const removeExperienceEntry = (index: number) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    
    setFormData({
      ...formData,
      experience: updatedExperience
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    
    // Also update preferences in app context for job recommendations
    setPreferences({
      ...preferences,
      location: formData.preferences.location,
      role: formData.position,
      experience: formData.skills[0] || ""
    });
    
    setEditMode(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="job-seeker" activePage="profile" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccess && (
          <motion.div 
            className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded mb-6 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <i className="ri-check-line text-xl mr-2"></i>
            <span>Your profile has been updated successfully!</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            {!editMode ? (
              <motion.div 
                className="card bg-white p-6 mb-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div 
                      className="relative w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mr-6 cursor-pointer group overflow-hidden"
                      onClick={handleImageClick}
                    >
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <i className="ri-user-line text-4xl text-gray-500"></i>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                        <i className="ri-camera-line text-white text-xl opacity-0 group-hover:opacity-100"></i>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div>
                      <h2 className="text-2xl font-bold font-poppins text-gray-800">{profile.name}</h2>
                      <p className="text-lg text-gray-600">{profile.position}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <i className="ri-map-pin-line mr-1"></i>
                        <span>{profile.location}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    className="bg-[#1D503A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </motion.button>
                </div>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">About Me</h3>
                  <p className="text-gray-700">{profile.about || "Add information about yourself"}</p>
                </div>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No skills added yet</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Experience</h3>
                  {profile.experience.length > 0 ? (
                    <div className="space-y-4">
                      {profile.experience.map((exp, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                              <i className="ri-building-line text-blue-600"></i>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium">{exp.position}</h4>
                            <div className="text-sm text-gray-600">{exp.company} • {exp.period}</div>
                            <p className="text-gray-700 mt-1">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No experience added yet</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <motion.div 
                  className="card bg-white p-6 mb-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input 
                          type="text" 
                          name="position" 
                          value={formData.position} 
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                          placeholder="e.g. Frontend Developer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                  </div>
                  
                  <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">About Me</h3>
                    <textarea 
                      name="about" 
                      value={formData.about} 
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] min-h-[120px]" 
                      placeholder="Write a short bio about yourself..."
                    />
                  </div>
                  
                  <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700 flex items-center">
                          <span>{skill}</span>
                          <button 
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={skillInput} 
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                        placeholder="Add a skill e.g. JavaScript"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                      />
                      <button 
                        type="button"
                        onClick={handleSkillAdd}
                        className="bg-[#2A9D8F] text-white px-4 py-2 rounded-r-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Experience</h3>
                      <button 
                        type="button"
                        onClick={addExperienceEntry}
                        className="text-[#2A9D8F] text-sm flex items-center"
                      >
                        <i className="ri-add-line mr-1"></i>
                        Add Experience
                      </button>
                    </div>
                    
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="border-b pb-4 mb-4 last:border-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input 
                              type="text" 
                              value={exp.company} 
                              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input 
                              type="text" 
                              value={exp.position} 
                              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                              placeholder="Your job title"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                          <input 
                            type="text" 
                            value={exp.period} 
                            onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                            placeholder="e.g. 2020 - Present"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={exp.description} 
                            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] min-h-[80px]" 
                            placeholder="Describe your responsibilities and achievements"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button 
                            type="button"
                            onClick={() => removeExperienceEntry(index)}
                            className="text-red-500 text-sm flex items-center"
                          >
                            <i className="ri-delete-bin-line mr-1"></i>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-6 gap-3">
                    <button 
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-[#1D503A] text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90"
                    >
                      Save Profile
                    </button>
                  </div>
                </motion.div>
              </form>
            )}

            {/* Documents Section */}
            <motion.div 
              className="card bg-white p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              {profile.documents.length > 0 ? (
                profile.documents.map((doc, index) => (
                  <div key={index} className={`${index < profile.documents.length - 1 ? 'border-b pb-4 mb-4' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#2A9D8F] bg-opacity-10 rounded-md flex items-center justify-center mr-3">
                          <i className={`${doc.icon} text-[#2A9D8F]`}></i>
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-xs text-gray-500">Updated {doc.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-gray-600 hover:text-[#1D503A]">View</button>
                        <button className="text-sm text-gray-600 hover:text-[#1D503A]">Update</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                  <i className="ri-file-upload-line text-3xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No documents uploaded yet</p>
                  <button className="mt-3 bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm">Upload Resume</button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* AI Resume Preview */}
            <motion.div 
              className="card bg-white p-6 mb-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="ri-file-text-line text-[#2A9D8F] mr-2"></i>
                AI Resume Preview
              </h3>
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="text-center mb-4 pb-3 border-b">
                  <h4 className="font-bold text-lg">{profile.name || "Your Name"}</h4>
                  <p className="text-sm text-gray-600">{profile.position || "Your Position"}</p>
                  <div className="flex justify-center items-center mt-1 text-xs text-gray-500">
                    <span>{profile.location || "Location"}</span>
                    <span className="mx-2">•</span>
                    <span>{profile.name ? profile.name.toLowerCase().replace(' ', '.')+'@example.com' : "email@example.com"}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h5 className="font-medium text-xs uppercase tracking-wider text-gray-500 mb-1">Skills</h5>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.length > 0 ? (
                      <>
                        {profile.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">{skill}</span>
                        ))}
                        {profile.skills.length > 3 && (
                          <span className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">+{profile.skills.length - 3} more</span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Add skills to see them here</span>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <h5 className="font-medium text-xs uppercase tracking-wider text-gray-500 mb-1">Experience</h5>
                  <div className="text-xs">
                    {profile.experience.length > 0 ? (
                      profile.experience.map((exp, index) => (
                        <div key={index} className={index > 0 ? 'mt-2' : ''}>
                          <p className="font-medium">{exp.company || "Company Name"} ({exp.period || "Period"})</p>
                          <p className="text-gray-600">{exp.position || "Position"}</p>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs italic">Add experience to see it here</span>
                    )}
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <button className="text-xs bg-[#1D503A] text-white px-3 py-1 rounded-md">Generate Full Resume</button>
                </div>
              </div>
            </motion.div>

            {/* Job Preferences */}
            <motion.div 
              className="card bg-white p-6 mb-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="ri-settings-line text-[#2A9D8F] mr-2"></i>
                Job Preferences
              </h3>
              
              {!editMode ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <span className="text-sm text-gray-600">{profile.preferences.location || "Not set"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">Job Types</h4>
                    <div className="text-sm text-gray-600">
                      {profile.preferences.jobTypes.length > 0 ? 
                        profile.preferences.jobTypes.join(", ") : 
                        "Not set"
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">Salary Range</h4>
                    <span className="text-sm text-gray-600">
                      {profile.preferences.salaryRange.min && profile.preferences.salaryRange.max ? 
                        `${profile.preferences.salaryRange.min} - ${profile.preferences.salaryRange.max}` : 
                        "Not set"
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <motion.button 
                      className="bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(true)}
                    >
                      Update Preferences
                    </motion.button>
                  </div>
                </div>
              ) : (
                // Edit mode for preferences included in the main form
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Location Preference</h4>
                    <div className="flex items-center">
                      <select 
                        name="preferences.location"
                        value={formData.preferences.location}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                      >
                        <option value="">Select location preference</option>
                        <option value="Remote">Remote</option>
                        <option value="San Francisco, CA">San Francisco, CA</option>
                        <option value="New York, NY">New York, NY</option>
                        <option value="Seattle, WA">Seattle, WA</option>
                        <option value="Any Location">Any Location</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Job Type</h4>
                    <div className="flex flex-wrap gap-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                          checked={formData.preferences.jobTypes.includes("Full-time")}
                          onChange={(e) => handleJobTypeChange("Full-time", e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Full-time</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                          checked={formData.preferences.jobTypes.includes("Part-time")}
                          onChange={(e) => handleJobTypeChange("Part-time", e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Part-time</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                          checked={formData.preferences.jobTypes.includes("Contract")}
                          onChange={(e) => handleJobTypeChange("Contract", e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Contract</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Salary Range</h4>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        name="preferences.salaryRange.min"
                        value={formData.preferences.salaryRange.min}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                        placeholder="Min"
                      />
                      <span className="text-gray-500">-</span>
                      <input 
                        type="text" 
                        name="preferences.salaryRange.max"
                        value={formData.preferences.salaryRange.max}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]" 
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Notify me about</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="preferences.notifications.jobs" 
                          checked={formData.preferences.notifications.jobs}
                          onChange={handleCheckboxChange}
                          className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                        />
                        <span className="ml-2 text-sm text-gray-700">New matching jobs</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="preferences.notifications.status"
                          checked={formData.preferences.notifications.status}
                          onChange={handleCheckboxChange}
                          className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Application status updates</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="preferences.notifications.messages"
                          checked={formData.preferences.notifications.messages}
                          onChange={handleCheckboxChange}
                          className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Recruiter messages</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Profile Completeness */}
            <motion.div 
              className="card bg-white p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="ri-pie-chart-line text-[#2A9D8F] mr-2"></i>
                Profile Completeness
              </h3>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#2A9D8F] bg-[#2A9D8F] bg-opacity-10">
                      {completeness.percentage < 30 ? "Just started" : 
                       completeness.percentage < 70 ? "Making progress" : 
                       completeness.percentage < 100 ? "Almost there!" : "Complete!"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-[#2A9D8F]">
                      {completeness.percentage}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${completeness.percentage}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#2A9D8F]"
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                {completeness.completed.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <i className="ri-check-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
                {completeness.pending.map((item, index) => (
                  <div key={index} className="flex items-center group cursor-pointer" onClick={() => setEditMode(true)}>
                    <i className="ri-close-line text-gray-400 mr-2 group-hover:text-[#2A9D8F]"></i>
                    <span className="text-sm text-gray-400 group-hover:text-gray-700">
                      {item}{" "}
                      <span className="text-xs text-[#2A9D8F] group-hover:underline">Add now</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSection;
