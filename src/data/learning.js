/**
 * learning.js
 * Verified courses, certifications, programmes, and academic recognitions.
 * NOTE:
 * - "type" should match actual documentation (Certificate, Course, Programme, Internship, Workshop).
 * - Empty fields ("") are automatically hidden in the UI.
 * - Add/update credentialUrl when certificates or verification links are available.
 */

export const achievements = [
  {
    id: "data-dive",
    title: "First Position, Data Dive Workshop",
    organiser: "",
    period: "Second year of B.Tech",
    description: "",
    credentialUrl: "",
    icon: "Trophy",
  },
];

export const learning = [
  {
    id: "linkedin-data-analysis",
    type: "Certificate",
    title: "Career Essentials in Data Analysis",
    provider: "Microsoft & LinkedIn Learning",
    period: "Completed July 2025",
    description: "",
    credentialUrl: "",
    icon: "BadgeCheck",
  },
  {
    id: "codewithharry-ds",
    type: "Course",
    title: "Data Science Learning Programme",
    provider: "Code With Harry",
    period: "July 2025 – January 2026",
    description: "",
    credentialUrl: "",
    icon: "Database",
  },
  {
    id: "nu-intelligence",
    type: "Programme",
    title: "Python for Data Science",
    provider: "Nu Intelligence",
    period: "December 2024 – March 2025",
    description: "",
    credentialUrl: "",
    icon: "Code2",
  },
  {
    id: "dataflair-python",
    type: "Course",
    title: "Python Programming",
    provider: "DataFlair",
    period: "May – July 2024",
    description: "",
    credentialUrl: "",
    icon: "Terminal",
  },
];

export default { achievements, learning };
