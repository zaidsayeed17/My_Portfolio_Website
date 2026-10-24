import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code2,
  BarChart3,
  BrainCircuit,
  Sparkles,
  Layers,
  Wrench,
  CheckCircle2,
  Download,
  Info,
} from 'lucide-react';
import siteConfig from '../data/siteConfig';
import skillGroups from '../data/skills';
import Container from '../components/Container';
import Button from '../components/Button';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';

// Icon map for domain groups
const iconMap = {
  Code2,
  BarChart3,
  BrainCircuit,
  Sparkles,
  Layers,
  Wrench,
};

/**
 * LevelPill Component
 * Renders level pill based on "working", "foundation", or "learning"
 */
function LevelPill({ level, compact = false }) {
  if (level === 'working') {
    return (
      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-terracotta text-cream shadow-sm whitespace-nowrap">
        {compact ? 'Working' : 'Working Knowledge'}
      </span>
    );
  }

  if (level === 'foundation') {
    return (
      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-terracotta text-terracotta whitespace-nowrap">
        Foundation
      </span>
    );
  }

  if (level === 'learning') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-dashed border-cream/40 text-cream/80 whitespace-nowrap">
        <Sparkles className="w-2.5 h-2.5 text-terracotta flex-shrink-0" />
        {compact ? 'Learning' : 'Currently Learning'}
      </span>
    );
  }

  return null;
}

/**
 * Skills Section Component
 * Dark espresso panel matching reference "Tools I Use & My Expertise",
 * showcasing skill groups with explicit proficiency pills and zero progress bars.
 */
export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const leftColVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
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
      id="skills"
      className="relative bg-cream text-ink py-16 sm:py-24 lg:py-28 overflow-hidden"
      aria-label="Skills and Technical Tooling"
    >
      <Container>
        {/* Large Espresso Panel matching reference */}
        <div className="bg-espresso text-cream rounded-3xl p-6 sm:p-10 lg:p-12 xl:p-14 border border-espresso-light/60 shadow-warm-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: Section Intro, Legend & Resume Action (~33%, 4 cols) */}
            <motion.div
              className="lg:col-span-4 flex flex-col items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={leftColVariants}
            >
              <SectionLabel withDot className="mb-3 tracking-ultra text-terracotta font-semibold">
                SKILLS & TOOLS
              </SectionLabel>

              <SectionHeading theme="dark" className="text-3xl sm:text-4xl lg:text-[40px] leading-tight mb-4">
                Tools I Use & What I Know
              </SectionHeading>

              <p className="text-cream/70 text-sm sm:text-base font-sans leading-relaxed mb-8">
                A foundation in programming, data and machine learning, strengthened by AI-assisted development tools and hands-on projects.
              </p>

              {/* Proficiency Legend Card */}
              <div className="w-full space-y-3 mb-8 p-4 sm:p-5 rounded-2xl bg-espresso-light/50 border border-cream/10">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cream/80 block mb-2">
                  Proficiency Guide
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <LevelPill level="working" />
                    <span className="text-xs text-cream/70 font-sans text-right">
                      Used in my projects
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-1.5 border-t border-cream/5">
                  <div className="flex items-center justify-between gap-2">
                    <LevelPill level="foundation" />
                    <span className="text-xs text-cream/70 font-sans text-right">
                      Basics & still building
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-1.5 border-t border-cream/5">
                  <div className="flex items-center justify-between gap-2">
                    <LevelPill level="learning" />
                    <span className="text-xs text-cream/70 font-sans text-right">
                      Actively exploring
                    </span>
                  </div>
                </div>
              </div>

              {/* Resume Button */}
              {siteConfig.resumeUrl && siteConfig.resumeUrl.trim() !== '' ? (
                <Button
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-light"
                  size="md"
                  icon={Download}
                  className="font-medium px-5 py-2.5 border-cream/40 text-cream hover:border-terracotta hover:bg-terracotta"
                >
                  Download Resume
                </Button>
              ) : (
                <Button
                  variant="outline-light"
                  size="md"
                  disabled={true}
                  className="font-medium px-5 py-2.5 border-cream/25 text-cream/50 cursor-not-allowed hover:bg-transparent"
                  title="Resume will be available soon"
                >
                  Resume coming soon
                </Button>
              )}
            </motion.div>

            {/* RIGHT COLUMN: 6 Skill Group Cards (~67%, 8 cols) */}
            <motion.div
              className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
              variants={cardsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {skillGroups.map((group) => {
                const GroupIcon = iconMap[group.icon] || Code2;

                return (
                  <motion.div
                    key={group.title}
                    variants={cardVariants}
                    className="bg-espresso-light rounded-2xl p-5 sm:p-6 border border-cream/[0.08] hover:border-terracotta/40 transition-all duration-300 shadow-sm hover:shadow-warm-lg hover:-translate-y-1 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Title & Icon */}
                      <div className="flex items-center gap-3 pb-3.5 mb-3 border-b border-cream/[0.08]">
                        <div className="w-8 h-8 rounded-lg bg-terracotta/15 flex items-center justify-center text-terracotta flex-shrink-0 group-hover:bg-terracotta/25 transition-colors">
                          <GroupIcon className="w-4 h-4" />
                        </div>
                        <h3 className="font-sans font-semibold text-cream text-[15px] sm:text-base tracking-tight leading-snug">
                          {group.title}
                        </h3>
                      </div>

                      {/* Skill Rows */}
                      <ul className="divide-y divide-cream/[0.07]">
                        {group.skills.map((skill) => (
                          <li
                            key={skill.name}
                            className="py-2.5 flex items-center justify-between gap-3 text-sm"
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                              <span className="font-sans text-cream/90 text-xs sm:text-[13px] font-medium truncate">
                                {skill.name}
                              </span>
                            </div>

                            {/* Proficiency pill */}
                            <div className="flex-shrink-0">
                              <LevelPill level={skill.level} compact={true} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Panel Footnote */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-cream/10 flex items-start sm:items-center gap-2.5 text-xs sm:text-[13px] text-cream/60">
            <Info className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5 sm:mt-0" />
            <span>
              Levels reflect where I am today. I use AI-assisted tools to help with complex implementations while continuing to build my own coding skills.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
