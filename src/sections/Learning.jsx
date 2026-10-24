import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Trophy,
  BadgeCheck,
  Database,
  Code2,
  Terminal,
  GraduationCap,
  Calendar,
  ExternalLink,
  Info,
} from 'lucide-react';
import { achievements, learning } from '../data/learning';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';

// Icon map for learning and achievements
const iconMap = {
  Trophy,
  BadgeCheck,
  Database,
  Code2,
  Terminal,
  GraduationCap,
};

/**
 * Learning Section Component
 * Sand-toned panel showcasing verified coursework, certifications, and academic achievements.
 */
export default function Learning() {
  const shouldReduceMotion = useReducedMotion();
  const highlightedAchievement = achievements[0];

  // Animation variants
  const headerVariants = {
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

  const achievementVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
      },
    },
  };

  const cardVariants = {
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
    <section
      id="learning"
      className="relative bg-cream text-ink py-16 sm:py-24 lg:py-28 overflow-hidden"
      aria-label="Learning and Achievements"
    >
      <Container>
        {/* Large Sand Panel */}
        <div className="bg-sand rounded-3xl p-6 sm:p-10 lg:p-12 xl:p-14 border border-sand-dark/30 shadow-warm-lg relative overflow-hidden">
          {/* Decorative faint graduation cap emblem near header top-right */}
          <div
            className="absolute top-6 right-6 sm:top-10 sm:right-10 text-terracotta/10 pointer-events-none select-none"
            aria-hidden="true"
          >
            <GraduationCap className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40" strokeWidth={1.2} />
          </div>

          {/* Decorative faint dot grid */}
          <div
            className="hidden sm:grid absolute -bottom-3 -right-3 grid-cols-4 gap-2.5 opacity-20 pointer-events-none select-none"
            aria-hidden="true"
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            ))}
          </div>

          {/* Panel Header */}
          <motion.div
            className="flex flex-col items-start mb-10 sm:mb-12 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headerVariants}
          >
            <SectionLabel withDot className="mb-3 tracking-ultra text-terracotta font-semibold">
              LEARNING & ACHIEVEMENTS
            </SectionLabel>

            <SectionHeading theme="light" className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
              Always Learning, Always Building
            </SectionHeading>

            <p className="text-muted text-sm sm:text-base font-sans leading-relaxed max-w-[560px]">
              Courses, programmes and recognition that shaped my foundation.
            </p>
          </motion.div>

          {/* Content Layout: 2 Columns on Desktop (~34% Achievement, ~66% Learning grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch relative z-10">
            {/* LEFT COLUMN: Highlighted Achievement Card */}
            {highlightedAchievement && (
              <motion.div
                className="lg:col-span-4 flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={achievementVariants}
              >
                <div className="bg-espresso text-cream rounded-2xl p-6 sm:p-8 shadow-warm-lg border border-espresso-light/60 flex flex-col justify-between h-full relative overflow-hidden group">
                  {/* Subtle inner background glow */}
                  <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-terracotta/10 filter blur-2xl pointer-events-none" />

                  <div>
                    {/* Trophy Icon Circle */}
                    <div className="w-12 h-12 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center text-terracotta mb-5 group-hover:scale-105 transition-transform duration-300">
                      <Trophy className="w-6 h-6" />
                    </div>

                    {/* Pill Badge */}
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-terracotta text-cream mb-4 shadow-sm">
                      Achievement
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-3 leading-snug">
                      {highlightedAchievement.title}
                    </h3>

                    {/* Organiser (rendered only if non-empty) */}
                    {highlightedAchievement.organiser && highlightedAchievement.organiser.trim() !== '' && (
                      <p className="text-xs uppercase tracking-wider text-terracotta font-semibold mb-2">
                        {highlightedAchievement.organiser}
                      </p>
                    )}

                    {/* Description (rendered only if non-empty) */}
                    {highlightedAchievement.description && highlightedAchievement.description.trim() !== '' && (
                      <p className="text-cream/70 text-sm font-sans leading-relaxed mb-4">
                        {highlightedAchievement.description}
                      </p>
                    )}
                  </div>

                  {/* Footer date & optional link */}
                  <div className="mt-auto pt-6 border-t border-cream/10 flex items-center justify-between text-xs text-cream/60 font-sans">
                    {highlightedAchievement.period && highlightedAchievement.period.trim() !== '' && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                        <span>{highlightedAchievement.period}</span>
                      </div>
                    )}

                    {highlightedAchievement.credentialUrl && highlightedAchievement.credentialUrl.trim() !== '' && (
                      <a
                        href={highlightedAchievement.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta hover:text-cream transition-colors flex items-center gap-1 font-medium"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* RIGHT COLUMN: 2x2 Grid of Learning Cards */}
            <motion.div
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {learning.map((item) => {
                const ItemIcon = iconMap[item.icon] || BadgeCheck;

                return (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    className="bg-cream/95 hover:bg-cream rounded-2xl p-5 sm:p-6 shadow-warm-sm hover:shadow-warm transition-all duration-300 border border-cream hover:border-terracotta/25 flex flex-col justify-between h-full group hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Row: Icon circle + Type pill */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-terracotta group-hover:bg-terracotta-dark flex items-center justify-center text-white transition-colors duration-200 flex-shrink-0 shadow-sm">
                          <ItemIcon className="w-5 h-5" />
                        </div>

                        {item.type && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sand text-terracotta border border-terracotta/20 tracking-wide">
                            {item.type}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-[16px] sm:text-[17px] font-semibold text-ink leading-snug mb-1.5 font-sans group-hover:text-terracotta transition-colors">
                        {item.title}
                      </h3>

                      {/* Provider */}
                      <p className="text-muted text-xs sm:text-[13px] font-medium font-sans mb-3">
                        {item.provider}
                      </p>

                      {/* Period */}
                      <div className="flex items-center gap-1.5 text-xs text-muted/80 font-sans mb-2">
                        <Calendar className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                        <span>{item.period}</span>
                      </div>

                      {/* Description (rendered only if non-empty) */}
                      {item.description && item.description.trim() !== '' && (
                        <p className="text-muted text-xs leading-relaxed mt-2 font-sans">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Footer link (rendered only if credentialUrl is non-empty) */}
                    {item.credentialUrl && item.credentialUrl.trim() !== '' && (
                      <div className="mt-4 pt-3 border-t border-sand-dark/20">
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
                        >
                          <span>View Credential</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Panel Footnote */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-sand-dark/40 flex items-center gap-2 text-xs sm:text-[13px] text-muted font-medium relative z-10">
            <Info className="w-4 h-4 text-terracotta flex-shrink-0" />
            <span>Learning is ongoing. I keep adding new tools and projects as I grow.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
