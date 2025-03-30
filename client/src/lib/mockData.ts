import { Job, Applicant, Profile, EmployerJobPosting, ShortlistedCandidate, HiringUpdate } from '../types';

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Google",
    companyLogo: "ri-google-fill",
    description: "Join our team to build beautiful, responsive web applications using React and modern frontend technologies.",
    location: "New York, NY",
    salary: "$120K - $150K",
    workType: "Hybrid",
    matchPercentage: 85,
    skills: ["React", "TypeScript", "TailwindCSS"]
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Microsoft",
    companyLogo: "ri-microsoft-fill",
    description: "Design intuitive user experiences for Microsoft products. Strong portfolio of web and mobile designs required.",
    location: "Seattle, WA",
    salary: "$110K - $140K",
    workType: "Remote",
    matchPercentage: 92,
    skills: ["Figma", "UI/UX", "Product Design"]
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Netflix",
    companyLogo: "ri-netflix-fill",
    description: "Build scalable backend services supporting millions of users. Experience with microservices architecture a plus.",
    location: "Los Angeles, CA",
    salary: "$130K - $170K",
    workType: "In-office",
    matchPercentage: 78,
    skills: ["Java", "Spring Boot", "AWS"]
  },
  {
    id: "4",
    title: "Product Designer",
    company: "Airbnb",
    companyLogo: "ri-home-heart-fill",
    description: "Create engaging user experiences that help people find amazing places to stay around the world.",
    location: "San Francisco, CA",
    salary: "$115K - $145K",
    workType: "Hybrid",
    matchPercentage: 90,
    skills: ["Product Design", "UI/UX", "Figma"]
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Spotify",
    companyLogo: "ri-spotify-fill",
    description: "Improve our CI/CD pipelines and infrastructure. Help us scale to serve millions of music lovers worldwide.",
    location: "Remote",
    salary: "$125K - $160K",
    workType: "Remote",
    matchPercentage: 82,
    skills: ["AWS", "Kubernetes", "Jenkins"]
  }
];

export const shortlistedJobs: Job[] = [
  {
    id: "4",
    title: "Product Designer",
    company: "Airbnb",
    companyLogo: "ri-home-heart-fill",
    description: "Create engaging user experiences that help people find amazing places to stay around the world.",
    location: "San Francisco, CA",
    salary: "$115K - $145K",
    workType: "Hybrid",
    matchPercentage: 90,
    skills: ["Product Design", "UI/UX", "Figma"]
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Spotify",
    companyLogo: "ri-spotify-fill",
    description: "Improve our CI/CD pipelines and infrastructure. Help us scale to serve millions of music lovers worldwide.",
    location: "Remote",
    salary: "$125K - $160K",
    workType: "Remote",
    matchPercentage: 82,
    skills: ["AWS", "Kubernetes", "Jenkins"]
  }
];

export const applicants: Applicant[] = [
  {
    id: "1",
    name: "James Wilson",
    position: "Frontend Developer",
    experience: "5 years exp.",
    location: "San Francisco, CA",
    previousCompany: "Dropbox",
    description: "Experienced frontend developer with a passion for creating responsive and accessible user interfaces. Proficient in modern JavaScript frameworks.",
    matchPercentage: 94,
    skills: ["React", "Vue.js", "TypeScript", "TailwindCSS", "GraphQL"]
  },
  {
    id: "2",
    name: "Sophia Martinez",
    position: "UI/UX Designer & Developer",
    experience: "3 years exp.",
    location: "Chicago, IL",
    previousCompany: "Airbnb",
    description: "Designer-developer hybrid with strong skills in both visual design and frontend implementation. Creates cohesive user experiences from concept to code.",
    matchPercentage: 86,
    skills: ["Figma", "HTML/CSS", "JavaScript", "React"]
  },
  {
    id: "3",
    name: "David Kumar",
    position: "Frontend Engineer",
    experience: "4 years exp.",
    location: "Remote",
    previousCompany: "Twitter",
    description: "Performance-focused frontend engineer with experience building complex web applications. Specializes in optimizing load times and runtime efficiency.",
    matchPercentage: 78,
    skills: ["JavaScript", "React", "Webpack", "Performance"]
  }
];

export const shortlistedApplicants: ShortlistedCandidate[] = [
  {
    id: "4",
    name: "Emily Johnson",
    position: "Senior UX Designer",
    location: "San Francisco, CA",
    matchPercentage: 95
  },
  {
    id: "5",
    name: "Ryan Peterson",
    position: "Frontend Engineer",
    location: "Remote",
    matchPercentage: 88
  }
];

export const hiringUpdates: HiringUpdate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Frontend Developer",
    company: "Facebook",
    timeAgo: "2 minutes ago"
  },
  {
    id: "2",
    name: "Sarah Park",
    position: "UX Designer",
    company: "Adobe",
    timeAgo: "15 minutes ago"
  },
  {
    id: "3",
    name: "Michael Chen",
    position: "Product Manager",
    company: "Twitter",
    timeAgo: "just now"
  }
];

export const profile: Profile = {
  name: "John Doe",
  position: "Senior Frontend Developer",
  location: "San Francisco, CA",
  about: "Passionate frontend developer with 5+ years of experience in React and TypeScript. Love creating beautiful and performant web applications.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      period: "2020 - Present",
      description: "Leading frontend development team and implementing new features using React and TypeScript."
    },
    {
      company: "WebDev Solutions",
      position: "Frontend Developer",
      period: "2018 - 2020",
      description: "Developed and maintained multiple client projects using modern web technologies."
    }
  ],
  documents: [
    {
      name: "Resume.pdf",
      icon: "ri-file-pdf-line",
      lastUpdated: "2 days ago"
    },
    {
      name: "Portfolio.pdf",
      icon: "ri-file-pdf-line",
      lastUpdated: "1 week ago"
    }
  ],
  preferences: {
    location: "San Francisco, CA",
    jobTypes: ["Full-time", "Remote"],
    salaryRange: {
      min: "120000",
      max: "180000"
    },
    notifications: {
      jobs: true,
      status: true,
      messages: true
    }
  },
  completeness: {
    percentage: 85,
    completed: ["Basic Info", "About Me", "Skills", "Experience", "Job Preferences"],
    pending: ["Resume"]
  },
  profileImage: null,
  badges: [
    {
      id: "b1",
      name: "Profile Pro",
      icon: "ri-profile-line",
      description: "Completed 80% of your profile",
      earned: true,
      earnedDate: "Jan 15, 2023"
    },
    {
      id: "b2",
      name: "Skill Master",
      icon: "ri-tools-line",
      description: "Added 5+ relevant skills",
      earned: true,
      earnedDate: "Feb 3, 2023"
    },
    {
      id: "b3",
      name: "Networking Novice",
      icon: "ri-user-shared-line",
      description: "Connected with 10+ professionals",
      earned: true,
      earnedDate: "Mar 12, 2023"
    },
    {
      id: "b4",
      name: "Content Creator",
      icon: "ri-article-line",
      description: "Shared 3+ resources with the community",
      earned: false
    },
    {
      id: "b5",
      name: "Top Contributor",
      icon: "ri-medal-line",
      description: "Among top 10% active community members",
      earned: false
    }
  ],
  careerHighlights: [
    {
      id: "ch1",
      title: "Led Frontend Redesign",
      description: "Spearheaded complete redesign of company's flagship product",
      year: "2022"
    },
    {
      id: "ch2",
      title: "Reduced Load Time by 40%",
      description: "Optimized rendering performance and bundle size",
      year: "2021"
    },
    {
      id: "ch3",
      title: "Open Source Contribution",
      description: "Key contributor to popular React component library",
      year: "2020"
    }
  ],
  profileInsights: {
    careerFitScore: {
      score: 92,
      industry: "Technology",
      topMatches: [
        { role: "Senior Frontend Developer", score: 97 },
        { role: "Frontend Architect", score: 85 },
        { role: "Technical Lead", score: 80 }
      ]
    },
    recommendations: [
      {
        id: "r1",
        type: "skill",
        title: "GraphQL",
        reason: "In high demand for frontend roles - 65% of similar profiles have this skill"
      },
      {
        id: "r2",
        type: "certification",
        title: "AWS Certified Developer",
        reason: "Complements your full-stack skills and increases salary potential by 12%"
      },
      {
        id: "r3",
        type: "connection",
        title: "Connect with Tech Leaders",
        reason: "93% of successful job seekers in your field have connections with tech leaders"
      }
    ],
    endorsements: [
      { skill: "React", count: 15 },
      { skill: "TypeScript", count: 12 },
      { skill: "Next.js", count: 8 },
      { skill: "Tailwind CSS", count: 6 }
    ]
  }
};

export const jobPosting: EmployerJobPosting = {
  title: "Frontend Developer",
  daysAgo: 5,
  applicantsCount: 47,
  skills: ["React", "TypeScript", "Responsive Design", "CSS/SASS"]
};

export const mockInterviews = [
  {
    id: "interview1",
    title: "Frontend Developer Interview",
    description: "Practice common React and JavaScript questions for frontend roles",
    category: "technical",
    difficulty: "intermediate" as "beginner" | "intermediate" | "advanced",
    duration: 30,
    dateCreated: new Date().toISOString(),
    questions: [
      { 
        id: "q1", 
        question: "Explain the concept of virtual DOM in React and why it's important.",
        category: "react",
        tips: ["Focus on performance benefits", "Explain the reconciliation process"],
        keypoints: ["Tree diffing algorithm", "Batch updates", "Minimized DOM operations"]
      },
      { 
        id: "q2", 
        question: "What are closures in JavaScript and how would you use them?",
        category: "javascript",
        tips: ["Provide a practical example", "Explain lexical scoping"],
        keypoints: ["Function that references variables from outer scope", "Data encapsulation", "Memory considerations"]
      },
      { 
        id: "q3", 
        question: "Describe the difference between controlled and uncontrolled components in React.",
        category: "react",
        tips: ["Discuss form handling", "Mention refs for uncontrolled components"],
        keypoints: ["State management", "Single source of truth", "Direct DOM access"]
      }
    ]
  },
  {
    id: "interview2",
    title: "Behavioral Interview",
    description: "Practice answering questions about your work experience and collaboration skills",
    category: "behavioral",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    duration: 25,
    dateCreated: new Date().toISOString(),
    questions: [
      { 
        id: "q1", 
        question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
        category: "experience",
        tips: ["Use the STAR method", "Focus on your specific contributions"],
        keypoints: ["Problem definition", "Action steps", "Measurable results"]
      },
      { 
        id: "q2", 
        question: "How do you handle conflicts in a team environment?",
        category: "teamwork",
        tips: ["Provide a specific example", "Highlight communication skills"],
        keypoints: ["Active listening", "Finding common ground", "Constructive resolution"]
      },
      { 
        id: "q3", 
        question: "Describe a situation when you had to meet a tight deadline and how you managed it.",
        category: "work-style",
        tips: ["Show your prioritization skills", "Discuss work-life balance"],
        keypoints: ["Time management", "Delegation", "Communication with stakeholders"]
      }
    ]
  },
  {
    id: "interview3",
    title: "System Design Challenge",
    description: "Practice designing scalable systems and architecture",
    category: "system design",
    difficulty: "advanced" as "beginner" | "intermediate" | "advanced",
    duration: 45,
    dateCreated: new Date().toISOString(),
    questions: [
      { 
        id: "q1", 
        question: "Design a URL shortening service like bit.ly.",
        category: "architecture",
        tips: ["Consider scale and performance", "Discuss database choices"],
        keypoints: ["Hashing algorithms", "Caching strategy", "Analytics capabilities"]
      },
      { 
        id: "q2", 
        question: "How would you design Twitter's backend?",
        category: "architecture",
        tips: ["Focus on scalability challenges", "Consider real-time aspects"],
        keypoints: ["Feed generation", "Notification system", "Data partitioning"]
      },
      { 
        id: "q3", 
        question: "Design a distributed cache system.",
        category: "distributed-systems",
        tips: ["Discuss consistency models", "Consider failure scenarios"],
        keypoints: ["Eviction policies", "Sharding strategy", "Replication mechanism"]
      }
    ]
  }
];
