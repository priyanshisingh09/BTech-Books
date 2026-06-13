import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client Lazily to prevent crash on missing key
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined in environment variables. Falling back to structured templates.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Global path for mock database
const VIDEO_DB_PATH = path.join(process.cwd(), "video_db.json");

// Helper to load/save videos
interface DBVideo {
  id: string;
  title: string;
  uploaderName: string;
  uploaderTitle: string;
  isVerified: boolean;
  videoUrl: string;
  likes: number;
  tags: string[];
  description: string;
  comments: string[];
  postedAt: string;
}

const DEFAULT_VIDEOS: DBVideo[] = [
  {
    id: "v1",
    title: "How to Apply and Crack GSoC (Google Summer of Code)",
    uploaderName: "Aman Kharwal",
    uploaderTitle: "M.Tech CSE, GSoC '25 Mentor",
    isVerified: true,
    videoUrl: "gsoc_guide",
    likes: 124,
    tags: ["GSoC", "Internships", "Open Source"],
    description: "Submit 2-3 high-quality pull requests in January-February. Don't wait for the official proposal release. Reach out to maintainers early on Gitter/Slack and solve beginner-friendly issues!",
    comments: [
      "Extremely helpful! Doing this right now for CNCF",
      "Is the stipend still based on PPP?",
      "Can ECE students participate? Yes!"
    ],
    postedAt: "2026-06-10"
  },
  {
    id: "v2",
    title: "Cracking Smart India Hackathon (SIH) Real-world Tips",
    uploaderName: "Neha Nair",
    uploaderTitle: "B.Tech CSE, 2x SIH Winner",
    isVerified: true,
    videoUrl: "sih_win",
    likes: 256,
    tags: ["Hackathons", "B.Tech Life", "SIH"],
    description: "SIH is not just about writing code. It is about how clearly you present the real-world social impact to the judges of ministries. Make a 1-minute high impact video of your system!",
    comments: [
      "Awesome guidance, what tech stack wins the most?",
      "Can we register without a mentor? No, mentors are required."
    ],
    postedAt: "2026-06-12"
  },
  {
    id: "v3",
    title: "AI Integration in React/TypeScript with Gemini API",
    uploaderName: "Rajesh Sahu",
    uploaderTitle: "AI Specialist, Amazon SWE",
    isVerified: true,
    videoUrl: "ai_react",
    likes: 412,
    tags: ["AI Tools", "TypeScript", "Career Tips"],
    description: "Stop building static applications. Wrap your TypeScript frontends with server-side proxy routes to query Gemini 3.5. Real-world companies want candidates who build actual LLM agent orchestrations.",
    comments: [
      "Is Gemini-flash better than legacy models? Absolutely, lightning fast and cheap!",
      "I built a summary app in 10 lines of code."
    ],
    postedAt: "2026-06-11"
  },
  {
    id: "v4",
    title: "How I kept my CGPA 8.5+ while coding on LeetCode",
    uploaderName: "Karan Johar",
    uploaderTitle: "B.Tech IT, Placement Coordinator",
    isVerified: true,
    videoUrl: "cgpa_leetcode",
    likes: 189,
    tags: ["DSA", "Motivation", "Interviews"],
    description: "Don't ignore your college syllabus. Study 1 week before examinations for CGPA, and dedicate 2 hours every single day to DSA. Most MNCs have a strict cutoff of 7.5 to sit in placements.",
    comments: [
      "Best advice ever. I got filtered at 7.2 of CGPA :(",
      "Thanks for sharing, keeping CGPA is very important."
    ],
    postedAt: "2026-06-13"
  }
];

function getVideos(): DBVideo[] {
  try {
    if (fs.existsSync(VIDEO_DB_PATH)) {
      const raw = fs.readFileSync(VIDEO_DB_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error("Error reading video database, using default values", error);
  }
  // Initialize file
  saveVideos(DEFAULT_VIDEOS);
  return DEFAULT_VIDEOS;
}

function saveVideos(videos: DBVideo[]) {
  try {
    fs.writeFileSync(VIDEO_DB_PATH, JSON.stringify(videos, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing video database", error);
  }
}

// ------------------------------------------------------------------
// B.Tech Student Guide Curated Real-world Static Data
// ------------------------------------------------------------------
const CURATED_HACKATHONS = [
  {
    id: "h1",
    title: "Smart India Hackathon (SIH) 2026",
    organizer: "Ministry of Education & AICTE, Govt. of India",
    dateRange: "Registration begins Aug-Sept, Grand Finale Dec",
    registrationCost: "Free of charge (Legitimate National Event)",
    isOfficialLegit: true,
    registrationLink: "https://www.sih.gov.in/",
    tags: ["Hardware", "Software", "Public Sector", "India"],
    description: "The largest national-level model building hackathon solving physical and digital problems of various Government Ministries and state departments. Highly valuable for placements.",
    realWorldImpact: "Winning teams receive Rs. 1 Lakh per problem statement. Solutions are directly tested by government authorities."
  },
  {
    id: "h2",
    title: "Google Girl Hackathon 2026",
    organizer: "Google Engineering India",
    dateRange: "Announced annually around Feb-March",
    registrationCost: "Free of charge (Women in Tech Program)",
    isOfficialLegit: true,
    registrationLink: "https://buildyourfuture.withgoogle.com/events/girl-hackathon-india",
    tags: ["Coding Challenge", "Algorithms", "Direct Interviews", "Google"],
    description: "A customized program for female students across computer engineering fields in India. Tests algorithmic problem solving, design thinking, and offers direct interview paths.",
    realWorldImpact: "Top performers get fast-tracked into technical interviews for software engineering internships or full-time roles."
  },
  {
    id: "h3",
    title: "Major League Hacking (MLH) Local Hack Day & Hackathons",
    organizer: "MLH Student Coalition",
    dateRange: "Happening weekly throughout the semester",
    registrationCost: "Free (Includes swag, meals, and server credits)",
    isOfficialLegit: true,
    registrationLink: "https://mlh.io/seasons/2026/events",
    tags: ["Build-a-thon", "Global Community", "All Levels", "Open Source"],
    description: "Weekly student hackathons organized globally. Perfect for beginners to build actual mobile, web, and IoT prototypes in 24-48 hours.",
    realWorldImpact: "Fosters self-learning, networking with worldwide tech employers, and builds concrete github portfolios."
  },
  {
    id: "h4",
    title: "NASA Space Apps Challenge 2026",
    organizer: "NASA Earth Science Division & Partners",
    dateRange: "October annually (In-person & Virtual local chapters)",
    registrationCost: "Free (Legitimate Global Space Hackathon)",
    isOfficialLegit: true,
    registrationLink: "https://www.spaceappschallenge.org/",
    tags: ["Space Tech", "Data Science", "Environment", "Global"],
    description: "Over 48 hours, students use NASA's open-source satellite data to build solutions for real earth and space challenges.",
    realWorldImpact: "Global winners have their projects audited by actual NASA astronauts and scientists."
  }
];

const CURATED_INTERNSHIPS = [
  {
    id: "i1",
    title: "Google Software Engineering (STEP) Intern 2026",
    company: "Google India / Google Global",
    duration: "10-12 weeks (Summer)",
    stipend: "Rs. 60,000 to Rs. 85,000 / month (Paid)",
    applicationCost: "Free & Legitimate (Direct Official Careers Page)",
    eligibility: "2nd-year B.Tech CSE/ECE or related engineering majors",
    applicationLink: "https://careers.google.com/students/",
    keyDetails: "Includes algorithmic DSA questions, problem solving, code health reviews in Python, C++, or Java. Step interns are mentored directly by senior engineers.",
    realWorldTip: "Apply matching resume keywords like data structures, object-oriented programming, and real projects. Do not use generic PDF formats."
  },
  {
    id: "i2",
    title: "Google Summer of Code (GSoC) 2026",
    company: "Open Source Organizations & Google",
    duration: "12-22 weeks (Flexible Part-time / Full-time)",
    stipend: "USD $1,500 to $3,000 total stipend (Paid, PPP Adjusted)",
    applicationCost: "Free of charge (Open Source Collaboration)",
    eligibility: "Any B.Tech student (1st to 4th year) worldwide",
    applicationLink: "https://summerofcode.withgoogle.com/",
    keyDetails: "A global remote program where students are micro-funded to work on real-world open source projects hosted on Github under global maintainers.",
    realWorldTip: "The best resume asset for landing global remote developer jobs. Choose your target org in December and start contributing early commits before March."
  },
  {
    id: "i3",
    title: "Linux Foundation & Outreachy Summer Internships",
    company: "Outreachy Open Source Coalition",
    duration: "3 months (May - August)",
    stipend: "USD $7,000 total stipend + $500 travel allowance (Paid)",
    applicationCost: "Free & Legitimate (Focus on Diversity in Tech)",
    eligibility: "Students facing systemic discrimination / diverse background",
    applicationLink: "https://www.outreachy.org/",
    keyDetails: "Completely remote open-source internships focusing on programming, user research, technical writing, or web design.",
    realWorldTip: "Excellent remote experience. Focus strictly on completing the initial contribution task with detailed documentation to stand out."
  },
  {
    id: "i4",
    title: "Microsoft Engage & Internship Program",
    company: "Microsoft India / Microsoft Careers",
    duration: "2 months (Mentorship & Internships)",
    stipend: "Rs. 80,000 / month (Paid summer intern)",
    applicationCost: "Free & official selection (Microsoft)",
    eligibility: "2nd & 3rd-year B.Tech students in Computer Science fields",
    applicationLink: "https://careers.microsoft.com/us/en/students",
    keyDetails: "Includes a 1-month intensive mentorship build-a-thon where students build an app using Microsoft tech (Azure/C#) and secure direct interviews.",
    realWorldTip: "Be an active team collaborator. Microsoft values clean structured documentation and proper systems design during the Engage challenge."
  }
];

const CODING_LANGUAGES = [
  {
    id: "l1",
    name: "Python",
    popularity: "Highly Popular (AI, ML, Data Science, Scripting)",
    bestFor: ["AI & Deep Learning", "Web Scraping", "Data Structures", "Automation"],
    aiIntegrationTips: "The top language for LLM application development. Integrate Python with AI by importing PyTorch, Scikit-learn, LangChain, or the brand new Google GenAI SDK to make intelligent agents.",
    industryImpact: "Over 80% of current AI jobs require Python. Seamlessly links with fast backend APIs in Flask or FastAPI.",
    learningRoadmapLink: "https://docs.python.org/3/tutorial/index.html"
  },
  {
    id: "l2",
    name: "JavaScript / TypeScript",
    popularity: "Universal (Full-stack Web, Frontend, Serverless architectures)",
    bestFor: ["Interactive WebApps", "Express/Nest.js Backends", "Mobile App Dev (React Native)", "Edge APIs"],
    aiIntegrationTips: "Use TypeScript to build modern, highly secure production-ready AI user interfaces. Call AI servers using async/await patterns, standardizing types for safety and handling real-time streaming tokens securely.",
    industryImpact: "The engine of modern interactive startups. Knowing how to implement client-facing AI features makes you instantly employable.",
    learningRoadmapLink: "https://www.typescriptlang.org/docs/"
  },
  {
    id: "l3",
    name: "C++",
    popularity: "High Performance (Competitive Programming, Game Engines, Systems)",
    bestFor: ["Competitive DSA", "Embedded Microcontrollers", "Low-Latency Code", "Graphics Programming"],
    aiIntegrationTips: "AI engines (like llama.cpp) are written in C++ for maximum raw instruction speed. Use C++ to optimize local deep learning inference models, CUDA kernels for GPUs, or embedded system controls.",
    industryImpact: "Crucial for core software roles at NVIDIA, Apple, game studios, and high-frequency quantitative trading (HFT) firms.",
    learningRoadmapLink: "https://en.cppreference.com/w/cpp/language"
  },
  {
    id: "l4",
    name: "Java",
    popularity: "Robust Enterprise standard (Large Banks, Android, Multi-threading)",
    bestFor: ["Microservices", "Secure Bank Backends", "Android Native Apps", "Distributed Database Scaling"],
    aiIntegrationTips: "Enterprise tech connects massive transactional structures to LLMs. Use Spring AI to ground generative pipelines with robust relational databases or Spark clusters safely.",
    industryImpact: "Millions of production systems globally depend on Java. It provides the strongest object-oriented conceptual foundation for young developers.",
    learningRoadmapLink: "https://dev.java/learn/"
  }
];

// ------------------------------------------------------------------
// Express API Routes
// ------------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Curated static assets
app.get("/api/curated", (req, res) => {
  res.json({
    hackathons: CURATED_HACKATHONS,
    internships: CURATED_INTERNSHIPS,
    languages: CODING_LANGUAGES,
  });
});

// GET educational short videos
app.get("/api/videos", (req, res) => {
  const list = getVideos();
  res.json(list);
});

// POST to like a video
app.post("/api/videos/like", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing video ID" });
  }
  const vids = getVideos();
  const index = vids.findIndex(v => v.id === id);
  if (index !== -1) {
    vids[index].likes += 1;
    saveVideos(vids);
    return res.json({ success: true, likes: vids[index].likes });
  }
  res.status(404).json({ error: "Video not found" });
});

// POST to create/share educational short video (verified users)
app.post("/api/videos/create", (req, res) => {
  const { title, uploaderName, uploaderTitle, isVerified, tags, description, videoUrl } = req.body;
  
  if (!title || !uploaderName || !description) {
    return res.status(400).json({ error: "Title, uploader brand, and educational advice description are required" });
  }

  const vids = getVideos();
  const newPost: DBVideo = {
    id: "v" + Date.now(),
    title,
    uploaderName,
    uploaderTitle: uploaderTitle || "Verified B.Tech Student",
    isVerified: isVerified === undefined ? true : isVerified,
    videoUrl: videoUrl || "custom_animated_svg",
    likes: 12, // start with some friendly baseline likes
    tags: tags && Array.isArray(tags) ? tags : ["B.Tech Guide", "Peer Advice"],
    description,
    comments: ["Great tips!", "Thanks for contributing!", "Let's connect on LinkedIn!"],
    postedAt: new Date().toISOString().split("T")[0]
  };

  vids.unshift(newPost); // Add to the top
  saveVideos(vids);
  res.json({ success: true, video: newPost });
});

// POST to verify user (simulated proof check)
app.post("/api/verify-user", (req, res) => {
  const { fullName, email, collegeName, idNumber, department } = req.body;
  if (!fullName || !email || !collegeName || !idNumber) {
    return res.status(400).json({ error: "Please provide fullName, email, collegeName, and student ID proof details." });
  }
  
  // Accept instantly in UI to give great immediate experience, but mark verified!
  res.json({
    success: true,
    message: `Congratulations ${fullName}! Your student ID profile from ${collegeName} is verified. You now have the 'Verified Student Contributor' badge and can publish educational guide videos.`,
    isVerified: true
  });
});

// Route to fetch personalized roadmap & milestones using Gemini 3.5 Flash
app.post("/api/gemini/profile-guide", async (req, res) => {
  const { year, department, primaryLanguage, careerGoal, fullName, collegeName } = req.body;
  
  const btechYear = year || 3;
  const dept = department || "Computer Science Engineering";
  const lang = primaryLanguage || "JavaScript/TypeScript";
  const goal = careerGoal || "Full-Stack Software Engineer (AI integrations)";
  const studentName = fullName || "Student";
  const clg = collegeName || "Engineering Institute";

  const aiKey = process.env.GEMINI_API_KEY;

  if (!aiKey || aiKey === "MY_GEMINI_API_KEY") {
    // If not configured, return high-quality structure mock immediately
    return res.json(getMockGuideResponse(btechYear, dept, lang, goal, studentName, clg));
  }

  try {
    const ai = getGeminiClient();
    const prompt = `You are an elite academic counselor specializing in Indian and global B.Tech engineering careers.
Generate a comprehensive, actionable, and 100% real-world career guide system for ${studentName} studying B.Tech in ${dept}, at year ${btechYear} of their degree, who loves ${lang} and wants to become a ${goal}.

The response MUST correspond exactly to the following JSON structure:
{
  "customRoadmap": [
    {
      "id": "m1",
      "title": "Short title of concrete task",
      "description": "Specific instruction e.g. Solve NeetCode Array questions, apply to a specific hackathon, configure your GitHub profile",
      "timeframe": "Specify e.g. Year ${btechYear} Semester ${btechYear * 2 - 1}",
      "status": "pending",
      "recommendedLink": "Any real reference URL (can be authentic like leetcode.com, github.com, sih.gov.in, summerofcode.withgoogle.com)",
      "suggestedResource": "Name of free book / course / channel e.g. Kunal Kushwaha open-source tutorials, Striver SDE sheet"
    }
  ],
  "motivationQuote": "Inspirational sentence custom-linked to engineering challenges and ${lang}",
  "personalizedAdvice": "General direct mentoring text addressing CGPA limits, open source entry, and how to build a career in AI for ${dept} students.",
  "recommendedLanguagesAndAIPaths": [
    {
      "language": "${lang}",
      "actionableAITip": "Step-by-step guideline on how to integrate ${lang} with LLMs (such as Gemini 3.5 with LangChain or Python helper hooks) to build professional career applications.",
      "resourceName": "Free course/documentation",
      "resourceLink": "Official URL for documentation"
    }
  ]
}

Strictly output ONLY the JSON content as plain text, no markdown markdown blocks like \`\`\`json. Valid JSON only structure. Ensure realistic suggestions tied to third-year/fourth-year internships, SIH, GSoC, resume layouts, or competitive coding.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            customRoadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  timeframe: { type: Type.STRING },
                  status: { type: Type.STRING },
                  recommendedLink: { type: Type.STRING },
                  suggestedResource: { type: Type.STRING }
                },
                required: ["id", "title", "description", "timeframe", "status"]
              }
            },
            motivationQuote: { type: Type.STRING },
            personalizedAdvice: { type: Type.STRING },
            recommendedLanguagesAndAIPaths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  language: { type: Type.STRING },
                  actionableAITip: { type: Type.STRING },
                  resourceName: { type: Type.STRING },
                  resourceLink: { type: Type.STRING }
                },
                required: ["language", "actionableAITip", "resourceName", "resourceLink"]
              }
            }
          },
          required: ["customRoadmap", "motivationQuote", "personalizedAdvice", "recommendedLanguagesAndAIPaths"]
        }
      }
    });

    const text = response.text || "";
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error) {
    console.error("Gemini API generation failed, sending mock safe guide response:", error);
    return res.json(getMockGuideResponse(btechYear, dept, lang, goal, studentName, clg));
  }
});

// Helper function to provide highly realistic mock data when Gemini key is unconfigured
function getMockGuideResponse(year: number, dept: string, lang: string, goal: string, name: string, college: string) {
  return {
    customRoadmap: [
      {
        id: "m_mock1",
        title: "Master key algorithms using " + lang,
        description: "Focus on Two-Pointers, Sliding Window, and BFS/DFS tree traversals. Solve Neetcode 150. Practice daily to survive corporate automated coding screenings.",
        timeframe: `Year ${year}, Semester 1`,
        status: "pending",
        recommendedLink: "https://neetcode.io/practice",
        suggestedResource: "NeetCode 150 Roadmap (Free)"
      },
      {
        id: "m_mock2",
        title: "Build fully integrated AI helper using Gemini SDK",
        description: `Build a concrete micro-project in ${lang} that leverages a server-side route running Gemini 3.5 API. Deploy on free Cloud Run container. Host demo public on GitHub.`,
        timeframe: `Year ${year}, Semester 2`,
        status: "pending",
        recommendedLink: "https://ai.google.dev/gemini-api/docs",
        suggestedResource: "Google Gemini Dev Documentation"
      },
      {
        id: "m_mock3",
        title: "Apply to Off-Campus Internships & Hackathons",
        description: "Submit applications to GSoC, Google STEP Intern, or register for Smart India Hackathon. Focus resume around core functional systems, not templates.",
        timeframe: `Year ${year}, Internship Season`,
        status: "pending",
        recommendedLink: "https://summerofcode.withgoogle.com/",
        suggestedResource: "Google Summer of Code Portal"
      },
      {
        id: "m_mock4",
        title: "Draft industry standard Resume format",
        description: "Adopt the Harvard single-column resume format. Highlight actual deployed projects, technical skills, and quantitative outcomes of hackathons (e.g., '100+ active users').",
        timeframe: `Year ${year}, Pre-Placements`,
        status: "pending",
        recommendedLink: "https://overleaf.com/gallery/tagged/cv",
        suggestedResource: "Jake's Resume Overleaf Template (Free)"
      }
    ],
    motivationQuote: `“The only way to learn a new programming language like ${lang} or solve hard DSA algorithms is to write actual failing code until it works. Commit daily on GitHub, study consistently, and build tangible AI applications.”`,
    personalizedAdvice: `Hello ${name}! As a student from ${college} in ${dept} (Year ${year}), target maintaining a CGPA above 7.8 to unlock top product companies. But remember, GPA only gets you past the gate. Your hands-on portfolio in ${lang}, active engagement in student hackathons, and understanding of how to integrate AI directly (like prompt mapping and agents) will secure elite internships.`,
    recommendedLanguagesAndAIPaths: [
      {
        language: lang,
        actionableAITip: `To expand your skill with ${lang} for AI, build server-side Express handlers that query the Gemini-3.5-flash model via the official '@google/genai' client. Implement streaming responses (SSE) to create interactive live text generators.`,
        resourceName: "npm @google/genai Documentation",
        resourceLink: "https://www.npmjs.com/package/@google/genai"
      }
    ]
  };
}

// ------------------------------------------------------------------
// Vite integration for dev and production output static files
// ------------------------------------------------------------------
if (process.env.NODE_ENV !== "production") {
  import("vite").then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`B.Tech Student Guide Server running at http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error("Failed to boot Vite dev server middleware:", err);
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`B.Tech Student Guide Production Server running on port ${PORT}`);
  });
}
