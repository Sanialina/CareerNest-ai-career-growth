import React from 'react';
import { InterviewState } from '../types';

interface InterviewControlsProps {
  timeLeft: number;
  totalTime: number;
  progress: number;
  onEndInterview: () => void;
  interviewState: InterviewState;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const InterviewControls: React.FC<InterviewControlsProps> = ({
  timeLeft,
  totalTime,
  progress,
  onEndInterview,
  interviewState
}) => {
  const timeProgress = (timeLeft / totalTime) * 100;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-center text-white">Interview Status</h2>
        
        <div className="flex-grow flex flex-col justify-around py-4 lg:py-0">
            {/* Timer */}
            <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2 lg:mb-4">Time Remaining</h3>
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                        className="text-[#3C3C3C]"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        />
                        {/* Progress circle */}
                        <circle
                        className="text-[#9FE2BF]"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - timeProgress / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl lg:text-3xl font-bold text-white">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div>
                <h3 className="text-lg font-bold text-white mb-3 text-center">Question Progress</h3>
                <div className="w-full bg-[#3C3C3C] rounded-full h-4">
                <div
                    className="bg-[#9FE2BF] h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
                </div>
                <p className="text-center text-sm text-[#CCCCCC] mt-2">{Math.round(progress)}% Complete</p>
            </div>
        </div>

      {/* End Interview Button */}
      <button
        onClick={onEndInterview}
        disabled={interviewState !== 'in_progress'}
        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg disabled:bg-[#4A4A4A] disabled:cursor-not-allowed transition-all transform hover:scale-105"
      >
        End Interview & Get Feedback
      </button>
    </div>
  );
};