// Portfolio content — resume/spec-driven. Placeholders where the resume was
// not provided; edit these to reflect the actual resume.

export const PROFILE = {
  name: "Theresrose Vilsan",
  title: "Full-Stack Software Engineer",
  tagline: "I build thoughtful software, IoT systems and AI-powered experiences.",
  email: "theresrose2004@gmail.com",
  phone: "+91 6282422123",
  location: "Thrissur, Kerala, India",
  github: "https://github.com/theresros",
  linkedin: "https://linkedin.com/in/theresrose-vilsan-a998a8290",
  resumeUrl: "#",
  // Set this to your Google Drive file ID (from the share link
  // https://drive.google.com/file/d/<ID>/view) to render your Drive photo
  // as the hero portrait. Leave empty to use the generated fallback.
  driveProfileId: "1DWjmNg8AzD0M5Gy61LEI4pKIWt3xk222",
};

export const CAREER_OBJECTIVE =
  "To contribute as a full-stack software engineer at a product-driven team where I can build performant, human-centric software while continuing to grow across systems, AI and hardware-integrated products.";

export const PROFESSIONAL_SUMMARY =
  "Engineering student and full-stack developer with hands-on experience across React, FastAPI, embedded systems and AI. Selected for the PM-VIKAS IoT Assistant internship at IIIT Kottayam. Comfortable shipping polished web products end-to-end and integrating them with real-world hardware and AI services.";

export const EDUCATION = [
  {
    school: "College — replace with your institution",
    degree: "B.Tech in Computer Science / Electronics",
    period: "2022 — 2026",
    cgpa: "CGPA — add from resume",
  },
  {
    school: "Higher Secondary",
    degree: "Class XI–XII, Computer Science stream",
    period: "2020 — 2022",
    cgpa: "",
  },
];

export const SKILLS = [
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "C", "C++", "Java", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "TanStack Start", "Tailwind CSS", "Framer Motion", "HTML", "CSS"] },
  { label: "Backend", items: ["FastAPI", "Node.js", "Express", "REST APIs", "WebSockets"] },
  { label: "Databases", items: ["PostgreSQL", "Firebase", "Supabase", "MongoDB"] },
  { label: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vercel"] },
  { label: "Concepts", items: ["OOP", "REST", "System Design", "Agile", "CI/CD"] },
  { label: "DSA", items: ["Arrays", "Trees", "Graphs", "DP", "Sorting", "Hashing"] },
  { label: "Hardware / IoT", items: ["ESP32", "Arduino", "IR Sensors", "Embedded C", "Firebase RTDB"] },
];

export const EXPERIENCE = [
  {
    role: "IoT Assistant Intern",
    org: "Indian Institute of Information Technology, Kottayam",
    program: "PM-VIKAS Skill Development Programme",
    period: "2025 — Present",
    bullets: [
      "Selected for the PM-VIKAS IoT Assistant training programme at IIIT Kottayam.",
      "Working on embedded systems, sensors, microcontrollers and end-to-end IoT prototypes.",
      "Building software–hardware integrations, dashboards and testing pipelines.",
    ],
  },
];

export const PROJECTS = [
  {
    name: "FindMySlot",
    description:
      "QR-based IoT Smart Parking platform enabling real-time parking slot monitoring, reservations and automated vehicle access.",
    tech: ["ESP32", "Firebase", "JavaScript", "HTML", "CSS", "IR Sensors"],
    features: ["Real-time parking", "QR Entry", "Reservations", "Admin Dashboard", "Floor View"],
    github: "https://github.com/theresros/Findmyslot.git",
    demo: "https://findmyslot-one.vercel.app/",
  },
  {
    name: "CareOptimize",
    description: "AI Healthcare Workforce Optimization Platform balancing patient demand and staff availability in real time.",
    tech: ["React", "Tailwind", "FastAPI", "WebSockets", "Groq LLaMA", "Chart.js"],
    features: ["AI scheduling", "Live analytics", "WebSocket updates", "Role dashboards"],
    github: "https://github.com/add-win/Quick-Care.git",
    demo: "https://quick-care-one.vercel.app",
  },
  {
    name: "Quick AI",
    description: "AI productivity workspace bringing writing, summarization and content workflows into one calm interface.",
    tech: ["React", "Tailwind", "AI SDK", "Vercel"],
    features: ["AI writing", "Chat", "Image tools", "Personal workspace"],
    github: "https://github.com/theresros/Quick-AI.git",
    demo: "https://quick-ai-green-omega.vercel.app",
  },
];

// Google Drive images — converted from share URLs to the `lh3.googleusercontent.com`
// direct-render endpoint, which serves the file inline (unlike `uc?export=view`,
// which returns an HTML redirect page that <img> can't render). If a link
// fails, the UI falls back to the generated local asset next to it.
export const drive = (id: string, width = 2000) =>
  `https://lh3.googleusercontent.com/d/${id}=w${width}`;

export const GALLERY = [
  { drive: drive("1u5wxNCyMBClg4yLDASD6z4vd9M1TsrmX"), fallback: "/images/journey-1.jpg", alt: "Award moment" },
  { drive: drive("1CUsE17dzxRpwYx64fbGT4-1NwWTfVpMj"), fallback: "/images/journey-2.jpg", alt: "Lab work" },
  { drive: drive("1CcMvnawLiJiy37eH1aPf4ScX94HFdUNc"), fallback: "/images/journey-3.jpg", alt: "Presenting" },
];

export const ACHIEVEMENTS = [
  {
    title: "Hacksus Winner",
    org: "Rajagiri School of Engineering",
    year: "2026",
    certificate: drive("1M6EOU9mpE96KkuWvh9TbJWILdGUME8NB"),
  },
  {
    title: "Google Data Analytics Professional Certificate",
    org: "Google · Coursera",
    year: "2025",
    certificate: drive("12OLiM7aOE6C0xazWH-qqLS-HAJdQcPa6"),
  },
  {
    title: "Contributor",
    org: "CODEFIX Magazine",
    year: "2024 — Present",
    certificate: null,
  },
  {
    title: "Second Place — ISRO Certified Debate",
    org: "ISRO",
    year: "",
    certificate: drive("1iAlQH6zibBJx_9GpcSK5Y0pVhSC5D_ml"),
  },
  {
    title: "Third Place — ISRO Spacecraft Competition",
    org: "ISRO",
    year: "",
    certificate: drive("14Xm8Vapy0DOCJsBRyZvzhTOnr96d-o6k"),
  },
  {
    title: "Participant — BAJA SAEINDIA",
    org: "SAE India",
    year: "",
    certificate: drive("1irI9Q8jnqP_DMaxzQ_miFje49OXhaPar"),
  },
];

export const PMVIKAS = {
  program: "PM-VIKAS Skill Development Programme",
  institute: "Indian Institute of Information Technology, Kottayam",
  role: "IoT Assistant Intern",
  overview:
    "PM-VIKAS (Pradhan Mantri Vishwakarma Kaushal Samman) is a Government of India initiative under the Ministry of Skill Development, delivered at IIIT Kottayam to train the next wave of IoT engineers. The IoT Assistant track covers embedded systems, sensors, microcontrollers, networking, cloud dashboards and end-to-end troubleshooting.",
  objectives: [
    "Build practical, deployable IoT prototypes end-to-end.",
    "Master microcontroller programming, sensor interfacing and communication protocols.",
    "Learn networking, cloud dashboards and industrial IoT best practices.",
    "Develop debugging, integration and documentation discipline.",
  ],
  outcomes: [
    "Design and assemble IoT systems from schematic to shipped prototype.",
    "Program ESP32/Arduino boards for real-world sensing and actuation.",
    "Integrate hardware with cloud services and web dashboards.",
    "Diagnose and fix hardware/software integration issues.",
  ],
  modules: [
    { name: "Embedded Systems", desc: "Microcontroller fundamentals, firmware, memory & peripherals." },
    { name: "Sensors & Actuators", desc: "IR, ultrasonic, temperature, humidity and control modules." },
    { name: "Microcontrollers", desc: "ESP32, Arduino, GPIO, ADC, PWM, timers, interrupts." },
    { name: "IoT Protocols", desc: "MQTT, HTTP, WebSockets, BLE and Wi-Fi communication." },
    { name: "Networking", desc: "TCP/IP basics, cloud connectivity and secure device onboarding." },
    { name: "Hardware/Software Integration", desc: "Bridging firmware, dashboards and databases." },
    { name: "Troubleshooting", desc: "Systematic debugging of hardware, network and code issues." },
    { name: "Deployment", desc: "Enclosures, field-testing and long-run reliability." },
  ],
};