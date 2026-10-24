import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { getProjectCaption } from '../utils/projectImages';

/**
 * ProjectGallery Component
 * Displays screenshots at their natural aspect ratio with object-contain (no device frames or mockups),
 * a simple square thumbnail row, captions, and an accessible fullscreen lightbox.
 */
export default function ProjectGallery({ project, screenshots }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mainImageButtonRef = useRef(null);
  const lightboxRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const total = screenshots.length;

  // Safe active screenshot
  const currentImage = screenshots[activeIndex] || screenshots[0];
  const currentKey = currentImage?.key || '';
  const currentCaption = getProjectCaption(project, currentKey, activeIndex);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Open Lightbox
  const handleOpenLightbox = () => {
    lastActiveElementRef.current = document.activeElement;
    setLightboxOpen(true);
  };

  // Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
    setTimeout(() => {
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      } else if (mainImageButtonRef.current) {
        mainImageButtonRef.current.focus();
      }
    }, 50);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        e.preventDefault();
        if (total > 1) handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        e.preventDefault();
        if (total > 1) handleNext();
      } else if (e.key === 'Tab') {
        // Focus trap inside lightbox
        if (!lightboxRef.current) return;
        const focusables = lightboxRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [lightboxOpen, handleCloseLightbox, handlePrev, handleNext, total]);

  // Auto-focus inside lightbox when opened
  useEffect(() => {
    if (lightboxOpen) {
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 50);
    }
  }, [lightboxOpen]);

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe if deltaX is larger than deltaY and threshold > 40px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        if (total > 1) handlePrev();
      } else {
        if (total > 1) handleNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Gallery Header Label */}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-espresso/70 mb-3 font-sans">
        Screenshots
      </h3>

      {/* Main Display Container - object-contain at true aspect ratio, never cropped, no frame */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-sand-dark/30 bg-sand/40 flex items-center justify-center p-3 sm:p-5 min-h-[260px] max-h-[420px] select-none">
        <button
          ref={mainImageButtonRef}
          type="button"
          onClick={handleOpenLightbox}
          aria-label={`Open full screenshot: ${currentCaption} in lightbox`}
          className="relative max-h-[390px] w-auto h-auto max-w-full flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <img
            src={currentImage.src}
            alt={`${project.title} screenshot: ${currentCaption}`}
            className="max-h-[380px] w-auto max-w-full object-contain rounded-lg"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle click to enlarge hint on hover */}
          <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-cream">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espresso/85 text-cream text-xs font-medium backdrop-blur-sm border border-cream/20 shadow-md">
              <Maximize2 className="w-3.5 h-3.5 text-terracotta" />
              <span>Enlarge</span>
            </span>
          </div>
        </button>
      </div>

      {/* Caption Below Main Image */}
      <p className="text-center text-xs sm:text-sm font-medium text-muted mt-2.5 font-sans">
        {currentCaption}
      </p>

      {/* Horizontally Scrollable Thumbnail Row (when >= 2 screenshots) */}
      {total > 1 && (
        <div
          className="flex items-center justify-center gap-2.5 overflow-x-auto py-2.5 px-1 mt-2.5 scrollbar-thin"
          role="tablist"
          aria-label="Screenshot thumbnails"
        >
          {screenshots.map((img, idx) => {
            const isActive = idx === activeIndex;
            const caption = getProjectCaption(project, img.key, idx);

            return (
              <button
                key={img.key || idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Select screenshot ${idx + 1}: ${caption}`}
                onClick={() => setActiveIndex(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-sand/60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                  isActive
                    ? 'border-terracotta ring-2 ring-terracotta/40 scale-105 shadow-md'
                    : 'border-sand-dark/40 opacity-70 hover:opacity-100 hover:border-terracotta/50'
                }`}
              >
                <img
                  src={img.src}
                  alt={caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX - object-contain with no frame */}
      <AnimatePresence>
        {lightboxOpen && (
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            data-lenis-prevent="true"
            aria-label={`${project.title} screenshot gallery lightbox`}
            className="fixed inset-0 z-[100] flex items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 95% Espresso Overlay */}
            <motion.div
              className="absolute inset-0 bg-[#2B1D17]/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              aria-hidden="true"
            />

            {/* Counter: "X of N" */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-espresso-light/80 text-cream/90 text-xs sm:text-sm font-medium tracking-wider border border-cream/15 backdrop-blur-sm shadow-md">
                {activeIndex + 1} of {total}
              </span>
            </div>

            {/* Close Button (X) */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleCloseLightbox}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-espresso-light/80 hover:bg-terracotta text-cream flex items-center justify-center border border-cream/20 shadow-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-cream"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous Arrow Button */}
            {total > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous screenshot"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-espresso-light/80 hover:bg-terracotta text-cream flex items-center justify-center border border-cream/20 shadow-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-cream"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Arrow Button */}
            {total > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next screenshot"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-espresso-light/80 hover:bg-terracotta text-cream flex items-center justify-center border border-cream/20 shadow-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-cream"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Center Main Image - pure object-contain, natural aspect ratio, no frame */}
            <motion.div
              key={activeIndex}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 max-w-[95vw] max-h-[85vh] flex items-center justify-center p-2"
            >
              <img
                src={currentImage.src}
                alt={`${project.title} screenshot: ${currentCaption}`}
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain shadow-2xl"
                decoding="async"
              />
            </motion.div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 text-center pointer-events-none z-20">
              <span className="inline-block bg-espresso-light/85 text-cream/95 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-cream/15 backdrop-blur-sm shadow-md">
                {currentCaption}
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
