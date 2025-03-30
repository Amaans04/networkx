import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLocation } from 'wouter';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { mockInterviews } from '../../lib/mockData';
import { ScrollArea } from '../ui/scroll-area';
import { 
  ArrowLeft, 
  CheckCircle, 
  ChevronRight,
  Lightbulb,
  ClipboardList,
  RotateCw,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterviewQuestion, MockInterview } from '../../types';

// Change badge colors
const difficultyBadgeColor = {
  'beginner': 'bg-emerald-100 text-[#1D503A]',
  'intermediate': 'bg-amber-100 text-[#1D503A]',
  'advanced': 'bg-rose-100 text-[#1D503A]'
};

const MockInterviewSession: React.FC = () => {
  const { mockInterviews, activeInterviewId, completeMockInterview, setCurrentPage } = useAppContext();
  const [, setLocation] = useLocation();
  
  // Find the active interview based on the active interview ID in the app state
  const activeInterview = mockInterviews.find(
    interview => interview.id === activeInterviewId
  ) || mockInterviews[0]; // Fallback to first interview if none active
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showTips, setShowTips] = useState<Record<string, boolean>>({});
  const [showSampleAnswer, setShowSampleAnswer] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, { score: number, feedback: string }>>({});
  const [overallScore, setOverallScore] = useState(0);
  const [overallFeedback, setOverallFeedback] = useState('');
  
  // Current question
  const currentQuestion = activeInterview?.questions[currentQuestionIndex];
  
  // Question breakdown section styling update
  const cardHeader = {
    normal: "text-[#1D503A] bg-[#1D503A]/5",
    alternate: "text-[#2A9D8F] bg-[#2A9D8F]/5"
  };
  
  // Handle answering a question
  const handleAnswerSubmit = () => {
    if (!currentQuestion) return;
    
    // Save the current answer
    const updatedAnswers = { ...userAnswers, [currentQuestion.id]: currentAnswer };
    setUserAnswers(updatedAnswers);
    
    // Simulate feedback generation
    setIsSubmitting(true);
    
    // Simulate API delay for feedback generation
    setTimeout(() => {
      // Generate mock feedback - in a real app this would come from an API
      const questionScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      const questionFeedback = generateMockFeedback(questionScore);
      
      const updatedFeedback = { 
        ...feedback, 
        [currentQuestion.id]: { 
          score: questionScore, 
          feedback: questionFeedback 
        } 
      };
      setFeedback(updatedFeedback);
      setIsSubmitting(false);
      
      // Show tips and sample answer automatically after submission
      setShowTips({...showTips, [currentQuestion.id]: true});
    }, 1500);
  };
  
  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeInterview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else {
      completeInterview();
    }
  };
  
  // Complete the interview
  const completeInterview = () => {
    // Calculate overall score from individual question scores
    const scores = Object.values(feedback).map(f => f.score);
    const avgScore = scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) 
      : 0;
    
    setOverallScore(avgScore);
    setOverallFeedback(generateOverallFeedback(avgScore));
    setIsCompleted(true);
    
    // Update app state
    if (activeInterview) {
      completeMockInterview(activeInterview.id, {
        score: avgScore,
        feedback: generateOverallFeedback(avgScore),
        completedOn: new Date().toISOString()
      });
    }
  };
  
  // Go back to main mock interview page
  const handleBackToInterviews = () => {
    setCurrentPage('mock-interview');
    setLocation('/mock-interview');
  };
  
  // Mock feedback generator
  const generateMockFeedback = (score: number) => {
    if (score >= 90) {
      return "Excellent answer! You've clearly articulated your points with strong examples that highlight your skills and experience. Your structure was logical and easy to follow.";
    } else if (score >= 80) {
      return "Good answer with clear examples. Consider adding more specific metrics or results to strengthen your response. Your structure was good but could be slightly more concise.";
    } else if (score >= 70) {
      return "Solid answer that addresses the question. To improve, provide more concrete examples and ensure you're fully addressing all aspects of the question. Work on being more concise while still being thorough.";
    } else {
      return "Your answer addresses the basic question, but needs more specific examples and structure. Try using the STAR method (Situation, Task, Action, Result) for behavioral questions to better organize your thoughts.";
    }
  };
  
  // Mock overall feedback generator
  const generateOverallFeedback = (score: number) => {
    if (score >= 90) {
      return "Outstanding interview performance! You demonstrated excellent communication skills, provided strong examples, and showed deep knowledge in your field. You're well-prepared for real interviews.";
    } else if (score >= 80) {
      return "Very good interview performance. You communicated clearly and provided good examples. To improve further, focus on being more concise and quantifying your achievements where possible.";
    } else if (score >= 70) {
      return "Good interview performance. You addressed most questions adequately. To improve, practice structuring your answers more clearly and provide more specific, measurable results in your examples.";
    } else {
      return "You've made a good start with your interview skills. Focus on preparing more structured answers using frameworks like STAR, providing specific examples from your experience, and practicing concise delivery of your key points.";
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = 
    ((currentQuestionIndex + (Object.keys(feedback).includes(currentQuestion?.id || '') ? 1 : 0)) / 
    activeInterview.questions.length) * 100;
  
  if (!activeInterview) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">No interview selected</h2>
        <Button onClick={handleBackToInterviews}>Back to Interviews</Button>
      </div>
    );
  }
  
  // Interview completed view styling
  if (isCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 bg-gradient-to-br from-[#1D503A]/5 to-[#2A9D8F]/5 border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-[#1D503A]">
                <CheckCircle className="h-6 w-6 text-[#2A9D8F] mr-2" />
                Interview Completed!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-[#1D503A]">Your Overall Score</h3>
                <div className="flex items-center">
                  <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center shadow-sm border border-[#1D503A]/10">
                    <span className="text-3xl font-bold text-[#1D503A]">{overallScore}</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="font-medium text-[#1D503A]">
                      {overallScore >= 90 ? 'Excellent!' : 
                       overallScore >= 80 ? 'Very Good!' : 
                       overallScore >= 70 ? 'Good' : 'Developing'}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      You're {overallScore >= 80 ? 'well prepared' : 'on your way'} for real interviews!
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#1D503A]">Feedback Summary</h3>
                <p className="text-gray-700">{overallFeedback}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBackToInterviews} className="mr-4 bg-[#1D503A] hover:bg-[#1D503A]/90">
                Back to Interviews
              </Button>
              <Button variant="outline" className="border-[#1D503A] text-[#1D503A] hover:bg-[#1D503A]/10" onClick={() => window.print()}>
                Save Results
              </Button>
            </CardFooter>
          </Card>
          
          <h3 className="text-xl font-bold mb-4 text-[#1D503A]">Question Breakdown</h3>
          <div className="space-y-4">
            {activeInterview.questions.map((question, index) => (
              <Card key={question.id} className="border border-gray-200">
                <CardHeader className={index % 2 === 0 ? cardHeader.normal : cardHeader.alternate}>
                  <CardTitle className="text-base font-medium flex justify-between">
                    <div>Question {index + 1}: {question.category}</div>
                    <div className="text-inherit">
                      {feedback[question.id]?.score || 'N/A'}/100
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">{question.question}</p>
                  <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                    <p className="font-semibold mb-1">Your Answer:</p>
                    <p className="text-gray-700">{userAnswers[question.id] || 'No answer provided'}</p>
                  </div>
                  {feedback[question.id] && (
                    <div className="mt-3 p-3 bg-[#1D503A]/5 rounded-md text-sm">
                      <p className="font-semibold mb-1 text-[#1D503A]">Feedback:</p>
                      <p className="text-gray-700">{feedback[question.id].feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Regular interview view
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBackToInterviews}
          className="mr-4 text-[#1D503A] hover:text-[#1D503A]/90 hover:bg-[#1D503A]/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1D503A]">
            {activeInterview.title}
          </h1>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Badge className={`mr-2 ${difficultyBadgeColor[activeInterview.difficulty]}`}>
              {activeInterview.difficulty.charAt(0).toUpperCase() + activeInterview.difficulty.slice(1)}
            </Badge>
            <span className="mr-4">{activeInterview.duration} mins</span>
            <span>{activeInterview.questions.length} questions</span>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-8">
        <Progress value={progressPercentage} className="h-2 bg-gray-100 [&>div]:bg-[#1D503A]" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Question {currentQuestionIndex + 1} of {activeInterview.questions.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Current question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion?.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6 border-[#1D503A]/10">
                <CardHeader className="border-b border-[#1D503A]/10">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-[#1D503A]/10 text-[#1D503A]">
                      {currentQuestion?.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-2 text-[#1D503A]">
                    {currentQuestion?.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {!feedback[currentQuestion?.id || ''] ? (
                    <>
                      <Textarea 
                        placeholder="Type your answer here..."
                        className="min-h-[200px] mb-4 focus:border-[#1D503A] focus:ring-[#1D503A]"
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                      />
                      <Button 
                        className="w-full bg-[#1D503A] hover:bg-[#1D503A]/90" 
                        onClick={handleAnswerSubmit}
                        disabled={!currentAnswer.trim() || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing your answer...
                          </>
                        ) : (
                          'Submit Answer'
                        )}
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-[#1D503A]">Your Answer</h3>
                          <Badge className="bg-[#1D503A]/10 text-[#1D503A]">
                            Score: {feedback[currentQuestion?.id || '']?.score}/100
                          </Badge>
                        </div>
                        <p className="text-gray-700">{userAnswers[currentQuestion?.id || '']}</p>
                      </div>
                      
                      <div className="p-4 bg-[#1D503A]/5 rounded-lg">
                        <h3 className="font-medium mb-2 text-[#1D503A]">Feedback</h3>
                        <p className="text-gray-700">{feedback[currentQuestion?.id || '']?.feedback}</p>
                      </div>
                      
                      <div>
                        <Button
                          variant="outline"
                          className="w-full justify-between mb-2 text-[#1D503A] border-[#1D503A]/20 hover:bg-[#1D503A]/5 hover:text-[#1D503A]/90"
                          onClick={() => setShowTips({
                            ...showTips, 
                            [currentQuestion?.id || '']: !showTips[currentQuestion?.id || '']
                          })}
                        >
                          <div className="flex items-center">
                            <Lightbulb className="h-4 w-4 mr-2 text-[#2A9D8F]" />
                            <span>Tips for improvement</span>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-transform ${
                            showTips[currentQuestion?.id || ''] ? 'rotate-90' : ''
                          }`} />
                        </Button>
                        
                        {showTips[currentQuestion?.id || ''] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-[#2A9D8F]/10 rounded-lg mb-2"
                          >
                            <h4 className="font-medium mb-2 text-[#2A9D8F]">Key Tips</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {currentQuestion?.tips.map((tip, index) => (
                                <li key={index} className="text-gray-700">{tip}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                        
                        <Button
                          variant="outline"
                          className="w-full justify-between text-[#1D503A] border-[#1D503A]/20 hover:bg-[#1D503A]/5 hover:text-[#1D503A]/90"
                          onClick={() => setShowSampleAnswer({
                            ...showSampleAnswer, 
                            [currentQuestion?.id || '']: !showSampleAnswer[currentQuestion?.id || '']
                          })}
                        >
                          <div className="flex items-center">
                            <ClipboardList className="h-4 w-4 mr-2 text-[#2A9D8F]" />
                            <span>View sample answer</span>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-transform ${
                            showSampleAnswer[currentQuestion?.id || ''] ? 'rotate-90' : ''
                          }`} />
                        </Button>
                        
                        {showSampleAnswer[currentQuestion?.id || ''] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-[#1D503A]/10 rounded-lg mt-2"
                          >
                            <div className="mb-4">
                              <h4 className="font-medium mb-2 text-[#1D503A]">Sample Answer</h4>
                              <p className="text-gray-700">
                                {currentQuestion?.sampleAnswer || 
                                "A well-structured answer would address the key concepts in this question while providing specific examples from your experience."}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2 text-[#1D503A]">Key Points</h4>
                              <div className="flex flex-wrap gap-2">
                                {currentQuestion?.keypoints?.map((point, index) => (
                                  <Badge key={index} variant="outline" className="bg-white border-[#1D503A]/20 text-[#1D503A]">
                                    {point}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
                
                {feedback[currentQuestion?.id || ''] && (
                  <CardFooter className="border-t border-[#1D503A]/10 bg-[#1D503A]/5">
                    <Button 
                      className="w-full bg-[#1D503A] hover:bg-[#1D503A]/90"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestionIndex < activeInterview.questions.length - 1 ? (
                        <>Next Question<ChevronRight className="ml-2 h-4 w-4" /></>
                      ) : (
                        <>Complete Interview<CheckCircle className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Sidebar */}
        <div>
          <div className="bg-[#1D503A]/5 rounded-lg p-4 sticky top-4">
            <h3 className="font-medium mb-3 text-[#1D503A]">Interview Information</h3>
            <p className="text-gray-600 text-sm mb-4">{activeInterview.description}</p>
            
            <h4 className="font-medium text-sm mb-2 text-[#1D503A]">Question Progress</h4>
            <ScrollArea className="h-[140px] pr-4 mb-4">
              <ol className="space-y-2">
                {activeInterview.questions.map((q, idx) => (
                  <li 
                    key={q.id} 
                    className={`flex items-center text-sm ${
                      idx === currentQuestionIndex ? 'text-[#1D503A] font-medium' : 
                      idx < currentQuestionIndex ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <span className="flex-none mr-2">
                      {idx < currentQuestionIndex ? (
                        <CheckCircle className="h-4 w-4 text-[#2A9D8F]" />
                      ) : idx === currentQuestionIndex ? (
                        <span className="flex items-center justify-center h-4 w-4 rounded-full bg-[#1D503A]/10 text-[#1D503A] text-xs">{idx + 1}</span>
                      ) : (
                        <span className="flex items-center justify-center h-4 w-4 rounded-full bg-gray-200 text-gray-600 text-xs">{idx + 1}</span>
                      )}
                    </span>
                    <span className="truncate">{q.question.length > 50 ? q.question.substring(0, 50) + '...' : q.question}</span>
                  </li>
                ))}
              </ol>
            </ScrollArea>
            
            <h4 className="font-medium text-sm mb-2 text-[#1D503A]">Tips for Success</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li className="flex items-start">
                <span className="text-[#2A9D8F] mr-2">•</span> 
                Take a moment to structure your thoughts before answering
              </li>
              <li className="flex items-start">
                <span className="text-[#2A9D8F] mr-2">•</span> 
                Use the STAR method for behavioral questions
              </li>
              <li className="flex items-start">
                <span className="text-[#2A9D8F] mr-2">•</span> 
                Provide specific examples from your experience
              </li>
              <li className="flex items-start">
                <span className="text-[#2A9D8F] mr-2">•</span> 
                Keep your answers concise and focused
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewSession; 