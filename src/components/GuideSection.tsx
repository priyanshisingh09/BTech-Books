import React, { useState } from "react";
import { Hackathon, Internship, CodingLanguage } from "../types";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Calendar, 
  Award, 
  Search, 
  Code, 
  Sparkles, 
  Compass, 
  Cpu, 
  BookOpen, 
  Lightbulb, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";

interface GuideSectionProps {
  hackathons: Hackathon[];
  internships: Internship[];
  languages: CodingLanguage[];
}

export default function GuideSection({ hackathons, internships, languages }: GuideSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"careers" | "hackathons" | "internships" | "languages" | "scholarships">("careers");
  const [query, setQuery] = useState("");

  // Scholarship filter criteria local state
  const [familyIncome, setFamilyIncome] = useState("4.5");
  const [cgpa, setCgpa] = useState(8.5);
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("General");
  const [year, setYear] = useState(3);
  const [domicileState, setDomicileState] = useState("Delhi");

  const filteredHackathons = hackathons.filter(h => 
    h.title.toLowerCase().includes(query.toLowerCase()) || 
    h.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredInternships = internships.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) || 
    i.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800">
      
      {/* Category selector pill segment */}
      <div className="p-3 bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar select-none">
          <button
            onClick={() => { setActiveSubTab("careers"); setQuery(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === "careers" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Compass size={13} />
            <span>Career Path & Tips</span>
          </button>

          <button
            onClick={() => { setActiveSubTab("hackathons"); setQuery(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === "hackathons" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Award size={13} />
            <span>Hackathons</span>
          </button>

          <button
            onClick={() => { setActiveSubTab("internships"); setQuery(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === "internships" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Building size={13} />
            <span>Legit Internships</span>
          </button>

          <button
            onClick={() => { setActiveSubTab("languages"); setQuery(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === "languages" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Code size={13} />
            <span>Languages & AI</span>
          </button>

          <button
            onClick={() => { setActiveSubTab("scholarships"); setQuery(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === "scholarships" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Award size={13} />
            <span>Scholarships & NGA</span>
          </button>
        </div>

        {/* Global Search bar (Except Careers tab which contains long editorials) */}
        {activeSubTab !== "careers" && (
          <div className="relative mt-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeSubTab}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-9 pr-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 placeholder-slate-400 font-sans"
            />
          </div>
        )}
      </div>

      {/* Dynamic Tab Contents */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 pb-20 scrollbar-thin">

        {/* TAB 1: Careers and Motivation Editorial (Real-World & Legitimate Career Rules) */}
        {activeSubTab === "careers" && (
          <div className="space-y-4">
            
            {/* Quick Hero Banner - Styled after the Bento Hero Grid */}
            <div className="p-6 rounded-3xl bg-indigo-600 text-white space-y-2.5 relative overflow-hidden shadow-md">
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500 border border-indigo-400 text-[10px] text-white font-mono font-bold uppercase tracking-wider">
                <ShieldCheck size={11} /> 100% Legitimate Guide
              </span>
              <h3 className="text-xl font-bold tracking-tight leading-tight">Build a Genuine B.Tech Engineering Career</h3>
              <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                Modern software networks value functional project outcomes and proactive GitHub commits over stagnant college grades. Here is your roadmap strategy.
              </p>
            </div>

            {/* Core Section: What should B.Tech students do */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-600 uppercase tracking-widest font-mono">
                <Lightbulb size={14} className="text-indigo-600" />
                <span>Career Footprint Pillars</span>
              </div>

              {/* Pillar Cards (Bento Boxes) */}
              <div className="grid gap-4">
                
                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-50 text-[10px] font-mono text-indigo-600 font-bold border border-indigo-100">1</span>
                      7.5 CGPA Threshold Rule
                    </span>
                    <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">Fact</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Most product giants enforce automated filters of <strong>7.0 or 7.5 CGPA</strong> to clear campus applicants. Keep your scores above this limit, then focus 100% of your remaining energy building practical full-stack projects.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-50 text-[10px] font-mono text-indigo-600 font-bold border border-indigo-100">2</span>
                      Learn in Public & Commit Active Code
                    </span>
                    <span className="text-[9px] font-bold font-mono bg-amber-55 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 uppercase">Strategy</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Recruiters source engineers from GitHub commits and shared code logs. Publish small tips on LinkedIn/X, detailing challenges you faced and how you fixed them. Show, don't tell!
                  </p>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-50 text-[10px] font-mono text-indigo-600 font-bold border border-indigo-100">3</span>
                      Algorithmic Core (DSA) vs Projects
                    </span>
                    <span className="text-[9px] font-bold font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100 uppercase">Prep</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Divide your goals: DSA gets you past early automated puzzle assessments, but functional web/mobile systems get you through design rounds. Dedicate equal daily blocks to both domains.
                  </p>
                </div>

              </div>
            </div>

            {/* Core Section: How to stay motivated and goal-oriented */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-rose-600 uppercase tracking-widest font-mono">
                <TrendingUp size={14} className="text-rose-600" />
                <span>Habit Loop Architecture</span>
              </div>
              
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-extrabold text-slate-800">Eliminating Early Burnouts</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Huge, sudden goals trigger anxiety and failure loops. True mastery relies on reliable daily loops.
                </p>
                
                {/* Micro bento highlighted block inside */}
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 space-y-1.5">
                  <div className="text-xs font-bold text-rose-950">The Daily Atomic Code Blueprint:</div>
                  <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                    <li>One clean GitHub commit, even if it is just a documentation update.</li>
                    <li>Read 1 library/language docs page instead of scrolling.</li>
                    <li>Reach out to 1 senior on active project issues.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practical Placement Tips Checklist */}
            <div className="p-5 bg-slate-100 border border-slate-200 rounded-3xl space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                <BookOpen size={14} className="text-indigo-600" />
                <span>Placement Pro-Tips</span>
              </h4>
              <nav className="text-xs text-slate-700 space-y-2 font-medium">
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>Avoid generic templates</strong> like basic student record systems on your CV. Build live, responsive projects that solve a campus pain point.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>Pin 3 unique repos</strong> on GitHub and write thorough README explanations detailing technical setup steps.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>Present with STAR</strong> (Situation, Task, Action, Result) in interviews. State exactly what you accomplished.</span>
                </div>
              </nav>
            </div>

          </div>
        )}

        {/* TAB 2: Curated Hackathons (100% Free and Officially Vetted) */}
        {activeSubTab === "hackathons" && (
          <div className="space-y-4">
            <p className="text-[11px] text-slate-500 font-sans italic">
              Showing {filteredHackathons.length} legitimate, free national and global hackathons. Highly valuable for college resumes.
            </p>

            {filteredHackathons.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No hackathons match your search terms.</div>
            ) : (
              filteredHackathons.map((hack) => (
                <div 
                  key={hack.id} 
                  className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold text-emerald-800 font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 uppercase tracking-wider">
                      {hack.registrationCost}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      <Calendar size={10} className="text-slate-400" /> Active Season
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">{hack.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider">{hack.organizer}</p>
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hack.description}
                  </p>

                  <div className="p-3 bg-indigo-50/50 rounded-2xl text-[11px] text-indigo-900 border border-indigo-100">
                    <strong>Resume Value:</strong> {hack.realWorldImpact}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {hack.tags.map(t => (
                      <span key={t} className="text-[9px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 font-medium">#{t}</span>
                    ))}
                  </div>

                  <a 
                    href={hack.registrationLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition active:scale-98 cursor-pointer shadow-sm shadow-indigo-100"
                  >
                    <span>Register on Official Portal</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Curated Internships (Official Programs, 100% Free to apply, legitimate stipends) */}
        {activeSubTab === "internships" && (
          <div className="space-y-4">
            <p className="text-[11px] text-slate-500 font-sans italic">
              Showing {filteredInternships.length} legitimate, highly prestigious student technical internships. Apply directly via official portal.
            </p>

            {filteredInternships.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No internships match your search term.</div>
            ) : (
              filteredInternships.map((intern) => (
                <div 
                  key={intern.id} 
                  className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200 space-y-3.5 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-extrabold text-emerald-800 font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 uppercase tracking-widest flex items-center gap-1">
                      <DollarSign size={10} /> Stipend: {intern.stipend}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      Duration: {intern.duration}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">{intern.title}</h3>
                    <p className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider">{intern.company}</p>
                  </div>

                  <div className="text-[10px] text-emerald-700 bg-emerald-50/50 px-2 py-0.5 rounded-full inline-block border border-emerald-100 font-mono">
                    🛡 {intern.applicationCost}
                  </div>

                  <div className="space-y-1.5 py-0.5">
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      <strong>Eligibility:</strong> {intern.eligibility}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      <strong>Focus Areas:</strong> {intern.keyDetails}
                    </p>
                  </div>

                  <div className="p-3 bg-indigo-50/50 rounded-2xl text-[11px] text-indigo-900 border border-indigo-100">
                    <strong>Alumni Insider Tip:</strong> {intern.realWorldTip}
                  </div>

                  <a 
                    href={intern.applicationLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs font-bold text-white transition active:scale-98 cursor-pointer shadow-sm"
                  >
                    <span>Apply via Official Careers</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Coding Languages and AI integrations */}
        {activeSubTab === "languages" && (
          <div className="space-y-4">
            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-3xl shadow-xs">
              <h4 className="text-xs font-extrabold text-indigo-900 flex items-center gap-1.5 mb-1">
                <Cpu size={14} className="text-indigo-600" />
                <span>Coding x AI Architectures</span>
              </h4>
              <p className="text-xs text-indigo-950 leading-relaxed font-sans font-medium">
                Seniors who integrate core languages with modern LLM interfaces (like Gemini or OpenAI APIs) 10x their production value. Explore optimal combinations.
              </p>
            </div>

            <div className="space-y-4">
              {languages.map((lang) => (
                <div 
                  key={lang.id} 
                  className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3 shadow-xs hover:border-indigo-250 transition-all"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Code size={15} className="text-indigo-600" />
                      {lang.name}
                    </h3>
                    <span className="text-[9px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest">{lang.popularity}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {lang.bestFor.map(b => (
                      <span key={b} className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 font-medium font-bold">#{b}</span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    <strong>Industry Impact:</strong> {lang.industryImpact}
                  </p>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1">
                    <span className="text-[10px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={11} className="text-emerald-600" /> AI Framework Integration
                    </span>
                    <p className="text-xs text-emerald-900 leading-relaxed font-sans font-medium">
                      {lang.aiIntegrationTips}
                    </p>
                  </div>

                  <a 
                    href={lang.learningRoadmapLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
                  >
                    <span>Official Resource Docs</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Scholarship Eligibility Checking & NGA Schemes */}
        {activeSubTab === "scholarships" && (
          <div className="space-y-4">
            
            <div className="p-5 bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-200/40 rounded-3xl space-y-1.5">
              <h4 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <Award size={14} className="text-amber-600 animate-pulse" />
                <span>Eligibility Engine & NGA Schemes</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                Our dynamic index catalogs national government programs, corporate CSR aids, and NGA (NGO Graduate Assistance) schemes. Slide your GPA or edit factors to see matching results instantly!
              </p>
            </div>

            {/* Eligibility Parameter Tuning Card */}
            <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm text-left select-text">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest flex items-center gap-1">
                  🔍 Live Eligibility Criteria Checker
                </span>
                <span className="text-[9px] font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 font-extrabold">
                  Calculated Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide select-none">Family Income Bracket</label>
                  <select 
                    value={familyIncome} 
                    onChange={(e) => setFamilyIncome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                  >
                    <option value="2.5">Under ₹2.5 Lakhs</option>
                    <option value="4.0">Under ₹4.0 Lakhs</option>
                    <option value="4.5">Under ₹4.5 Lakhs</option>
                    <option value="6.0">Under ₹6.0 Lakhs</option>
                    <option value="8.0">Under ₹8.0 Lakhs</option>
                    <option value="15.0">Under ₹15.0 Lakhs</option>
                    <option value="100.0">No Limit (Above 15L)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide select-none">B.Tech CGPA Score ({cgpa})</label>
                  <input 
                    type="range" 
                    min="5.0" 
                    max="10.0" 
                    step="0.1"
                    value={cgpa} 
                    onChange={(e) => setCgpa(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 select-none">
                    <span>5.0</span>
                    <span>7.5</span>
                    <span>10.0</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide select-none">Candidate Gender</label>
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                  >
                    <option value="All">All / Other</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female (Unlocks pragati / tech diversities)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide select-none font-mono">Academic Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="General">General (Open Class)</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide select-none">B.Tech studied year</label>
                  <select 
                    value={year} 
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value={1}>1st Year (Freshman)</option>
                    <option value={2}>2nd Year (Sophomore)</option>
                    <option value={3}>3rd Year (Junior)</option>
                    <option value={4}>4th Year (Senior)</option>
                    <option value={5}>5th Year (Dual Degree)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide select-none">Domicile State</label>
                  <select 
                    value={domicileState} 
                    onChange={(e) => setDomicileState(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra / Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir (Unlocks PMSSS)</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results lists */}
            <div className="space-y-4">
              {SCHOLARSHIPS_DATA.map((sch) => {
                const failures: string[] = [];

                // 1. Income restriction
                if (sch.maxFamilyIncome) {
                  const currentIncomeVal = Number(familyIncome) * 100000;
                  if (currentIncomeVal > sch.maxFamilyIncome) {
                    failures.push(`Family Income limit exceeded (Must be < ₹${(sch.maxFamilyIncome/100000).toFixed(1)}L per annum)`);
                  }
                }

                // 2. GPA restriction
                if (sch.minCGPA) {
                  if (cgpa < sch.minCGPA) {
                    failures.push(`CGPA is below minimum (Required CGPA of at least ${sch.minCGPA.toFixed(1)})`);
                  }
                }

                // 3. Gender restriction
                if (sch.allowedGenders && sch.allowedGenders.length > 0) {
                  if (sch.allowedGenders.includes("Female") && !sch.allowedGenders.includes("Male") && !sch.allowedGenders.includes("All")) {
                    if (gender !== "Female") {
                      failures.push("Strictly restricted to Female technical applicants only");
                    }
                  }
                }

                // 4. College Year restriction
                if (sch.allowedYears && !sch.allowedYears.includes(Number(year))) {
                  failures.push(`Restricted to year(s): ${sch.allowedYears.join(", ")} only`);
                }

                // 5. State constraint
                if (sch.allowedStates && sch.allowedStates.length > 0 && !sch.allowedStates.includes("All")) {
                  if (!sch.allowedStates.includes(domicileState)) {
                    failures.push(`State domicile is not Jammu & Kashmir (Requires valid J&K / Ladakh Domicile Certificate)`);
                  }
                }

                const isEligible = failures.length === 0;

                return (
                  <div 
                    key={sch.id}
                    className={`p-5 rounded-3xl border text-left transition select-text ${
                      isEligible 
                        ? "bg-white border-emerald-300 shadow-sm hover:border-emerald-400" 
                        : "bg-slate-100/70 border-slate-200 opacity-75"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className={`text-[9px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded-full border ${
                        sch.category === "Government" ? "bg-amber-50 text-amber-800 border-amber-100" :
                        sch.category === "Private" ? "bg-indigo-50 text-indigo-800 border-indigo-100" :
                        "bg-teal-50 text-teal-800 border-teal-100"
                      }`}>
                        {sch.category}
                      </span>

                      {isEligible ? (
                        <span className="text-[9px] font-mono font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-full px-2.5 py-0.5 flex items-center gap-1 uppercase tracking-wider animate-pulse">
                          ● Fully Eligible
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold bg-slate-200 text-slate-500 border border-slate-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
                          Criteria Not Met
                        </span>
                      )}
                    </div>

                    <div className="space-y-0.5 mt-3 select-text">
                      <h3 className="text-xs font-bold text-slate-850 leading-tight">
                        {sch.name}
                      </h3>
                      <p className="text-[9px] text-slate-400 font-bold font-mono">
                        Provider: {sch.provider}
                      </p>
                    </div>

                    <p className="text-xs text-slate-650 mt-2 leading-relaxed">
                      {sch.description}
                    </p>

                    <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10.5px]">
                      <div className="flex justify-between items-center text-[8.5px] font-mono uppercase text-slate-400 font-extrabold">
                        <span>Eligibility Rules</span>
                        <span className={isEligible ? "text-emerald-700 font-black" : "text-amber-700 font-bold"}>
                          {isEligible ? "PASSED" : "CRITERIA BLOCKED"}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 font-sans leading-relaxed">
                        {sch.eligibilityDescription}
                      </p>

                      {failures.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/60 space-y-1">
                          {failures.map((fail, i) => (
                            <div key={i} className="text-[9.5px] text-rose-700 font-mono font-medium flex items-start gap-1 leading-normal select-text">
                              <span className="text-rose-550 flex-shrink-0 font-bold">❌</span>
                              <span>{fail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] border-t border-slate-100 pt-3 font-sans">
                      <div>
                        <span className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Annual Funding</span>
                        <strong className="text-emerald-800 text-[10.5px] font-bold">{sch.amount}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Application Status</span>
                        <span className="text-slate-600 font-semibold">{sch.deadline}</span>
                      </div>
                    </div>

                    <a
                      href={sch.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-2xl border text-xs font-bold transition cursor-pointer mt-4 shadow-xs ${
                        isEligible 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent" 
                          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      <span>Apply on Official Portal</span>
                      <ExternalLink size={9.5} />
                    </a>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// B.Tech scholarships list with eligibility rules (Legitimate CSR, NGA and Gov schemes)
// ------------------------------------------------------------------
interface ScholarshipItem {
  id: string;
  name: string;
  provider: string;
  category: "Government" | "Private" | "NGA Scheme";
  amount: string;
  deadline: string;
  officialLink: string;
  description: string;
  eligibilityDescription: string;
  maxFamilyIncome?: number; 
  minCGPA?: number;
  allowedYears?: number[];
  allowedCategories?: string[];
  allowedStates?: string[];
  allowedGenders?: string[];
}

const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
  {
    id: "s1",
    name: "NSP Central Sector Scheme (CSSS) for College Students",
    provider: "Department of Higher Education, Govt. of India",
    category: "Government",
    amount: "₹20,000 per academic year",
    deadline: "Typically October - December annually",
    officialLink: "https://scholarships.gov.in/",
    description: "Financial assistance to meritorious students hailing from families with weak economic backgrounds to meet raw college maintenance expenditures.",
    eligibilityDescription: "Class 12 board marks > 80th percentile, family annual income under ₹4,50,000, CGPA must exceed 6.0.",
    maxFamilyIncome: 450000,
    minCGPA: 6.0,
    allowedYears: [1, 2, 3, 4, 5],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["All", "Male", "Female", "Other"]
  },
  {
    id: "s2",
    name: "AICTE Pragati Scholarship for Female Tech Students",
    provider: "All India Council for Technical Education (AICTE)",
    category: "Government",
    amount: "₹50,000 as a direct tuition & materials grant",
    deadline: "Typically December annually",
    officialLink: "https://www.aicte-india.org/schemes/students-development-schemes",
    description: "A prestigious national initiative designed specifically to promote, empower, and support young women pursuing full-time technical B.Tech education.",
    eligibilityDescription: "Female students admitted to Year 1 (or Year 2 lateral entry), family annual income under ₹8,00,000.",
    maxFamilyIncome: 800000,
    minCGPA: 5.5,
    allowedYears: [1, 2],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["Female"]
  },
  {
    id: "s3",
    name: "Prime Minister's Special Scholarship Scheme (PMSSS) J&K",
    provider: "AICTE / Prime Minister PMSSS Cell",
    category: "Government",
    amount: "Full Tuition fee waivers + ₹1.0 Lakh maintenance support",
    deadline: "Typically June - July annually",
    officialLink: "https://www.aicte-jk-scholarship-gov.in/",
    description: "Sponsors undergraduate technical degrees for youth from Jammu & Kashmir and Ladakh to study outside their domicile states.",
    eligibilityDescription: "Must hold a valid Jammu & Kashmir or Ladakh domicile certificate, family annual income under ₹8,00,000.",
    maxFamilyIncome: 800000,
    minCGPA: 5.0,
    allowedYears: [1, 2, 3, 4, 5],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["Jammu & Kashmir"],
    allowedGenders: ["All", "Male", "Female", "Other"]
  },
  {
    id: "s4",
    name: "Reliance Foundation Undergraduate Merit-cum-Means Scholarships",
    provider: "Reliance Foundation (CSR Initiative)",
    category: "Private",
    amount: "Up to ₹2,00,000 over full B.Tech duration",
    deadline: "Typically October - November annually",
    officialLink: "https://www.scholarships.reliancefoundation.org/",
    description: "One of India's largest private sector scholarship schemes supporting high merit, low income students across technical degrees.",
    eligibilityDescription: "Strictly for 1st Year B.Tech students who secured high ranks in JEE Main, family annual income under ₹15,00,000.",
    maxFamilyIncome: 1500000,
    minCGPA: 6.0,
    allowedYears: [1],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["All", "Male", "Female", "Other"]
  },
  {
    id: "s5",
    name: "Adobe India Women-in-Technology Computing Scholarship",
    provider: "Adobe Systems India Corporation",
    category: "Private",
    amount: "100% full B.Tech tuition fee waiver + direct summer internship",
    deadline: "Quarterly / September annually",
    officialLink: "https://www.adobe.com/in/about-adobe/women-in-technology.html",
    description: "Extremely elite private scholarship designed to promote gender diversity in computer science. Recipients receive financial backings, internship offers, and mentorship from senior Adobe design architects.",
    eligibilityDescription: "Female students studying B.Tech Year 3 or Year 4, maintaining high academic scores (CGPA > 8.5) without pre-standing backs.",
    maxFamilyIncome: 5000000,
    minCGPA: 8.5,
    allowedYears: [3, 4],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["Female"]
  },
  {
    id: "s6",
    name: "HDFC Badhte Kadam & Educational Crisis Support Grant",
    provider: "HDFC Bank Ltd CSR Trust",
    category: "Private",
    amount: "₹75,000 custom crisis survival grant",
    deadline: "Varies (typically open around September)",
    officialLink: "https://www.vidyasaarathi.co.in/",
    description: "Provides financial aid for technical students who experienced traumatic financial crisis (e.g., parental joblessness or loss of earning member) to prevent dropouts.",
    eligibilityDescription: "Family annual income under ₹6,00,000. Priority goes to severe cases. CGPA > 6.0.",
    maxFamilyIncome: 600000,
    minCGPA: 6.0,
    allowedYears: [1, 2, 3, 4, 5],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["All", "Male", "Female", "Other"]
  },
  {
    id: "s7",
    name: "National Graduate Assistance (NGA) NGO Scholarship Association",
    provider: "National Graduate Assistance Foundation (NGO)",
    category: "NGA Scheme",
    amount: "₹35,000 for textbook sets, exams fees, & hostel expenses",
    deadline: "Open throughout the academic year",
    officialLink: "https://www.sitajindalfoundation.org/",
    description: "An NGO scheme designed to provide resources, computers, and books allowance assisting students from extremely underprivileged rural schools.",
    eligibilityDescription: "Family income under ₹3,50,000, B.Tech current passing rate > 60%.",
    maxFamilyIncome: 350000,
    minCGPA: 6.0,
    allowedYears: [1, 2, 3, 4, 5],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["All", "Male", "Female", "Other"]
  },
  {
    id: "s8",
    name: "Sitaram Jindal Foundation Merit Scholarship Scheme",
    provider: "Sitaram Jindal Foundation (Charitable NGO Trust)",
    category: "NGA Scheme",
    amount: "₹30,000 - ₹38,400 per annum paid monthly",
    deadline: "Apply via offline post (open all year)",
    officialLink: "http://www.sitaramjindalfoundation.org/scholarships-for-courses-in-india.php",
    description: "A highly trusted philanthropic NGO scheme that support thousands of students residing in rural, backward regions.",
    eligibilityDescription: "Family income under ₹4,0,000. CGPA > 7.0 for male candidates, > 6.5 for female candidates.",
    maxFamilyIncome: 400000,
    minCGPA: 6.5,
    allowedYears: [1, 2, 3, 4, 5],
    allowedCategories: ["General", "OBC", "SC", "ST"],
    allowedStates: ["All", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Other"],
    allowedGenders: ["All", "Male", "Female", "Other"]
  }
];
