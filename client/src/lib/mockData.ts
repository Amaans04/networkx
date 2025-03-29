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
  profileImage: null
};

export const jobPosting: EmployerJobPosting = {
  title: "Frontend Developer",
  daysAgo: 5,
  applicantsCount: 47,
  skills: ["React", "TypeScript", "Responsive Design", "CSS/SASS"]
};
