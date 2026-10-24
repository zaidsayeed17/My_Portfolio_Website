import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, GraduationCap, Mail } from 'lucide-react';

/**
 * Social brand icon SVGs
 */
function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74v-8.37H5.06v8.37z" />
    </svg>
  );
}

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
import siteConfig from '../data/siteConfig';
import Container from '../components/Container';
import Button from '../components/Button';
import SectionLabel from '../components/SectionLabel';
import heroPortrait from '../assets/hero-portrait.png';

/**
 * BrushStrokeCircle Component
 * Generates an artistic hand-painted terracotta circle with authentic
 * brush-stroke bristles fanning out toward the top-right, matching the reference.
 */
function BrushStrokeBackdrop() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform scale-105 sm:scale-110"
      >
        <defs>
          <filter id="brushFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Textured outer paint bristles */}
        <g opacity="0.85" filter="url(#brushFilter)">
          <path
            d="M 330 80 C 420 110, 480 180, 470 280 C 465 310, 445 350, 410 390"
            stroke="#C65D2E"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 360 65 C 445 100, 495 170, 485 260"
            stroke="#B85325"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M 380 90 C 455 125, 490 190, 475 255"
            stroke="#D46A3A"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 400 120 C 470 160, 495 215, 480 270"
            stroke="#A94A21"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Subtle dry-brush splatters */}
          <circle cx="460" cy="140" r="3.5" fill="#C65D2E" opacity="0.7" />
          <circle cx="478" cy="165" r="2.5" fill="#D46A3A" opacity="0.6" />
          <circle cx="488" cy="205" r="3" fill="#B85325" opacity="0.8" />
          <circle cx="455" cy="115" r="2" fill="#C65D2E" opacity="0.5" />
          <circle cx="440" cy="90" r="3" fill="#D46A3A" opacity="0.6" />
        </g>

        {/* Main solid terracotta core circle */}
        <circle
          cx="250"
          cy="255"
          r="195"
          fill="#C65D2E"
          className="transition-colors duration-300"
        />

        {/* Inner subtle depth shading */}
        <circle
          cx="245"
          cy="250"
          r="190"
          fill="url(#innerWarmGlow)"
          opacity="0.4"
        />

        <defs>
          <radialGradient id="innerWarmGlow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#E27747" />
            <stop offset="70%" stopColor="#C65D2E" />
            <stop offset="100%" stopColor="#9C3E18" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Hero Section Component
 * Fully custom editorial hero in espresso with Playfair Display typography,
 * brush-stroke portrait backing, floating graduation badge, and convex bottom arc.
 */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const portraitVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  };

  const isFramed = siteConfig.heroImageMode !== 'cutout';

  return (
    <section
      id="home"
      className="relative bg-espresso text-cream overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-24 sm:pb-32 lg:pb-40"
      aria-label="Introduction and Hero"
    >
      {/* Decorative terracotta dot grid - Top Right */}
      <div
        className="absolute top-20 sm:top-24 right-4 sm:right-10 lg:right-20 grid grid-cols-6 gap-2.5 sm:gap-3 opacity-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-terracotta" />
        ))}
      </div>

      {/* Decorative terracotta dot grid - Left Center */}
      <div
        className="hidden md:grid absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 grid-cols-3 gap-2.5 sm:gap-3 opacity-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-terracotta" />
        ))}
      </div>

      {/* Main Container */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Editorial Text & Actions (Desktop ~55%, 7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Small uppercase terracotta label */}
            <motion.div variants={itemVariants}>
              <SectionLabel className="mb-3 sm:mb-4 tracking-ultra text-terracotta font-semibold">
                HELLO, I'M
              </SectionLabel>
            </motion.div>

            {/* 2. Large Playfair Display Name (broken into two lines for responsiveness) */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-cream tracking-tight leading-[1.06] mb-3"
            >
              <span className="block">Mohammad</span>
              <span className="block">Zaid Sayeed</span>
            </motion.h1>

            {/* 3. Sub-headline in terracotta Playfair */}
            <motion.p
              variants={itemVariants}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-terracotta font-normal leading-snug mb-5"
            >
              {siteConfig.headline}
            </motion.p>

            {/* 4. Muted summary paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-cream/70 text-sm sm:text-base font-sans leading-relaxed max-w-[480px] mb-8"
            >
              AI & Data Science student and AI-assisted developer, building practical applications across AI, machine learning, data analytics and business software.
            </motion.p>

            {/* 5. Button Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8"
            >
              {/* Primary action: scrolls to #projects */}
              <Button
                href="#projects"
                variant="primary"
                size="lg"
                showArrow={true}
                className="font-medium px-6 py-3 shadow-warm hover:shadow-warm-lg"
              >
                View My Work
              </Button>

              {/* Secondary action: resume button */}
              {siteConfig.resumeUrl && siteConfig.resumeUrl.trim() !== '' ? (
                <Button
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-light"
                  size="lg"
                  icon={Download}
                  className="font-medium px-6 py-3 border-cream/40 text-cream hover:border-terracotta hover:bg-terracotta"
                >
                  Download Resume
                </Button>
              ) : (
                <Button
                  variant="outline-light"
                  size="lg"
                  disabled={true}
                  className="font-medium px-6 py-3 border-cream/25 text-cream/50 cursor-not-allowed hover:bg-transparent"
                  title="Resume will be available soon"
                >
                  Resume coming soon
                </Button>
              )}
            </motion.div>

            {/* 6. Availability badge (render only if siteConfig.openToWork is true) */}
            {siteConfig.openToWork && (
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 mb-5"
              >
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-terracotta">
                  OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES
                </span>
              </motion.div>
            )}

            {/* 7. Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-1"
              aria-label="Social links"
            >
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/25 text-cream/80 hover:text-cream hover:border-terracotta hover:bg-terracotta flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label="Mohammad Zaid Sayeed on LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}

              {siteConfig.github && (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/25 text-cream/80 hover:text-cream hover:border-terracotta hover:bg-terracotta flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label="Mohammad Zaid Sayeed on GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-10 h-10 rounded-full border border-cream/25 text-cream/80 hover:text-cream hover:border-terracotta hover:bg-terracotta flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label={`Send an email to ${siteConfig.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Hand-painted circle portrait & floating badge (Desktop ~45%, 5 cols) */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0"
            variants={portraitVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-[290px] h-[290px] xs:w-[330px] xs:h-[330px] sm:w-[400px] sm:h-[400px] md:w-[430px] md:h-[430px] lg:w-[440px] lg:h-[440px] xl:w-[470px] xl:h-[470px] flex items-center justify-center">
              {/* Hand-painted terracotta brush-stroke backdrop */}
              <BrushStrokeBackdrop />

              {/* Portrait Image Container */}
              <div
                className={`relative z-10 w-[84%] h-[84%] transition-all ${
                  isFramed
                    ? 'rounded-full overflow-hidden border-2 border-cream/30 shadow-2xl bg-espresso/50'
                    : 'overflow-visible flex items-end justify-center'
                }`}
              >
                <img
                  src={heroPortrait}
                  alt="Portrait of Mohammad Zaid Sayeed"
                  className={`w-full h-full object-cover select-none pointer-events-none ${
                    isFramed
                      ? 'object-[50%_25%]'
                      : 'object-contain scale-110 translate-y-3 drop-shadow-2xl'
                  }`}
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Floating Academic Badge Card */}
              <motion.div
                className="absolute -bottom-2 -right-1 sm:bottom-4 sm:-right-2 lg:bottom-4 lg:-right-4 z-20 bg-cream/95 text-espresso backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-warm-lg border border-sand-dark/20 max-w-[190px] sm:max-w-[210px] select-none"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta flex-shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm sm:text-base text-espresso leading-none block">
                      B.Tech
                    </span>
                  </div>
                </div>

                <div className="border-t border-sand/70 pt-1.5">
                  <p className="text-xs sm:text-[13px] font-semibold text-espresso leading-snug">
                    AI & Data Science
                  </p>
                  <p className="text-[11px] font-medium text-muted mt-0.5">
                    Graduating 2027
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Convex Bottom Edge: Smooth curve swooping down into the cream background */}
      <div
        className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16 md:h-20 lg:h-24 block"
        >
          {/* Curve where espresso arcs down into the cream background */}
          <path
            d="M 0 0 C 420 90, 1020 90, 1440 0 L 1440 100 L 0 100 Z"
            fill="#F7F0E6"
          />
        </svg>
      </div>
    </section>
  );
}
