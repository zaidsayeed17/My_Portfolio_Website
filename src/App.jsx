import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';

// Lazy-load below-the-fold sections and secondary pages to minimize initial bundle size
const About = lazy(() => import('./sections/About'));
const WhatIBuild = lazy(() => import('./sections/WhatIBuild'));
const Skills = lazy(() => import('./sections/Skills'));
const FeaturedProjects = lazy(() => import('./sections/FeaturedProjects'));
const Learning = lazy(() => import('./sections/Learning'));
const CTABanner = lazy(() => import('./sections/CTABanner'));
const Footer = lazy(() => import('./components/Footer'));
const Projects = lazy(() => import('./pages/Projects'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * ScrollToAnchor component handles smooth scrolling when navigating to /#section from /projects
 * or directly via hash links, powered by Lenis smooth scrolling.
 */
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -88, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash, lenis]);

  return null;
}

/**
 * Minimalist fallback for subpages during lazy loading
 */
function PageFallback() {
  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-8 text-cream">
      <div className="w-10 h-10 rounded-full border-2 border-terracotta/30 border-t-terracotta animate-spin" />
    </div>
  );
}

/**
 * Single-page homepage containing all core portfolio sections:
 * Hero (eagerly loaded for instant paint), with below-the-fold sections lazy-loaded.
 */
function HomePage() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col font-sans selection:bg-terracotta selection:text-cream">
      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-cream focus:rounded-lg focus:shadow-warm-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Portfolio Content */}
      <main id="main-content" className="flex-1">
        {/* Step 2: Hero Section (#home) - Eagerly loaded */}
        <Hero />

        {/* Below-the-fold sections lazy loaded */}
        <Suspense fallback={null}>
          {/* Step 3: About Section (#about) */}
          <About />

          {/* Step 4: What I Can Build Section (#build) */}
          <WhatIBuild />

          {/* Step 5: Skills & Tools Section (#skills) */}
          <Skills />

          {/* Step 6: Featured Projects Section (#projects) */}
          <FeaturedProjects />

          {/* Step 7: Learning & Achievements Section (#learning) */}
          <Learning />

          {/* Step 8: Contact CTA Banner (#contact) */}
          <CTABanner />
        </Suspense>
      </main>

      {/* Step 8: Complete Portfolio Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

/**
 * Root Application with Lenis Smooth Scrolling and Routing
 */
export default function App() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lenisOptions = {
    duration: prefersReducedMotion ? 0 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <BrowserRouter>
        <ScrollToAnchor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageFallback />}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
}
