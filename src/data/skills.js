/**
 * skills.js
 * Technical skills, frameworks, and tooling grouped by domain.
 * Level values: "working" (Working Knowledge) | "foundation" (Foundation) | "learning" (Currently Learning)
 */

export const skillGroups = [
  {
    icon: "Code2",
    title: "Programming & Data",
    skills: [
      { name: "Python", level: "working" },
      { name: "SQL", level: "working" },
      { name: "Pandas", level: "working" },
      { name: "NumPy", level: "working" },
      { name: "Matplotlib", level: "working" },
      { name: "Excel", level: "working" },
    ],
  },
  {
    icon: "BarChart3",
    title: "Data & Business Intelligence",
    skills: [
      { name: "Power BI", level: "working" },
      { name: "Exploratory Data Analysis", level: "working" },
      { name: "Data Visualisation", level: "working" },
    ],
  },
  {
    icon: "BrainCircuit",
    title: "Machine Learning",
    skills: [
      { name: "Scikit-learn", level: "foundation" },
      { name: "Regression Models", level: "foundation" },
      { name: "Predictive Modelling", level: "foundation" },
    ],
  },
  {
    icon: "Sparkles",
    title: "AI & Automation",
    skills: [
      { name: "Generative AI", level: "working" },
      { name: "LLM API Integration", level: "working" },
      { name: "AI-Assisted Development", level: "working" },
      { name: "AI Agents", level: "learning" },
      { name: "n8n Workflow Automation", level: "learning" },
    ],
  },
  {
    icon: "Layers",
    title: "Web & App Development",
    skills: [
      { name: "React", level: "foundation" },
      { name: "Next.js", level: "foundation" },
      { name: "FastAPI", level: "foundation" },
      { name: "Flutter & Dart", level: "foundation" },
      { name: "HTML & CSS", level: "foundation" },
      { name: "SQLite", level: "foundation" },
    ],
  },
  {
    icon: "Wrench",
    title: "Tools & Platforms",
    skills: [
      { name: "GitHub", level: "working" },
      { name: "Google Colab", level: "working" },
      { name: "Streamlit", level: "working" },
      { name: "Claude", level: "working" },
      { name: "Google Antigravity", level: "working" },
      { name: "Stitch", level: "working" },
    ],
  },
];

export default skillGroups;
