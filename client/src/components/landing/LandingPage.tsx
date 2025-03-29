import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "wouter";
import Footer from "@/components/common/Footer";

const LandingPage = () => {
  const [, setLocation] = useLocation();
  
  // Debug function to help log navigation
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    setLocation(path);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Log that LandingPage has mounted
  useEffect(() => {
    console.log("LandingPage mounted");
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-[#FAF5EE] to-[#e6e2d8] font-inter">
      <motion.div 
        className="text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-6xl font-bold font-poppins text-[#1D503A] mb-4"
          variants={itemVariants}
        >
          NetworkX
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-700 max-w-md mx-auto"
          variants={itemVariants}
        >
          Professional networking platform connecting job seekers and employers seamlessly.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col md:flex-row gap-6 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          className="w-full bg-[#1D503A] text-white p-4 rounded-xl text-lg font-medium transition-all hover:bg-opacity-90 flex items-center justify-center gap-2"
          onClick={() => handleNavigation("/employer")}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="ri-building-line"></i>
          I'm Hiring
        </motion.button>
        <motion.button 
          className="w-full bg-[#2A9D8F] text-white p-4 rounded-xl text-lg font-medium transition-all hover:bg-opacity-90 flex items-center justify-center gap-2"
          onClick={() => handleNavigation("/job-seeker")}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="ri-user-search-line"></i>
          I'm Looking for Jobs
        </motion.button>
      </motion.div>
      
      <motion.div
        className="mt-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="text-[#1D503A] font-medium text-lg underline flex items-center justify-center gap-2 mx-auto"
          onClick={() => handleNavigation("/dashboard")}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
        >
          <i className="ri-dashboard-line"></i>
          Explore Dashboard
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="text-gray-500"
          variants={itemVariants}
        >
          Already have an account?{" "}
          <button 
            onClick={() => handleNavigation("/signin")}
            className="text-[#2A9D8F] font-medium hover:underline"
          >
            Sign In
          </button>
        </motion.p>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
