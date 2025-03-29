import { motion } from "framer-motion";
import Header from "@/components/common/Header";

const EmployerProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="employer" activePage="company-profile" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <motion.div 
              className="card bg-white p-6 mb-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center mr-6">
                    <i className="ri-building-4-line text-4xl text-gray-500"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-poppins text-gray-800">Acme Corporation</h2>
                    <p className="text-lg text-gray-600">Technology</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <i className="ri-map-pin-line mr-1"></i>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                <button className="bg-[#1D503A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90">
                  Edit Profile
                </button>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">About Us</h3>
                <p className="text-gray-700">
                  Acme Corporation is a leading technology company that specializes in creating innovative software solutions for businesses of all sizes. We're passionate about building products that help our customers succeed and grow.
                </p>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">Company Culture</h3>
                <p className="text-gray-700">
                  We believe in fostering a collaborative and inclusive environment where everyone's ideas are valued. Our team is diverse, talented, and driven by a shared mission to create technology that makes a positive impact.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700">
                    <i className="ri-team-line mr-1"></i> Collaborative
                  </span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700">
                    <i className="ri-lightbulb-line mr-1"></i> Innovative
                  </span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700">
                    <i className="ri-earth-line mr-1"></i> Diverse
                  </span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700">
                    <i className="ri-heart-line mr-1"></i> Work-Life Balance
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <i className="ri-medal-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-gray-700">Competitive Salary</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-health-book-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-gray-700">Health Insurance</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-calendar-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-gray-700">Flexible Work Schedule</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-graduation-cap-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-gray-700">Professional Development</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-home-office-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-gray-700">Remote Work Options</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-group-line text-[#2A9D8F] mr-2"></i>
                    <span className="text-gray-700">Team Building Events</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Active Job Postings */}
            <motion.div 
              className="card bg-white p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Active Job Postings</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Frontend Developer</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="flex items-center mr-4">
                          <i className="ri-map-pin-line mr-1"></i> San Francisco
                        </span>
                        <span className="flex items-center">
                          <i className="ri-time-line mr-1"></i> Posted 5 days ago
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#2A9D8F] bg-opacity-10 text-[#2A9D8F] text-sm font-medium px-2 py-1 rounded">
                      47 applicants
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="bg-white border border-[#1D503A] text-[#1D503A] px-3 py-1 rounded text-sm mr-2">
                      Edit
                    </button>
                    <button className="bg-[#1D503A] text-white px-3 py-1 rounded text-sm">
                      View Applicants
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Product Designer</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="flex items-center mr-4">
                          <i className="ri-map-pin-line mr-1"></i> Remote
                        </span>
                        <span className="flex items-center">
                          <i className="ri-time-line mr-1"></i> Posted 2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#2A9D8F] bg-opacity-10 text-[#2A9D8F] text-sm font-medium px-2 py-1 rounded">
                      28 applicants
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="bg-white border border-[#1D503A] text-[#1D503A] px-3 py-1 rounded text-sm mr-2">
                      Edit
                    </button>
                    <button className="bg-[#1D503A] text-white px-3 py-1 rounded text-sm">
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-[#2A9D8F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90">
                  <i className="ri-add-line mr-1"></i> Post New Job
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Stats */}
            <motion.div 
              className="card bg-white p-6 mb-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="ri-bar-chart-box-line text-[#2A9D8F] mr-2"></i>
                Recruitment Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#2A9D8F] bg-opacity-10 flex items-center justify-center text-[#2A9D8F] mr-3">
                      <i className="ri-file-list-3-line"></i>
                    </div>
                    <span className="text-gray-700">Active Jobs</span>
                  </div>
                  <span className="text-xl font-semibold">3</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#2A9D8F] bg-opacity-10 flex items-center justify-center text-[#2A9D8F] mr-3">
                      <i className="ri-user-received-line"></i>
                    </div>
                    <span className="text-gray-700">Total Applicants</span>
                  </div>
                  <span className="text-xl font-semibold">87</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#2A9D8F] bg-opacity-10 flex items-center justify-center text-[#2A9D8F] mr-3">
                      <i className="ri-user-star-line"></i>
                    </div>
                    <span className="text-gray-700">Shortlisted</span>
                  </div>
                  <span className="text-xl font-semibold">12</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#2A9D8F] bg-opacity-10 flex items-center justify-center text-[#2A9D8F] mr-3">
                      <i className="ri-user-follow-line"></i>
                    </div>
                    <span className="text-gray-700">Hired</span>
                  </div>
                  <span className="text-xl font-semibold">4</span>
                </div>
              </div>
            </motion.div>

            {/* Hiring Preferences */}
            <motion.div 
              className="card bg-white p-6 mb-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="ri-settings-line text-[#2A9D8F] mr-2"></i>
                Hiring Preferences
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Skills Priority</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-100 flex items-center px-2 py-1 rounded-md text-sm">
                      <span className="text-gray-700 mr-1">React</span>
                      <button className="text-gray-400 hover:text-red-500">×</button>
                    </div>
                    <div className="bg-gray-100 flex items-center px-2 py-1 rounded-md text-sm">
                      <span className="text-gray-700 mr-1">TypeScript</span>
                      <button className="text-gray-400 hover:text-red-500">×</button>
                    </div>
                    <div className="bg-gray-100 flex items-center px-2 py-1 rounded-md text-sm">
                      <span className="text-gray-700 mr-1">UI/UX</span>
                      <button className="text-gray-400 hover:text-red-500">×</button>
                    </div>
                    <button className="bg-white border border-dashed border-gray-300 px-2 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                      + Add
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Experience Level</h4>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span className="ml-2 text-sm text-gray-700">Entry</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Mid</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Senior</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Location Preference</h4>
                  <select className="w-full border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F]">
                    <option>San Francisco, CA</option>
                    <option>Remote</option>
                    <option>New York, NY</option>
                    <option>No Preference</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Matching Algorithm Preference</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="algorithm" className="text-[#2A9D8F] focus:ring-[#2A9D8F]" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Balanced (Skills + Experience)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="algorithm" className="text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span className="ml-2 text-sm text-gray-700">Skills-focused</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="algorithm" className="text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span className="ml-2 text-sm text-gray-700">Experience-focused</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-[#1D503A] text-white mt-6 py-2 rounded-md font-medium hover:bg-opacity-90">
                Save Preferences
              </button>
            </motion.div>

            {/* Subscription Plan */}
            <motion.div 
              className="card bg-white p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="ri-vip-crown-line text-[#2A9D8F] mr-2"></i>
                Subscription Plan
              </h3>
              
              <div className="bg-[#2A9D8F] bg-opacity-10 rounded-lg p-4 text-center">
                <span className="inline-block bg-[#2A9D8F] text-white text-xs font-medium px-2 py-1 rounded-full mb-2">
                  CURRENT PLAN
                </span>
                <h4 className="text-lg font-semibold text-[#1D503A]">Business Pro</h4>
                <p className="text-gray-700 text-sm mt-1">$99/month</p>
                <ul className="mt-3 text-sm space-y-2 text-left pl-2">
                  <li className="flex items-center">
                    <i className="ri-check-line text-[#2A9D8F] mr-2"></i>
                    Unlimited job postings
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-[#2A9D8F] mr-2"></i>
                    AI candidate matching
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-[#2A9D8F] mr-2"></i>
                    Advanced analytics
                  </li>
                </ul>
                <button className="mt-4 bg-white border border-[#1D503A] text-[#1D503A] px-3 py-1 rounded text-sm font-medium">
                  Manage Subscription
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfile;
