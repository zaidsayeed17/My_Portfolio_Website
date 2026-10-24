import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  BarChart3,
  LayoutTemplate,
  Smartphone,
  Workflow,
  Info,
  ArrowRight,
} from 'lucide-react';
import capabilities from '../data/capabilities';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';

// Mapping string icons from data file to lucide-react components
const iconMap = {
  Bot,
  BrainCircuit,
  BarChart3,
  LayoutTemplate,
  Smartphone,
  Workflow,
};

/**
 * WhatIBuild Section Component
 * Displays a large sand panel with capability cards representing technical domains
 * explored through academic and personal software projects.
 */
export default function WhatIBuild() {
  const shouldReduceMotion = useReducedMotion();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
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
      id="build"
      className="relative bg-cream text-ink py-16 sm:py-24 lg:py-28 overflow-hidden"
      aria-label="Capabilities and Areas of Work"
    >
      <Container>
        {/* Large Sand Panel matching reference "What I Can Do For You" card container */}
        <div className="bg-sand rounded-3xl p-6 sm:p-10 lg:p-14 border border-sand-dark/30 shadow-warm-lg">
          {/* Panel Header */}
          <motion.div
            className="flex flex-col items-start mb-10 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headerVariants}
          >
            <SectionLabel withDot className="mb-3 tracking-ultra text-terracotta font-semibold">
              CAPABILITIES
            </SectionLabel>

            <SectionHeading theme="light" className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
              What I Can Build
            </SectionHeading>

            <p className="text-muted text-sm sm:text-base font-sans leading-relaxed max-w-[560px]">
              Areas I work in through my academic and personal projects.
            </p>
          </motion.div>

          {/* Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {capabilities.map((item) => {
              const IconComponent = iconMap[item.icon] || Bot;

              return (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  className="bg-cream/95 hover:bg-cream rounded-2xl p-6 sm:p-7 shadow-warm-sm hover:shadow-warm transition-all duration-300 border border-cream hover:border-terracotta/25 flex flex-col justify-between h-full group hover:-translate-y-1"
                >
                  {/* Top content */}
                  <div>
                    {/* Solid terracotta icon circle */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-terracotta group-hover:bg-terracotta-dark flex items-center justify-center text-white transition-colors duration-200 mb-5 shadow-sm">
                      <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-[17px] sm:text-[18px] font-semibold text-ink leading-snug mb-2.5 font-sans group-hover:text-terracotta transition-colors">
                      {item.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-muted text-sm leading-relaxed mb-6 font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-sand-dark/20">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-sand/90 text-terracotta border border-terracotta/15 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Panel Footer */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-sand-dark/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-muted font-medium">
              <Info className="w-4 h-4 text-terracotta flex-shrink-0" />
              <span>These are areas I have explored through personal and academic projects.</span>
            </div>

            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-terracotta hover:text-terracotta-dark group transition-colors"
            >
              <span>See my projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
