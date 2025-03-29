import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D503A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NetworkX</h3>
            <p className="text-gray-300 mb-4">
              Your platform for professional networking and job opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Career Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resume Builder</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Salary Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Post a Job</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Browse Candidates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Recruitment Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p className="mb-2">© 2025 NetworkX. All rights reserved by Amaan Saify.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://github.com/Amaans04" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <i className="ri-github-fill text-xl mr-1"></i>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/amaan-saify/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <i className="ri-linkedin-fill text-xl mr-1"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 