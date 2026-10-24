import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import Container from '../components/Container';
import Button from '../components/Button';
import { LinkedinIcon } from '../components/SocialIcons';

/**
 * CTABanner Component
 * Full-width warm terracotta band (matching the reference design)
 * inviting visitors and recruiters to get in touch for internships & entry-level roles.
 */
export default function CTABanner() {
  const shouldReduceMotion = useReducedMotion();

  const contentVariants = {
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

  return (
    <section
      id="contact"
      className="relative bg-terracotta text-cream py-14 md:py-16 overflow-hidden select-none"
      aria-label="Contact and Collaboration"
    >
      {/* Decorative dark-terracotta organic shape on the right edge */}
      <div
        className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-terracotta-dark/40 filter blur-2xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Decorative subtle dot grid on the left */}
      <div
        className="hidden sm:grid absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 grid-cols-3 gap-2.5 opacity-15 pointer-events-none -z-0"
        aria-hidden="true"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-cream" />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={contentVariants}
        >
          {/* LEFT: Icon + Heading + Subtitle */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 max-w-2xl">
            {/* Outlined paper-plane circle badge */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-cream/50 bg-white/10 flex items-center justify-center text-cream flex-shrink-0 shadow-sm">
              <Send className="w-6 h-6 transform -rotate-12 translate-x-0.5" />
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream tracking-tight leading-tight">
                Let's Build Something Together
              </h2>
              <p className="text-cream/85 text-sm sm:text-base font-sans leading-relaxed mt-1.5">
                I'm open to internships and entry-level roles in AI, machine learning and data analytics. Feel free to reach out.
              </p>
            </div>
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto flex-shrink-0">
            {/* Primary Email button */}
            <Button
              href={`mailto:${siteConfig.email}`}
              variant="outline-light"
              size="lg"
              showArrow={true}
              className="border-cream text-cream hover:bg-cream hover:text-terracotta w-full sm:w-auto font-semibold px-6 py-3 shadow-warm-sm"
            >
              Get In Touch
            </Button>

            {/* LinkedIn Connect Button */}
            {siteConfig.linkedin && (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-cream hover:bg-black/10 transition-colors w-full sm:w-auto border border-cream/25 hover:border-cream/50"
              >
                <LinkedinIcon className="w-4 h-4 text-cream" />
                <span>Connect on LinkedIn</span>
              </a>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
