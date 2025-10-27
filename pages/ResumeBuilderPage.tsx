import React, { useState } from 'react';
import { Page } from '../App';
import { ResumeData, Suggestion } from '../types';
import { getResumeSuggestions } from '../services/geminiService';
import { IconDownload, IconFileText, IconSparkles, IconUpload, IconEdit, IconEye } from '../components/IconComponents';

interface ResumeBuilderPageProps {
  onNavigate: (page: Page) => void;
}

const initialResumes: Record<string, ResumeData> = {
    'Senior Software Engineer': {
        personalInfo: {
            fullName: 'Jane Doe',
            email: 'jane.doe@email.com',
            phoneNumber: '123-456-7890',
            linkedin: 'linkedin.com/in/janedoe',
            portfolio: 'github.com/janedoe',
        },
        summary: 'A passionate and creative software engineer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, and Node.js.',
        experience: [
            { id: 'exp1', jobTitle: 'Senior Software Engineer', company: 'Tech Corp', location: 'San Francisco, CA', startDate: 'Jan 2020', endDate: 'Present', description: 'Led a team of 5 engineers to develop a new customer-facing analytics dashboard, resulting in a 20% increase in user engagement.' }
        ],
        education: [
            { id: 'edu1', institution: 'State University', degree: 'Bachelor of Science', fieldOfStudy: 'Computer Science', startDate: 'Aug 2014', endDate: 'May 2018' }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    },
    'Frontend Developer': {
        personalInfo: {
            fullName: 'Jane Doe',
            email: 'jane.doe@email.com',
            phoneNumber: '123-456-7890',
            linkedin: 'linkedin.com/in/janedoe',
            portfolio: 'github.com/janedoe',
        },
        summary: 'Creative Frontend Developer with a knack for building beautiful and responsive user interfaces. Expert in React, Tailwind CSS, and modern web technologies.',
        experience: [
             { id: 'exp1', jobTitle: 'Frontend Developer', company: 'Web Solutions Inc.', location: 'Remote', startDate: 'Jun 2018', endDate: 'Dec 2019', description: 'Developed and maintained the UI for several client websites using React and Redux, improving page load times by 15%.' }
        ],
        education: [
            { id: 'edu1', institution: 'State University', degree: 'Bachelor of Science', fieldOfStudy: 'Computer Science', startDate: 'Aug 2014', endDate: 'May 2018' }
        ],
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Redux', 'Tailwind CSS', 'Figma'],
    }
};

const SuggestionPill: React.FC<{ suggestion: Suggestion }> = ({ suggestion }) => {
    const typeStyles = {
        grammar: { icon: '✍️', color: 'bg-blue-900/50 text-blue-300' },
        ats: { icon: '🎯', color: 'bg-[#9FE2BF]/20 text-[#9FE2BF]' },
        structure: { icon: '🏗️', color: 'bg-yellow-900/50 text-yellow-300' },
    };
    const style = typeStyles[suggestion.type];
    return (
        <div className={`text-sm mt-2 flex items-start gap-2 p-2 rounded-md ${style.color}`}>
            <span className="mt-0.5">{style.icon}</span>
            <span className="flex-1">{suggestion.text}</span>
        </div>
    );
};

const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({ onNavigate }) => {
    const [allResumes, setAllResumes] = useState<Record<string, ResumeData>>(initialResumes);
    const [currentVersion, setCurrentVersion] = useState<string>('Senior Software Engineer');
    const [suggestions, setSuggestions] = useState<Record<string, Suggestion[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

    const resumeData = allResumes[currentVersion];

    const handleGetSuggestions = async () => {
        setIsLoading(true);
        setSuggestions({});
        const newSuggestions = await getResumeSuggestions(resumeData);
        setSuggestions(newSuggestions);
        setIsLoading(false);
    };

    const handleExportPdf = () => window.print();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            alert(`Mock Upload: ${e.target.files[0].name}\n\nIn a real app, this would parse your resume and populate the fields.`);
            e.target.value = ''; // Reset file input
        }
    };
    
    const handleSaveAsNew = () => {
        const newName = prompt("Enter a name for the new resume version:", `${currentVersion} Copy`);
        if (newName && !allResumes[newName]) {
            setAllResumes(prev => ({ ...prev, [newName]: JSON.parse(JSON.stringify(resumeData)) }));
            setCurrentVersion(newName);
        } else if (newName) {
            alert("A resume version with this name already exists.");
        }
    };
    
    const updateResumeData = (updater: (draft: ResumeData) => void) => {
        const newResumeData = JSON.parse(JSON.stringify(resumeData));
        updater(newResumeData);
        setAllResumes(prev => ({ ...prev, [currentVersion]: newResumeData, }));
    };

    return (
        <>
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #resume-preview, #resume-preview * { visibility: visible; }
                    #resume-preview { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none; }
                }
            `}</style>
            <div className="flex flex-col lg:flex-row h-screen bg-[#000000] text-white">
                {/* Mobile View Toggle */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#282828] p-2 flex justify-around gap-2 border-t border-[#3C3C3C] z-10 no-print">
                    <button 
                        onClick={() => setMobileView('editor')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${mobileView === 'editor' ? 'bg-[#9FE2BF] text-slate-900' : 'bg-transparent text-[#CCCCCC]'}`}
                    >
                        <IconEdit className="w-5 h-5" />
                        Editor
                    </button>
                    <button 
                        onClick={() => setMobileView('preview')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${mobileView === 'preview' ? 'bg-[#9FE2BF] text-slate-900' : 'bg-transparent text-[#CCCCCC]'}`}
                    >
                        <IconEye className="w-5 h-5" />
                        Preview
                    </button>
                </div>

                {/* Form Panel */}
                <aside className={`w-full lg:w-1/2 bg-[#282828] p-6 pb-24 lg:pb-6 overflow-y-auto no-print ${mobileView === 'editor' ? 'block' : 'hidden'} lg:block`}>
                     <div className="flex justify-between items-center mb-6 scroll-animate">
                        <div className="flex items-center gap-3">
                             <IconFileText className="w-8 h-8 text-[#9FE2BF]" />
                             <h1 className="text-2xl font-bold">AI Resume Builder</h1>
                        </div>
                        <button onClick={() => onNavigate('dashboard')} className="text-sm text-[#A9A9A9] hover:text-white transition-colors">&larr; Back to Dashboard</button>
                    </div>

                    <div className="space-y-6">
                        {/* Version Management */}
                        <div className="bg-[#000000]/50 p-4 rounded-lg space-y-4 scroll-animate" style={{'--scroll-delay': '100ms'}}>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold mb-2 block text-[#CCCCCC]">Current Version</label>
                                    <select value={currentVersion} onChange={e => setCurrentVersion(e.target.value)} className="w-full bg-[#3C3C3C] p-2 rounded">
                                        {Object.keys(allResumes).map(name => <option key={name} value={name}>{name}</option>)}
                                    </select>
                                </div>
                                <div className="self-end">
                                    <button onClick={handleSaveAsNew} className="w-full bg-[#4A4A4A] hover:bg-[#666666] p-2 rounded text-sm font-semibold">Save as New Version</button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="resume-upload" className="w-full text-center cursor-pointer flex items-center justify-center gap-2 bg-[#3C3C3C] hover:bg-[#4A4A4A] p-2 rounded text-sm font-semibold">
                                    <IconUpload className="w-4 h-4" /> Upload Resume (PDF/DOCX)
                                </label>
                                <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                            </div>
                        </div>

                        {/* Professional Summary Section */}
                        <div className="scroll-animate" style={{'--scroll-delay': '200ms'}}>
                            <label className="text-lg font-semibold mb-2 block">Professional Summary</label>
                            <textarea className="w-full bg-[#3C3C3C] p-2 rounded" rows={4} value={resumeData.summary} onChange={(e) => updateResumeData(d => { d.summary = e.target.value })} />
                            {suggestions.summary?.map((s, i) => <SuggestionPill key={i} suggestion={s} />)}
                        </div>

                        {/* Experience Section */}
                        <div className="scroll-animate" style={{'--scroll-delay': '300ms'}}>
                            <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
                            {resumeData.experience.map((exp, index) => (
                                <div key={exp.id} className="bg-[#3C3C3C]/50 p-4 rounded mb-4 scroll-animate" style={{'--scroll-delay': `${index * 50}ms`}}>
                                   <input className="w-full bg-[#4A4A4A] p-2 rounded mb-2" value={exp.jobTitle} placeholder="Job Title" />
                                   <textarea className="w-full bg-[#4A4A4A] p-2 rounded" rows={3} placeholder="Description..." value={exp.description} onChange={(e) => updateResumeData(d => { d.experience[index].description = e.target.value })} />
                                   {suggestions[`experience_${exp.id}_description`]?.map((s, i) => <SuggestionPill key={i} suggestion={s} />)}
                                </div>
                            ))}
                        </div>

                        {/* Skills Section */}
                        <div className="scroll-animate" style={{'--scroll-delay': '400ms'}}>
                            <label className="text-lg font-semibold mb-2 block">Skills (comma-separated)</label>
                            <input type="text" className="w-full bg-[#3C3C3C] p-2 rounded" value={resumeData.skills.join(', ')} onChange={(e) => updateResumeData(d => { d.skills = e.target.value.split(',').map(s => s.trim()) })} />
                             {suggestions.skills?.map((s, i) => <SuggestionPill key={i} suggestion={s} />)}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 scroll-animate" style={{'--scroll-delay': '500ms'}}>
                        <button onClick={handleGetSuggestions} disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-3 px-4 rounded-lg disabled:bg-[#4A4A4A] transition">
                           {isLoading ? 'Analyzing...' : <><IconSparkles className="w-5 h-5" /> Get AI Suggestions</>}
                        </button>
                         <div className="grid grid-cols-2 gap-2">
                            <button onClick={handleExportPdf} className="w-full flex items-center justify-center gap-2 bg-[#4A4A4A] hover:bg-[#666666] font-bold py-3 px-4 rounded-lg transition text-sm">
                                <IconDownload className="w-5 h-5"/> PDF
                            </button>
                             <button disabled className="w-full flex items-center justify-center gap-2 bg-[#3C3C3C] font-bold py-3 px-4 rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed" title="Coming soon!">
                                <IconDownload className="w-5 h-5"/> Word
                            </button>
                        </div>
                    </div>
                </aside>
                
                {/* Preview Panel */}
                <main id="resume-preview" className={`w-full lg:w-1/2 p-4 md:p-8 pb-24 lg:pb-8 overflow-y-auto ${mobileView === 'preview' ? 'block' : 'hidden'} lg:block`}>
                    <div className="bg-white text-gray-800 p-10 shadow-lg scroll-animate" style={{ fontFamily: 'Georgia, serif', '--scroll-delay': '100ms' }}>
                        <h1 className="text-4xl font-bold text-center mb-2">{resumeData.personalInfo.fullName}</h1>
                        <div className="text-center text-sm mb-6">
                            {resumeData.personalInfo.email} | {resumeData.personalInfo.phoneNumber} | {resumeData.personalInfo.linkedin}
                        </div>
                        
                        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
                        <p className="text-sm mb-6">{resumeData.summary}</p>
                        
                        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
                        {resumeData.experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <div className="flex justify-between">
                                    <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                                    <p className="text-sm font-bold">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-sm italic">{exp.company}, {exp.location}</p>
                                <p className="text-sm mt-1">{exp.description}</p>
                            </div>
                        ))}
                        
                        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3 mt-6">Education</h2>
                         {resumeData.education.map(edu => (
                            <div key={edu.id} className="mb-4">
                                 <div className="flex justify-between">
                                    <h3 className="text-md font-bold">{edu.institution}</h3>
                                    <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className="text-sm italic">{edu.degree} in {edu.fieldOfStudy}</p>
                            </div>
                         ))}
                         
                         <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3 mt-6">Skills</h2>
                         <p className="text-sm">{resumeData.skills.join(' • ')}</p>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ResumeBuilderPage;