import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import projects from '../data/projects';
import Container from '../components/Container';
import Button from '../components/Button';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';

/**
 * FeaturedProjects Component
 * Showcases the 4 featured projects in a 2x2 grid using the shared ProjectCard component.
 */
export default function FeaturedProjects() {
  const shouldReduceMotion = useReducedMotion();

  // Filter featured projects sorted by featuredOrder ascending
  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));

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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
      id="projects"
      className="relative bg-cream text-ink py-20 sm:py-28 overflow-hidden"
      aria-label="Featured Projects"
    >
      <Container>
        {/* Section Header Row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
        >
          <div>
            <SectionLabel withDot className="mb-3 tracking-ultra text-terracotta font-semibold">
              FEATURED PROJECTS
            </SectionLabel>
            <SectionHeading theme="light" className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Some Things I've Built
            </SectionHeading>
          </div>

          <div className="flex-shrink-0">
            <Button
              href="/projects"
              variant="outline"
              size="md"
              showArrow={true}
              className="font-medium text-xs sm:text-sm tracking-wide"
            >
              View All Projects
            </Button>
          </div>
        </motion.div>

        {/* 4 Featured Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              <ProjectCard
                project={project}
                detailsHref={`/projects#${project.id}`}
                showFullDetailsButton={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
