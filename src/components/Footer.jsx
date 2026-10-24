import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import Container from './Container';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

/**
 * Footer Component
 * Dark espresso footer featuring brand monogram, quick links navigation,
 * verified contact info, social links, and smooth back-to-top button.
 */
export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const shouldReduceMotion = useReducedMotion();

  const getHref = (anchorHref) => {
    return isHomePage ? anchorHref : `/${anchorHref}`;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  // Animation variants
  const columnVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <footer
      className="bg-espresso text-cream border-t border-espresso-light/60 pt-16 pb-12 overflow-hidden"
      aria-label="Footer"
    >
      <Container>
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* COLUMN 1: Brand & Subtitle (4 cols) */}
          <motion.div
            className="lg:col-span-4 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={columnVariants}
          >
            {/* Outlined Monogram + Name + Subtitle (Matching Navbar markup) */}
            <a
              href={getHref('#home')}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label={`${siteConfig.name} - Back to Home`}
            >
              <div className="w-10 h-10 rounded-lg border border-terracotta/75 bg-espresso-light/50 flex items-center justify-center text-terracotta font-serif font-bold text-xs tracking-wider transition-all duration-200 group-hover:border-terracotta group-hover:bg-terracotta/15 group-hover:scale-105 shadow-inner">
                {siteConfig.monogram}
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-semibold text-cream tracking-tight leading-tight group-hover:text-terracotta transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-widest text-cream/60 leading-none mt-0.5">
                  {siteConfig.titleSubtitle}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-cream/65 font-sans leading-relaxed max-w-xs mt-4">
              Building practical applications with AI, data and code.
            </p>
          </motion.div>

          {/* COLUMN 2: Quick Links (3 cols) */}
          <motion.div
            className="lg:col-span-3 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={columnVariants}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream mb-4 font-sans">
              Quick Links
            </h3>

            <nav aria-label="Footer Navigation" className="w-full">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-[13px] font-sans">
                {siteConfig.navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={getHref(link.href)}
                    className="text-cream/70 hover:text-terracotta transition-colors py-0.5"
                  >
                    {link.name}
                  </a>
                ))}
                {/* Additional link to All Projects archive */}
                <a
                  href="/projects"
                  className="text-terracotta hover:text-terracotta-dark transition-colors py-0.5 font-medium"
                >
                  All Projects
                </a>
              </div>
            </nav>
          </motion.div>

          {/* COLUMN 3: Contact Info (3 cols) */}
          <motion.div
            className="lg:col-span-3 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={columnVariants}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream mb-4 font-sans">
              Contact Info
            </h3>

            <ul className="space-y-3 text-xs sm:text-[13px] font-sans">
              {/* Email Link */}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-cream/70 hover:text-terracotta transition-colors group"
                  aria-label={`Email ${siteConfig.email}`}
                >
                  <Mail className="w-4 h-4 text-terracotta flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{siteConfig.email}</span>
                </a>
              </li>

              {/* Location Badge */}
              <li className="flex items-center gap-2.5 text-cream/70">
                <MapPin className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>{siteConfig.location}</span>
              </li>

              {/* Phone (Rendered ONLY if siteConfig.showPhone is true) */}
              {siteConfig.showPhone && siteConfig.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-2.5 text-cream/70 hover:text-terracotta transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-terracotta flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{siteConfig.phone}</span>
                  </a>
                </li>
              )}
            </ul>
          </motion.div>

          {/* COLUMN 4: Let's Connect Socials (2 cols) */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={columnVariants}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream mb-4 font-sans">
              Let's Connect
            </h3>

            <div className="flex items-center gap-2.5">
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-cream/25 text-cream hover:border-terracotta hover:bg-terracotta hover:text-cream flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}

              {siteConfig.github && (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-cream/25 text-cream hover:border-terracotta hover:bg-terracotta hover:text-cream flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-9 h-9 rounded-full border border-cream/25 text-cream hover:border-terracotta hover:bg-terracotta hover:text-cream flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream/50">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          {/* Smooth Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="inline-flex items-center gap-2 text-xs font-medium text-cream/60 hover:text-terracotta transition-colors group cursor-pointer focus:outline-none"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full border border-terracotta/70 text-terracotta group-hover:bg-terracotta group-hover:text-cream flex items-center justify-center transition-all duration-200 group-hover:scale-110">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
}
