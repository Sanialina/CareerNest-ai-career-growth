import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { 
    IconBriefcase, 
    IconFileText, 
    IconMap, 
    IconSparkles, 
    IconChevronLeft, 
    IconChevronRight,
    IconLinkedIn,
    IconTwitter,
    IconGithub,
    IconMenu,
    IconX
} from '../components/IconComponents';

const PricingCard: React.FC<{ plan: string; price: string; features: string[]; primary?: boolean, delay?: number }> = ({ plan, price, features, primary = false, delay = 0 }) => (
  <div className="glow-card-container overflow-hidden rounded-lg shadow-xl p-[2px] flex transform transition-transform hover:-translate-y-2 scroll-animate" style={{'--scroll-delay': `${delay}ms`}}>
    <div className={`w-full rounded-[6px] p-8 flex flex-col ${primary ? 'bg-[#9FE2BF]' : 'bg-[#282828]'}`}>
      <h3 className={`text-2xl font-bold text-center mb-2 ${primary ? 'text-slate-900' : 'text-white'}`}>{plan}</h3>
      <p className={`text-center text-4xl font-extrabold mb-6 ${primary ? 'text-slate-900' : 'text-white'}`}>{price}<span className={`text-base font-normal ${primary ? 'text-slate-700' : 'text-[#A9A9A9]'}`}>/ month</span></p>
      <ul className={`space-y-4 mb-8 flex-grow ${primary ? 'text-slate-800' : 'text-[#CCCCCC]'}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className={`w-5 h-5 mr-3 ${primary ? 'text-slate-900' : 'text-[#9FE2BF]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-bold transition-colors ${primary ? 'bg-[#000000] text-white hover:bg-[#3C3C3C]' : 'bg-[#9FE2BF] text-slate-900 hover:bg-[#8AD8AE]'}`}>
        {primary ? 'Get Started' : 'Choose Plan'}
      </button>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; delay?: number }> = ({ quote, name, role, delay = 0 }) => (
  <div className="glow-card-container overflow-hidden rounded-lg shadow-lg p-[2px] transform transition-transform hover:-translate-y-2 scroll-animate" style={{'--scroll-delay': `${delay}ms`}}>
    <div className="h-full bg-[#9FE2BF] p-8 rounded-[6px]">
      <p className="text-slate-800 italic mb-6">"{quote}"</p>
      <div className="text-right">
        <p className="font-bold text-slate-900">{name}</p>
        <p className="text-sm text-slate-700">{role}</p>
      </div>
    </div>
  </div>
);


const LandingPage: React.FC<{ onNavigate: (page: Page) => void; }> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headingText = "AI-Powered Career Growth.";

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const features = [
    { icon: <IconFileText className="w-12 h-12 text-slate-900"/>, title: "AI Resume Builder", description: "Craft ATS-friendly resumes with AI-powered suggestions." },
    { icon: <IconBriefcase className="w-12 h-12 text-slate-900"/>, title: "Mock Interviews", description: "Practice with an AI interviewer and get instant feedback." },
    { icon: <IconMap className="w-12 h-12 text-slate-900"/>, title: "Learning Roadmaps", description: "Generate personalized learning paths for your target role." },
    { icon: <IconSparkles className="w-12 h-12 text-slate-900"/>, title: "Cover Letter Generator", description: "Create tailored cover letters in seconds from a job description." }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => setActiveIndex(prev => (prev - 1 + features.length) % features.length);
  const handleNext = () => setActiveIndex(prev => (prev + 1) % features.length);

  const getTransformStyle = (offset: number) => {
    if (isMobile) {
      switch (offset) {
        case 0:
            return { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 10 };
        case 1:
        case -1:
            return { transform: `translateX(${Math.sign(offset) * 100}%) scale(0.8)`, opacity: 0, zIndex: 5, pointerEvents: 'none' };
        default:
            return { transform: `translateX(${Math.sign(offset) * 100}%) scale(0.7)`, opacity: 0, zIndex: 0, pointerEvents: 'none' };
      }
    }
    
    // Desktop "cover flow" logic
    const translateXRight = 'clamp(30%, 50vw - 190px, 50%)';
    const translateXLeft = 'clamp(-50%, -50vw + 190px, -30%)';

    switch (offset) {
        case 0:
            return { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 10, filter: 'blur(0px)' };
        case 1:
            return { transform: `translateX(${translateXRight}) scale(0.85) rotateY(-45deg)`, opacity: 0.6, zIndex: 5, filter: 'blur(2px)' };
        case -1:
            return { transform: `translateX(${translateXLeft}) scale(0.85) rotateY(45deg)`, opacity: 0.6, zIndex: 5, filter: 'blur(2px)' };
        default:
            return { transform: `translateX(${Math.sign(offset) * 50}%) scale(0.7)`, opacity: 0, zIndex: 0, filter: 'blur(4px)' };
    }
  };

  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;
    if (Math.abs(offset) > features.length / 2) {
        const sign = Math.sign(offset);
        offset = offset - (sign * features.length);
    }
    return getTransformStyle(offset);
  };


  return (
    <div className="bg-[#000000] text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IconSparkles className="w-8 h-8 text-[#9FE2BF]" />
          <h1 className="text-2xl font-bold">CareerNest</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#features" onClick={handleScrollLink} className="hover:text-[#A7D7C5] transition-colors cursor-pointer">Features</a>
          <a href="#pricing" onClick={handleScrollLink} className="hover:text-[#A7D7C5] transition-colors cursor-pointer">Pricing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('auth'); }} className="text-white hover:text-[#A7D7C5] transition-colors">Login</a>
          <button onClick={() => onNavigate('auth')} className="bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <IconMenu className="w-6 h-6 text-white" />
            </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col p-6 md:hidden animate-fade-in">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <IconSparkles className="w-8 h-8 text-[#9FE2BF]" />
              <h1 className="text-2xl font-bold">CareerNest</h1>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <IconX className="w-8 h-8 text-white" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow space-y-8 text-center">
            <a href="#features" onClick={(e) => { handleScrollLink(e); setIsMobileMenuOpen(false); }} className="text-2xl hover:text-[#A7D7C5] transition-colors">Features</a>
            <a href="#pricing" onClick={(e) => { handleScrollLink(e); setIsMobileMenuOpen(false); }} className="text-2xl hover:text-[#A7D7C5] transition-colors">Pricing</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('auth'); setIsMobileMenuOpen(false); }} className="text-2xl text-white hover:text-[#A7D7C5] transition-colors">Login</a>
            <button onClick={() => { onNavigate('auth'); setIsMobileMenuOpen(false); }} className="bg-[#9FE2BF] hover:bg-[#8AD8AE] text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors text-lg w-full max-w-xs">Sign Up</button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative text-center py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-image.jpg" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight scroll-animate text-neon">
            {headingText.split(' ').map((word, wordIndex, wordsArray) => (
              <span key={wordIndex} className="inline-block">
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className="animate-bounce-letter">
                    {char}
                  </span>
                ))}
                {wordIndex < wordsArray.length - 1 && ' '}
              </span>
            ))}
          </h2>
          <p className="text-xl text-[#CCCCCC] max-w-2xl mx-auto mb-8 scroll-animate" style={{'--scroll-delay': '100ms'}}>
            Build the perfect resume, ace your interviews, and create a personalized learning roadmap to land your dream job.
          </p>
          <button onClick={() => onNavigate('dashboard')} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl shadow-[#9FE2BF]/40 hover:shadow-[#9FE2BF]/60 scroll-animate" style={{'--scroll-delay': '200ms'}}>
            Start Building Your Future
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-6 overflow-x-clip">
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 scroll-animate">All The Tools You Need To Succeed</h2>
            <div className="relative flex items-center justify-center h-[320px] md:h-[380px] scroll-animate" style={{ perspective: '1000px', '--scroll-delay': '100ms' }}>
                <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    {features.map((feature, index) => {
                        const style = getCardStyle(index);
                        const isCurrent = index === activeIndex;

                        return (
                            <div
                                key={feature.title}
                                className="absolute top-0 left-0 right-0 mx-auto w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-md transition-all duration-500 ease-in-out"
                                style={style}
                            >
                                <div className={`${isCurrent ? 'glow-card-container' : ''} overflow-hidden rounded-lg p-[2px] ${isCurrent ? 'transform transition-transform hover:-translate-y-2' : ''}`}>
                                    <div className="h-full bg-[#9FE2BF] p-6 rounded-[6px] shadow-lg text-center min-h-[240px] flex flex-col justify-center items-center">
                                      <div className="flex justify-center mb-4">{feature.icon}</div>
                                      <h3 className="text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
                                      <p className="text-slate-800">{feature.description}</p>
                                    </div>
                                  </div>
                            </div>
                        );
                    })}
                </div>
                
                <button 
                    onClick={handlePrev} 
                    className="absolute left-2 md:left-4 lg:-left-4 top-1/2 -translate-y-1/2 bg-gray-200/60 hover:bg-gray-300 rounded-full p-3 text-gray-800 transition z-20"
                    aria-label="Previous feature"
                >
                    <IconChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={handleNext} 
                    className="absolute right-2 md:right-4 lg:-right-4 top-1/2 -translate-y-1/2 bg-gray-200/60 hover:bg-gray-300 rounded-full p-3 text-gray-800 transition z-20"
                    aria-label="Next feature"
                >
                    <IconChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 scroll-animate">Choose Your Plan</h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard plan="Free" price="$0" features={["1 Resume", "1 Cover Letter", "1 Mock Interview/week", "Limited AI suggestions"]} delay={0}/>
            <PricingCard plan="Pro" price="$12" features={["Unlimited Resumes", "Unlimited Cover Letters", "Unlimited Mock Interviews", "Advanced AI Insights", "Portfolio Generator", "Priority Support"]} primary delay={100} />
             <PricingCard plan="Teams" price="Contact Us" features={["All Pro features", "Team analytics", "Centralized billing", "Admin dashboard", "Dedicated account manager"]} delay={200} />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#282828] px-6">
         <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-white scroll-animate">Loved by Professionals</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <TestimonialCard quote="CareerNest completely changed my job search. The resume builder helped me get past filters, and the mock interview gave me the confidence I needed." name="Sarah J." role="Software Engineer" delay={0} />
                <TestimonialCard quote="As a career changer, the learning roadmap was invaluable. It gave me a clear path and kept me motivated. I landed a new role in 3 months!" name="Michael B." role="UX Designer" delay={100} />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] border-t border-[#3C3C3C]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 scroll-animate">
              <div className="flex items-center gap-2 mb-4">
                <IconSparkles className="w-8 h-8 text-[#9FE2BF]" />
                <h1 className="text-2xl font-bold text-white">CareerNest</h1>
              </div>
              <p className="text-[#9FE2BF] opacity-70 text-sm">AI-Powered Career Growth.</p>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="scroll-animate" style={{'--scroll-delay': '100ms'}}>
                <h4 className="font-bold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" onClick={handleScrollLink} className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" onClick={handleScrollLink} className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('mock_interview'); }} className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Mock Interviews</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('resume_builder'); }} className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Resume Builder</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('roadmap'); }} className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Roadmaps</a></li>
                </ul>
              </div>
              <div className="scroll-animate" style={{'--scroll-delay': '200ms'}}>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-[#9FE2BF] hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="scroll-animate" style={{'--scroll-delay': '300ms'}}>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-[#9FE2BF] hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-6 mt-8 pt-8 pb-8 border-t border-[#3C3C3C] flex flex-col sm:flex-row justify-between items-center scroll-animate" style={{'--scroll-delay': '400ms'}}>
            <p className="text-sm text-[#9FE2BF] opacity-70">&copy; {new Date().getFullYear()} CareerNest. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-[#9FE2BF] hover:text-white transition-colors"><IconTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-[#9FE2BF] hover:text-white transition-colors"><IconGithub className="w-5 h-5" /></a>
              <a href="#" className="text-[#9FE2BF] hover:text-white transition-colors"><IconLinkedIn className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;