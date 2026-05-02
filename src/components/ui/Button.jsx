import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  magnetic = false,
  ...props 
}, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const buttonRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!magnetic || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    // Reduce movement for subtler effect
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-lg relative overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.5)] hover:shadow-[0_0_25px_rgba(255,107,0,0.8)]",
    secondary: "bg-surface border border-white/10 text-white hover:bg-white/5",
    ghost: "bg-transparent hover:bg-white/10 text-text-base",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  // Merge external ref with internal ref
  const combinedRef = React.useCallback(
    (node) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <motion.button
      ref={combinedRef}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
