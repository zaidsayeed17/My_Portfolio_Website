import React from 'react';
import {
  Store,
  MessagesSquare,
  Smartphone,
  BarChart3,
  Sun,
  Radio,
  Gift,
  LineChart,
  Wind,
  Dumbbell,
  FileText,
  Workflow,
  ShieldCheck,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Flag,
} from 'lucide-react';
import { getCardText } from '../utils/projectText';
import { getProjectImages, getProjectCaption } from '../utils/projectImages';
import { GithubIcon, InstagramIcon } from './SocialIcons';

// Comprehensive icon dictionary for project domains
const iconMap = {
  Store,
  MessagesSquare,
  Smartphone,
  BarChart3,
  Sun,
  Radio,
  Gift,
  LineChart,
  Wind,
  Dumbbell,
  FileText,
  Workflow,
  ShieldCheck,
};

/**
 * StatusBadge Component
 */
export function StatusBadge({ status }) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm shadow-sm">
          Completed
        </span>
      );
    case 'in-development':
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-terracotta text-cream shadow-sm">
          In Development
        </span>
      );
    case 'prototype':
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm shadow-sm">
          Prototype
        </span>
      );
    case 'concept':
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-dashed border-cream/50 text-cream/90 bg-espresso/70 backdrop-blur-sm">
          Concept
        </span>
      );
    default:
      return null;
  }
}

/**
 * Shared ProjectCard Component
 * Consistent visual structure for both Homepage Featured section and All Projects gallery.
 */
export default function ProjectCard({
  project,
  onOpenDetails,
  detailsHref,
  showFullDetailsButton = false,
}) {
  const ProjectIcon = iconMap[project.icon] || Layers;
  const cardText = getCardText(project);

  const screenshots = project.screenshotsFolder
    ? getProjectImages(project.screenshotsFolder)
    : [];
  const coverImage =
    project.image && project.image.trim() !== ''
      ? project.image
      : screenshots[0]?.src || null;
  const hasCover = Boolean(coverImage);

  const isContain = project.screenshotFit === 'contain';
  const positionClass =
    project.screenshotPosition === 'center'
      ? 'object-center'
      : project.screenshotPosition === 'bottom'
      ? 'object-bottom'
      : 'object-top';

  const visibleTags = project.tags ? project.tags.slice(0, 5) : [];
  const extraTagsCount = project.tags && project.tags.length > 5 ? project.tags.length - 5 : 0;

  const hasExternalLinks =
    (project.github && project.github.trim() !== '') ||
    (project.demo && project.demo.trim() !== '') ||
    (project.instagram && project.instagram.trim() !== '');

  const handleCardClick = (e) => {
    // If the click originated from an anchor tag or button, don't trigger modal
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (onOpenDetails) {
      onOpenDetails(project);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (onOpenDetails) {
        e.preventDefault();
        onOpenDetails(project);
      }
    }
  };

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={onOpenDetails ? 0 : undefined}
      role={onOpenDetails ? 'button' : undefined}
      aria-label={onOpenDetails ? `Open details for ${project.title}` : undefined}
      className={`bg-sand/60 hover:bg-sand/90 rounded-2xl p-5 sm:p-6 border border-sand-dark/30 hover:border-terracotta/30 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
        onOpenDetails ? 'cursor-pointer' : ''
      }`}
    >
      <div>
        {/* 16:10 Aspect Ratio Image Container */}
        <div
          className={`relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-sand-dark/20 ${
            isContain ? 'bg-sand' : 'bg-espresso'
          }`}
        >
          {/* Status Badge Overlaid Top-Left */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <StatusBadge status={project.status} />
          </div>

          {/* Context Chip (if present, top-right) */}
          {project.context && (
            <div className="absolute top-3 right-3 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-espresso/85 text-cream/90 backdrop-blur-sm border border-cream/20 shadow-sm">
                <Flag className="w-2.5 h-2.5 text-terracotta flex-shrink-0" />
                <span>{project.context}</span>
              </span>
            </div>
          )}

          {/* Screenshot image or Tasteful Placeholder */}
          {hasCover ? (
            <img
              src={coverImage}
              alt={
                screenshots[0]?.key
                  ? `${project.title} screenshot: ${getProjectCaption(project, screenshots[0].key, 0)}`
                  : `Screenshot of ${project.title}`
              }
              className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'} ${positionClass}`}
              style={{
                objectPosition: project.screenshotPosition
                  ? `${project.screenshotPosition} center`
                  : 'top center',
              }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-espresso-light via-espresso to-[#20140e] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="absolute w-36 h-36 rounded-full bg-terracotta/10 filter blur-xl pointer-events-none" />
              <ProjectIcon className="w-14 h-14 sm:w-16 sm:h-16 text-terracotta opacity-30 mb-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-45" />
              <span className="text-xs font-medium text-cream/50 tracking-wider uppercase font-sans">
                Screenshot coming soon
              </span>
            </div>
          )}
        </div>

        {/* Title, Subtitle & Category */}
        <div className="mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted font-sans block mb-1">
            {project.category}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso group-hover:text-terracotta transition-colors leading-tight">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-medium text-terracotta/90 mt-0.5 font-sans">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Description / Summary */}
        <p className="text-muted text-sm leading-relaxed mb-5 font-sans line-clamp-3">
          {cardText}
        </p>

        {/* Tags (up to 5 tags, with +N count badge) */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-sand/90 text-terracotta border border-terracotta/15 tracking-wide"
              >
                {tag}
              </span>
            ))}
            {extraTagsCount > 0 && (
              <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-sand-dark/50 text-muted border border-sand-dark/60 tracking-wide">
                +{extraTagsCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Row */}
      <div className="pt-4 border-t border-sand-dark/30 flex items-center justify-between gap-4">
        {/* Left: GitHub, Live Demo, Instagram Links */}
        <div className="flex items-center gap-3.5 flex-wrap">
          {project.github && project.github.trim() !== '' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-terracotta transition-colors"
              aria-label={`View ${project.title} source code on GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}

          {project.demo && project.demo.trim() !== '' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
              aria-label={`${project.demoLabel || 'Open live demo'} for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>{project.demoLabel || 'Live Demo'}</span>
            </a>
          )}

          {project.instagram && project.instagram.trim() !== '' && (
            <a
              href={project.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
              aria-label={`Open Instagram for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          )}

          {!hasExternalLinks && (
            <span className="text-[11px] text-muted font-medium font-sans italic">
              In development / internal
            </span>
          )}
        </div>

        {/* Right: Details Action */}
        {showFullDetailsButton ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenDetails) onOpenDetails(project);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-terracotta text-terracotta hover:bg-terracotta hover:text-cream text-xs font-semibold tracking-wide transition-all group-hover:scale-105 active:scale-95 shadow-sm flex-shrink-0"
            aria-label={`View details for ${project.title}`}
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <a
            href={detailsHref || `/projects#${project.id}`}
            onClick={(e) => {
              if (onOpenDetails) {
                e.preventDefault();
                e.stopPropagation();
                onOpenDetails(project);
              }
            }}
            className="w-9 h-9 rounded-full border border-terracotta text-terracotta hover:bg-terracotta hover:text-cream flex items-center justify-center transition-all group-hover:scale-105 active:scale-95 shadow-sm flex-shrink-0"
            aria-label={`View details of ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </article>
  );
}
