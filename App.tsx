import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import MockInterviewPage from './pages/MockInterviewPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CoverLetterPage from './pages/CoverLetterPage';
import RoadmapPage from './pages/RoadmapPage';
import JobTrackerPage from './pages/JobTrackerPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';


export type Page = 'landing' | 'dashboard' | 'mock_interview' | 'resume_builder' | 'cover_letter' | 'roadmap' | 'job_tracker' | 'auth' | 'onboarding';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Use a timeout to ensure the DOM is updated after a page change
    const timeoutId = setTimeout(() => {
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
    };
}, [currentPage]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'auth':
        return <AuthPage onNavigate={navigateTo} />;
      case 'onboarding':
        return <OnboardingPage onNavigate={navigateTo} />;
      case 'dashboard':
        return <DashboardPage onNavigate={navigateTo} />;
      case 'mock_interview':
        return <MockInterviewPage onNavigate={navigateTo} />;
      case 'resume_builder':
        return <ResumeBuilderPage onNavigate={navigateTo} />;
      case 'cover_letter':
        return <CoverLetterPage onNavigate={navigateTo} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={navigateTo} />;
      case 'job_tracker':
        return <JobTrackerPage onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return <div className="min-h-screen bg-[#000000]">{renderPage()}</div>;
}