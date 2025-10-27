import React, { useState } from 'react';
import { Page } from '../App';
import { generateCoverLetter } from '../services/geminiService';
import { IconClipboardCopy, IconMail, IconSparkles } from '../components/IconComponents';

interface CoverLetterPageProps {
  onNavigate: (page: Page) => void;
}

const CoverLetterPage: React.FC<CoverLetterPageProps> = ({ onNavigate }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [tone, setTone] = useState('Formal');
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setGeneratedLetter('');
        const letter = await generateCoverLetter(jobDescription, tone);
        setGeneratedLetter(letter);
        setIsLoading(false);
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 scroll-animate">
                    <div className="flex items-center gap-3">
                         <IconMail className="w-8 h-8 text-[#9FE2BF]" />
                         <h1 className="text-3xl font-bold">AI Cover Letter Generator</h1>
                    </div>
                    <button onClick={() => onNavigate('dashboard')} className="text-sm text-[#A9A9A9] hover:text-white transition-colors">&larr; Back to Dashboard</button>
                </div>
                
                <div className="bg-[#282828] p-8 rounded-2xl shadow-lg scroll-animate" style={{'--scroll-delay': '100ms'}}>
                    {/* Input Section */}
                    <div className="mb-6">
                        <label htmlFor="job-description" className="block text-lg font-semibold mb-2">
                            Paste Job Description
                        </label>
                        <textarea
                            id="job-description"
                            rows={8}
                            className="w-full bg-[#3C3C3C] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]"
                            placeholder="Paste the full job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    {/* Tone Selection */}
                    <div className="mb-6">
                         <label className="block text-lg font-semibold mb-3">Select Tone</label>
                         <div className="flex gap-4">
                            {['Formal', 'Creative', 'Short'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className={`px-6 py-2 rounded-full font-semibold transition ${tone === t ? 'bg-[#9FE2BF] text-slate-900' : 'bg-[#3C3C3C] hover:bg-[#4A4A4A] text-[#CCCCCC]'}`}
                                >
                                    {t}
                                </button>
                            ))}
                         </div>
                    </div>
                    
                    {/* Action Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !jobDescription}
                        className="w-full flex items-center justify-center gap-2 bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-4 rounded-lg disabled:bg-[#4A4A4A] disabled:cursor-not-allowed transition text-lg"
                    >
                        {isLoading ? 'Generating...' : <><IconSparkles className="w-6 h-6" /> Generate Cover Letter</>}
                    </button>
                </div>

                 {/* Output Section */}
                 <div className="mt-8">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="bg-[#282828] p-8 rounded-2xl shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <IconSparkles className="w-6 h-6 text-[#9FE2BF] animate-spin" />
                                <h2 className="text-2xl font-bold text-[#A9A9A9]">Generating Your Cover Letter...</h2>
                            </div>
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-[#3C3C3C] rounded w-3/4"></div>
                                <div className="h-4 bg-[#3C3C3C] rounded w-full"></div>
                                <div className="h-4 bg-[#3C3C3C] rounded w-full"></div>
                                <div className="h-4 bg-[#3C3C3C] rounded w-5/6"></div>
                                <div className="h-4 bg-[#3C3C3C] rounded w-1/2"></div>
                            </div>
                        </div>
                    )}

                    {/* Result State */}
                    {!isLoading && generatedLetter && (
                        <div className="bg-[#282828] p-8 rounded-2xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Your Generated Cover Letter</h2>
                                <button onClick={handleCopy} className="flex items-center gap-2 bg-[#3C3C3C] hover:bg-[#4A4A4A] text-sm font-semibold py-2 px-4 rounded-lg transition">
                                    <IconClipboardCopy className="w-4 h-4" />
                                    {copySuccess || 'Copy'}
                                </button>
                            </div>
                            <div className="bg-[#000000]/50 p-6 rounded-lg whitespace-pre-wrap text-[#CCCCCC] max-h-96 overflow-y-auto">
                                {generatedLetter}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoverLetterPage;