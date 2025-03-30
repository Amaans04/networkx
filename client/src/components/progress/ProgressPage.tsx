import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const ProgressPage = () => {
  const { progressStats } = useAppContext();
  const [timeFrame, setTimeFrame] = useState<string>("month");
  const isMobile = useIsMobile();

  // Mock data for progress tracking
  const mockProgressData = {
    points: 1250,
    level: 8,
    rank: 347,
    totalUsers: 5824,
    badges: [
      { name: "Resume Master", icon: "file-text", description: "Created a perfect resume", earned: true },
      { name: "Networking Pro", icon: "user-add", description: "Connected with 50+ professionals", earned: true },
      { name: "Skill Builder", icon: "tools", description: "Completed 10 skill assessments", earned: true },
      { name: "Industry Insider", icon: "building", description: "Participated in 5 industry discussions", earned: true },
      { name: "Content Creator", icon: "edit", description: "Shared 3 resources with the community", earned: false },
      { name: "Challenge Champion", icon: "trophy", description: "Completed 3 skill challenges", earned: false }
    ],
    activityHistory: {
      weekly: [
        { label: "Mon", points: 45 },
        { label: "Tue", points: 65 },
        { label: "Wed", points: 30 },
        { label: "Thu", points: 85 },
        { label: "Fri", points: 70 },
        { label: "Sat", points: 20 },
        { label: "Sun", points: 35 }
      ],
      monthly: [
        { label: "Week 1", points: 180 },
        { label: "Week 2", points: 220 },
        { label: "Week 3", points: 150 },
        { label: "Week 4", points: 320 },
        { label: "Week 5", points: 280 },
        { label: "Week 6", points: 100 }
      ],
      yearly: [
        { label: "Jan", points: 420 },
        { label: "Feb", points: 380 },
        { label: "Mar", points: 520 },
        { label: "Apr", points: 480 },
        { label: "May", points: 650 },
        { label: "Jun", points: 580 },
        { label: "Jul", points: 620 },
        { label: "Aug", points: 710 },
        { label: "Sep", points: 590 },
        { label: "Oct", points: 730 },
        { label: "Nov", points: 680 },
        { label: "Dec", points: 430 }
      ]
    },
    growthClusters: [
      { name: "Resume Builders", members: 124, avgGrowth: "+15%" },
      { name: "Frontend Developers", members: 256, avgGrowth: "+22%" },
      { name: "Career Changers", members: 187, avgGrowth: "+18%" },
      { name: "Industry Veterans", members: 93, avgGrowth: "+8%" }
    ],
    recentActivities: [
      { action: "Completed React Skill Assessment", points: 75, date: "2 days ago" },
      { action: "Shared a resource on TypeScript", points: 30, date: "3 days ago" },
      { action: "Participated in Work-Life Balance discussion", points: 25, date: "5 days ago" },
      { action: "Updated professional profile", points: 40, date: "1 week ago" },
      { action: "Shortlisted 3 job positions", points: 15, date: "1 week ago" }
    ]
  };

  // Top performers (leaderboard)
  const topPerformers = [
    { name: "Growth Leader", points: 2450, avatar: "👩‍💻", growth: "+125 pts this week" },
    { name: "Networking Pro", points: 2180, avatar: "👨‍💼", growth: "+95 pts this week" },
    { name: "Resource Guru", points: 1970, avatar: "👩‍🏫", growth: "+85 pts this week" },
    { name: "Career Dev", points: 1780, avatar: "👨‍🔧", growth: "+70 pts this week" },
    { name: "Job Hunter", points: 1650, avatar: "👩‍🚀", growth: "+65 pts this week" }
  ];

  // Progress goals
  const progressGoals = [
    { name: "Complete 5 Skill Assessments", progress: 60, target: 5, current: 3 },
    { name: "Share 3 Industry Resources", progress: 33, target: 3, current: 1 },
    { name: "Apply to 10 Relevant Jobs", progress: 70, target: 10, current: 7 },
    { name: "Join 2 Growth Clusters", progress: 50, target: 2, current: 1 }
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EE]">
      <Header 
        type="job-seeker" 
        activePage="progress" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D503A] mb-3">Progress Tracking & Growth</h1>
          <p className="text-gray-600 md:text-lg">
            Track your professional development, earn rewards, and benchmark your progress.
          </p>
        </motion.div>
        
        {/* Profile Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {/* Level & Points */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center md:col-span-1"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-20 h-20 rounded-full bg-[#1D503A] flex items-center justify-center text-white text-3xl font-bold mb-3">
              {mockProgressData.level}
            </div>
            <h3 className="text-lg font-bold text-gray-800">Your Level</h3>
            <p className="text-gray-600 text-sm">Next level: {mockProgressData.level + 1}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
              <div 
                className="bg-[#2A9D8F] h-2.5 rounded-full" 
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">350 points to next level</p>
          </motion.div>
          
          {/* Total Points */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 md:col-span-1"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Total Points</h3>
              <i className="ri-award-line text-2xl text-[#E9C46A]"></i>
            </div>
            <div className="text-3xl font-bold text-[#1D503A]">{mockProgressData.points}</div>
            <p className="text-sm text-[#2A9D8F] mt-1">+185 points this week</p>
            <div className="mt-3 text-sm text-gray-500">
              <div className="flex justify-between items-center">
                <span>Network Rank</span>
                <span className="font-medium text-gray-800">#{mockProgressData.rank}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span>Percentile</span>
                <span className="font-medium text-gray-800">Top {Math.round((mockProgressData.rank / mockProgressData.totalUsers) * 100)}%</span>
              </div>
            </div>
          </motion.div>
          
          {/* Growth Clusters */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 md:col-span-2"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Your Growth Clusters</h3>
              <button className="text-[#2A9D8F] text-sm font-medium">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockProgressData.growthClusters.slice(0, 4).map((cluster, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 text-sm">{cluster.name}</h4>
                  <div className="flex justify-between items-center mt-1 text-xs">
                    <span className="text-gray-500">{cluster.members} members</span>
                    <span className="text-[#2A9D8F] font-medium">{cluster.avgGrowth}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-[#1D503A] bg-opacity-10 text-[#1D503A] py-2 rounded-lg text-sm font-medium">
              Join More Clusters
            </button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Progress Goals */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 lg:col-span-2"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Progress Goals</h3>
              <button className="text-[#2A9D8F] text-sm font-medium">Set New Goal</button>
            </div>
            <div className="space-y-4">
              {progressGoals.map((goal, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{goal.name}</h4>
                    <span className="text-sm text-gray-500">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-[#2A9D8F] h-2.5 rounded-full" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Badges */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 lg:col-span-1"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Badges Earned</h3>
              <span className="text-sm text-gray-500">
                {mockProgressData.badges.filter(b => b.earned).length}/{mockProgressData.badges.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockProgressData.badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`${
                    badge.earned 
                      ? 'bg-[#1D503A] bg-opacity-10 text-[#1D503A]' 
                      : 'bg-gray-100 text-gray-400'
                  } rounded-lg p-3 flex flex-col items-center text-center`}
                >
                  <i className={`ri-${badge.icon}-line text-2xl mb-2`}></i>
                  <h4 className="font-medium text-sm">{badge.name}</h4>
                  <p className="text-xs mt-1">{badge.earned ? 'Earned' : 'Locked'}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity History */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 lg:col-span-2"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Activity History</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTimeFrame("week")}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                    timeFrame === 'week' 
                      ? 'bg-[#1D503A] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeFrame("month")}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                    timeFrame === 'month' 
                      ? 'bg-[#1D503A] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setTimeFrame("year")}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                    timeFrame === 'year' 
                      ? 'bg-[#1D503A] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
            
            {/* Enhanced bar chart with animation */}
            <div className="h-64 relative">
              <div className="absolute top-0 left-0 right-0 border-b border-gray-200 text-xs text-gray-400">Max</div>
              <div className="absolute top-1/4 left-0 right-0 border-b border-dashed border-gray-200 text-xs text-gray-400">
                {timeFrame === 'week' ? '75%' : timeFrame === 'month' ? '75%' : '75%'}
              </div>
              <div className="absolute top-1/2 left-0 right-0 border-b border-dashed border-gray-200 text-xs text-gray-400">
                {timeFrame === 'week' ? '50%' : timeFrame === 'month' ? '50%' : '50%'}
              </div>
              <div className="absolute top-3/4 left-0 right-0 border-b border-dashed border-gray-200 text-xs text-gray-400">
                {timeFrame === 'week' ? '25%' : timeFrame === 'month' ? '25%' : '25%'}
              </div>
              
              <div className="h-full flex items-end space-x-1 pt-6 px-2">
                {/* Display data based on selected timeFrame */}
                {(timeFrame === 'week' 
                  ? mockProgressData.activityHistory.weekly 
                  : timeFrame === 'month' 
                    ? mockProgressData.activityHistory.monthly 
                    : mockProgressData.activityHistory.yearly
                ).map((data, index) => {
                  // Calculate max value for the selected time period
                  const maxValue = Math.max(
                    ...timeFrame === 'week' 
                      ? mockProgressData.activityHistory.weekly.map(d => d.points) 
                      : timeFrame === 'month' 
                        ? mockProgressData.activityHistory.monthly.map(d => d.points) 
                        : mockProgressData.activityHistory.yearly.map(d => d.points)
                  );
                  
                  // Calculate percentage height
                  const heightPercentage = (data.points / maxValue) * 100;
                  
                  // Generate a gradient color based on the percentage
                  const colorStart = '#2A9D8F';
                  const colorEnd = '#1D503A';
                  
                  return (
                    <motion.div 
                      key={index} 
                      className="flex-1 flex flex-col items-center justify-end"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: `${heightPercentage}%`, 
                        opacity: 1 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.05,
                        ease: "easeOut" 
                      }}
                    >
                      <div 
                        className="w-full rounded-t-lg relative group cursor-pointer"
                        style={{ 
                          height: "100%",
                          background: `linear-gradient(to top, ${colorStart}, ${colorEnd})`,
                        }}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.points} points
                        </div>
                      </div>
                      <div className="text-xs mt-2 text-gray-500 font-medium">{data.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-8 mb-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Recent Activities</h4>
                <div className="text-sm text-[#2A9D8F]">
                  {timeFrame === 'week' 
                    ? mockProgressData.activityHistory.weekly.reduce((sum, item) => sum + item.points, 0)
                    : timeFrame === 'month'
                      ? mockProgressData.activityHistory.monthly.reduce((sum, item) => sum + item.points, 0)
                      : mockProgressData.activityHistory.yearly.reduce((sum, item) => sum + item.points, 0)
                  } points total
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#2A9D8F] to-[#1D503A]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              {mockProgressData.recentActivities.map((activity, index) => (
                <motion.div 
                  key={index} 
                  className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <span className="text-gray-800">{activity.action}</span>
                    <span className="text-gray-400 ml-2">{activity.date}</span>
                  </div>
                  <span className="text-[#2A9D8F] font-medium">+{activity.points} pts</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Leaderboard */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 lg:col-span-1"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Leaderboard</h3>
              <button className="text-[#2A9D8F] text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <span className="text-xl">{performer.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <span className={`font-medium ${index === 0 ? 'text-[#E9C46A]' : 'text-gray-800'}`}>
                          {index + 1}. {performer.name}
                        </span>
                        <p className="text-xs text-[#2A9D8F]">{performer.growth}</p>
                      </div>
                      <span className="font-bold text-gray-800">{performer.points}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#1D503A] rounded-full flex items-center justify-center text-white text-sm mr-3">
                  You
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium text-gray-800">
                        {mockProgressData.rank}. You
                      </span>
                      <p className="text-xs text-[#2A9D8F]">+185 pts this week</p>
                    </div>
                    <span className="font-bold text-gray-800">{mockProgressData.points}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProgressPage; 