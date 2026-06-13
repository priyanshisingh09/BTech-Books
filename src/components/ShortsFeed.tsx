import React, { useState } from "react";
import { EducationalVideo, UserProfile } from "../types";
import { 
  Heart, 
  MessageSquare, 
  Plus, 
  CheckCircle, 
  Share2, 
  Sparkles, 
  Play, 
  Pause, 
  Tag, 
  Clock, 
  AlertCircle,
  Code,
  Compass,
  CornerDownRight,
  Send
} from "lucide-react";

interface ShortsFeedProps {
  videos: EducationalVideo[];
  userProfile: UserProfile | null;
  onLikeVideo: (id: string) => void;
  onAddVideo: (newPost: { title: string; description: string; tags: string[] }) => void;
  onOpenVerification: () => void;
}

export default function ShortsFeed({ 
  videos, 
  userProfile, 
  onLikeVideo, 
  onAddVideo, 
  onOpenVerification 
}: ShortsFeedProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCommentsId, setShowCommentsId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentLists, setCommentLists] = useState<Record<string, string[]>>({});
  
  // Create video upload form state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTagsStr, setNewTagsStr] = useState("DSA, Interviews");

  const currentVideo = videos[activeVideoIndex];

  const handleNextVideo = () => {
    if (activeVideoIndex < videos.length - 1) {
      setActiveVideoIndex(activeVideoIndex + 1);
      setIsPlaying(true);
      setShowCommentsId(null);
    } else {
      // Loop back
      setActiveVideoIndex(0);
      setIsPlaying(true);
      setShowCommentsId(null);
    }
  };

  const handlePrevVideo = () => {
    if (activeVideoIndex > 0) {
      setActiveVideoIndex(activeVideoIndex - 1);
      setIsPlaying(true);
      setShowCommentsId(null);
    }
  };

  const submitComment = (vidId: string) => {
    if (!newCommentText.trim()) return;
    const currentList = commentLists[vidId] || (videos.find(v => v.id === vidId)?.comments || []);
    const updated = [...currentList, `${userProfile?.fullName || 'B.Tech Student'}: ${newCommentText}`];
    setCommentLists({
      ...commentLists,
      [vidId]: updated
    });
    setNewCommentText("");
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;
    
    const tagsArr = newTagsStr.split(",").map(s => s.trim()).filter(Boolean);
    onAddVideo({
      title: newTitle,
      description: newDescription,
      tags: tagsArr
    });

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewTagsStr("DSA, Interviews");
    setShowUploadForm(false);
    setActiveVideoIndex(0); // Immediately go to the first video (which is the newly created one)
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50 font-sans relative h-full overflow-hidden">
      
      {/* Top Feed bar header */}
      <div className="absolute top-0 inset-x-0 bg-slate-50/90 backdrop-blur-md border-b border-slate-200 p-3 flex items-center justify-between z-20 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
          <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono flex items-center gap-1">
            <Compass size={12} className="text-indigo-600" /> Peer Shorts Feed
          </h2>
        </div>

        {/* Create post button */}
        <button
          onClick={() => {
            if (userProfile && userProfile.isVerified) {
              setShowUploadForm(true);
            } else {
              onOpenVerification();
            }
          }}
          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-full text-[11px] font-bold text-white transition hover:scale-105 cursor-pointer shadow-xs"
        >
          <Plus size={12} />
          <span>Upload Advice</span>
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center text-slate-500">
          <AlertCircle className="text-indigo-600 mb-2" size={32} />
          <h3 className="text-sm font-semibold text-slate-800">No educational videos found</h3>
          <p className="text-xs mt-1">Be the first contributor by applying for Student Verification!</p>
          <button 
            onClick={onOpenVerification} 
            className="mt-4 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            Apply for Verification badge
          </button>
        </div>
      ) : (
        /* Video Player Stage Frame */
        <div className="flex-grow flex flex-col relative overflow-hidden bg-slate-100 justify-between p-4 pt-14 pb-4">
          
          {/* Simulated Whiteboard / Screen Coding Canvas background overlay */}
          <div className="absolute inset-x-0 top-14 bottom-0 flex flex-col items-center justify-center p-4">
            
            {/* Visual interactive dynamic mock lecture presentation */}
            <div className={`p-5 rounded-3xl border w-full max-w-sm h-68 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-white shadow-xs ${
              isPlaying ? "border-indigo-200 ring-1 ring-indigo-50 scale-100" : "border-slate-200 scale-95 opacity-90"
            }`}>
              
              {/* Spinning radar logic background */}
              {isPlaying && (
                <div className="absolute inset-0 scrolling-scan bg-gradient-to-b from-indigo-500/0 via-indigo-500/2 to-indigo-500/0 pointer-events-none" />
              )}

              {/* Top lecture header bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-indigo-600 border-b border-slate-100 pb-2">
                <span className="flex items-center gap-1 font-bold">
                  <Code size={11} /> 
                  SIMULATED_SCREENPLAY.EXE
                </span>
                <span className="flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 text-[9px] font-bold text-indigo-800">
                  <Clock size={9} /> B.Tech Tip Loop
                </span>
              </div>

              {/* Whiteboard content area depending on tags */}
              <div className="flex-1 py-3 flex flex-col justify-center space-y-2">
                <p className="text-[13px] font-black text-slate-800 leading-snug tracking-tight text-center font-sans px-2">
                  "{currentVideo.title}"
                </p>
                <div className="flex justify-center flex-wrap gap-1">
                  {currentVideo.tags.map(t => (
                    <span key={t} className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 font-sans">
                      #{t}
                    </span>
                  ))}
                </div>
                
                {/* Simulated dynamic waveform to look like continuous audio play */}
                <div className="h-6 flex items-center justify-center gap-1 mt-1">
                  {[1, 2, 3, 4, 2, 3, 5, 4, 2, 1, 3, 4, 5, 2, 1].map((val, idx) => (
                    <span 
                      key={idx} 
                      className="w-1 bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ 
                        height: isPlaying ? `${Math.floor(Math.random() * 16) + 4}px` : "4px",
                        animationDelay: `${idx * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Trigger play/pause on visual container click */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-indigo-950/5 opacity-0 hover:opacity-100 transition duration-200 cursor-pointer"
              >
                <div className="p-3.5 bg-white rounded-full border border-slate-200 text-slate-800 shadow-lg">
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </div>
              </button>

              <div className="text-[9px] font-mono text-center text-slate-400 font-medium">
                {isPlaying ? "● TAP TO PAUSE PLAYBACK" : "▲ TAP TO PLAY LECTURE"}
              </div>
            </div>

            {/* Pagination Controls below the player */}
            <div className="flex items-center gap-4 mt-6 w-full justify-center text-xs font-mono text-slate-500 z-10">
              <button 
                onClick={handlePrevVideo} 
                disabled={activeVideoIndex === 0}
                className="px-4 py-1.5 bg-white border border-slate-200 disabled:opacity-40 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer shadow-xs font-bold"
              >
                ◀ Prev
              </button>

              <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                {activeVideoIndex + 1} / {videos.length}
              </span>

              <button 
                onClick={handleNextVideo}
                className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer shadow-xs font-bold"
              >
                Next ▶
              </button>
            </div>

          </div>

          {/* Social Interactions Float overlay: absolute right & bottom */}
          <div className="absolute right-3.5 bottom-16 flex flex-col items-center gap-4.5 z-15">
            
            {/* Heart Like action */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => onLikeVideo(currentVideo.id)}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:bg-slate-55 hover:border-slate-35 flex items-center justify-center text-rose-500 shadow-xs active:scale-95 transition cursor-pointer"
                id={`btn-like-${currentVideo.id}`}
              >
                <Heart size={18} fill="currentColor" />
              </button>
              <span className="text-[10px] text-slate-500 font-mono font-bold mt-1 shadow-sm">
                {currentVideo.likes}
              </span>
            </div>

            {/* Comments button overlay toggle */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setShowCommentsId(showCommentsId === currentVideo.id ? null : currentVideo.id)}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:bg-slate-55 flex items-center justify-center text-indigo-600 shadow-xs active:scale-95 transition cursor-pointer"
              >
                <MessageSquare size={18} />
              </button>
              <span className="text-[10px] text-slate-500 font-mono font-bold mt-1">
                {(commentLists[currentVideo.id] || currentVideo.comments).length}
              </span>
            </div>

            {/* Quick verification badge helper */}
            {currentVideo.isVerified && (
              <div className="flex flex-col items-center cursor-help" title="Verified peer recommendation post. Highly trustworthy.">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                  <CheckCircle size={14} fill="currentColor" className="text-emerald-500" />
                </div>
                <span className="text-[8px] font-mono text-emerald-800 mt-1 uppercase tracking-widest font-bold">LEGIT</span>
              </div>
            )}
          </div>

          {/* Bottom Video metadata briefing absolute card */}
          <div className="absolute bottom-4 left-3.5 right-18 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 select-text z-10 shadow-sm animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold border border-indigo-500 uppercase flex-shrink-0">
                {currentVideo.uploaderName.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-extrabold text-slate-900 leading-none truncate">{currentVideo.uploaderName}</span>
                  {currentVideo.isVerified && (
                    <CheckCircle size={10} fill="currentColor" className="text-indigo-650 flex-shrink-0" />
                  )}
                </div>
                <span className="text-[9px] text-slate-400 truncate">{currentVideo.uploaderTitle}</span>
              </div>
            </div>

            <p className="text-xs text-slate-650 font-sans leading-relaxed line-clamp-3">
              {currentVideo.description}
            </p>
          </div>

          {/* Floating Comments Modal Bottom Sheet (interactive commenting) */}
          {showCommentsId === currentVideo.id && (
            <div className="absolute inset-x-0 bottom-0 bg-white border-t border-slate-200 rounded-t-3xl shadow-lg z-40 flex flex-col max-h-[360px] pb-5">
              <div className="flex items-center justify-between p-3.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 font-mono">Comments Section</span>
                <button 
                  onClick={() => setShowCommentsId(null)}
                  className="text-xs text-slate-400 hover:text-slate-700 font-medium"
                >
                  Close
                </button>
              </div>

              {/* List comments */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 font-sans select-text scrollbar-thin">
                {(commentLists[currentVideo.id] || currentVideo.comments).map((cmt, idx) => {
                  const parts = cmt.split(":");
                  const sender = parts[0] || "Student";
                  const text = parts.slice(1).join(":");
                  return (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-150 rounded-xl flex items-start gap-1">
                      <CornerDownRight size={11} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div className="text-xs">
                        <span className="font-extrabold text-indigo-750 text-[11px]">{sender}</span>
                        <p className="text-slate-600 mt-0.5 leading-snug">{text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Type message */}
              <div className="p-3 border-t border-slate-100 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question / tip..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-sans"
                />
                <button
                  onClick={() => submitComment(currentVideo.id)}
                  className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Upload New Education Video Overlay Modal */}
      {showUploadForm && (
        <div className="absolute inset-0 bg-white z-50 p-5 overflow-y-auto flex flex-col justify-between font-sans">
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={18} />
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Create Educational Tip</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50 p-3.5 rounded-2xl border border-indigo-100 font-medium font-sans">
              Add actionable advice linked with the real world. Only verified B.Tech students can publish advice. Your verified credentials will automatically be attached to this post.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Tip Subject Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to get started on NeetCode 150"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Actionable Text Advice</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain details: what books/courses are free, what to solve first, common errors to avoid..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 placeholder-slate-400 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono font-bold">Topic Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="DSA, OpenSource, Hackathon, College Tips"
                  value={newTagsStr}
                  onChange={(e) => setNewTagsStr(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1 py-2.5 bg-slate-100 border border-slate-250 rounded-xl text-xs font-semibold hover:bg-slate-200 text-slate-600 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-sm min-w-[120px]"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>

          <div className="py-4 text-[10px] font-mono text-slate-400 text-center font-bold">
            CREDENTIALS AUTOMATICALLY ATTACHED: {userProfile?.fullName || "Verified Student Member"}
          </div>

        </div>
      )}

    </div>
  );
}
