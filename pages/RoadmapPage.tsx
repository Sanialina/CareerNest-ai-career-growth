import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { generateLearningRoadmap } from '../services/geminiService';
import { Roadmap, RoadmapStep } from '../types';
import { IconCheckCircle, IconMap, IconSparkles } from '../components/IconComponents';

interface RoadmapPageProps {
  onNavigate: (page: Page) => void;
}

const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigate }) => {
    const [careerGoal, setCareerGoal] = useState('');
    const [roadmap, setRoadmap] = useState<Roadmap>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (roadmap.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            // A short delay ensures that the DOM has been updated with the new roadmap items
            const timeoutId = setTimeout(() => {
                // Observe the parent container
                const container = document.querySelector('#roadmap-container.scroll-animate:not(.is-visible)');
                if (container) {
                    observer.observe(container);
                }
                // Observe the child items
                const elements = document.querySelectorAll('.roadmap-item.scroll-animate:not(.is-visible)');
                elements.forEach(el => observer.observe(el));
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                observer.disconnect();
            };
        }
    }, [roadmap]);

    const handleGenerate = async () => {
        setIsLoading(true);
        setRoadmap([]);
        const newRoadmap = await generateLearningRoadmap(careerGoal);
        setRoadmap(newRoadmap);
        setIsLoading(false);
    };

    const toggleStepCompletion = (id: number) => {
        setRoadmap(prevRoadmap =>
            prevRoadmap.map(step =>
                step.id === id ? { ...step, completed: !step.completed } : step
            )
        );
    };
    
    const progress = roadmap.length > 0 ? (roadmap.filter(s => s.completed).length / roadmap.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-[#000000] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 scroll-animate">
                    <div className="flex items-center gap-3">
                         <IconMap className="w-8 h-8 text-[#9FE2BF]" />
                         <h1 className="text-3xl font-bold">AI Learning Roadmap</h1>
                    </div>
                    <button onClick={() => onNavigate('dashboard')} className="text-sm text-[#A9A9A9] hover:text-white transition-colors">&larr; Back to Dashboard</button>
                </div>

                {/* Input Section */}
                <div className="bg-[#282828] p-8 rounded-2xl shadow-lg mb-8 scroll-animate" style={{'--scroll-delay': '100ms'}}>
                    <label htmlFor="career-goal" className="block text-lg font-semibold mb-2">
                        What is your career goal?
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            id="career-goal"
                            className="w-full flex-grow bg-[#3C3C3C] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FE2BF] text-lg"
                            placeholder="e.g., Senior Frontend Developer"
                            value={careerGoal}
                            onChange={(e) => setCareerGoal(e.target.value)}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !careerGoal}
                            className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-3 px-6 rounded-lg disabled:bg-[#4A4A4A] disabled:cursor-not-allowed transition text-lg"
                        >
                            {isLoading ? 'Generating...' : <><IconSparkles className="w-6 h-6" /> Generate</>}
                        </button>
                    </div>
                </div>
                
                {/* Roadmap Display */}
                {roadmap.length > 0 && (
                     <div id="roadmap-container" className="scroll-animate" style={{'--scroll-delay': '200ms'}}>
                        <div className="mb-6">
                             <h2 className="text-2xl font-bold mb-2">Your Roadmap to becoming a {careerGoal}</h2>
                              <div className="w-full bg-[#3C3C3C] rounded-full h-4">
                                  <div
                                    className="bg-[#9FE2BF] h-4 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                             <p className="text-right text-sm text-[#A9A9A9] mt-2">{Math.round(progress)}% Complete</p>
                        </div>
                        <div className="space-y-4">
                            {roadmap.map((step, index) => (
                                <div key={step.id} className={`roadmap-item bg-[#282828] p-6 rounded-xl transition scroll-animate ${step.completed ? 'opacity-60' : ''}`} style={{'--scroll-delay': `${index * 100}ms`}}>
                                    <div className="flex items-start gap-4">
                                        <button onClick={() => toggleStepCompletion(step.id)} className="mt-1">
                                            {step.completed ? <IconCheckCircle className="w-6 h-6 text-[#9FE2BF]" /> : <div className="w-6 h-6 border-2 border-[#4A4A4A] rounded-full"></div>}
                                        </button>
                                        <div>
                                            <h3 className={`text-xl font-bold ${step.completed ? 'line-through text-[#A9A9A9]' : 'text-white'}`}>{step.title}</h3>
                                            <p className="text-[#A9A9A9] mt-1 mb-3">{step.description}</p>
                                            <div className="flex gap-3 flex-wrap">
                                                {step.resources.map(res => (
                                                     <a key={res.title} href={res.url} target="_blank" rel="noopener noreferrer" className="text-sm bg-[#3C3C3C] hover:bg-[#4A4A4A] text-[#A7D7C5] py-1 px-3 rounded-full transition">
                                                        {res.title} &rarr;
                                                     </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                )}
                {isLoading && (
                    <div className="text-center py-10">
                        <p className="text-lg text-[#A9A9A9]">Forging your path...</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RoadmapPage;