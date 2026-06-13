import React, { useState, useEffect } from "react";
import { Maximize2, Minimize2, Wifi, Battery, Signal, ArrowLeft } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

export default function PhoneFrame({ children, title, onBack, showBack = false }: PhoneFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-2 sm:p-6 transition-all duration-300">
      
      {/* Upper Desktop Controls */}
      <div className="w-full max-w-sm mb-4 flex items-center justify-between px-2 text-slate-400 text-xs font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          B.Tech Dev Channel
        </span>
        
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-all text-slate-300 cursor-pointer"
          id="btn-toggle-frame"
          title={isFullscreen ? "Show Smartphone Frame" : "Fullscreen Immersive View"}
        >
          {isFullscreen ? (
            <>
              <Minimize2 size={12} />
              <span>Normal View</span>
            </>
          ) : (
            <>
              <Maximize2 size={12} />
              <span>Fullscreen</span>
            </>
          )}
        </button>
      </div>

      {isFullscreen ? (
        // Fullscreen Mode Container
        <div 
          className="w-full max-w-lg min-h-[820px] h-[90vh] bg-slate-50 rounded-2xl flex flex-col overflow-hidden border border-slate-200 shadow-2xl relative"
          id="fullscreen-stage"
        >
          {/* Top Info Bar */}
          <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 select-none">
            <div className="flex items-center gap-2">
              {showBack && (
                <button 
                  onClick={onBack} 
                  className="p-1 hover:bg-slate-200 rounded transition text-slate-800"
                  title="Back"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <span className="font-semibold text-slate-800">{title}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-mono">{time}</span>
              <div className="flex items-center gap-1">
                <Signal size={12} className="text-slate-500" />
                <Wifi size={12} className="text-slate-500" />
                <Battery size={14} className="text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            {children}
          </div>
        </div>
      ) : (
        // Smartphone Bezel frame Mockup Mode
        <div 
          className="relative w-full max-w-[390px] h-[812px] bg-slate-950 rounded-[50px] p-2.5 border-[6px] border-slate-800 shadow-[0_0_50px_rgba(15,23,42,0.4)] flex flex-col justify-between overflow-hidden select-none"
          id="smartphone-frame"
        >
          {/* Inner Notch Area */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            </span>
            <span className="w-5 h-1 bg-slate-900 rounded-full ml-3" />
          </div>

          {/* Phone Content Screen */}
          <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden flex flex-col relative border border-slate-200">
            
            {/* Real Hardware Info Top Bar */}
            <div className="h-10 pt-3 px-6 flex items-center justify-between text-slate-600 text-xs font-medium bg-slate-100/90 border-b border-slate-200/65 z-30 select-none">
              <div className="font-mono text-[11px] tracking-tight">{time}</div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Signal size={11} className="opacity-85 text-slate-500" />
                <Wifi size={11} className="opacity-85 text-slate-500" />
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-mono opacity-80 text-emerald-600">98%</span>
                  <Battery size={13} className="text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Inner dynamic content body */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 text-slate-800">
              {children}
            </div>

            {/* Virtual Home Bar Indicator */}
            <div className="h-5 bg-slate-100 flex items-center justify-center pb-1 z-30">
              <div className="w-24 h-1 bg-slate-350 rounded-full" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
