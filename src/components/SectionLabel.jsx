import React from 'react';

/**
 * SectionLabel component
 * Small uppercase terracotta section label with generous letter spacing,
 * matching the editorial aesthetic (e.g., "HELLO, I'M", "ABOUT ME", "SERVICES").
 */
export default function SectionLabel({
  children,
  className = '',
  withDot = false,
  ...props
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-widest text-terracotta ${className}`}
      {...props}
    >
      {withDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block" />
      )}
      <span>{children}</span>
    </div>
  );
}
