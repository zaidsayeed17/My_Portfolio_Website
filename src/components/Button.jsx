import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Button component supporting primary terracotta, outline variants,
 * optional arrow icon with hover translation, and accessible link or button markup.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  icon: Icon,
  href,
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 select-none group';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-terracotta hover:bg-terracotta-dark text-cream shadow-warm-sm hover:shadow-warm active:scale-[0.98]',
    outline:
      'border border-terracotta text-terracotta hover:bg-terracotta hover:text-cream active:scale-[0.98]',
    'outline-light':
      'border border-cream/30 text-cream hover:bg-cream/10 active:scale-[0.98]',
    ghost:
      'text-terracotta hover:bg-terracotta/10 active:scale-[0.98]',
  };

  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${disabledStyles} ${className}`.trim();

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
