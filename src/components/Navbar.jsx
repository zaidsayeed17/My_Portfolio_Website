import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import siteConfig from '../data/siteConfig';
import Container from './Container';
import Button from './Button';

/**
 * Navbar component
 * Premium editorial header styled for dark espresso hero with cream typography,
 * dynamic active link underline based on scroll position, and mobile drawer.
 * Supports cross-page anchor routing between '/' and other pages like '/projects'.
 */
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('#home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Close mobile menu on Escape key press and restore focus
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Monitor scroll position for active link indicator and header shadow/blur on homepage
  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      // Toggle blur and elevation when scrolled
      setScrolled(window.scrollY > 20);

      // Determine active section based on vertical scroll
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + 140; // offset accounts for navbar height
      const navIds = siteConfig.navLinks.map((link) => link.href.replace('#', ''));

      // If at the very top, activate first link
      if (scrollY < 100) {
        setActiveSection('#home');
        return;
      }

      for (let i = navIds.length - 1; i >= 0; i--) {
        const sectionId = navIds[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (top <= scrollPosition) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const lenis = useLenis();

  // Resolves anchor href whether on homepage or subpage
  const getHref = (anchorHref) => {
    return isHomePage ? anchorHref : `/${anchorHref}`;
  };

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e, anchorHref) => {
    if (isHomePage && anchorHref.startsWith('#')) {
      e.preventDefault();
      const targetId = anchorHref.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -88, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.replaceState(null, '', anchorHref);
        setActiveSection(anchorHref);
      }
    }
  };

  // Handle mobile menu link click
  const handleNavClick = (e, href) => {
    handleAnchorClick(e, href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? 'bg-espresso/95 backdrop-blur-md shadow-warm-lg border-b border-espresso-light/60 py-3.5'
          : 'bg-espresso/90 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Left: Monogram + Name + Subtitle */}
          <a
            href={isHomePage ? '#home' : '/#home'}
            onClick={(e) => handleAnchorClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={`${siteConfig.name} - Home`}
          >
            {/* Outlined Monogram badge */}
            <div className="w-10 h-10 rounded-lg border border-terracotta/75 bg-espresso-light/50 flex items-center justify-center text-terracotta font-serif font-bold text-xs tracking-wider transition-all duration-200 group-hover:border-terracotta group-hover:bg-terracotta/15 group-hover:scale-105">
              {siteConfig.monogram}
            </div>

            {/* Name and Subtitle */}
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-semibold text-cream tracking-tight leading-tight group-hover:text-terracotta transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-widest text-cream/60 leading-none mt-0.5">
                {siteConfig.titleSubtitle}
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = isHomePage && activeSection === link.href;
              const targetHref = getHref(link.href);

              return (
                <a
                  key={link.name}
                  href={targetHref}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-cream'
                      : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-terracotta rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Desktop Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href={isHomePage ? '#contact' : '/#contact'}
              onClick={(e) => handleAnchorClick(e, '#contact')}
              variant="primary"
              size="sm"
              showArrow={true}
              className="text-xs uppercase tracking-wider font-semibold px-5 py-2.5"
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile: Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-cream/80 hover:text-cream hover:bg-espresso-light/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-espresso-light/60 bg-espresso/98 backdrop-blur-xl"
          >
            <Container className="py-5">
              <nav className="flex flex-col space-y-1">
                {siteConfig.navLinks.map((link) => {
                  const isActive = isHomePage && activeSection === link.href;
                  const targetHref = getHref(link.href);

                  return (
                    <a
                      key={link.name}
                      href={targetHref}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-espresso-light text-cream font-semibold'
                          : 'text-cream/70 hover:text-cream hover:bg-espresso-light/40'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-5 pt-4 border-t border-espresso-light/60 flex justify-center">
                <Button
                  href={isHomePage ? '#contact' : '/#contact'}
                  variant="primary"
                  size="md"
                  showArrow={true}
                  className="w-full text-center justify-center text-xs uppercase tracking-wider font-semibold py-3"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Let's Talk
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
