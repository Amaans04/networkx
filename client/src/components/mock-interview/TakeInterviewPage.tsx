import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import CircularProgress from '../ui/circular-progress';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function TakeInterviewPage() {
  const { mockInterviews, activeInterviewId, setCurrentPage, completeMockInterview } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{questionId: string, answer: string}[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Find the active interview
  const activeInterview = mockInterviews.find(interview => interview.id === activeInterviewId);
  
  useEffect(() => {
    if (!activeInterview) return;
    
    // Initialize the timer
    const totalSeconds = activeInterview.duration * 60;
    setTimeRemaining(totalSeconds);
    
    // Start the countdown
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [activeInterview]);
  
  if (!activeInterview) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-[#1D503A]">Interview Not Found</h2>
        <Button onClick={() => setCurrentPage('mock-interview')} className="bg-[#1D503A] hover:bg-[#1D503A]/90">
          Back to Interviews
        </Button>
      </div>
    );
  }
  
  const currentQuestion = activeInterview.questions[currentQuestionIndex];
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex].answer = e.target.value;
    } else {
      updatedAnswers.push({
        questionId: currentQuestion.id,
        answer: e.target.value
      });
    }
    
    setAnswers(updatedAnswers);
  };
  
  const getCurrentAnswer = () => {
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return answer ? answer.answer : '';
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < activeInterview.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Calculate a mock score based on answers (in a real app, this would be evaluated)
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    
    // Generate mock feedback
    const feedback = "You demonstrated good understanding of core concepts. Consider providing more specific examples in your answers to showcase your practical experience.";
    
    // Complete the interview
    completeMockInterview(activeInterview.id, {
      score,
      feedback,
      completedOn: new Date().toISOString()
    });
    
    // Redirect after a delay
    setTimeout(() => {
      setCurrentPage('mock-interview');
    }, 3000);
  };
  
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CheckCircle className="w-16 h-16 text-[#2A9D8F] mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-[#1D503A]">Interview Completed!</h2>
        <p className="text-gray-600 mb-6">Redirecting to results...</p>
      </div>
    );
  }
  
  const progressPercentage = ((currentQuestionIndex + 1) / activeInterview.questions.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentPage('mock-interview')}
          className="mr-4 text-[#1D503A] hover:text-[#1D503A]/90 hover:bg-[#1D503A]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-[#1D503A]">{activeInterview.title}</h1>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <CircularProgress 
            value={progressPercentage} 
            size={60} 
            strokeWidth={8}
            color="#1D503A" 
            label={`${currentQuestionIndex + 1}/${activeInterview.questions.length}`}
          />
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#2A9D8F]" />
          <span className={`font-mono font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-gray-800'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>
      
      <Card className="mb-6 border-[#1D503A]/20">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#1D503A]">Question {currentQuestionIndex + 1}</h3>
          <p className="text-gray-800 mb-6">{currentQuestion.question}</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer
            </label>
            <textarea
              className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1D503A] focus:border-transparent"
              placeholder="Type your answer here..."
              value={getCurrentAnswer()}
              onChange={handleAnswerChange}
            ></textarea>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="border-[#1D503A] text-[#1D503A] hover:bg-[#1D503A]/10"
        >
          Previous
        </Button>
        
        {currentQuestionIndex < activeInterview.questions.length - 1 ? (
          <Button 
            onClick={handleNext}
            className="bg-[#1D503A] hover:bg-[#1D503A]/90"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="bg-[#2A9D8F] hover:bg-[#2A9D8F]/90"
          >
            Submit Interview
          </Button>
        )}
      </div>
    </div>
  );
} 