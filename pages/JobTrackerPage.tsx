import React, { useState } from 'react';
import { Page } from '../App';
import { JobApplication, JobApplicationStatus } from '../types';
import { getJobApplicationRecommendation } from '../services/geminiService';
import { IconClipboardList, IconLightBulb, IconSparkles } from '../components/IconComponents';

interface JobTrackerPageProps {
  onNavigate: (page: Page) => void;
}

const initialApplications: JobApplication[] = [
    { id: 'app1', company: 'Google', role: 'Frontend Engineer', url: '#', status: 'Applied', aiRecommendation: 'For this role, use your "React Specialist" resume and create a new cover letter emphasizing your work on design systems.' },
    { id: 'app2', company: 'Netflix', role: 'UI/UX Designer', url: '#', status: 'Interviewing', aiRecommendation: 'Highlight your portfolio projects related to streaming services. Your "Creative Portfolio" resume is a good fit.' },
    { id: 'app3', company: 'Amazon', role: 'Cloud Solutions Architect', url: '#', status: 'Saved', aiRecommendation: 'Focus on your AWS certifications and experience with large-scale infrastructure in your resume.' }
];

const STATUS_COLUMNS: JobApplicationStatus[] = ['Saved', 'Applied', 'Interviewing', 'Offer', 'Hired'];

const JobTrackerPage: React.FC<JobTrackerPageProps> = ({ onNavigate }) => {
    const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
    const [newCompany, setNewCompany] = useState('');
    const [newRole, setNewRole] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCompany || !newRole) return;

        setIsLoading(true);
        const recommendation = await getJobApplicationRecommendation(newRole, newCompany);
        const newApplication: JobApplication = {
            id: `app${Date.now()}`,
            company: newCompany,
            role: newRole,
            url: newUrl,
            status: 'Saved',
            aiRecommendation: recommendation
        };
        setApplications(prev => [newApplication, ...prev]);
        setNewCompany('');
        setNewRole('');
        setNewUrl('');
        setIsLoading(false);
    };
    
    const handleStatusChange = (id: string, newStatus: JobApplicationStatus) => {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-8">
            <div className="max-w-7xl mx-auto">
                 <div className="flex justify-between items-center mb-8 scroll-animate">
                    <div className="flex items-center gap-3">
                         <IconClipboardList className="w-8 h-8 text-[#9FE2BF]" />
                         <h1 className="text-3xl font-bold">Job Application Tracker</h1>
                    </div>
                    <button onClick={() => onNavigate('dashboard')} className="text-sm text-[#A9A9A9] hover:text-white transition-colors">&larr; Back to Dashboard</button>
                </div>

                {/* Add Application Form */}
                <div className="bg-[#282828] p-6 rounded-2xl shadow-lg mb-8 scroll-animate" style={{'--scroll-delay': '100ms'}}>
                    <form onSubmit={handleAddApplication} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-semibold mb-1 text-[#CCCCCC]">Company</label>
                            <input type="text" value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="e.g., Google" className="w-full bg-[#3C3C3C] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]" />
                        </div>
                         <div className="flex-1 w-full">
                            <label className="block text-sm font-semibold mb-1 text-[#CCCCCC]">Role</label>
                            <input type="text" value={newRole} onChange={e => setNewRole(e.target.value)} placeholder="e.g., Frontend Engineer" className="w-full bg-[#3C3C3C] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]" />
                        </div>
                         <div className="flex-1 w-full">
                            <label className="block text-sm font-semibold mb-1 text-[#CCCCCC]">Job Link</label>
                            <input type="url" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#3C3C3C] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-3 px-6 rounded-lg disabled:bg-[#4A4A4A] transition">
                             {isLoading ? 'Saving...' : <><IconSparkles className="w-5 h-5" /> Add Application</>}
                        </button>
                    </form>
                </div>
                
                {/* Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {STATUS_COLUMNS.map((status, index) => (
                        <div key={status} className="bg-[#282828]/50 rounded-xl scroll-animate" style={{'--scroll-delay': `${(index * 100) + 200}ms`}}>
                            <h2 className="text-lg font-bold p-4 border-b border-[#3C3C3C]">{status} ({applications.filter(a => a.status === status).length})</h2>
                            <div className="p-4 space-y-4 h-full">
                                {applications.filter(app => app.status === status).map((app, appIndex) => (
                                    <div key={app.id} className="bg-[#282828] p-4 rounded-lg shadow-md scroll-animate" style={{'--scroll-delay': `${appIndex * 100}ms`}}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-white">{app.company}</h3>
                                                <p className="text-sm text-[#CCCCCC]">{app.role}</p>
                                                <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#9FE2BF] hover:underline">View Posting &rarr;</a>
                                            </div>
                                            <select 
                                                value={app.status}
                                                onChange={e => handleStatusChange(app.id, e.target.value as JobApplicationStatus)}
                                                className="bg-[#3C3C3C] text-xs rounded p-1 focus:outline-none focus:ring-1 focus:ring-[#9FE2BF]"
                                            >
                                                {STATUS_COLUMNS.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-[#3C3C3C]">
                                            <p className="text-xs text-yellow-300 flex gap-2">
                                                <IconLightBulb className="w-4 h-4 flex-shrink-0 mt-0.5"/>
                                                <span>{app.aiRecommendation}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobTrackerPage;