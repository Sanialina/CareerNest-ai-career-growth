import React, { useState } from 'react';
import { Page } from '../App';
import { IconGoogle, IconLinkedIn, IconSparkles } from '../components/IconComponents';

interface AuthPageProps {
  onNavigate: (page: Page) => void;
}

type AuthMode = 'signin' | 'signup';

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
    const [mode, setMode] = useState<AuthMode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleMode = () => {
        setMode(prevMode => (prevMode === 'signin' ? 'signup' : 'signin'));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication logic
        if (email && password) {
            if (mode === 'signup') {
                onNavigate('onboarding');
            } else {
                onNavigate('dashboard');
            }
        } else {
            alert('Please fill in all fields.');
        }
    };
    
    const handleSocialLogin = (provider: string) => {
        alert(`This is a mock login with ${provider}. In a real app, this would open an OAuth flow.`);
        onNavigate('dashboard');
    }

    const isSignIn = mode === 'signin';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000] p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 scroll-animate">
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <IconSparkles className="w-10 h-10 text-[#9FE2BF]" />
                        <h1 className="text-4xl font-bold text-white">CareerNest</h1>
                    </div>
                    <p className="text-[#A9A9A9]">
                        {isSignIn ? 'Welcome back! Please sign in to your account.' : 'Create an account to start your journey.'}
                    </p>
                </div>

                <div className="bg-[#282828] p-8 rounded-2xl shadow-lg scroll-animate" style={{'--scroll-delay': '100ms'}}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#CCCCCC]">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 block w-full bg-[#3C3C3C] border-transparent rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#CCCCCC]">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isSignIn ? "current-password" : "new-password"}
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="mt-1 block w-full bg-[#3C3C3C] border-transparent rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#9FE2BF]"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-[#9FE2BF] hover:bg-[#8AD8AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#282828] focus:ring-[#9FE2BF]"
                            >
                                {isSignIn ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#4A4A4A]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#282828] text-[#A9A9A9]">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <button
                                    onClick={() => handleSocialLogin('Google')}
                                    className="w-full inline-flex justify-center py-3 px-4 border border-[#4A4A4A] rounded-md shadow-sm bg-[#3C3C3C] text-sm font-medium text-white hover:bg-[#4A4A4A]"
                                >
                                    <span className="sr-only">Sign in with Google</span>
                                    <IconGoogle className="w-5 h-5" />
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleSocialLogin('LinkedIn')}
                                    className="w-full inline-flex justify-center py-3 px-4 border border-[#4A4A4A] rounded-md shadow-sm bg-[#3C3C3C] text-sm font-medium text-white hover:bg-[#4A4A4A]"
                                >
                                    <span className="sr-only">Sign in with LinkedIn</span>
                                    <IconLinkedIn className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-[#A9A9A9]">
                    {isSignIn ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={toggleMode} className="font-medium text-[#9FE2BF] hover:text-[#A7D7C5] ml-1">
                        {isSignIn ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
                 <p className="mt-2 text-center text-sm">
                     <button onClick={() => onNavigate('landing')} className="font-medium text-[#A9A9A9] hover:text-[#CCCCCC]">
                        &larr; Back to Home
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;