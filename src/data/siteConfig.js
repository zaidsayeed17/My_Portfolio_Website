/**
 * siteConfig.js
 * Single source of truth for personal information, navigation, and portfolio metadata.
 * RULES:
 * - All personal info and links must reside here.
 * - Components must read from this config rather than hard-coding strings.
 */

export const siteConfig = {
  name: "Mohammad Zaid Sayeed",
  siteUrl: "", // Production site URL (e.g. "https://mohammadzaid.dev"). When empty, relative paths are used and canonical link is omitted.
  monogram: "MZS",
  titleSubtitle: "AI & DATA SCIENCE",
  headline: "Building Intelligent Applications with AI",
  subline: "AI & Data Science Student | AI-Assisted Developer | Aspiring AI Engineer",
  location: "Nagpur, Maharashtra, India",
  email: "zaidsayeed17@gmail.com",
  phone: "9284419270",
  showPhone: false, // phone must NOT be displayed publicly unless this flag is true
  github: "https://github.com/zaidsayeed17",
  linkedin: "https://www.linkedin.com/in/mohammad-zaid-sayeed-9b42b42b7/",
  resumeUrl: "", // when empty, hide the Download Resume button or show it disabled as "Resume coming soon"
  openToWork: true,
  heroImageMode: "framed", // "cutout" | "framed"
  showUnverifiedProjects: true, // when true, projects with needsVerification: true are displayed
  stats: [
    { value: 6, suffix: "+", label: "Projects Built", icon: "Layers" },
    { value: 4, suffix: "", label: "Learning Programmes", icon: "BookOpen" },
    { value: 2027, suffix: "", label: "Graduating", icon: "GraduationCap" },
  ],
  interests: [
    "Generative AI",
    "LLM Apps",
    "AI Agents",
    "Automation",
    "Data Analytics",
  ],
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "What I Build", href: "#build" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Learning", href: "#learning" },
    { name: "Contact", href: "#contact" },
  ],
};

export default siteConfig;
