import React, { useState, useEffect } from "react";
import PhoneFrame from "./components/PhoneFrame";
import GuideSection from "./components/GuideSection";
import ShortsFeed from "./components/ShortsFeed";
import AIMentor from "./components/AIMentor";
import CommunityCollab from "./components/CommunityCollab";
import VerifyUserModal from "./components/VerifyUserModal";
import ResumeBuilder from "./components/ResumeBuilder";
import { Hackathon, Internship, CodingLanguage, EducationalVideo, UserProfile } from "./types";
import { BookOpen, Compass, Sparkles, Users, Award, ShieldCheck, Heart, FileText } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"guide" | "shorts" | "mentor" | "community" | "resume">("guide");
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [languages, setLanguages] = useState<CodingLanguage[]>([]);
  
  const [videos, setVideos] = useState<EducationalVideo[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    // 1. Load User Profile from localStorage or set defaults
    const storedProfile = localStorage.getItem("btech_user_profile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    } else {
      const defaultProf: UserProfile = {
        fullName: "Mayank Sharma",
        collegeName: "IIT Delhi",
        year: 3,
        department: "Computer Science Engineering",
        primaryLanguage: "JavaScript/TypeScript",
        careerGoal: "Full-Stack Software Engineer (AI integrations)",
        isVerified: false,
        cgpa: 8.5,
        familyIncome: "2.5-6",
        category: "General",
        gender: "Male",
        domicileState: "Delhi",
        phoneNumber: "+91 98765 43210",
        emailAddress: "mayank@iitd.ac.in",
        githubUrl: "https://github.com/mayank-sharma",
        linkedinUrl: "https://linkedin.com/in/mayank-sharma",
        skillsList: "React, Node.js, TypeScript, Python, TailwindCSS, Express, MongoDB, Git, Docker",
        projectsText: "AI Study Mentor - Built smart B.Tech personalized companion utilizing Gemini-3.5 API and Express.\nCollege ERP System - Deployed a scalable university grade portal handling high concurrency using React and Node.",
        experienceText: "Frontend Developer Intern at Google (Summer 2025) - Developed dynamic UI features using TypeScript.\nUndergraduate Research Assistant at IIT Delhi - Assisted with multi-modal LLM prompt engineering tasks."
      };
      setUserProfile(defaultProf);
      localStorage.setItem("btech_user_profile", JSON.stringify(defaultProf));
    }

    // 2. Fetch curated materials
    const fetchCuratedData = async () => {
      try {
        const response = await fetch("/api/curated");
        const data = await response.json();
        setHackathons(data.hackathons || []);
        setInternships(data.internships || []);
        setLanguages(data.languages || []);
      } catch (error) {
        console.error("Error fetching curated guide information", error);
      }
    };

    // 3. Fetch educational short videos
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        setVideos(data || []);
      } catch (error) {
        console.error("Error fetching shorts", error);
      } finally {
        setIsLoading(false);
      }
    };

    Promise.all([fetchCuratedData(), fetchVideos()]);
  }, []);

  const handleUpdateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem("btech_user_profile", JSON.stringify(profile));
  };

  const handleLikeVideo = async (id: string) => {
    try {
      const response = await fetch("/api/videos/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        setVideos(prev => 
          prev.map(v => v.id === id ? { ...v, likes: data.likes } : v)
        );
      }
    } catch (error) {
      console.error("Could not heart video post", error);
    }
  };

  const handleAddVideo = async (newPost: { title: string; description: string; tags: string[] }) => {
    if (!userProfile) return;

    try {
      const response = await fetch("/api/videos/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          description: newPost.description,
          tags: newPost.tags,
          uploaderName: userProfile.fullName,
          uploaderTitle: `${userProfile.year}rd Yr B.Tech, ${userProfile.department}`,
          isVerified: userProfile.isVerified,
          videoUrl: "custom_animated_svg"
        }),
      });
      const data = await response.json();
      if (data.success) {
        setVideos(prev => [data.video, ...prev]);
        setActiveTab("shorts"); // automatically jump to playing feed/shorts tab to show newly contributed post
      }
    } catch (error) {
      console.error("Could not post educational video guide", error);
    }
  };

  const handleVerifySuccess = (verifier: { fullName: string; collegeName: string; department: string }) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        fullName: verifier.fullName,
        collegeName: verifier.collegeName,
        department: verifier.department,
        isVerified: true
      };
      handleUpdateProfile(updatedProfile);
    }
  };

  return (
    <div id="app-root-wrapper" className="min-h-screen bg-slate-950 font-sans">
      
      <PhoneFrame 
        title="BTech Books" 
        showBack={activeTab !== "guide"} 
        onBack={() => setActiveTab("guide")}
      >
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-3">
            <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Loading Academic Guide engine...</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
            
            {/* Inner dynamic view loader */}
            <div className="flex-grow overflow-hidden flex flex-col">
              {activeTab === "guide" && (
                <GuideSection 
                  hackathons={hackathons} 
                  internships={internships} 
                  languages={languages} 
                />
              )}
              
              {activeTab === "shorts" && (
                <ShortsFeed 
                  videos={videos} 
                  userProfile={userProfile}
                  onLikeVideo={handleLikeVideo}
                  onAddVideo={handleAddVideo}
                  onOpenVerification={() => setShowVerificationModal(true)}
                />
              )}

              {activeTab === "mentor" && (
                <AIMentor 
                  userProfile={userProfile} 
                  onUpdateProfile={handleUpdateProfile} 
                />
              )}

              {activeTab === "resume" && (
                <ResumeBuilder 
                  userProfile={userProfile} 
                  onUpdateProfile={handleUpdateProfile} 
                />
              )}

              {activeTab === "community" && (
                <CommunityCollab 
                  userProfile={userProfile}
                  onOpenVerification={() => setShowVerificationModal(true)}
                  verifiedContributorsCount={videos.filter(v => v.isVerified).length}
                />
              )}
            </div>

            {/* Verification Request Modal overlay */}
            {showVerificationModal && (
              <VerifyUserModal 
                onClose={() => setShowVerificationModal(false)}
                onVerifySuccess={handleVerifySuccess}
              />
            )}

            {/* Smart Phone Bottom Navigation Dock bar */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-white/95 backdrop-blur-lg border-t border-slate-200 grid grid-cols-5 items-center justify-center select-none z-30 px-2 shadow-lg">
              
              {/* Tab 1: Knowledge guides */}
              <button
                onClick={() => setActiveTab("guide")}
                className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                  activeTab === "guide" ? "text-indigo-600 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
                id="nav-tab-guide"
              >
                <BookOpen size={17} />
                <span className="text-[10px] tracking-tight">Curated Guide</span>
              </button>

              {/* Tab 2: TikTok style short clips */}
              <button
                onClick={() => setActiveTab("shorts")}
                className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                  activeTab === "shorts" ? "text-rose-600 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
                id="nav-tab-shorts"
              >
                <Compass size={17} />
                <span className="text-[10px] tracking-tight">Peer Shorts</span>
              </button>

              {/* Tab 3: AI personalized adviser roadmap */}
              <button
                onClick={() => setActiveTab("mentor")}
                className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                  activeTab === "mentor" ? "text-indigo-600 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
                id="nav-tab-mentor"
              >
                <Sparkles size={17} />
                <span className="text-[10px] tracking-tight">AI Mentor</span>
              </button>

              {/* Tab 4: Professional Resume Builder */}
              <button
                onClick={() => setActiveTab("resume")}
                className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                  activeTab === "resume" ? "text-indigo-600 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
                id="nav-tab-resume"
              >
                <FileText size={17} />
                <span className="text-[10px] tracking-tight">Resume</span>
              </button>

              {/* Tab 5: Student community hub */}
              <button
                onClick={() => setActiveTab("community")}
                className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                  activeTab === "community" ? "text-indigo-600 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
                id="nav-tab-community"
              >
                <Users size={17} />
                <span className="text-[10px] tracking-tight">Peer Collab</span>
              </button>

            </div>

          </div>
        )}
      </PhoneFrame>

    </div>
  );
}
