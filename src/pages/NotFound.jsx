import React, { useEffect } from 'react';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Button from '../components/Button';
import SectionLabel from '../components/SectionLabel';
import { updatePageSeo } from '../utils/seo';

/**
 * NotFound Component (404)
 * Editorial dark espresso themed error page with clear navigation back to the portfolio homepage.
 */
export default function NotFound() {
  useEffect(() => {
    updatePageSeo({
      title: '404 - Page Not Found | Mohammad Zaid Sayeed',
      description: 'The requested page could not be found.',
      path: '/404',
    });
    return () => {
      updatePageSeo();
    };
  }, []);

  return (
    <div className="min-h-screen bg-espresso text-cream flex flex-col font-sans selection:bg-terracotta selection:text-cream">
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-cream focus:rounded-lg focus:shadow-warm-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex-1 flex items-center justify-center py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10 text-center max-w-xl mx-auto px-4">
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso-light/60 border border-terracotta/30 text-terracotta-light text-xs font-semibold tracking-wider uppercase mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>404 Error</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream mb-4">
            Page Not Found
          </h1>

          {/* Friendly Description */}
          <p className="text-sand/80 text-base sm:text-lg leading-relaxed mb-8">
            The page you are looking for doesn't exist, may have moved, or the link might be broken.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Button
              href="/projects"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-cream border-cream/20 hover:border-terracotta hover:bg-espresso-light/40"
            >
              <span>Explore All Projects</span>
            </Button>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
