import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export const SpotlightCard = ({ children, className }) => {
  const boundingRef = useRef(null);
  
  // Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!boundingRef.current) return;
    const { left, top, width, height } = boundingRef.current.getBoundingClientRect();
    
    // For spotlight
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);

    // For tilt
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={boundingRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass transition-all duration-300",
        className
      )}
    >
      {/* Spotlight Gradient Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 107, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Border Highlight Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border transition duration-300 group-hover:border-primary/50"
        style={{
          borderColor: "rgba(255,255,255,0.05)",
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent
            )
          `,
        }}
      />

      {/* Content */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 p-8 h-full">
        {children}
      </div>
    </motion.div>
  );
};
