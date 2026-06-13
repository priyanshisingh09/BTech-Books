import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Edit3, 
  Eye, 
  Sparkles, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Sliders, 
  Code,
  GraduationCap,
  Briefcase,
  Layers
} from "lucide-react";

interface ResumeBuilderProps {
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function ResumeBuilder({ userProfile, onUpdateProfile }: ResumeBuilderProps) {
  const [activeSubView, setActiveSubView] = useState<"edit" | "preview">("preview");
  const [resumeTheme, setResumeTheme] = useState<"harvard" | "tech" | "mono">("tech");
  const [fontSize, setFontSize] = useState<"dense" | "normal" | "large">("normal");

  // Form states initialized with user profile details
  const [fullName, setFullName] = useState(userProfile?.fullName || "");
  const [collegeName, setCollegeName] = useState(userProfile?.collegeName || "");
  const [year, setYear] = useState(userProfile?.year || 3);
  const [department, setDepartment] = useState(userProfile?.department || "Computer Science Engineering");
  const [primaryLanguage, setPrimaryLanguage] = useState(userProfile?.primaryLanguage || "JavaScript/TypeScript");
  const [careerGoal, setCareerGoal] = useState(userProfile?.careerGoal || "Full-Stack Software Engineer (AI integrations)");
  
  // Extra detailed resume states
  const [cgpa, setCgpa] = useState(userProfile?.cgpa || 8.5);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || "+91 98765 43210");
  const [emailAddress, setEmailAddress] = useState(userProfile?.emailAddress || "mayank@iitd.ac.in");
  const [githubUrl, setGithubUrl] = useState(userProfile?.githubUrl || "https://github.com/mayank-sharma");
  const [linkedinUrl, setLinkedinUrl] = useState(userProfile?.linkedinUrl || "https://linkedin.com/in/mayank-sharma");
  const [skillsList, setSkillsList] = useState(userProfile?.skillsList || "React, Node.js, TypeScript, Python, TailwindCSS, Express, MongoDB, Git, Docker");
  const [projectsText, setProjectsText] = useState(userProfile?.projectsText || "AI Study Mentor - Built smart B.Tech personalized companion utilizing Gemini-3.5 API and Express.\nCollege ERP System - Deployed a scalable university grade portal handling high concurrency using React and Node.");
  const [experienceText, setExperienceText] = useState(userProfile?.experienceText || "Frontend Developer Intern at Google (Summer 2025) - Developed dynamic UI features using TypeScript.\nUndergraduate Research Assistant at IIT Delhi - Assisted with multi-modal LLM prompt engineering tasks.");

  // Other personalization matching criteria (for unified matching)
  const [familyIncome, setFamilyIncome] = useState(userProfile?.familyIncome || "2.5-6");
  const [category, setCategory] = useState(userProfile?.category || "General");
  const [gender, setGender] = useState(userProfile?.gender || "Male");
  const [domicileState, setDomicileState] = useState(userProfile?.domicileState || "Delhi");

  const [copiedState, setCopiedState] = useState<"markdown" | "html" | null>(null);

  const handleSaveChanges = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updatedProfile: UserProfile = {
      fullName,
      collegeName,
      year: Number(year) as any,
      department,
      primaryLanguage,
      careerGoal,
      isVerified: userProfile?.isVerified || false,
      cgpa: Number(cgpa),
      phoneNumber,
      emailAddress,
      githubUrl,
      linkedinUrl,
      skillsList,
      projectsText,
      experienceText,
      familyIncome,
      category,
      gender,
      domicileState
    };
    onUpdateProfile(updatedProfile);
    setActiveSubView("preview");
  };

  // Dynamic values helper
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "dense": return "text-[9px] leading-tight";
      case "large": return "text-xs leading-relaxed";
      default: return "text-[11px] leading-relaxed";
    }
  };

  const getThemeHeadingClass = () => {
    switch (resumeTheme) {
      case "harvard": return "border-b border-black font-serif font-bold uppercase tracking-wider text-black text-center";
      case "mono": return "border-b border-slate-300 font-mono font-bold uppercase tracking-widest text-slate-900";
      default: return "border-b border-indigo-150 font-sans font-extrabold text-indigo-700 tracking-tight flex items-center gap-1";
    }
  };

  const getContainerFontFamily = () => {
    switch (resumeTheme) {
      case "harvard": return "font-serif text-black bg-white";
      case "mono": return "font-mono text-slate-800 bg-slate-50";
      default: return "font-sans text-slate-800 bg-white";
    }
  };

  // Compile Markdown format
  const copyAsMarkdown = () => {
    const md = `# ${fullName}
${emailAddress} | ${phoneNumber} | CGPA: ${cgpa}/10
GitHub: ${githubUrl} | LinkedIn: ${linkedinUrl}

## EDUCATION
* **B.Tech in ${department}** - ${collegeName} (Year ${year})
* **Primary Stack**: ${primaryLanguage} | **Career Objective**: ${careerGoal}

## TECHNICAL SKILLS
${skillsList}

## PERSONAL PROJECTS
${projectsText.split("\n").map(p => `* ${p}`).join("\n")}

## INTERNSHIP & EXPERIENCE
${experienceText.split("\n").map(e => `* ${e}`).join("\n")}`;

    navigator.clipboard.writeText(md);
    setCopiedState("markdown");
    setTimeout(() => setCopiedState(null), 2000);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="flex-grow flex flex-col h-full bg-slate-50 overflow-hidden relative">
      
      {/* Header bar */}
      <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-xs select-none">
        <div className="flex items-center gap-1.5">
          <FileText className="text-indigo-600 animate-pulse" size={16} />
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-800 font-mono">B.Tech Resume Generator</h2>
            <p className="text-[9px] text-slate-400 font-medium">ATS-Compliant Technical Templates</p>
          </div>
        </div>

        {/* Edit vs Preview sub toggle switcher */}
        <div className="bg-slate-100 p-0.5 rounded-lg flex items-center gap-0.5">
          <button
            onClick={() => setActiveSubView("edit")}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
              activeSubView === "edit"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Edit3 size={10} />
            <span>Edit Info</span>
          </button>
          
          <button
            onClick={() => {
              // Trigger auto-save when checking preview
              handleSaveChanges();
              setActiveSubView("preview");
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
              activeSubView === "preview"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Eye size={10} />
            <span>ATS Preview</span>
          </button>
        </div>
      </div>

      {activeSubView === "edit" ? (
        /* EDIT PROFILE / RESUME DATA VIEW */
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 select-text scrollbar-thin">
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2.5xl space-y-1">
            <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-600 animate-spin" />
              Expanded Custom CV Form
            </h4>
            <p className="text-[10.5px] text-indigo-950 font-medium leading-relaxed font-sans">
              Modify the parameters below to update both your central user profile and your downloadable computer-grade resume. Options have been thoroughly expanded.
            </p>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-4 font-sans text-xs">
            
            {/* Core Section: Basic Identity */}
            <div className="p-4 bg-white rounded-2.5xl border border-slate-200/80 space-y-3.5 shadow-xs">
              <div className="text-[10px] font-extrabold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1 border-b border-slate-100 pb-1.5">
                <GraduationCap size={12} className="text-indigo-600" />
                <span>Academic & Identity Details</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mayank Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">College Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IIT Delhi"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">CGPA (out of 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="10"
                    required
                    value={cgpa}
                    onChange={(e) => setCgpa(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">B.Tech studied year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                  >
                    <option value={1}>1st Year (Freshman)</option>
                    <option value={2}>2nd Year (Sophomore)</option>
                    <option value={3}>3rd Year (Junior)</option>
                    <option value={4}>4th Year (Senior)</option>
                    <option value={5}>5th Year (Dual Degree)</option>
                  </select>
                </div>
              </div>

              {/* Department branch with expanded options as requested */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Engineering department branch</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                >
                  <option value="Computer Science Engineering">Computer Science (CSE)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & ML (AI-ML)</option>
                  <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                  <option value="Civil Engineering">Civil Engineering (CE)</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Engineering Physics">Engineering Physics</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Mathematics & Computing">Mathematics & Computing</option>
                  <option value="Industrial & Production Engineering">Industrial & Production Engineering</option>
                </select>
              </div>
            </div>

            {/* Core Section: Contact Links */}
            <div className="p-4 bg-white rounded-2.5xl border border-slate-200/80 space-y-3 shadow-xs">
              <div className="text-[10px] font-extrabold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1 border-b border-slate-100 pb-1.5">
                <Mail size={12} className="text-indigo-600" />
                <span>Contact Info / Link Assets</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Personal Email ID</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. mayank@gmail.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 99999 88888"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">GitHub Profile Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com/profile"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-[10px] text-slate-800 focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/profile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-[10px] text-slate-800 focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Government & Private Scholarship Criteria Params */}
            <div className="p-4 bg-white rounded-2.5xl border border-slate-200/80 space-y-3.5 shadow-xs">
              <div className="text-[10px] font-extrabold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1 border-b border-slate-100 pb-1.5">
                <Sliders size={12} className="text-indigo-600" />
                <span>Eligibility Engine Parameters</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Family Annual Income (INR)</label>
                  <select
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="less-2.5">Less than Rs. 2.5 Lakhs</option>
                    <option value="2.5-6">Rs. 2.5 Lakhs to Rs. 6 Lakhs</option>
                    <option value="6-8">Rs. 6 Lakhs to Rs. 8 Lakhs</option>
                    <option value="above-8">Above Rs. 8 Lakhs (High Bracket)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Academic Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="General">General (Open Class)</option>
                    <option value="OBC">OBC (Other Backward Class)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Gender Group</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female (Unlocks Tech Diversity grants)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">State of Domicile</label>
                  <select
                    value={domicileState}
                    onChange={(e) => setDomicileState(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh / Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir (Unlocks PMSSS)</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Core Section: Tech Skills, Projects, Experience */}
            <div className="p-4 bg-white rounded-2.5xl border border-slate-200/80 space-y-3.5 shadow-xs">
              <div className="text-[10px] font-extrabold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1 border-b border-slate-100 pb-1.5">
                <Code size={12} className="text-indigo-600" />
                <span>Technical Stack & CV Narratives</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono font-mono select-none">Coding language options</label>
                  <select
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800"
                  >
                    <option value="Python">Python</option>
                    <option value="JavaScript/TypeScript">JavaScript / TypeScript</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Golang">Go / Golang</option>
                    <option value="Rust">Rust (Systems Coding)</option>
                    <option value="Kotlin/Swift">Kotlin / Swift (Mobile App)</option>
                    <option value="PHP/Ruby">PHP / Ruby on Rails</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Career aspiration</label>
                  <select 
                    value={careerGoal} 
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800"
                  >
                    <option value="Full-Stack Software Engineer">Full-Stack Developer</option>
                    <option value="AI / ML Engineer (Prompt-Engineering, Python)">AI / ML Research Engineer</option>
                    <option value="Frontend Engineer (React, Tailwind)">Frontend Engineer</option>
                    <option value="Backend Developer (Node.js, C++)">Backend Developer</option>
                    <option value="DevOps & Cloud Automation Architect">DevOps / Cloud Engineer</option>
                    <option value="Data Scientist / Engineering Analyst">Data Scientist</option>
                    <option value="Mobile App Developer (React Native)">Mobile App Developer</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  </select>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Custom Technical Skills list (comma separated)</label>
                <input
                  type="text"
                  value={skillsList}
                  onChange={(e) => setSkillsList(e.target.value)}
                  placeholder="e.g. React, Node.js, Python, Git, Docker"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850"
                />
              </div>

              {/* Projects text area */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Personal Projects (one entry per line)</label>
                <textarea
                  rows={3}
                  value={projectsText}
                  onChange={(e) => setProjectsText(e.target.value)}
                  placeholder="e.g. AI Study Mentor - Custom Gemini assistant.
College ERP System - High concurrency platform."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 font-sans"
                />
              </div>

              {/* Experience text area */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Internships & Campus Leadership (one entry per line)</label>
                <textarea
                  rows={3}
                  value={experienceText}
                  onChange={(e) => setExperienceText(e.target.value)}
                  placeholder="e.g. Frontend Developer Intern at Google (Summer 2025).
Head of Campus Coding Club."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 font-sans"
                />
              </div>
            </div>

            {/* Submit save button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check size={14} />
              <span>Save & Compile ATS Resume</span>
            </button>

          </form>
        </div>
      ) : (
        /* ATS COMPUTER GRADE PREVIEW VIEW WITH THEMES AND UTILITIES */
        <div className="flex-grow flex flex-col min-h-0">
          
          {/* Controls bar (Theme & Sizing Selectors) */}
          <div className="p-3 bg-white border-b border-slate-200 grid grid-cols-2 gap-2 select-none">
            
            {/* Theme Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider">Theme:</span>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-150">
                <button
                  onClick={() => setResumeTheme("tech")}
                  className={`px-2 py-0.5 text-[8.5px] font-extrabold rounded-md uppercase transition cursor-pointer ${
                    resumeTheme === "tech" ? "bg-white text-indigo-650 shadow-xs" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Tech
                </button>
                <button
                  onClick={() => setResumeTheme("harvard")}
                  className={`px-2 py-0.5 text-[8.5px] font-extrabold rounded-md uppercase transition cursor-pointer ${
                    resumeTheme === "harvard" ? "bg-white text-black shadow-xs font-serif" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Ivy
                </button>
                <button
                  onClick={() => setResumeTheme("mono")}
                  className={`px-2 py-0.5 text-[8.5px] font-extrabold rounded-md uppercase transition cursor-pointer ${
                    resumeTheme === "mono" ? "bg-white text-slate-900 shadow-xs font-mono" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Mono
                </button>
              </div>
            </div>

            {/* Font Sizer Selector */}
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider">Spacing:</span>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-150">
                <button
                  onClick={() => setFontSize("dense")}
                  className={`px-2 py-0.5 text-[8.5px] font-extrabold rounded-md cursor-pointer ${
                    fontSize === "dense" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400"
                  }`}
                >
                  Dense
                </button>
                <button
                  onClick={() => setFontSize("normal")}
                  className={`px-2 py-0.5 text-[8.5px] font-extrabold rounded-md cursor-pointer ${
                    fontSize === "normal" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400"
                  }`}
                >
                  Std
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  className={`px-2 py-0.5 text-[8.5px] font-extrabold rounded-md cursor-pointer ${
                    fontSize === "large" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400"
                  }`}
                >
                  Wide
                </button>
              </div>
            </div>

          </div>

          {/* Interactive downloadable PDF paper stage */}
          <div className="flex-1 overflow-y-auto bg-slate-100 p-4 pb-24 flex justify-center scrollbar-thin">
            
            <div 
              id="printable-cv-page" 
              className={`w-full max-w-sm border border-slate-200/80 p-5 rounded-lg shadow-sm select-text text-left self-start transition-all ${getContainerFontFamily()} ${getFontSizeClass()}`}
            >
              
              {/* Profile header */}
              <div className="text-center space-y-1 select-text">
                <h1 className={`font-black tracking-tight text-slate-900 ${
                  resumeTheme === "harvard" ? "text-base font-serif font-bold uppercase tracking-wide text-black" : 
                  resumeTheme === "mono" ? "text-sm font-mono text-black uppercase" : "text-base text-slate-900 font-extrabold"
                }`}>
                  {fullName || "MAYANK SHARMA"}
                </h1>
                
                <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[8.5px] font-mono text-slate-500 font-medium ${
                  resumeTheme === "harvard" ? "text-black font-serif italic" : ""
                }`}>
                  <span className="flex items-center gap-0.5"><Mail size={8} /> {emailAddress}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Phone size={8} /> {phoneNumber}</span>
                  <span>•</span>
                  <span className="font-bold text-slate-700">CGPA: {cgpa}/10</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-2 text-[8px] font-mono font-bold text-indigo-700 uppercase tracking-wider">
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-indigo-600">
                    <Github size={7.5} /> GitHub profile
                  </a>
                  <span className="text-slate-300">•</span>
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-indigo-600">
                    <Linkedin size={7.5} /> LinkedIn resource
                  </a>
                </div>
              </div>

              {/* Education Block */}
              <div className="mt-4 space-y-1 select-text">
                <h3 className={`pb-0.5 mb-1.5 uppercase font-bold text-[9.5px] ${getThemeHeadingClass()}`}>
                  Education Credentials
                </h3>
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <p className={`font-bold text-slate-900 ${resumeTheme === "harvard" ? "font-serif text-black" : "text-xs"}`}>
                      Bachelor of Technology (B.Tech)
                    </p>
                    <p className="text-[10px] text-slate-600 font-medium">{department} | {collegeName}</p>
                  </div>
                  <span className="text-[9.5px] font-mono text-slate-400 font-bold uppercase">Year {year} / 4</span>
                </div>
                <div className="pt-1 text-[9px] font-medium text-slate-500 flex flex-wrap gap-2 leading-none font-mono">
                  <span><strong>Stack focus</strong>: {primaryLanguage}</span>
                  <span>|</span>
                  <span><strong>Goal focus</strong>: {careerGoal}</span>
                </div>
              </div>

              {/* Technical skills Block */}
              <div className="mt-4 space-y-1 select-text">
                <h3 className={`pb-0.5 mb-1.5 uppercase font-bold text-[9.5px] ${getThemeHeadingClass()}`}>
                  Technical Skills Summary
                </h3>
                <p className="text-[10px] text-slate-700 leading-relaxed font-sans">
                  {skillsList || "React, Node.js, TypeScript, Python, TailwindCSS, Express, MongoDB, Git"}
                </p>
              </div>

              {/* Projects Block */}
              <div className="mt-4 space-y-1.5 select-text">
                <h3 className={`pb-0.5 mb-1.5 uppercase font-bold text-[9.5px] ${getThemeHeadingClass()}`}>
                  Personal Academic Projects
                </h3>
                
                <div className="space-y-2 select-text font-sans">
                  {projectsText.split("\n").filter(line => line.trim().length > 0).map((proj, idx) => {
                    const colonPartIndex = proj.indexOf("-");
                    const namePart = colonPartIndex !== -1 ? proj.slice(0, colonPartIndex).trim() : proj;
                    const descPart = colonPartIndex !== -1 ? proj.slice(colonPartIndex + 1).trim() : "";
                    
                    return (
                      <div key={idx} className="space-y-0.5 text-left">
                        <p className={`font-bold text-slate-900 ${resumeTheme === "harvard" ? "font-serif text-black text-[10.5px]" : "text-[10.5px]"}`}>
                          {namePart}
                        </p>
                        {descPart && (
                          <p className="text-[10px] text-slate-650 leading-normal font-sans">
                            {descPart}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Professional Work Experience Block */}
              <div className="mt-4 space-y-1.5 select-text">
                <h3 className={`pb-0.5 mb-1 text-[9.5px] font-bold uppercase ${getThemeHeadingClass()}`}>
                  Internships & Campus Leadership
                </h3>

                <div className="space-y-2 select-text font-sans">
                  {experienceText.split("\n").filter(line => line.trim().length > 0).map((exp, idx) => {
                    const separatorIndex = exp.indexOf("-");
                    const titlePart = separatorIndex !== -1 ? exp.slice(0, separatorIndex).trim() : exp;
                    const detailsPart = separatorIndex !== -1 ? exp.slice(separatorIndex + 1).trim() : "";

                    return (
                      <div key={idx} className="space-y-0.5 text-left">
                        <p className={`font-bold text-slate-900 ${resumeTheme === "harvard" ? "font-serif text-black text-[10.5px]" : "text-[10.5px]"}`}>
                          {titlePart}
                        </p>
                        {detailsPart && (
                          <p className="text-[10px] text-slate-650 leading-normal font-sans">
                            {detailsPart}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Quick interactive utility action panel absolute bottom bar over paper */}
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 grid grid-cols-2 gap-2 z-10 shadow-lg">
            
            <button
              onClick={copyAsMarkdown}
              className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition cursor-pointer border border-slate-150 select-none shadow-xs"
            >
              {copiedState === "markdown" ? (
                <>
                  <Check size={13} className="text-emerald-600 animate-bounce" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={triggerPrint}
              className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl flex items-center justify-center gap-1 transition cursor-pointer select-none shadow-md shadow-indigo-50"
            >
              <Printer size={13} />
              <span>Print Resume / PDF</span>
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
