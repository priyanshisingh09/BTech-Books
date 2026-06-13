import React, { useState } from "react";
import { Sparkles, Shield, Mail, School, User, Award, CheckCircle, Smartphone } from "lucide-react";

interface VerifyUserModalProps {
  onClose: () => void;
  onVerifySuccess: (verifier: { fullName: string; collegeName: string; department: string }) => void;
}

export default function VerifyUserModal({ onClose, onVerifySuccess }: VerifyUserModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [department, setDepartment] = useState("Computer Science Engineering");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !collegeName || !idNumber) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, collegeName, idNumber, department }),
      });
      const data = await response.json();
      setIsSubmitting(false);

      if (data.success) {
        setSuccessInfo(data.message);
        // Delay callback slightly to allow viewing success screen
        setTimeout(() => {
          onVerifySuccess({ fullName, collegeName, department });
          onClose();
        }, 3200);
      }
    } catch (error) {
      console.error("Verification failed", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white/98 z-50 p-5 overflow-y-auto flex flex-col justify-center font-sans select-text">
      
      {successInfo ? (
        // Celebratory Verification Screen
        <div className="text-center space-y-4 p-4 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 scale-110 animate-bounce">
            <Award size={36} fill="currentColor" />
          </div>
          
          <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">Verification Completed!</h3>
          
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl max-w-xs text-xs text-emerald-800 leading-relaxed font-medium">
            {successInfo}
          </div>

          <p className="text-[10px] font-mono text-slate-400 animate-pulse font-bold">
            Syncing peer credential permissions... Redirecting.
          </p>
        </div>
      ) : (
        // Verification Request Form
        <div className="space-y-4 py-2">
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
              <Shield size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">B.Tech Student verification</h3>
              <p className="text-[10px] text-slate-500">Become a trusted publisher & educator</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50 p-3.5 rounded-2xl border border-indigo-100 font-medium">
            To prevent spam and keep the peer shorts legitimate, we verify your enrollment. Completing this grants you a <strong>Verified Contributor badge</strong> and allows you to share career advice videos.
          </p>

          <form onSubmit={handleVerify} className="space-y-3.5">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <User size={10} className="text-indigo-600" /> Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mayank Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <Smartphone size={10} className="text-indigo-600" /> Major Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs animate-fade-in"
              >
                <option value="Computer Science Engineering">Computer Science (CSE)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Electronics & Communication">Electronics & Comm (ECE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                <option value="Electrical Engineering">Electrical Engineering (EE)</option>
              </select>
            </div>

            {/* College Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <Mail size={10} className="text-indigo-600" /> College Email ID
              </label>
              <input
                type="email"
                required
                placeholder="e.g. mayank@iitd.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>

            {/* College Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <School size={10} className="text-indigo-600" /> College / Institute Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IIT Delhi / VIT Vellore"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>

            {/* Student ID proof detail */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Student Reg ID Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 2023CSE0152"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-mono shadow-xs"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-200 active:scale-95 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition min-w-[120px] disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? "Validating ID..." : "Request Verification"}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
