export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  dateRange: string;
  registrationCost: string; // "Free & Open" / "Paid"
  isOfficialLegit: boolean;
  registrationLink: string;
  tags: string[];
  description: string;
  realWorldImpact: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  stipend: string; // e.g., "Rs. 45,000 / month" or "$7,000 total"
  applicationCost: string; // "Free application (Legitimate)"
  eligibility: string;
  applicationLink: string;
  keyDetails: string;
  realWorldTip: string;
}

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  timeframe: string; // e.g. "Year 2, Semester 1"
  status: "pending" | "completed";
  recommendedLink?: string;
  suggestedResource?: string;
}

export interface CodingLanguage {
  id: string;
  name: string;
  popularity: string;
  bestFor: string[];
  aiIntegrationTips: string;
  industryImpact: string;
  learningRoadmapLink: string;
}

export interface EducationalVideo {
  id: string;
  title: string;
  uploaderName: string;
  uploaderTitle: string; // e.g., "3rd Yr B.Tech, CSE"
  isVerified: boolean;
  videoUrl: string; // can be a video placeholder pattern or dynamic custom animated svg element
  likes: number;
  tags: string[];
  description: string;
  comments: string[];
  postedAt: string;
}

export interface UserProfile {
  year: number; // 1 | 2 | 3 | 4 | 5
  department: string;
  primaryLanguage: string;
  careerGoal: string;
  fullName: string;
  collegeName: string;
  isVerified: boolean;
  // Scholarship and Resume fields
  cgpa?: number;
  familyIncome?: string; // "less-2.5" | "2.5-6" | "6-8" | "above-8"
  category?: string; // "General" | "OBC" | "SC" | "ST"
  gender?: string; // "Male" | "Female" | "Other"
  domicileState?: string;
  phoneNumber?: string;
  emailAddress?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  skillsList?: string;
  projectsText?: string;
  experienceText?: string;
}

export interface AIAdvisorResponse {
  customRoadmap: CareerMilestone[];
  motivationQuote: string;
  personalizedAdvice: string;
  recommendedLanguagesAndAIPaths: Array<{
    language: string;
    actionableAITip: string;
    resourceName: string;
    resourceLink: string;
  }>;
}
