import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatBubble } from '../components/ChatBubble';
import { InterviewControls } from '../components/InterviewControls';
import { FeedbackModal } from '../components/FeedbackModal';
import { IconSend, IconSparkles } from '../components/IconComponents';
import { MOCK_QUESTIONS, INTERVIEW_DURATION_SECONDS } from '../constants';
import { getInterviewFeedback } from '../services/geminiService';
import { Message, InterviewState, Feedback } from '../types';
import { Page } from '../App';

interface MockInterviewPageProps {
  onNavigate: (page: Page) => void;
}

export default function MockInterviewPage({ onNavigate }: MockInterviewPageProps) {
  const [interviewState, setInterviewState] = useState<InterviewState>('not_started');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INTERVIEW_DURATION_SECONDS);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (interviewState === 'in_progress' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && interviewState === 'in_progress') {
      endInterview();
    }
  }, [timeLeft, interviewState]);

  const startInterview = () => {
    setInterviewState('in_progress');
    setTimeLeft(INTERVIEW_DURATION_SECONDS);
    setMessages([{ sender: 'ai', text: MOCK_QUESTIONS[0] }]);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setIsFeedbackModalOpen(false);
  };
  
  const endInterview = useCallback(async () => {
    if (interviewState !== 'in_progress') return;
      
    setInterviewState('finished');
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'system', text: 'Interview finished. Generating feedback...' }]);
    
    try {
      const generatedFeedback = await getInterviewFeedback(messages);
      setFeedback(generatedFeedback);
      setIsFeedbackModalOpen(true);
    } catch (error) {
       setMessages(prev => [...prev, { sender: 'system', text: 'Sorry, there was an error generating feedback.' }]);
       console.error(error);
    } finally {
        setIsLoading(false);
    }
  }, [messages, interviewState]);


  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading || interviewState !== 'in_progress') return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    // AI "thinking" delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setMessages(prev => [...prev, { sender: 'ai', text: '...' }]);
    await new Promise(resolve => setTimeout(resolve, 1000));


    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < MOCK_QUESTIONS.length) {
      setMessages(prev => [...prev.slice(0,-1), { sender: 'ai', text: MOCK_QUESTIONS[nextQuestionIndex] }]);
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setMessages(prev => [...prev.slice(0,-1), { sender: 'ai', text: "That's all the questions I have for you. Let's wrap up." }]);
      // Use a short delay before ending to allow the user to read the final message.
      setTimeout(() => endInterview(), 1000);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCloseModal = () => {
    setIsFeedbackModalOpen(false);
    // Reset to the pre-start screen for another interview
    setInterviewState('not_started');
    setMessages([]);
  }

  if (interviewState === 'not_started') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000] p-4">
         <button onClick={() => onNavigate('dashboard')} className="absolute top-6 left-6 text-[#A9A9A9] hover:text-white transition-colors">&larr; Back to Dashboard</button>
        <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4 scroll-animate">
                <IconSparkles className="w-16 h-16 text-[#9FE2BF]" />
                <h1 className="text-5xl font-bold text-white">CareerNest</h1>
            </div>
            <p className="text-xl text-[#CCCCCC] mb-2 scroll-animate" style={{'--scroll-delay': '100ms'}}>AI-Powered Mock Interview</p>
            <p className="text-[#A9A9A9] max-w-lg mx-auto mb-8 scroll-animate" style={{'--scroll-delay': '200ms'}}>
                Practice your interview skills with our AI assistant. Get ready to land your dream job with instant, personalized feedback.
            </p>
            <button
            onClick={startInterview}
            className="bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg shadow-[#9FE2BF]/20 scroll-animate"
            style={{'--scroll-delay': '300ms'}}
            >
            Start Interview
            </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen p-4 gap-4 bg-[#000000]">
        {/* Chat Interface */}
        <div className="flex flex-col flex-1 lg:w-2/3 bg-[#282828] rounded-2xl shadow-2xl min-h-0">
            <header className="p-4 border-b border-[#3C3C3C] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <IconSparkles className="w-8 h-8 text-[#9FE2BF]" />
                    <h1 className="text-2xl font-bold text-white">AI Mock Interview</h1>
                </div>
                <button onClick={() => onNavigate('dashboard')} className="text-sm text-[#A9A9A9] hover:text-white transition-colors">&larr; Back to Dashboard</button>
            </header>
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <ChatBubble key={index} message={msg} />
                    ))}
                    {isLoading && messages[messages.length-1].sender !== 'ai' && <ChatBubble message={{ sender: 'ai', text: '...' }} />}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-[#3C3C3C]">
                <div className="relative">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={interviewState === 'in_progress' ? "Type your answer..." : "Interview has ended."}
                        disabled={isLoading || interviewState !== 'in_progress'}
                        className="w-full bg-[#3C3C3C] text-white rounded-full py-3 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-[#9FE2BF] transition duration-300"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || interviewState !== 'in_progress'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 rounded-full p-2.5 disabled:bg-[#4A4A4A] disabled:cursor-not-allowed transition-all transform hover:scale-110"
                    >
                       <IconSend className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
        {/* Controls Panel */}
        <div className="lg:w-1/3 bg-[#282828] rounded-2xl shadow-2xl p-6">
          <InterviewControls
            timeLeft={timeLeft}
            totalTime={INTERVIEW_DURATION_SECONDS}
            progress={(currentQuestionIndex / MOCK_QUESTIONS.length) * 100}
            onEndInterview={endInterview}
            interviewState={interviewState}
          />
        </div>
      </div>
      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={handleCloseModal}
        feedback={feedback}
      />
    </>
  );
}