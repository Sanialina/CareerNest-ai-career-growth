export type MessageSender = 'user' | 'ai' | 'system';

export interface Message {
  sender: MessageSender;
  text: string;
}

export type InterviewState = 'not_started' | 'in_progress' | 'finished';

export interface Feedback {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

// Types for Resume Builder
export interface PersonalInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    linkedin: string;
    portfolio: string;
}

export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
}

// New types for Resume Builder Suggestions
export type SuggestionType = 'grammar' | 'ats' | 'structure';

export interface Suggestion {
    type: SuggestionType;
    text: string;
}


// Types for Learning Roadmap
export interface RoadmapStep {
    id: number;
    title: string;
    description: string;
    resources: { title: string; url: string }[];
    completed: boolean;
}

export type Roadmap = RoadmapStep[];

// Types for Job Application Tracker
export type JobApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Hired';

export interface JobApplication {
    id: string;
    company: string;
    role: string;
    url: string;
    status: JobApplicationStatus;
    aiRecommendation: string;
}