/**
 * projects.js
 * Master repository of all academic, exploratory, and client/hackathon projects.
 * Images can be placed in src/assets/projects/ and imported here.
 *
 * Project Data Model:
 * - id: unique slug identifier
 * - title: display name
 * - category: domain taxonomy
 * - status: "completed" | "in-development" | "prototype" | "concept"
 * - group: taxonomy bucket used for gallery filtering:
 *     - "ai" -> "AI & Automation"
 *     - "mobile" -> "Mobile & Business Apps"
 *     - "data" -> "Data & ML"
 *     - "web" -> "Websites"
 *     (Special filter "Concepts & In Progress" matches status === "concept" || status === "in-development")
 * - featured: boolean (true for projects displayed on the homepage)
 * - featuredOrder: numeric order (1..4) controlling homepage card display sequence.
 *     Featured projects are always shown on the homepage regardless of the showUnverifiedProjects flag.
 * - needsVerification: boolean flag for projects requiring review (controlled by siteConfig.showUnverifiedProjects)
 * - icon: string matching Lucide icon name
 * - description: standard narrative description
 * - tags: array of technology / skill labels
 * - github: repository link or empty string
 * - demo: live deployment link or empty string
 * - image: imported image asset or empty string
 *
 * Optional Fields:
 * - summary: short 1-2 sentence text for card and listing views
 * - subtitle: concise product tagline
 * - context: event, hackathon, or development setting
 * - details: object for rich detail views ({ overview, features: string[], contribution, note })
 * - instagram: Instagram profile or DM link (for The Little Corner)
 * - screenshotsFolder: string (folder name inside src/assets/projects/)
 * - screenshotCaptions: object mapping a key to a short caption (e.g. { dashboard: "Dashboard" })
 * - screenshotFit: "cover" | "contain" (default "cover"). When "contain", uses object-contain with sand background
 * - screenshotPosition: string (default "top", e.g. "center", "top", "bottom") controlling object-position
 * - demoLabel: optional string overriding the "Live Demo" button text (e.g. "View Report")
 * Note: The cover image is the "image" field if provided, else the first screenshot from
 * getProjectImages(screenshotsFolder), else the existing placeholder.
 */

export const projects = [
  // 1. ShopManager (Featured #1)
  {
    id: "shopmanager",
    title: "ShopManager",
    category: "Flutter Business Application",
    group: "mobile",
    status: "in-development",
    featured: true,
    featuredOrder: 1,
    needsVerification: false,
    icon: "Store",
    description:
      "An offline-first business management and billing app for small businesses, bringing customers, products, inventory, bills, payments and ledgers into one organised workflow.",
    tags: ["Flutter", "Dart", "Offline-first", "PDF & Excel Export"],
    github: "https://github.com/zaidsayeed17/shopmanager_app",
    demo: "",
    image: "",
    screenshotsFolder: "shopmanager",
    screenshotFit: "cover",
    screenshotPosition: "top",
    screenshotCaptions: {
      dashboard: "Dashboard",
      billing: "Billing",
      "pdf-bill": "PDF bill",
      ledger: "Customer ledger",
      inventory: "Inventory",
      reports: "Reports",
    },
  },

  // 2. SuryaSetu (Featured #2)
  {
    id: "suryasetu",
    title: "SuryaSetu",
    subtitle: "AI-Powered Solar Intelligence Platform",
    category: "AI Application | Sustainability | Solar Energy",
    group: "ai",
    status: "prototype",
    featured: true,
    featuredOrder: 2,
    needsVerification: false,
    icon: "Sun",
    context: "OutgrowX 2026",
    tags: ["AI Vision & OCR", "ROI Forecasting", "Solar Advisor", "English / Hindi / Marathi"],
    summary:
      "An AI-powered solar decision and marketplace platform that helps Indian homeowners, landowners and solar businesses assess solar suitability, estimate savings and forecast ROI.",
    description:
      "An AI-powered solar decision and marketplace platform that helps Indian homeowners, landowners and solar businesses assess solar suitability, estimate savings and forecast ROI.",
    details: {
      overview:
        "SuryaSetu is an AI-powered solar decision and marketplace platform designed for Indian homeowners, landowners and solar installation businesses. It helps users understand whether solar energy is suitable for their property, estimate potential savings, forecast return on investment (ROI), and explore relevant government solar schemes.",
      features: [
        "Three user experiences for consumers, landowners and solar businesses",
        "Electricity bill scanning using AI vision and OCR to extract key bill details",
        "Solar suitability score based on multiple property-related factors",
        "Long-term solar ROI and savings projections",
        "Seasonal electricity consumption modelling using appliance categories",
        "Roof solar assessment and land-based solar potential estimation",
        "AI-powered solar advisor for questions about solar energy and Indian government schemes",
        "Solar report generation with charts and PDF export",
        "Installer marketplace and lead management features",
        "English, Hindi and Marathi language support",
      ],
      contribution:
        "I worked on this project with a focus on developing an AI-powered solar decision platform as part of the OutgrowX 2026 project.",
      note:
        "Built as part of OutgrowX 2026. The features above describe what the platform is designed to do; they are not independently verified real-world results.",
    },
    github: "",
    demo: "",
    image: "",
    screenshotsFolder: "suryasetu",
    screenshotFit: "cover",
    screenshotPosition: "top",
    screenshotCaptions: {
      home: "Home",
      "bill-scan": "Electricity bill scan",
      "solar-score": "Solar suitability score",
      roi: "ROI and savings projection",
      advisor: "AI solar advisor",
      report: "Solar report",
    },
  },

  // 3. The Little Corner (Featured #3)
  {
    id: "little-corner",
    title: "The Little Corner",
    subtitle: "Handmade Gifts Website",
    category: "Small Business Website",
    group: "web",
    status: "prototype",
    context: "Small-business website",
    featured: true,
    featuredOrder: 3,
    needsVerification: false,
    icon: "Gift",
    summary:
      "A website for a handmade gifts and crafts brand, designed for product discovery and ordering through Instagram DM.",
    description:
      "A website concept for a handmade gifts brand, designed for product discovery and ordering through Instagram DM.",
    details: {
      overview:
        "The Little Corner is a handmade gifts and crafts brand offering items such as handmade flowers, keychains and customised gifts. The website is designed to help customers discover products, browse categories, save items they like and contact the seller through Instagram to place an order.",
      features: [
        "Product categories for handmade flowers, keychains and customised gifts",
        "Product images and descriptions",
        "Saved-item functionality for products customers like",
        "Instagram DM as the primary ordering channel",
        "Lightweight setup with no backend or admin panel; product details are updated directly in the code",
        "Built with React, Vite and Tailwind CSS",
      ],
      note:
        "Orders are placed through Instagram DM; the website does not process orders or payments. No sales, customer or traffic figures are claimed.",
    },
    tags: ["React", "Vite", "Tailwind CSS"],
    instagram: "https://www.instagram.com/thelittlecornerbytasbiii/",
    github: "https://github.com/zaidsayeed17/the-little-corner-website",
    demo: "https://the-littlecorner.vercel.app/",
    image: "",
    screenshotsFolder: "little-corner",
    screenshotFit: "cover",
    screenshotPosition: "top",
    screenshotCaptions: {
      home: "Home page",
      categories: "Product categories",
      products: "Products",
      saved: "Saved items",
      order: "How to order",
    },
  },

  // 4. E-commerce Sales Dashboard (Featured #4)
  {
    id: "ecommerce-dashboard",
    title: "E-commerce Sales Dashboard",
    subtitle: "Power BI Sales Analytics",
    category: "Data Analytics / Business Intelligence",
    group: "data",
    status: "completed",
    context: "Data analytics project",
    featured: true,
    featuredOrder: 4,
    needsVerification: false,
    icon: "BarChart3",
    summary:
      "A business intelligence dashboard that visualises e-commerce sales data to help analyse sales performance and business trends.",
    description:
      "A business intelligence dashboard that visualises e-commerce sales data to help analyse sales performance and business trends.",
    details: {
      overview:
        "This project turns e-commerce sales data into a readable dashboard. It combines SQL-based data preparation, Excel for data handling, and Power BI for interactive visualisation, so that sales performance and trends can be explored in one place.",
      features: [
        "Interactive Power BI dashboard for exploring e-commerce sales data",
        "SQL used for preparing and querying the data",
        "Excel used for data handling and checks",
        "Visualisations that present sales performance and business trends",
      ],
      note:
        "Built with sample or public data for learning purposes. The figures shown do not represent a real business, and no business results are claimed.",
    },
    tags: ["Power BI", "SQL", "Excel"],
    github: "https://github.com/zaidsayeed17/Ecommerce-Sales-Dashboard",
    demo: "",
    demoLabel: "View Report",
    image: "",
    screenshotsFolder: "ecommerce-dashboard",
    screenshotFit: "cover",
    screenshotPosition: "top",
    screenshotCaptions: {
      overview: "Dashboard overview",
      "sales-breakdown": "Sales breakdown",
      trends: "Sales trends",
      customers: "Customer and order view",
    },
  },

  // NOT FEATURED (Stored for /projects gallery)
  {
    id: "ai-mock-interview",
    title: "AI Mock Interview System",
    category: "Generative AI / Full-Stack",
    group: "ai",
    status: "completed",
    featured: false,
    needsVerification: false,
    icon: "MessagesSquare",
    description:
      "An AI-powered mock interview application that helps users practise interview questions through an LLM-powered experience.",
    tags: ["Python", "FastAPI", "React", "Groq API", "LLaMA 3.3 70B"],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "mobile-price-prediction",
    title: "Mobile Price Prediction",
    category: "Machine Learning",
    group: "data",
    status: "completed",
    featured: false,
    needsVerification: false,
    icon: "Smartphone",
    description:
      "A machine learning regression project that predicts mobile phone prices from device specifications, with a simple Streamlit interface.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "RandomForest", "Streamlit"],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "safedepth",
    title: "SafeDepth",
    subtitle: "Offline-First Worker Safety System",
    category: "Full-Stack Development | Worker Safety | Real-Time Applications",
    group: "ai",
    status: "prototype",
    featured: false,
    needsVerification: false,
    icon: "ShieldCheck",
    context: "Prototype 3.0, GHRCEMN",
    tags: ["Next.js", "FastAPI", "Python", "SQLite"],
    summary:
      "A collaborative prototype for monitoring worker safety in low-connectivity environments such as underground or confined spaces, using a software-based, offline-first approach.",
    description:
      "A collaborative prototype for monitoring worker safety in low-connectivity environments such as underground or confined spaces, using a software-based, offline-first approach.",
    details: {
      overview:
        "SafeDepth is a worker safety monitoring system designed for MSMEs and industrial environments where mobile network connectivity may be unreliable, particularly in underground or confined spaces. It addresses the challenge of monitoring workers when internet connectivity and expensive IoT hardware are not practical options.",
      features: [
        "Worker vital-sign monitoring",
        "Supervisor dashboard for monitoring workers",
        "Offline operation using a polling-based architecture",
        "Software-based safety monitoring approach designed to avoid dependence on expensive dedicated IoT hardware",
        "Backend and frontend integration for worker and supervisor workflows",
      ],
      contribution:
        "I built this project with a teammate during Prototype 3.0 at GHRCEMN. We developed the prototype in approximately eight hours.",
      note:
        "This is a collaborative hackathon-style prototype. It has not been clinically tested, implemented in an industrial environment, or certified to prevent workplace accidents.",
    },
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "diwali-sales",
    title: "Diwali Sales Analysis",
    category: "Data Analytics",
    group: "data",
    status: "completed",
    featured: false,
    needsVerification: true,
    icon: "LineChart",
    description:
      "An exploratory data analysis of sales data to understand customer purchasing patterns.",
    tags: ["Python", "Pandas", "Matplotlib"],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "ac-landing-page",
    title: "AC Service Landing Page",
    category: "Client Website",
    group: "web",
    status: "concept",
    featured: false,
    needsVerification: true,
    icon: "Wind",
    description:
      "Requirements and AI-assisted development workflow for a lead-generation landing page for an air conditioning service business.",
    tags: ["Landing Page", "WhatsApp Enquiries"],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "indian-fitness-gym",
    title: "Indian Fitness Gym",
    category: "Business Website",
    group: "web",
    status: "concept",
    featured: false,
    needsVerification: true,
    icon: "Dumbbell",
    description:
      "A simple website concept for a local gym, covering membership plans and opening hours.",
    tags: [],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "medilens-ai",
    title: "MediLens AI",
    category: "AI Application Concept",
    group: "ai",
    status: "concept",
    featured: false,
    needsVerification: true,
    icon: "FileText",
    description:
      "A specified concept for an AI-assisted lab report organiser. It is not diagnostic.",
    tags: ["Docker", "PostgreSQL"],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "n8n-interview-agent",
    title: "n8n AI Mock Interview Agent",
    category: "AI Workflow Automation",
    group: "ai",
    status: "prototype",
    featured: false,
    needsVerification: true,
    icon: "Workflow",
    description:
      "An AI workflow automation project exploring how parts of the mock interview experience can be automated with n8n.",
    tags: ["n8n", "AI Agents"],
    github: "",
    demo: "",
    image: "",
  },
];

export default projects;
