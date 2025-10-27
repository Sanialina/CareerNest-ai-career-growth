import React, { useState } from 'react';
import { Page } from '../App';
import { 
    IconBarChart2, IconBriefcase, IconFileText, IconLogOut, IconMail, IconMap, IconSparkles, IconTrendingUp, IconUser, IconClipboardList, IconHome, IconMenu, IconX 
} from '../components/IconComponents';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

const StatWidget: React.FC<{ icon: React.ReactNode; title: string; value: string; trend: string; delay: number; }> = ({ icon, title, value, trend, delay }) => (
    <div className="bg-[#282828] p-6 rounded-xl flex items-center gap-4 scroll-animate" style={{'--scroll-delay': `${delay}ms`}}>
        <div className="bg-[#3C3C3C] p-3 rounded-lg">{icon}</div>
        <div>
            <p className="text-[#A9A9A9] text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="ml-auto text-right">
            <p className="text-sm font-semibold text-[#9FE2BF] flex items-center gap-1">
                <IconTrendingUp className="w-4 h-4" />
                {trend}
            </p>
        </div>
    </div>
);

const QuickLink: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; delay: number; }> = ({ icon, title, description, onClick, delay }) => (
    <button 
      onClick={onClick}
      className={`bg-[#282828] p-6 rounded-xl text-left hover:bg-[#3C3C3C]/50 transition-colors w-full group scroll-animate`}
      style={{'--scroll-delay': `${delay}ms`}}>
        <div className="flex items-center gap-4 mb-2">
            {icon}
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-[#A9A9A9] text-sm">{description}</p>
    </button>
);

const recentActivities = [
  {
    icon: <IconFileText className="w-5 h-5 text-[#9FE2BF]" />,
    description: 'Updated "Senior Software Engineer" resume.',
    timestamp: '2 hours ago',
  },
  {
    icon: <IconClipboardList className="w-5 h-5 text-[#9FE2BF]" />,
    description: 'Added new application for "UI/UX Designer" at Netflix.',
    timestamp: '1 day ago',
  },
  {
    icon: <IconBriefcase className="w-5 h-5 text-[#9FE2BF]" />,
    description: 'Completed a mock interview for a behavioral round.',
    timestamp: '2 days ago',
  },
  {
    icon: <IconMail className="w-5 h-5 text-[#9FE2BF]" />,
    description: 'Generated a new cover letter for a role at Google.',
    timestamp: '3 days ago',
  },
];


const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  return (
    <div className="flex h-screen bg-[#000000]">
      {/* Sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#282828] p-6 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex-shrink-0`}>
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <IconSparkles className="w-8 h-8 text-[#9FE2BF]" />
              <h1 className="text-2xl font-bold">CareerNest</h1>
            </div>
            <button className="lg:hidden text-[#A9A9A9] hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                <IconX className="w-6 h-6" />
            </button>
        </div>
        <nav className="flex-grow space-y-2">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('landing'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors text-[#CCCCCC]">
                <IconHome className="w-5 h-5" /> Home
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('dashboard'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#9FE2BF] text-slate-900 font-semibold">
                <IconBarChart2 className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('job_tracker'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors text-[#CCCCCC]">
                <IconClipboardList className="w-5 h-5" /> Job Tracker
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('resume_builder'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors text-[#CCCCCC]">
                <IconFileText className="w-5 h-5" /> Resume Builder
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('cover_letter'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors text-[#CCCCCC]">
                <IconMail className="w-5 h-5" /> Cover Letters
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('mock_interview'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors text-[#CCCCCC]">
                <IconBriefcase className="w-5 h-5" /> Mock Interviews
            </a>
             <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('roadmap'); }} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors text-[#CCCCCC]">
                <IconMap className="w-5 h-5" /> Learning Roadmap
            </a>
        </nav>
        <div className="mt-auto">
             <button onClick={() => handleNavigate('landing')} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3C3C3C] transition-colors w-full text-left text-[#CCCCCC]">
                <IconLogOut className="w-5 h-5" /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden text-white p-2 -ml-2"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <IconMenu className="w-6 h-6" />
                </button>
                <div className="scroll-animate">
                    <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
                    <p className="text-[#A9A9A9]">Let's take the next step in your career journey.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 scroll-animate" style={{'--scroll-delay': '100ms'}}>
                <p className="text-white font-medium">Jane Doe</p>
                <div className="w-12 h-12 bg-[#3C3C3C] rounded-full flex items-center justify-center">
                    <IconUser className="w-6 h-6 text-[#9FE2BF]"/>
                </div>
            </div>
        </header>

        {/* Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatWidget icon={<IconFileText className="w-6 h-6 text-[#9FE2BF]"/>} title="Resume Score" value="88%" trend="+5%" delay={100} />
            <StatWidget icon={<IconTrendingUp className="w-6 h-6 text-[#9FE2BF]"/>} title="Career Progress" value="65%" trend="+10%" delay={200}/>
            <StatWidget icon={<IconBriefcase className="w-6 h-6 text-[#9FE2BF]"/>} title="Next Mock Interview" value="Tomorrow" trend="Tech Round" delay={300} />
            <StatWidget icon={<IconMap className="w-6 h-6 text-[#9FE2BF]"/>} title="Applications Active" value="4" trend="+1" delay={400}/>
        </section>

        {/* Quick Links */}
        <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 scroll-animate">Quick Links</h3>
            <div className="grid md:grid-cols-2 gap-6">
                 <QuickLink 
                    icon={<IconClipboardList className="w-8 h-8 text-[#9FE2BF]"/>} 
                    title="Track Your Applications" 
                    description="Manage your job applications on a visual Kanban board."
                    onClick={() => onNavigate('job_tracker')}
                    delay={100}
                />
                 <QuickLink 
                    icon={<IconFileText className="w-8 h-8 text-[#9FE2BF]"/>} 
                    title="Build a New Resume" 
                    description="Craft a new resume tailored to a specific job role."
                    onClick={() => onNavigate('resume_builder')}
                    delay={200}
                />
                 <QuickLink 
                    icon={<IconMail className="w-8 h-8 text-[#9FE2BF]"/>} 
                    title="Generate a Cover Letter" 
                    description="Create a compelling cover letter from a job description."
                    onClick={() => onNavigate('cover_letter')}
                    delay={300}
                />
                 <QuickLink 
                    icon={<IconBriefcase className="w-8 h-8 text-[#9FE2BF]"/>} 
                    title="Start a Mock Interview" 
                    description="Practice with an AI interviewer and get instant feedback."
                    onClick={() => onNavigate('mock_interview')}
                    delay={400}
                />
            </div>
        </section>
        
        {/* Recent Activity */}
        <section>
            <h3 className="text-2xl font-bold text-white mb-4 scroll-animate">Recent Activity</h3>
            <div className="bg-[#282828] p-6 rounded-xl scroll-animate" style={{'--scroll-delay': '100ms'}}>
              <ul className="divide-y divide-[#3C3C3C]">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 scroll-animate" style={{'--scroll-delay': `${(index * 100) + 200}ms`}}>
                    <div className="bg-[#3C3C3C]/50 p-3 rounded-full">
                      {activity.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="text-white">{activity.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A9A9A9] whitespace-nowrap">{activity.timestamp}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;