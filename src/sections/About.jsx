import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Layers,
  BookOpen,
  GraduationCap,
  Sparkles,
  MapPin,
} from 'lucide-react';
import siteConfig from '../data/siteConfig';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import aboutPhoto from '../assets/about-photo.jpg';

// Icon dictionary for stats
const statIconMap = {
  Layers,
  BookOpen,
  GraduationCap,
};

/**
 * AnimatedCounter Component
 * Counts up smoothly from 0 to value when scrolled into view.
 * If shouldCount is false (e.g. for year 2027), simply renders the value.
 */
function AnimatedCounter({ value, suffix = '', shouldCount = true, duration = 1.6 }) {
  const [count, setCount] = useState(shouldCount ? 0 : value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !shouldCount || shouldReduceMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Smooth cubic ease out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easedProgress);

      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, shouldCount, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-serif font-bold text-2xl sm:text-3xl text-espresso">
      {count}
      {suffix}
    </span>
  );
}

/**
 * About Section Component
 * Warm editorial section with portrait, floating note card, narrative bio,
 * interactive stat counters, interest tags, signature, and location.
 */
export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative bg-cream text-ink py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-label="About Mohammad Zaid Sayeed"
    >
      {/* Background ambient warmth */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-sand/60 filter blur-3xl opacity-50 pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Photo + Organic Backdrop + Floating Note Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center relative"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -35 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none">
              {/* Decorative terracotta dot grid to the left */}
              <div
                className="absolute -left-4 sm:-left-8 top-10 sm:top-14 grid grid-cols-3 gap-2.5 opacity-25 pointer-events-none select-none z-0"
                aria-hidden="true"
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                ))}
              </div>

              {/* Faint terracotta organic blob backdrop shape */}
              <svg
                viewBox="0 0 200 200"
                className="absolute -bottom-8 -right-8 w-56 h-56 text-terracotta/15 -z-10 pointer-events-none select-none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,87.7,-0.7C85.4,14.8,78.2,29.7,69.5,43C60.8,56.3,50.6,68,37.8,74.7C25,81.4,9.6,83.1,-5.1,81.9C-19.8,80.7,-33.8,76.6,-46.6,69.5C-59.4,62.4,-71,52.3,-78.9,39.5C-86.8,26.7,-91.1,11.2,-89.6,-3.7C-88.1,-18.6,-80.8,-32.9,-70.7,-43.8C-60.6,-54.7,-47.7,-62.2,-34.5,-69.9C-21.3,-77.6,-7.8,-85.5,5.2,-84.6C18.2,-83.7,30.6,-83.6,44.7,-76.4Z"
                  transform="translate(100 100)"
                />
              </svg>

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border border-sand-dark/20 aspect-[4/5] bg-sand">
                <img
                  src={aboutPhoto}
                  alt="Mohammad Zaid Sayeed working on laptop and studying"
                  className="w-full h-full object-cover object-[50%_35%] select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Dark Note Card overlapping lower-left corner */}
              <motion.div
                className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-6 z-20 max-w-[250px] sm:max-w-[280px] p-4 sm:p-5 rounded-2xl bg-espresso text-cream shadow-warm-lg border border-espresso-light/60 select-none"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center text-terracotta mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <p className="text-xs sm:text-[13px] font-sans font-medium text-cream/90 leading-snug">
                  Learning by building real projects, one idea at a time.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Section Narrative & Interactive Details */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start pt-6 lg:pt-0"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 35 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 1. Section Label */}
            <SectionLabel withDot className="mb-3 tracking-ultra text-terracotta font-semibold">
              ABOUT ME
            </SectionLabel>

            {/* 2. Section Heading (Playfair Display) */}
            <SectionHeading theme="light" className="text-3xl sm:text-4xl lg:text-[44px] leading-tight mb-6">
              <span className="block">Curious Builder,</span>
              <span className="block">Learning by Making.</span>
            </SectionHeading>

            {/* 3. Narrative Paragraphs */}
            <div className="text-muted text-sm sm:text-base font-sans leading-relaxed space-y-4 max-w-[540px] mb-8">
              <p>
                I'm a final-year B.Tech student in Artificial Intelligence and Data Science at Anjuman College of Engineering and Technology, Nagpur, graduating in 2027.
              </p>
              <p>
                I enjoy turning ideas into working applications, from AI-powered tools and machine learning models to data dashboards and business software. My programming foundation is still growing, and I use AI-assisted development tools to build faster while strengthening my own coding and problem-solving skills.
              </p>
            </div>

            {/* 4. Stats Row */}
            <div className="w-full max-w-[560px] pt-6 pb-6 border-y border-sand-dark/40">
              <div className="grid grid-cols-3 gap-2 sm:gap-6 divide-x divide-sand-dark/40">
                {siteConfig.stats.map((stat, idx) => {
                  const IconComponent = statIconMap[stat.icon] || Layers;
                  const isYear = stat.value >= 1000;

                  return (
                    <div
                      key={stat.label}
                      className={`flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 ${
                        idx > 0 ? 'pl-3 sm:pl-6' : ''
                      }`}
                    >
                      {/* Terracotta-outlined rounded icon box */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sand/80 border border-terracotta/35 flex items-center justify-center text-terracotta flex-shrink-0 shadow-sm">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Number + Label */}
                      <div className="flex flex-col">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          shouldCount={!isYear}
                        />
                        <span className="text-[11px] sm:text-xs text-muted font-medium leading-tight mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Interest Pill Tags */}
            {siteConfig.interests && siteConfig.interests.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-6 mb-5">
                {siteConfig.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-sand/90 text-terracotta border border-terracotta/20 tracking-wide hover:border-terracotta/40 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}

            {/* 6. Signature */}
            <div
              className="font-script text-3xl sm:text-4xl text-terracotta select-none my-1 leading-none"
              aria-label={`Signature of ${siteConfig.name}`}
            >
              {siteConfig.name}
            </div>

            {/* 7. Location Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-espresso transition-colors mt-3">
              <MapPin className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
              <span>Based in {siteConfig.location}</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
