import React, { useState, useEffect } from "react";
import { UserProfile, AIAdvisorResponse, CareerMilestone } from "../types";
import { 
  Sparkles, 
  Send, 
  Cpu, 
  Settings, 
  CheckSquare, 
  Square, 
  BrainCircuit, 
  ExternalLink,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Bookmark
} from "lucide-react";

interface AIMentorProps {
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function AIMentor({ userProfile, onUpdateProfile }: AIMentorProps) {
  const [year, setYear] = useState(userProfile?.year || 3);
  const [department, setDepartment] = useState(userProfile?.department || "Computer Science Engineering");
  const [primaryLanguage, setPrimaryLanguage] = useState(userProfile?.primaryLanguage || "JavaScript/TypeScript");
  const [careerGoal, setCareerGoal] = useState(userProfile?.careerGoal || "Full-Stack Software Engineer (AI integrations)");
  const [fullName, setFullName] = useState(userProfile?.fullName || "");
  const [collegeName, setCollegeName] = useState(userProfile?.collegeName || "");

  const [isLoading, setIsLoading] = useState(false);
  const [advisorData, setAdvisorData] = useState<AIAdvisorResponse | null>(null);
  
  // Track checked milestones local state
  const [completedMilestoneIds, setCompletedMilestoneIds] = useState<string[]>([]);

  // Load advisor response and milestones completed states from localStorage if they exist
  useEffect(() => {
    try {
      const storedAdvice = localStorage.getItem("btech_advisor_advice");
      if (storedAdvice) {
        setAdvisorData(JSON.parse(storedAdvice));
      }
      const storedCompletedIds = localStorage.getItem("btech_completed_milestone_ids");
      if (storedCompletedIds) {
        setCompletedMilestoneIds(JSON.parse(storedCompletedIds));
      }
    } catch (e) {
      console.error("Error reading stored advisor state", e);
    }
  }, []);

  const handleGenerateAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName || !fullName) {
      alert("Please enter your name and college name to customize your roadmap!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini/profile-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          department,
          primaryLanguage,
          careerGoal,
          fullName,
          collegeName
        }),
      });
      const data = await response.json();
      
      setAdvisorData(data);
      // Persist advisor data
      localStorage.setItem("btech_advisor_advice", JSON.stringify(data));
      
      // Save current user profile changes
      onUpdateProfile({
        year,
        department,
        primaryLanguage,
        careerGoal,
        fullName,
        collegeName,
        isVerified: userProfile?.isVerified || false
      });

      // Clear completed milestones because roadmap got updated
      setCompletedMilestoneIds([]);
      localStorage.removeItem("btech_completed_milestone_ids");

    } catch (error) {
      console.error("Could not fetch personalized advisor data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMilestone = (id: string) => {
    let updated: string[];
    if (completedMilestoneIds.includes(id)) {
      updated = completedMilestoneIds.filter(val => val !== id);
    } else {
      updated = [...completedMilestoneIds, id];
    }
    setCompletedMilestoneIds(updated);
    localStorage.setItem("btech_completed_milestone_ids", JSON.stringify(updated));
  };

  const handleResetProfile = () => {
    setAdvisorData(null);
    localStorage.removeItem("btech_advisor_advice");
    localStorage.removeItem("btech_completed_milestone_ids");
    setCompletedMilestoneIds([]);
  };

  return (
    <div className="flex-grow flex flex-col h-full bg-slate-50 overflow-y-auto select-text font-sans scrollbar-thin">
      
      {isLoading ? (
        // Highly futuristic loader - styled after light Bento
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-4 min-h-[400px]">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-indigo-500/10 border-t-indigo-600 animate-spin" />
            <BrainCircuit className="absolute inset-0 m-auto text-indigo-600 animate-pulse" size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">Orchestrating Gemini AI</h3>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed font-sans">
              Synthesizing syllabus milestones, legitimate coding link resources, and real career tips custom to {fullName || "your studies"}...
            </p>
          </div>
        </div>
      ) : advisorData ? (
        // Render advice result and interactive roadmaps
        <div className="p-3.5 space-y-4 pb-20 select-text">
          
          {/* Main header title card */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="text-indigo-600" size={16} />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 font-mono">Your AI Career Map</h3>
            </div>
            
            <button
              onClick={handleResetProfile}
              className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-mono text-slate-600 cursor-pointer shadow-xs font-bold transition"
              title="Reset Profile Form"
            >
              <RotateCcw size={10} />
              <span>Modify Info</span>
            </button>
          </div>

          {/* Dynamic Personalized counseling greeting */}
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-2">
            <span className="text-[9px] font-mono font-bold text-indigo-800 uppercase tracking-widest">
              PEER COUNSELOR BRIEFING
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-sans select-text">
              {advisorData?.personalizedAdvice}
            </p>
          </div>

          {/* Dynamic Motivation Quotation Box */}
          <div className="p-4 bg-rose-50/50 font-serif italic text-rose-950 text-xs border-l-3 border-rose-500 rounded-r-3xl leading-relaxed select-text shadow-xs">
            {advisorData?.motivationQuote}
          </div>

          {/* Core Interactive Roadmap Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wide uppercase flex items-center gap-1.5">
                <CheckSquare size={13} className="text-indigo-600" />
                <span>Actionable Semester Milestones</span>
              </span>
              <span className="text-[10px] font-mono bg-white text-indigo-700 px-2.5 py-0.5 rounded-full border border-slate-200 font-bold shadow-xs">
                {completedMilestoneIds.length} / {advisorData?.customRoadmap.length} Done
              </span>
            </div>

            <div className="grid gap-3">
              {advisorData?.customRoadmap.map((milestone) => {
                const isDone = completedMilestoneIds.includes(milestone.id);
                return (
                  <div 
                    key={milestone.id} 
                    className={`p-4 rounded-2xl border transition flex items-start gap-3 select-text ${
                      isDone 
                        ? "bg-slate-100 border-slate-200 text-slate-400" 
                        : "bg-white border-slate-200 hover:border-indigo-200 text-slate-850 hover:shadow-xs"
                    }`}
                  >
                    {/* Tick box checkbox */}
                    <button
                      onClick={() => toggleMilestone(milestone.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-600 flex-shrink-0 transition cursor-pointer"
                      id={`checkbox-milestone-${milestone.id}`}
                    >
                      {isDone ? (
                        <CheckSquare className="text-emerald-500" size={17} />
                      ) : (
                        <Square className="text-slate-300" size={17} />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className={`text-xs font-bold leading-tight ${isDone ? "line-through text-slate-400" : "text-slate-800"}`}>
                          {milestone.title}
                        </span>
                        <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded-full border border-slate-250 font-medium">
                          {milestone.timeframe}
                        </span>
                      </div>
                      
                      <p className={`text-[11px] leading-relaxed ${isDone ? "text-slate-400" : "text-slate-600"}`}>
                        {milestone.description}
                      </p>

                      {milestone.suggestedResource && (
                        <div className="text-[10px] text-indigo-600/90 flex items-center gap-1 font-sans font-medium pt-0.5">
                          <BookOpen size={10} className="flex-shrink-0 text-indigo-500" />
                          <span>Resource: <strong>{milestone.suggestedResource}</strong></span>
                        </div>
                      )}

                      {milestone.recommendedLink && (
                        <a
                          href={milestone.recommendedLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-indigo-650 hover:underline font-mono font-bold mt-1"
                        >
                          <span>Official Reference Link</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coding and AI Integration guide path section */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wide uppercase flex items-center gap-1.5">
              <Cpu size={14} className="text-rose-500" />
              <span>AI Integration Advice For {primaryLanguage}</span>
            </span>

            {advisorData?.recommendedLanguagesAndAIPaths?.map((path, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3 shadow-xs select-text"
              >
                <div className="flex items-center gap-1.5 animate-fade-in">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                  <span className="text-xs font-extrabold text-rose-800 font-mono bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                    {path.language} AI Roadmap
                  </span>
                </div>
                
                <p className="text-xs text-slate-650 leading-relaxed font-sans">
                  {path.actionableAITip}
                </p>

                {path.resourceName && (
                  <div className="pt-2.5 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono pr-2">
                    <span className="text-slate-400">Resource: {path.resourceName}</span>
                    <a 
                      href={path.resourceLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 font-bold"
                    >
                      Open Link <ExternalLink size={9} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      ) : (
        // Configure Profile Form UI
        <div className="p-4 space-y-4 pb-20">
          
          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-1.5 shadow-xs">
            <h3 className="text-sm font-extrabold text-indigo-900 flex items-center gap-1">
              <Cpu className="text-indigo-600" size={16} />
              AI Student Personalization
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
              Provide your details below. Gemini AI will automatically calculate your optimized weekly milestones, choose resources tailored to your goals, and outline a complete B.Tech roadmap for your engineering stack!
            </p>
          </div>

          <form onSubmit={handleGenerateAdvisor} className="space-y-4 select-text">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">your name</label>
              <input
                type="text"
                required
                placeholder="e.g. Mayank Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans shadow-xs"
              />
            </div>

            {/* College */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">College / Institute Name</label>
              <input
                type="text"
                required
                placeholder="e.g. VIT Vellore / IIT Delhi"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans shadow-xs"
              />
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Current B.Tech Year</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((yr) => (
                  <button
                    type="button"
                    key={yr}
                    onClick={() => setYear(yr)}
                    className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      year === yr 
                        ? "bg-indigo-600 text-white shadow-sm" 
                        : "bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-600"
                    }`}
                  >
                    Year {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">department branch</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans shadow-xs"
              >
                <option value="Computer Science Engineering">Computer Science (CSE)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Electronics & Communication">Electronics & Comm (ECE)</option>
                <option value="Information Science">Information Science (ISE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                <option value="Electrical Engineering">Electrical Engineering (EE)</option>
              </select>
            </div>

            {/* Coding Language */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Primary favorite language</label>
              <select
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans shadow-xs"
              >
                <option value="Python">Python (Data Science, Machine Learning, Algos)</option>
                <option value="JavaScript/TypeScript">JavaScript / TypeScript (Full-Stack Applications)</option>
                <option value="C++">C++ (Competitive Coding, Microcontrollers, Systems)</option>
                <option value="Java">Java (Enterprise Cloud, Standard Native Android)</option>
              </select>
            </div>

            {/* Career Goal */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">target Career aspiration</label>
              <input
                type="text"
                required
                placeholder="e.g. Full-Stack SWE, Data Scientist"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-100 transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer pt-3 mt-4"
            >
              <Sparkles size={13} />
              <span>Synthesize AI Personalization Map</span>
            </button>

          </form>
        </div>
      )}

    </div>
  );
}
