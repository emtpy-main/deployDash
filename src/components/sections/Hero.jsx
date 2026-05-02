import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Terminal, Rocket, Layers } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm text-secondary mb-6 border-secondary/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            DeployDash v2.0 is live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6"
          >
            Deploy Apps in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Seconds with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-text-muted mb-8 max-w-lg"
          >
            DeployDash is your intelligent DevOps agent that plans, builds, and deploys automatically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" magnetic className="min-w-[160px]">
              Get Started
            </Button>
            <Button size="lg" variant="secondary" magnetic className="min-w-[160px]">
              View Demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 text-sm text-text-muted font-medium flex items-center gap-2"
          >
            <Rocket size={16} className="text-primary" />
            From repo to production in under 60 seconds
          </motion.p>
        </div>

        {/* Abstract Visual (21st.dev inspired abstract animation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] w-full flex items-center justify-center z-10 perspective-1000"
        >
          {/* Central Core */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative z-20 w-48 h-48 rounded-3xl glass border border-primary/30 shadow-[0_0_50px_rgba(255,107,0,0.2)] flex items-center justify-center"
          >
            <Terminal size={64} className="text-primary" />
          </motion.div>

          {/* Orbiting Elements */}
          {[
            { Icon: Layers, delay: 0, color: "text-secondary" },
            { Icon: Rocket, delay: 1.3, color: "text-primary" },
            { Icon: Terminal, delay: 2.6, color: "text-white" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -mt-8 -ml-8 w-16 h-16 glass rounded-full flex items-center justify-center z-30"
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear",
                delay: item.delay
              }}
              style={{
                transformOrigin: "150px 150px", // offset for orbit
              }}
            >
              <item.Icon size={24} className={item.color} />
            </motion.div>
          ))}
          
          {/* Decorative Grid Plane */}
          <div className="absolute inset-0 z-0 flex items-center justify-center [transform:rotateX(60deg)]">
            <div className="w-[600px] h-[600px] border border-white/5 rounded-full border-dashed animate-spin-slow"></div>
            <div className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full border-dashed animate-spin-slow-reverse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
