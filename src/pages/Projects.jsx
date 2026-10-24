import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  X,
  Check,
  ExternalLink,
  Flag,
  Info,
  Calendar,
  Layers,
  Store,
  MessagesSquare,
  Smartphone,
  BarChart3,
  Sun,
  Radio,
  Gift,
  LineChart,
  Wind,
  Dumbbell,
  FileText,
  Workflow,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import ProjectCard, { StatusBadge } from '../components/ProjectCard';
import { GithubIcon, InstagramIcon } from '../components/SocialIcons';
import ProjectGallery from '../components/ProjectGallery';
import { getProjectImages } from '../utils/projectImages';
import { useLenis } from 'lenis/react';
import projects from '../data/projects';
import siteConfig from '../data/siteConfig';
import { updatePageSeo } from '../utils/seo';

// Icon dictionary for modal header fallback
const modalIconMap = {
  Store,
  MessagesSquare,
  Smartphone,
  BarChart3,
  Sun,
  Radio,
  Gift,
  LineChart,
  Wind,
  Dumbbell,
  FileText,
  Workflow,
  ShieldCheck,
};

/**
 * Filter configuration
 */
const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'mobile', label: 'Mobile & Business Apps' },
  { id: 'data', label: 'Data & ML' },
  { id: 'web', label: 'Websites' },
  { id: 'in-progress', label: 'Concepts & In Progress' },
];

/**
 * DetailModal Component
 * Accessible dialog / bottom sheet with focus trap, body scroll lock,
 * and comprehensive project architecture breakdown.
 */
function ProjectDetailModal({ project, onClose }) {
  const modalRef = useRef(null);
  const lastActiveElementRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Focus trap, Escape key handling, and focus restore
  useEffect(() => {
    lastActiveElementRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial focus into modal
    const timer = setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector('button, [href]');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      }
    };
  }, [onClose]);

  const lenis = useLenis();

  // Lock body scroll and pause Lenis while modal is active
  useEffect(() => {
    lenis?.stop();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
      lenis?.start();
    };
  }, [lenis]);

  if (!project) return null;

  const ModalIcon = modalIconMap[project.icon] || Layers;
  const overviewText = project.details?.overview || project.description || '';
  const featuresList = project.details?.features || [];
  const contributionText = project.details?.contribution || '';
  const noteText = project.details?.note || '';

  const screenshots = project.screenshotsFolder
    ? getProjectImages(project.screenshotsFolder)
    : [];
  const hasScreenshots = screenshots.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Dimmed Espresso Backdrop */}
      <motion.div
        className="fixed inset-0 bg-espresso/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <motion.div
        ref={modalRef}
        data-lenis-prevent="true"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-cream text-ink rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-warm-lg border border-sand-dark/30 z-10 focus:outline-none"
      >
        {/* Sticky Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="sticky top-4 float-right mr-4 z-20 w-10 h-10 rounded-full bg-cream/90 hover:bg-sand border border-sand-dark/40 flex items-center justify-center text-espresso hover:text-terracotta transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!hasScreenshots ? (
          /* Existing Header Preview Image / Placeholder when no screenshots */
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-espresso border-b border-sand-dark/20">
            <div className="absolute top-4 left-4 z-10">
              <StatusBadge status={project.status} />
            </div>

            {project.context && (
              <div className="absolute top-4 right-16 sm:right-16 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-espresso/85 text-cream/90 backdrop-blur-sm border border-cream/20 shadow-sm">
                  <Flag className="w-3 h-3 text-terracotta flex-shrink-0" />
                  <span>{project.context}</span>
                </span>
              </div>
            )}

            {project.image && project.image.trim() !== '' ? (
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-espresso-light via-espresso to-[#20140e] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute w-44 h-44 rounded-full bg-terracotta/10 filter blur-xl pointer-events-none" />
                <ModalIcon className="w-16 h-16 sm:w-20 sm:h-20 text-terracotta opacity-30 mb-2" />
                <span className="text-xs font-medium text-cream/50 tracking-wider uppercase font-sans">
                  Screenshot coming soon
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Clean Top Bar when Screenshots Exist */
          <div className="px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between gap-3 border-b border-sand-dark/20">
            <div className="flex items-center gap-2.5 flex-wrap">
              <StatusBadge status={project.status} />
              {project.context && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand text-espresso/90 border border-sand-dark/40 shadow-sm">
                  <Flag className="w-3 h-3 text-terracotta flex-shrink-0" />
                  <span>{project.context}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* Taxonomy & Title */}
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted font-sans block mb-1">
              {project.category}
            </span>
            <h2
              id="modal-project-title"
              className="font-serif text-2xl sm:text-3xl font-bold text-espresso leading-tight"
            >
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-sm font-medium text-terracotta mt-1 font-sans">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-sand text-terracotta border border-terracotta/15 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Section: Screenshot Gallery (rendered if project has >= 1 screenshot) */}
          {hasScreenshots && (
            <ProjectGallery project={project} screenshots={screenshots} />
          )}

          {/* Section: Overview */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-espresso/70 mb-2 font-sans">
              Overview
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
              {overviewText}
            </p>
          </div>

          {/* Section: Key Features */}
          {featuresList.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-espresso/70 mb-3 font-sans">
                Key Features
              </h3>
              <ul className="space-y-2">
                {featuresList.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/90 font-sans">
                    <div className="w-4 h-4 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: My Contribution */}
          {contributionText && (
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-sand/75 border border-sand-dark/40">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-2 font-sans">
                My Contribution
              </h3>
              <p className="text-ink/90 text-xs sm:text-sm leading-relaxed font-sans">
                {contributionText}
              </p>
            </div>
          )}

          {/* Section: Note */}
          {noteText && (
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-sand/40 border border-sand-dark/30 flex items-start gap-2.5 text-xs text-muted font-sans">
              <Info className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
              <span>{noteText}</span>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-5 border-t border-sand-dark/30 flex flex-wrap items-center gap-3">
            {project.github && project.github.trim() !== '' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-espresso text-cream hover:bg-espresso-light text-xs font-semibold tracking-wide transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}

            {project.demo && project.demo.trim() !== '' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-terracotta text-cream hover:bg-terracotta-dark text-xs font-semibold tracking-wide transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{project.demoLabel || 'Live Demo'}</span>
              </a>
            )}

            {project.instagram && project.instagram.trim() !== '' && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sand hover:bg-sand-dark/40 text-terracotta border border-terracotta/30 text-xs font-semibold tracking-wide transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram Profile</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="ml-auto px-5 py-2.5 rounded-full text-xs font-semibold text-muted hover:text-espresso transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * All Projects Page
 * Complete gallery showcasing academic, full-stack, AI, and business software projects.
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter out unverified projects unless siteConfig.showUnverifiedProjects is true
  const baseProjects = projects.filter((p) => {
    if (p.needsVerification) {
      return siteConfig.showUnverifiedProjects;
    }
    return true;
  });

  // Calculate count for each filter tab
  const getFilterCount = (filterId) => {
    if (filterId === 'all') return baseProjects.length;
    if (filterId === 'in-progress') {
      return baseProjects.filter(
        (p) => p.status === 'concept' || p.status === 'in-development'
      ).length;
    }
    return baseProjects.filter((p) => p.group === filterId).length;
  };

  // Filter projects by active tab
  const filteredProjects = baseProjects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'in-progress') {
      return p.status === 'concept' || p.status === 'in-development';
    }
    return p.group === activeFilter;
  });

  // Update document title and SEO meta on mount, restore on unmount
  useEffect(() => {
    updatePageSeo({
      title: 'All Projects | Mohammad Zaid Sayeed',
      description: 'AI applications, machine learning, data analytics and business software, each labelled with its actual status.',
      path: '/projects',
    });
    return () => {
      updatePageSeo();
    };
  }, []);

  // Deep linking: Open modal and reset filter if URL hash matches a project ID
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = baseProjects.find((p) => p.id === hash);
      if (match) {
        setActiveFilter('all');
        setSelectedProject(match);

        // Smooth scroll down to project gallery grid
        setTimeout(() => {
          if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, [baseProjects]);

  // Open modal handler
  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    window.history.replaceState(null, '', `#${project.id}`);
  };

  // Close modal handler
  const handleCloseDetails = () => {
    setSelectedProject(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col font-sans selection:bg-terracotta selection:text-cream">
      {/* Skip to Main Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-cream focus:rounded-lg focus:shadow-warm-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Sticky/Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {/* PAGE HEADER: Espresso Band with Convex Curved Bottom */}
        <section className="relative bg-espresso text-cream pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 overflow-hidden">
          <Container className="relative z-10">
            <div className="max-w-3xl">
              {/* Back to Home Link */}
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cream/70 hover:text-terracotta transition-colors mb-4 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </a>

              {/* Label & Heading */}
              <SectionLabel withDot className="mb-3 tracking-ultra text-terracotta font-semibold">
                PORTFOLIO
              </SectionLabel>

              <SectionHeading as="h1" theme="dark" className="text-4xl sm:text-5xl lg:text-6xl mb-4">
                All Projects
              </SectionHeading>

              <p className="text-cream/75 text-sm sm:text-base font-sans leading-relaxed max-w-xl">
                AI applications, machine learning, data analytics and business software, each labelled with its actual status.
              </p>
            </div>
          </Container>

          {/* Convex Bottom Edge SVG */}
          <div
            className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none select-none"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-8 sm:h-12 md:h-16 lg:h-20 block"
            >
              <path
                d="M 0 0 C 420 70, 1020 70, 1440 0 L 1440 80 L 0 80 Z"
                fill="#F7F0E6"
              />
            </svg>
          </div>
        </section>

        {/* GALLERY SECTION: Filter Bar & Project Grid */}
        <section ref={gridRef} className="py-12 sm:py-16 bg-cream">
          <Container>
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-sand-dark/30">
              {/* Horizontally scrollable pill tabs on mobile */}
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  const count = getFilterCount(tab.id);

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFilter(tab.id)}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta select-none ${
                        isActive
                          ? 'bg-terracotta text-cream shadow-sm font-semibold'
                          : 'bg-sand text-ink hover:border-terracotta/40 border border-sand-dark/30'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          isActive ? 'bg-cream/25 text-cream' : 'bg-sand-dark/50 text-muted'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filter Count Summary */}
              <div className="text-xs text-muted font-sans font-medium flex-shrink-0">
                Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Grid of Projects */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <ProjectCard
                      project={project}
                      onOpenDetails={handleOpenDetails}
                      showFullDetailsButton={true}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16 px-4 bg-sand/40 rounded-3xl border border-sand-dark/30">
                <p className="text-muted text-base font-sans mb-3">
                  No projects found in this category.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className="px-4 py-2 rounded-full bg-terracotta text-cream text-xs font-semibold hover:bg-terracotta-dark transition-colors"
                >
                  View All Projects
                </button>
              </div>
            )}
          </Container>
        </section>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={handleCloseDetails}
          />
        )}
      </AnimatePresence>

      {/* Complete Footer */}
      <Footer />
    </div>
  );
}
