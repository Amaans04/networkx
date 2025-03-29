import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { Preference } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

const JobPreferenceBar = () => {
  const { preferences, setPreferences } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [localPreferences, setLocalPreferences] = useState<Preference>({
    location: preferences.location || "",
    experience: preferences.experience || "",
    role: preferences.role || "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const isMobile = useIsMobile();
  
  // Sync local preferences with app context preferences
  useEffect(() => {
    setLocalPreferences({
      location: preferences.location || "",
      experience: preferences.experience || "",
      role: preferences.role || "",
      workTypes: preferences.workTypes || [],
      industry: preferences.industry || "",
      minSalary: preferences.minSalary || "",
      maxSalary: preferences.maxSalary || "",
    });
  }, [preferences]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalPreferences(prev => ({
      ...prev,
      [name]: value
    }));
    setIsDirty(true);
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    const currentValues = localPreferences[name] as string[] || [];
    let newValues: string[];
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    setLocalPreferences(prev => ({
      ...prev,
      [name]: newValues
    }));
    setIsDirty(true);
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPreferences(localPreferences);
    setIsDirty(false);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setFormVisible(false);
    }, 2000);
  };

  const toggleExpanded = () => {
    setIsOpen(!isOpen);
  };

  // Render compact mode after submission
  if (!formVisible) {
    return (
      <motion.div 
        className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 relative"
        initial={{ height: "auto" }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <i className="ri-filter-line text-[#2A9D8F] text-xl mr-2"></i>
            <div>
              <h3 className="font-medium text-gray-800">Your Job Preferences</h3>
              <div className="text-sm text-gray-500 mt-1">
                {localPreferences.location && <span className="mr-2">{localPreferences.location}</span>}
                {localPreferences.role && <span className="mr-2">{localPreferences.role}</span>}
                {localPreferences.experience && <span>{localPreferences.experience}</span>}
              </div>
            </div>
          </div>
          
          <motion.button 
            className="bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFormVisible(true)}
          >
            Edit Preferences
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            <i className="ri-filter-line text-[#2A9D8F] mr-2"></i>
            Job Preferences
          </h2>
          
          <div className="flex items-center gap-2">
            {isDirty && (
              <motion.button 
                className="bg-[#1D503A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubmit()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Apply Filters
              </motion.button>
            )}
            
            <motion.button 
              className="bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpanded}
            >
              {isOpen ? 'Less Filters' : 'More Filters'}
            </motion.button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <select 
              id="location" 
              name="location" 
              value={localPreferences.location}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
            >
              <option value="">Any Location</option>
              <option value="Remote">Remote</option>
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="New York, NY">New York, NY</option>
              <option value="Seattle, WA">Seattle, WA</option>
              <option value="Austin, TX">Austin, TX</option>
              <option value="Boston, MA">Boston, MA</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Primary Skill</label>
            <select 
              id="experience" 
              name="experience" 
              value={localPreferences.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
            >
              <option value="">Select your main skill</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Node.js">Node.js</option>
              <option value="AWS">AWS</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select 
              id="role" 
              name="role" 
              value={localPreferences.role}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
            >
              <option value="">Any Role</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="UX Designer">UX Designer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Backend Engineer">Backend Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <div className="mt-1 flex gap-2 items-center">
                    <select 
                      name="minSalary"
                      value={localPreferences.minSalary || ''}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                    >
                      <option value="">Min Salary</option>
                      <option value="$60k">$60,000</option>
                      <option value="$80k">$80,000</option>
                      <option value="$100k">$100,000</option>
                      <option value="$120k">$120,000</option>
                    </select>
                    <span className="text-gray-500">-</span>
                    <select 
                      name="maxSalary"
                      value={localPreferences.maxSalary || ''}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                    >
                      <option value="">Max Salary</option>
                      <option value="$100k">$100,000</option>
                      <option value="$120k">$120,000</option>
                      <option value="$150k">$150,000</option>
                      <option value="$180k">$180,000</option>
                      <option value="$200k+">$200,000+</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                        checked={localPreferences.workTypes?.includes('Full-time') || false}
                        onChange={(e) => handleCheckboxChange('workTypes', 'Full-time', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                        checked={localPreferences.workTypes?.includes('Part-time') || false}
                        onChange={(e) => handleCheckboxChange('workTypes', 'Part-time', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Part-time</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" 
                        checked={localPreferences.workTypes?.includes('Contract') || false}
                        onChange={(e) => handleCheckboxChange('workTypes', 'Contract', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Contract</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]"
                    name="industry"
                    value={localPreferences.industry || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">All Industries</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className={`${isOpen ? 'sm:col-span-3' : ''} flex justify-end mt-4`}>
            <motion.button 
              type="submit" 
              className="bg-[#1D503A] hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Set Preferences
            </motion.button>
          </div>
        </form>
      </div>
      
      {/* Feedback Message */}
      {showFeedback && (
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-black bg-opacity-70 text-white text-sm py-2 px-4 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Preferences applied successfully! Your job recommendations will update.
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobPreferenceBar;
