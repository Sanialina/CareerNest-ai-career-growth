
import React from 'react';
import { Message } from '../types';
import { IconSparkles, IconUser } from './IconComponents';

interface ChatBubbleProps {
  message: Message;
}

const LoadingBubble: React.FC = () => (
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 bg-[#9FE2BF]/20 rounded-full flex items-center justify-center">
            <IconSparkles className="w-6 h-6 text-[#9FE2BF]" />
        </div>
        <div className="bg-[#3C3C3C] rounded-2xl p-4 text-white animate-pulse">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
            </div>
        </div>
    </div>
);


export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { sender, text } = message;

  if (sender === 'system') {
    return (
        <div className="text-center text-sm text-[#A9A9A9] italic py-2">
            {text}
        </div>
    )
  }

  if (text === '...') {
    return <LoadingBubble />;
  }

  const isUser = sender === 'user';
  const bubbleClasses = isUser
    ? 'bg-[#9FE2BF] rounded-br-none text-slate-900'
    : 'bg-[#3C3C3C] rounded-bl-none';
  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const Icon = isUser ? IconUser : IconSparkles;
  const iconBgClass = isUser ? 'bg-[#4A4A4A]' : 'bg-[#9FE2BF]/20';
  const iconTextClass = isUser ? 'text-white' : 'text-[#9FE2BF]';
  
  return (
    <div className={`flex items-end gap-3 ${containerClasses}`}>
       {!isUser && (
         <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${iconBgClass}`}>
           <Icon className={`w-6 h-6 ${iconTextClass}`} />
         </div>
       )}
      <div
        className={`max-w-xl rounded-2xl p-4 shadow-md ${bubbleClasses}`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
      {isUser && (
         <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${iconBgClass}`}>
           <Icon className={`w-6 h-6 ${iconTextClass}`} />
         </div>
       )}
    </div>
  );
};