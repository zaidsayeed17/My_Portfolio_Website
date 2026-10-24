import React from 'react';

/**
 * SectionHeading component
 * Editorial serif heading using Playfair Display.
 * Can adapt for dark (espresso) or light (cream/sand) section backgrounds.
 */
export default function SectionHeading({
  children,
  as: Component = 'h2',
  theme = 'light', // 'light' (on cream/sand: text is espresso) or 'dark' (on espresso: text is cream)
  className = '',
  ...props
}) {
  const themeColors = {
    light: 'text-espresso',
    dark: 'text-cream',
  };

  return (
    <Component
      className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] ${
        themeColors[theme] || themeColors.light
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
