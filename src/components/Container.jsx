import React from 'react';

/**
 * Container component
 * Provides consistent maximum width and responsive horizontal padding.
 */
export default function Container({ children, className = '', size = 'default', ...props }) {
  const maxWidths = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidths[size] || maxWidths.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
