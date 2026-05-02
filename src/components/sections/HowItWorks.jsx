import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, Play, Eye, Wrench, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';

const steps = [
  { id: 1, title: 'Goal', desc: 'Define your deployment objective.', icon: Target },
  { id: 2, title: 'Plan', desc: 'AI analyzes and generates a strategy.', icon: Lightbulb },
  { id: 3, title: 'Execute', desc: 'Provisioning and configuration begins.', icon: Play },
  { id: 4, title: 'Observe', desc: 'Real-time monitoring of metrics.', icon: Eye },
  { id: 5, title: 'Fix', desc: 'Self-healing AI resolves issues.', icon: Wrench },
  { id: 6, title: 'Deploy', desc: 'Successful rollout to production.', icon: Rocket },
];

export const HowItWorks = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate line height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="features" className="py-24 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">How It Works</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            A seamless, automated pipeline from concept to production.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated Connecting SVG Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-[0.5px] hidden md:block">
            {/* Background line */}
            <div className="h-full w-full bg-white/5 rounded-full" />
            {/* Glowing scroll line */}
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-primary via-secondary to-primary shadow-[0_0_15px_rgba(255,184,0,0.8)] rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-8 md:gap-16 group",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block flex-1" />

                  {/* Center Node */}
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center z-10 group-hover:border-secondary transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                    <step.icon className="text-text-muted group-hover:text-secondary transition-colors duration-500" />
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "flex-1 text-center md:text-left p-6 rounded-2xl glass transition-all duration-300 transform group-hover:scale-105 group-hover:bg-white/5 group-hover:border-primary/50",
                    isEven ? "md:text-right" : ""
                  )}>
                    <div className="text-sm text-primary font-bold mb-2">Step 0{step.id}</div>
                    <h3 className="text-2xl font-bold font-heading mb-2">{step.title}</h3>
                    <p className="text-text-muted">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
