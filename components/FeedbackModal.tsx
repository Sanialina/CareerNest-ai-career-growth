import React from 'react';
import { Feedback } from '../types';
import { IconCheckCircle, IconThumbDown, IconLightBulb, IconX } from './IconComponents';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: Feedback | null;
}

const FeedbackSection: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
    <div>
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <ul className="space-y-2 list-inside pl-2">
            {items.map((item, index) => (
                <li key={index} className="text-[#CCCCCC] flex items-start">
                    <span className="text-[#9FE2BF] mr-2 mt-1">&#8227;</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, feedback }) => {
  if (!isOpen || !feedback) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-[#282828] rounded-2xl shadow-xl w-full max-w-2xl mx-auto transform transition-transform duration-300 scale-95 animate-modal-enter max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-[#A9A9A9] hover:text-white transition">
                <IconX className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-center mb-2 text-white">Interview Feedback</h2>
            <p className="text-center text-[#A9A9A9] mb-8">Here's a summary of your performance.</p>

            <div className="text-center mb-8">
                <p className="text-lg text-[#CCCCCC]">Overall Score</p>
                <p className={`text-6xl font-bold ${feedback.overallScore > 75 ? 'text-[#9FE2BF]' : feedback.overallScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {feedback.overallScore}%
                </p>
            </div>
          
            <div className="space-y-8">
                <FeedbackSection title="Strengths" items={feedback.strengths} icon={<IconCheckCircle className="w-7 h-7 text-[#9FE2BF]" />} />
                <FeedbackSection title="Areas for Improvement" items={feedback.weaknesses} icon={<IconThumbDown className="w-7 h-7 text-yellow-400" />} />
                <FeedbackSection title="Actionable Suggestions" items={feedback.suggestions} icon={<IconLightBulb className="w-7 h-7 text-[#9FE2BF]" />} />
            </div>

             <div className="mt-8 text-center">
                <button
                    onClick={onClose}
                    className="bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-2 px-6 rounded-lg transition"
                >
                    Close
                </button>
            </div>
        </div>
      </div>
       <style>{`
        @keyframes modal-enter {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
            animation: modal-enter 0.3s ease-out forwards;
        }
    `}</style>
    </div>
  );
};