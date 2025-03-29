import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hiringUpdates } from "@/lib/mockData";
import { HiringUpdate } from "@/types";

const LiveUpdates = () => {
  const [updates, setUpdates] = useState<HiringUpdate[]>(hiringUpdates);
  const [notification, setNotification] = useState<HiringUpdate | null>(null);
  const [newUpdates, setNewUpdates] = useState<string[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Generate a new random update
  const generateRandomUpdate = (): HiringUpdate => {
    const companies = ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Tesla", "Netflix"];
    const positions = ["Frontend Developer", "UX Designer", "Product Manager", "Backend Engineer", "Data Scientist"];
    const names = ["Alex Smith", "Jordan Lee", "Taylor Kim", "Jamie Wong", "Casey Parker", "Morgan Chen"];
    
    return {
      id: `update-${Date.now()}`,
      name: names[Math.floor(Math.random() * names.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      timeAgo: "just now"
    };
  };

  // Simulate real-time updates appearing frequently
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a new update
      const newUpdate = generateRandomUpdate();
      
      // Update the list with the new update at the top
      setUpdates(prev => [newUpdate, ...prev.slice(0, 5)]);
      
      // Mark the new update as unread
      setNewUpdates(prev => [...prev, newUpdate.id]);
      
      // Show notification
      setNotification(newUpdate);
      setUpdateCounter(prev => prev + 1);
      
      // Hide notification after delay
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      
    }, 7000); // More frequent updates - every 7 seconds

    return () => clearInterval(interval);
  }, []);

  // Mark update as read
  const markAsRead = (id: string) => {
    setNewUpdates(prev => prev.filter(updateId => updateId !== id));
  };

  return (
    <>
      <motion.div 
        className="card bg-white p-6 rounded-xl relative mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <i className="ri-live-line text-[#2A9D8F] mr-2"></i>
            Live Hiring Updates
          </h3>
          
          {newUpdates.length > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {newUpdates.length}
            </motion.div>
          )}
        </div>
        
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {updates.map((update) => (
              <motion.div 
                key={update.id} 
                className={`bg-gray-50 p-3 rounded-lg text-sm relative ${newUpdates.includes(update.id) ? 'border-l-4 border-[#2A9D8F]' : ''}`}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                transition={{ duration: 0.3 }}
                onClick={() => markAsRead(update.id)}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#2A9D8F] bg-opacity-20 flex items-center justify-center text-[#2A9D8F] mr-2">
                    <i className="ri-user-add-line"></i>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">{update.name}</span> was hired as{" "}
                      <span className="font-medium">{update.position}</span> at{" "}
                      <span className="font-medium">{update.company}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{update.timeAgo}</p>
                  </div>
                </div>
                
                {newUpdates.includes(update.id) && (
                  <div className="absolute top-2 right-2">
                    <motion.div 
                      className="h-3 w-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Live Hiring Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="relative h-10 w-10 rounded-full bg-[#2A9D8F] bg-opacity-20 flex items-center justify-center text-[#2A9D8F] mr-3">
                <i className="ri-user-add-line"></i>
                <motion.div 
                  className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div>
                <p className="font-medium">New Hire!</p>
                <p className="text-sm text-gray-600">
                  {notification.name} was just hired as {notification.position} at {notification.company}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveUpdates;
