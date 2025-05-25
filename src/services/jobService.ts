
export interface Skill {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  experience: number;
  salary: string;
  skills: Skill[];
  description: string;
  posted: string;
  applied?: boolean;
}

export const skills: Skill[] = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "React" },
  { id: 4, name: "Angular" },
  { id: 5, name: "Vue.js" },
  { id: 6, name: "Node.js" },
  { id: 7, name: "Express" },
  { id: 8, name: "MongoDB" },
  { id: 9, name: "SQL" },
  { id: 10, name: "PostgreSQL" },
  { id: 11, name: "MySQL" },
  { id: 12, name: "GraphQL" },
  { id: 13, name: "REST API" },
  { id: 14, name: "Docker" },
  { id: 15, name: "AWS" },
  { id: 16, name: "Azure" },
  { id: 17, name: "Google Cloud" },
  { id: 18, name: "Git" },
  { id: 19, name: "CI/CD" },
  { id: 20, name: "Python" },
  { id: 21, name: "Java" },
  { id: 22, name: "C#" },
  { id: 23, name: ".NET" },
  { id: 24, name: "PHP" },
  { id: 25, name: "Ruby" },
  { id: 26, name: "Ruby on Rails" },
  { id: 27, name: "Swift" },
  { id: 28, name: "Kotlin" },
  { id: 29, name: "Flutter" },
  { id: 30, name: "React Native" },
  { id: 31, name: "TensorFlow" },
  { id: 32, name: "Machine Learning" },
  { id: 33, name: "AI" },
  { id: 34, name: "Data Science" },
  { id: 35, name: "DevOps" }
];

// Function to generate mock job data
const generateJobs = (): Job[] => {
  const companies = [
    { name: "TechCorp", logo: "https://placehold.co/100x100?text=TC" },
    { name: "WebSolutions", logo: "https://placehold.co/100x100?text=WS" },
    { name: "DataSystems", logo: "https://placehold.co/100x100?text=DS" },
    { name: "CloudNine", logo: "https://placehold.co/100x100?text=CN" },
    { name: "InnovateTech", logo: "https://placehold.co/100x100?text=IT" },
    { name: "CodeMasters", logo: "https://placehold.co/100x100?text=CM" },
    { name: "DevPro", logo: "https://placehold.co/100x100?text=DP" },
    { name: "AppGenius", logo: "https://placehold.co/100x100?text=AG" }
  ];

  const jobTitles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", 
    "DevOps Engineer", "UI/UX Designer", "Data Scientist", "Product Manager",
    "QA Engineer", "Mobile Developer", "Cloud Architect"
  ];

  const locations = [
    "Remote", "New York, NY", "San Francisco, CA", "Austin, TX",
    "Seattle, WA", "Boston, MA", "Chicago, IL", "Los Angeles, CA"
  ];

  const types = ["Full-time", "Part-time", "Contract", "Freelance"];

  const salaryRanges = [
    "$60K - $80K", "$80K - $100K", "$100K - $120K", "$120K - $150K", 
    "$150K - $180K", "$180K - $220K"
  ];

  return Array.from({ length: 30 }, (_, i) => {
    const randomSkills = [...skills]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 8) + 3);

    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    
    // Generate a random date within the last 30 days
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - Math.floor(Math.random() * 30));
    const posted = postedDate.toLocaleDateString();

    return {
      id: i + 1,
      title: jobTitle,
      company: company.name,
      logo: company.logo,
      location: locations[Math.floor(Math.random() * locations.length)],
      type: types[Math.floor(Math.random() * types.length)],
      experience: Math.floor(Math.random() * 10) + 1,
      salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
      skills: randomSkills,
      description: `We are looking for an experienced ${jobTitle} to join our team. This is a ${types[Math.floor(Math.random() * types.length)]} position with competitive compensation. The ideal candidate will have strong problem-solving abilities and excellent communication skills.\n\nResponsibilities:\n• Develop and maintain high-quality applications\n• Collaborate with cross-functional teams\n• Participate in code reviews\n• Troubleshoot and debug applications\n\nRequirements:\n• ${randomSkills.slice(0, 3).map(skill => skill.name).join(", ")} experience\n• Strong problem-solving abilities\n• Excellent communication skills`,
      posted: posted
    };
  });
};

// Mock jobs data
const mockJobs = generateJobs();

// Get all jobs with optional pagination and search
export const getJobs = (
  page = 1, 
  pageSize = 10, 
  searchTerm = ""
): { jobs: Job[], total: number } => {
  const lowercasedTerm = searchTerm.toLowerCase();
  
  const filteredJobs = mockJobs.filter(job => {
    return (
      job.title.toLowerCase().includes(lowercasedTerm) || 
      job.company.toLowerCase().includes(lowercasedTerm) ||
      job.skills.some(skill => skill.name.toLowerCase().includes(lowercasedTerm))
    );
  });
  
  const paginatedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);
  
  return { 
    jobs: paginatedJobs,
    total: filteredJobs.length
  };
};

// Get a job by ID
export const getJobById = (id: number): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

// Mark a job as applied
export const applyForJob = (jobId: number): void => {
  const job = mockJobs.find(job => job.id === jobId);
  if (job) {
    job.applied = true;
  }
};