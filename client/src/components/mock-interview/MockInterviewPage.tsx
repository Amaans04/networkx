import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { HiOutlineClipboardCheck, HiOutlineClock } from 'react-icons/hi';
import { FaRegLightbulb } from 'react-icons/fa';

// Mock data for interviews
const mockInterviews = [
  {
    id: "interview1",
    title: "Frontend Developer Interview",
    description: "Practice common React and JavaScript questions for frontend roles",
    category: "technical",
    difficulty: "intermediate",
    questions: [
      { id: "q1", text: "Explain the concept of virtual DOM in React." },
      { id: "q2", text: "What are closures in JavaScript?" },
      { id: "q3", text: "Describe the difference between controlled and uncontrolled components." }
    ],
    duration: 30
  },
  {
    id: "interview2",
    title: "Behavioral Interview",
    description: "Practice answering questions about your work experience and collaboration skills",
    category: "behavioral",
    difficulty: "beginner",
    questions: [
      { id: "q1", text: "Tell me about a challenging project you worked on." },
      { id: "q2", text: "How do you handle conflicts in a team?" },
      { id: "q3", text: "Describe a situation when you had to meet a tight deadline." }
    ],
    duration: 25
  },
  {
    id: "interview3",
    title: "System Design Challenge",
    description: "Practice designing scalable systems and architecture",
    category: "system design",
    difficulty: "advanced",
    questions: [
      { id: "q1", text: "Design a URL shortening service like bit.ly." },
      { id: "q2", text: "How would you design Twitter's backend?" },
      { id: "q3", text: "Design a distributed cache system." }
    ],
    duration: 45
  }
];

// Definition of difficulty colors
const difficultyColors = {
  beginner: "bg-emerald-100 text-[#1D503A]",
  intermediate: "bg-amber-100 text-[#1D503A]",
  advanced: "bg-rose-100 text-[#1D503A]"
};

export default function MockInterviewPage() {
  const { mockInterviews, startMockInterview, setCurrentPage } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  
  // Use context interviews if available, otherwise use mock data
  const interviews = mockInterviews?.length ? mockInterviews : mockInterviews;
  
  // Filter interviews based on active tab and difficulty
  const filteredInterviews = interviews.filter(interview => {
    const categoryMatch = activeTab === "all" || interview.category === activeTab;
    const difficultyMatch = activeDifficulty === "all" || interview.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });
  
  // Handle starting an interview
  const handleStartInterview = (interviewId: string) => {
    startMockInterview(interviewId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-[#1D503A]">Mock Interview Practice</h1>
      <p className="text-gray-600 mb-8">
        Enhance your interview skills with our AI-powered mock interviews. Practice with realistic questions and receive feedback.
      </p>
      
      {/* Filter tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            onClick={() => setActiveTab("all")}
            variant={activeTab === "all" ? "default" : "outline"}
            size="sm"
            className={activeTab === "all" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "text-[#1D503A] hover:text-[#1D503A]/90"}
          >
            All Interviews
          </Button>
          <Button 
            onClick={() => setActiveTab("technical")}
            variant={activeTab === "technical" ? "default" : "outline"}
            size="sm"
            className={activeTab === "technical" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "text-[#1D503A] hover:text-[#1D503A]/90"}
          >
            Technical
          </Button>
          <Button 
            onClick={() => setActiveTab("behavioral")}
            variant={activeTab === "behavioral" ? "default" : "outline"}
            size="sm"
            className={activeTab === "behavioral" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "text-[#1D503A] hover:text-[#1D503A]/90"}
          >
            Behavioral
          </Button>
          <Button 
            onClick={() => setActiveTab("system design")}
            variant={activeTab === "system design" ? "default" : "outline"}
            size="sm"
            className={activeTab === "system design" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "text-[#1D503A] hover:text-[#1D503A]/90"}
          >
            System Design
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setActiveDifficulty("all")}
            variant={activeDifficulty === "all" ? "default" : "outline"}
            size="sm"
            className={activeDifficulty === "all" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "text-[#1D503A] hover:text-[#1D503A]/90"}
          >
            All Levels
          </Button>
          <Button
            onClick={() => setActiveDifficulty("beginner")}
            variant={activeDifficulty === "beginner" ? "default" : "outline"}
            size="sm"
            className={activeDifficulty === "beginner" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "bg-emerald-50 text-[#1D503A] hover:bg-emerald-100"}
          >
            Beginner
          </Button>
          <Button
            onClick={() => setActiveDifficulty("intermediate")}
            variant={activeDifficulty === "intermediate" ? "default" : "outline"}
            size="sm"
            className={activeDifficulty === "intermediate" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "bg-amber-50 text-[#1D503A] hover:bg-amber-100"}
          >
            Intermediate
          </Button>
          <Button
            onClick={() => setActiveDifficulty("advanced")}
            variant={activeDifficulty === "advanced" ? "default" : "outline"}
            size="sm"
            className={activeDifficulty === "advanced" ? "bg-[#1D503A] hover:bg-[#1D503A]/90" : "bg-rose-50 text-[#1D503A] hover:bg-rose-100"}
          >
            Advanced
          </Button>
        </div>
      </div>
      
      {/* Interview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#1D503A]">{interview.title}</h3>
                <Badge className={difficultyColors[interview.difficulty]}>
                  {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">{interview.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="flex items-center mr-4">
                  <HiOutlineClipboardCheck className="mr-1 text-[#1D503A]" />
                  {interview.questions.length} Questions
                </span>
                <span className="flex items-center">
                  <HiOutlineClock className="mr-1 text-[#1D503A]" />
                  {interview.duration} min
                </span>
              </div>
              <Button 
                onClick={() => handleStartInterview(interview.id)} 
                className="w-full bg-[#1D503A] hover:bg-[#1D503A]/90"
              >
                Start Interview
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Recent interviews section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#1D503A]">Your Recent Interviews</h2>
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500">You haven't completed any mock interviews yet.</p>
          <p className="text-sm text-gray-400 mt-1">Start practicing to see your progress here.</p>
        </div>
      </div>
      
      {/* Tips section */}
      <div className="mt-12 bg-gradient-to-r from-[#1D503A]/10 to-[#2A9D8F]/10 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-[#1D503A]">Interview Success Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <HiOutlineClipboardCheck className="mr-2 text-[#1D503A]" />
              Research the Company
            </h3>
            <p className="text-sm text-gray-600">
              Understand their products, culture, and recent news to demonstrate genuine interest.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <FaRegLightbulb className="mr-2 text-[#2A9D8F]" />
              Use the STAR Method
            </h3>
            <p className="text-sm text-gray-600">
              Structure answers with Situation, Task, Action, and Result for behavioral questions.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <HiOutlineClock className="mr-2 text-[#1D503A]" />
              Practice Technical Questions
            </h3>
            <p className="text-sm text-gray-600">
              Work through common algorithms and coding challenges for your role.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 