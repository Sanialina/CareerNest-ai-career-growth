import { GoogleGenAI } from "@google/genai";
import { Message, Feedback, ResumeData, RoadmapStep, Suggestion } from '../types';

// This is a mock service to simulate Gemini API calls.
// In a real application, you would use the @google/genai library here.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const getInterviewFeedback = async (chatHistory: Message[]): Promise<Feedback> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const userResponses = chatHistory.filter(m => m.sender === 'user');
  const score = 60 + Math.floor(Math.random() * 35); // Random score between 60 and 95

  return {
    overallScore: score,
    strengths: [
      "You provided a clear introduction about your background.",
      "Good use of the STAR method when describing your challenging project.",
      "Showed enthusiasm for the role and the company.",
    ],
    weaknesses: [
      "Your answer about future goals could be more specific and aligned with the company's vision.",
      "Could have asked more insightful questions at the end of the interview.",
    ],
    suggestions: [
      "Research the company's recent achievements and tie your career goals to them.",
      "Prepare 2-3 specific questions about the team, culture, or technical challenges.",
      "Practice articulating your long-term vision with more confidence.",
    ],
  };
};

export const generateCoverLetter = async (jobDescription: string, tone: string): Promise<string> => {
  if (!jobDescription) {
    return "Please provide a job description to generate a cover letter.";
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockLetter = `[Your Name]
[Your Address] | [Your Phone Number] | [Your Email]

[Date]

[Hiring Manager Name] (If known, otherwise use title)
[Hiring Manager Title]
[Company Name]
[Company Address]

Dear [Mr./Ms./Mx. Last Name],

I am writing to express my enthusiastic interest in the [Job Title] position at [Company Name], which I discovered on [Platform where you saw the ad]. Having followed [Company Name]'s innovative work in [Industry] for some time, I have been consistently impressed by your commitment to [mention a company value, project, or achievement]. Given my [Number] years of experience in [Your Field], I am confident that I possess the skills and qualifications necessary to make a significant contribution to your team.

In my previous role at [Previous Company], I was responsible for [mention a key responsibility]. One of my proudest achievements was [describe a specific accomplishment with a quantifiable result, e.g., "leading a project that increased user engagement by 20%"]. This experience has honed my abilities in [mention 2-3 key skills from the job description], which I see are essential for this role.

I am particularly drawn to this opportunity at [Company Name] because of [mention something specific about the company, its culture, or the role that excites you]. My expertise in [mention another relevant skill] aligns perfectly with the requirements you've outlined, and I am eager to bring my passion for [Your Field] to a forward-thinking company like yours.

Thank you for considering my application. I have attached my resume for your review and would welcome the opportunity to discuss how my experience and dedication can benefit [Company Name]. I look forward to hearing from you soon.

Sincerely,
[Your Name]`;

  return mockLetter;
};

export const getResumeSuggestions = async (resumeData: ResumeData): Promise<Record<string, Suggestion[]>> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestions: Record<string, Suggestion[]> = {};

    if (resumeData.summary.length > 0) {
        suggestions.summary = [
            { type: 'structure', text: "Consider adding a quantifiable achievement to your summary to make it more impactful. e.g., '...resulting in a 20% increase in user engagement.'" },
            { type: 'grammar', text: "The term 'passionate' is slightly overused. Consider alternatives like 'dedicated' or 'results-oriented'." }
        ];
    }

    resumeData.experience.forEach((exp) => {
        if (exp.description.length > 0) {
            suggestions[`experience_${exp.id}_description`] = [
                { type: 'grammar', text: `Use stronger action verbs. Instead of "Led a team", try "Spearheaded a cross-functional team" for your role at ${exp.company}.`},
                { type: 'ats', text: "Include keywords from the job description. For a senior role, consider adding terms like 'mentorship', 'code review', or 'system design'."}
            ];
        }
    });
    
    if (resumeData.skills.length > 0) {
        suggestions.skills = [
             { type: 'ats', text: "Tailor your skills to the job description. We noticed the job requires 'GraphQL', which is missing from your list." }
        ];
    }

    return suggestions;
};

export const generateLearningRoadmap = async (careerGoal: string): Promise<RoadmapStep[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!careerGoal) return [];

    return [
        {
            id: 1,
            title: "Phase 1: Foundational Skills",
            description: "Strengthen the core concepts necessary for a " + careerGoal + ".",
            resources: [
                { title: "Official Documentation", url: "#" },
                { title: "Beginner's Course on Coursera", url: "#" }
            ],
            completed: false,
        },
        {
            id: 2,
            title: "Phase 2: Intermediate Concepts & Tooling",
            description: "Dive deeper into advanced topics and learn the essential tools of the trade.",
            resources: [
                { title: "Advanced Guide on freeCodeCamp", url: "#" },
                { title: "Workshop on Popular Tools", url: "#" }
            ],
            completed: false,
        },
        {
            id: 3,
            title: "Phase 3: Practical Application",
            description: "Build real-world projects to solidify your knowledge and create a portfolio.",
            resources: [
                { title: "Project-Based Learning Tutorial", url: "#" },
                { title: "GitHub Repositories for Inspiration", url: "#" }
            ],
            completed: false,
        },
        {
            id: 4,
            title: "Phase 4: Specialization & Interview Prep",
            description: "Focus on a niche area and prepare for technical and behavioral interviews.",
            resources: [
                { title: "Specialization Track on Pluralsight", url: "#" },
                { title: "Mock Interview with CareerNest", url: "#" }
            ],
            completed: false,
        }
    ];
};

export const getJobApplicationRecommendation = async (role: string, company: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return `For the ${role} role at ${company}, recommend using your 'Senior Software Engineer' resume. Highlight projects related to analytics dashboards and team leadership. Consider creating a new cover letter emphasizing your React and Node.js skills.`;
};