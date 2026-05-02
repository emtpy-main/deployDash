import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12 md:p-20 border border-primary/20 shadow-[0_0_50px_rgba(255,107,0,0.1)] relative overflow-hidden"
        >
          {/* Animated decorative element */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"
          />
          
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 relative z-10">
            Start Deploying <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Smarter
            </span>
          </h2>
          
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto relative z-10">
            Let DeployDash handle your DevOps pipeline so you can focus on writing great code.
          </p>
          
          <div className="flex justify-center relative z-10">
            <Button size="lg" magnetic className="min-w-[200px] text-lg font-bold">
              Try Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
