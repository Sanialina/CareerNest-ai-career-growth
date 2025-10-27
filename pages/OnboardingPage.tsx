import React, { useState } from 'react';
import { Page } from '../App';
import { IconSparkles } from '../components/IconComponents';

interface OnboardingPageProps {
  onNavigate: (page: Page) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
    const [fullName, setFullName] = useState('');
    const [careerGoal, setCareerGoal] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fullName && careerGoal) {
            // In a real app, you would save this data to the user's profile
            onNavigate('dashboard');
        } else {
            alert('Please fill out all fields to continue.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000] p-4">
            <div className="w-full max-w-lg text-center">
                <div className="scroll-animate">
                    <IconSparkles className="w-12 h-12 text-[#9FE2BF] mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome to CareerNest!</h1>
                    <p className="text-lg text-[#A9A9A9] mb-8">Let's set up your profile to personalize your experience.</p>
                </div>
                
                <div className="bg-[#282828] p-8 rounded-2xl shadow-lg text-left scroll-animate" style={{'--scroll-delay': '100ms'}}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="full-name" className="block text-sm font-medium text-[#CCCCCC] mb-1">
                                Full Name
                            </label>
                            <input
                                id="full-name"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g., Jane Doe"
                                className="w-full bg-[#3C3C3C] border-transparent rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]"
                            />
                        </div>

                        <div>
                            <label htmlFor="career-goal" className="block text-sm font-medium text-[#CCCCCC] mb-1">
                                What's your primary career goal?
                            </label>
                            <input
                                id="career-goal"
                                type="text"
                                required
                                value={careerGoal}
                                onChange={(e) => setCareerGoal(e.target.value)}
                                placeholder="e.g., Senior Frontend Developer"
                                className="w-full bg-[#3C3C3C] border-transparent rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]"
                            />
                             <p className="text-xs text-[#A9A9A9] mt-2">This will help us tailor suggestions and roadmaps for you.</p>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-slate-900 bg-[#9FE2BF] hover:bg-[#8AD8AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#282828] focus:ring-[#9FE2BF]"
                        >
                            Get Started
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;