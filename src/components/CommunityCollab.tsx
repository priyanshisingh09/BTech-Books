import React from "react";
import { UserProfile } from "../types";
import { Award, CheckCircle, ShieldCheck, Github, Linkedin, HelpCircle, Trophy, Sparkles, Send } from "lucide-react";

interface CommunityCollabProps {
  userProfile: UserProfile | null;
  onOpenVerification: () => void;
  verifiedContributorsCount: number;
}

export default function CommunityCollab({ userProfile, onOpenVerification, verifiedContributorsCount }: CommunityCollabProps) {
  
  // Real world contributor profile leaders
  const LEADERBOARD = [
    { name: "Kunal Kushwaha", college: "MAIT Delhi", likes: "1.2K likes", topic: "GSoC & DevOps", verified: true },
    { name: "Ananya Sharma", college: "IIT Delhi", likes: "984 likes", topic: "SIH Hardware Tricks", verified: true },
    { name: "Aman Kharwal", college: "NSUT Delhi", likes: "842 likes", topic: "Fullstack Web & AI Hooks", verified: true },
    { name: "Neha Nair", college: "BITS Pilani", likes: "721 likes", topic: "Cracking FAANG Interviews", verified: true }
  ];

  return (
    <div className="flex-grow flex flex-col h-full bg-slate-50 overflow-y-auto p-3.5 space-y-4 pb-20 select-text font-sans scrollbar-thin">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="text-amber-500" size={16} />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 font-mono">Student Community Hub</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
          {4 + (userProfile?.isVerified ? 1 : 0)} Verified Contributors
        </span>
      </div>

      {/* User Contribution status banner */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3.5 select-text">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
            <ShieldCheck size={18} />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              PEER CREDENTIAL PRIVILEGES
            </span>
            <h4 className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1">
              Status: {userProfile?.isVerified ? "Verified Educator" : "Student Member"}
              {userProfile?.isVerified && (
                <CheckCircle size={12} fill="currentColor" className="text-indigo-600" />
              )}
            </h4>
          </div>
        </div>

        {userProfile?.isVerified ? (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-emerald-800 leading-relaxed font-sans font-medium">
            Congratulations! You are officially verified as <strong>{userProfile.fullName}</strong> from <strong>{userProfile.collegeName}</strong>. You hold priority publishing permissions to create/share short educational B.Tech guide clips!
          </div>
        ) : (
          <div className="space-y-3 font-sans">
            <p className="text-xs text-slate-600 leading-relaxed">
              You are currently browsing as a Guest B.Tech student. Apply for verification (Free & instant) using your college e-mail to unlock publishing permissions!
            </p>
            <button
              onClick={onOpenVerification}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 font-sans"
            >
              <Sparkles size={11} />
              <span>Request Verification Badging</span>
            </button>
          </div>
        )}
      </div>

      {/* Verified Educator Leaders list */}
      <div className="space-y-3 font-sans select-text">
        <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wide uppercase flex items-center gap-1">
          <Trophy size={13} className="text-amber-500" />
          <span>Top B.Tech Guest Contributors</span>
        </span>

        <div className="grid gap-2.5">
          {/* Include user if verified */}
          {userProfile?.isVerified && (
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center uppercase">
                  {userProfile.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900">{userProfile.fullName} (You)</span>
                    <CheckCircle size={10} fill="currentColor" className="text-indigo-600" />
                  </div>
                  <span className="text-[10px] text-slate-500 leading-none">{userProfile.collegeName}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-indigo-600">12 likes</span>
                <p className="text-[9px] text-indigo-550 font-mono font-bold tracking-tight">Verified Peer</p>
              </div>
            </div>
          )}

          {LEADERBOARD.map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-150 transition flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-250 text-slate-600 text-xs font-bold flex items-center justify-center uppercase">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                    {item.verified && (
                      <CheckCircle size={10} fill="currentColor" className="text-indigo-600" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 leading-none">{item.college} ({item.topic})</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-indigo-600 font-mono">{item.likes}</span>
                <p className="text-[8px] text-slate-400 font-mono">Contributor</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Networking guidelines */}
      <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-3xl space-y-2">
        <h4 className="text-xs font-bold text-indigo-800 flex items-center gap-1.5 font-mono uppercase tracking-wider">
          <HelpCircle size={13} className="text-indigo-600" />
          <span>Real-World Networking Rule</span>
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
          Your peers are your future source of referrals. High quality open source collaborations on GitHub or co-winning national hackathons (likeSIH) holds 50x better ROI than sending cold emails on job sites. Get verified, post advice, and form active hackathon cohorts!
        </p>
      </div>

    </div>
  );
}
