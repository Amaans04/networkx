import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import { useState, useRef } from "react";

const CompanyProfile = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "TechCorp Inc.",
    industry: "Technology",
    size: "100-500",
    founded: "2015",
    location: "San Francisco, CA",
    website: "www.techcorp.com",
    description: "Leading technology company specializing in innovative solutions for businesses worldwide.",
    logo: "ri-building-line",
    culture: "Fast-paced, innovative, and collaborative environment focused on growth and learning.",
    benefits: [
      "Competitive salary",
      "Health insurance",
      "401(k) matching",
      "Remote work options",
      "Professional development"
    ],
    logoUrl: "" // New field for logo URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      const logoUrl = URL.createObjectURL(file);
      setCompanyInfo(prev => ({ ...prev, logoUrl }));
      
      // Here you would typically upload the file to your server
      // For now, we'll just store the local URL
      console.log("Logo uploaded:", file);
    }
  };

  const handleLogoClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="employer" activePage="company-profile" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold font-poppins text-gray-800">Company Profile</h1>
              <p className="text-gray-600 mt-2">Manage your company information and settings</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#2A9D8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 flex items-center"
            >
              <i className={`ri-${isEditing ? 'save-line' : 'edit-line'} mr-2`}></i>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Overview */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div 
                    className={`relative w-24 h-24 bg-[#2A9D8F] bg-opacity-10 rounded-lg flex items-center justify-center cursor-pointer group ${
                      isEditing ? 'hover:bg-opacity-20' : ''
                    }`}
                    onClick={handleLogoClick}
                  >
                    {companyInfo.logoUrl ? (
                      <img 
                        src={companyInfo.logoUrl} 
                        alt="Company Logo" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <i className={`${companyInfo.logo} text-3xl text-[#2A9D8F]`}></i>
                    )}
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm">Change Logo</span>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{companyInfo.name}</h3>
                    <p className="text-sm text-gray-600">{companyInfo.industry}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    <input
                      type="text"
                      value={companyInfo.size}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, size: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Founded</label>
                    <input
                      type="text"
                      value={companyInfo.founded}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, founded: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={companyInfo.location}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Company Description */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">About Us</h2>
              <textarea
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
              />
            </motion.div>

            {/* Company Culture */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Culture</h2>
              <textarea
                value={companyInfo.culture}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, culture: e.target.value }))}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
              />
            </motion.div>
          </div>

          {/* Benefits & Perks */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Benefits & Perks</h2>
              <div className="space-y-3">
                {companyInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="ri-checkbox-circle-line text-[#2A9D8F]"></i>
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...companyInfo.benefits];
                        newBenefits[index] = e.target.value;
                        setCompanyInfo(prev => ({ ...prev, benefits: newBenefits }));
                      }}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-[#2A9D8F] disabled:bg-gray-50"
                    />
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newBenefits = companyInfo.benefits.filter((_, i) => i !== index);
                          setCompanyInfo(prev => ({ ...prev, benefits: newBenefits }));
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      setCompanyInfo(prev => ({
                        ...prev,
                        benefits: [...prev.benefits, "New benefit"]
                      }));
                    }}
                    className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-600 hover:border-gray-400 flex items-center justify-center gap-2"
                  >
                    <i className="ri-add-line"></i>
                    Add Benefit
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyProfile;