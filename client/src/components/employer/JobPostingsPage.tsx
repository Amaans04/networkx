import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import JobPostingSection from "./JobPostingSection";

const JobPostingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="employer" activePage="postings" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold font-poppins text-gray-800">Job Postings</h1>
          <p className="text-gray-600 mt-2">Manage your job postings and track applicant responses</p>
        </motion.div>

        <JobPostingSection />
      </main>
    </div>
  );
};

export default JobPostingsPage; 