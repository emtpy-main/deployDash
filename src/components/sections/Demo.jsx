import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const logs = [
  { text: "> Initializing deployment sequence...", color: "text-text-muted", delay: 500 },
  { text: "> Analyzing repository structure...", color: "text-text-muted", delay: 1200 },
  { text: "[OK] Detected React + Vite application", color: "text-green-400", delay: 1800 },
  { text: "> Generating optimized Dockerfile...", color: "text-text-muted", delay: 2400 },
  { text: "[OK] Dockerfile generated successfully", color: "text-green-400", delay: 3000 },
  { text: "> Building container image...", color: "text-secondary", delay: 3600 },
  { text: "[ERR] Missing environment variable: API_KEY", color: "text-red-400", delay: 4800 },
  { text: "> AI Agent analyzing error...", color: "text-primary", delay: 5400 },
  { text: "> [FIX] Auto-injecting API_KEY from secure vault...", color: "text-primary", delay: 6200 },
  { text: "> Rebuilding container image...", color: "text-secondary", delay: 6800 },
  { text: "[OK] Build completed successfully", color: "text-green-400", delay: 7800 },
  { text: "> Deploying to edge network...", color: "text-text-muted", delay: 8400 },
  { text: "[SUCCESS] Application is live at deploydash.app/demo", color: "text-green-400 font-bold", delay: 9500 },
];

export const Demo = () => {
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset state on mount
    setVisibleLogs([]);
    setProgress(0);

    let timeouts = [];
    
    // Simulate typing logs
    logs.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
        // Update progress bar
        setProgress(Math.min(100, Math.floor(((index + 1) / logs.length) * 100)));
      }, log.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">See It In Action</h2>
          <p className="text-text-muted">
            Watch DeployDash intelligently build, fix, and deploy in real-time.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl glass overflow-hidden border border-white/10 shadow-2xl relative"
        >
          {/* Mac-like Window Header */}
          <div className="bg-surface/80 border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-4 text-xs text-text-muted font-mono flex-1 text-center pr-12">
              user@deploydash: ~/project
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base h-[400px] overflow-y-auto flex flex-col gap-2 relative bg-[#0a0a0a]">
            {visibleLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${log.color}`}
              >
                {log.text}
              </motion.div>
            ))}
            
            {/* Blinking Cursor */}
            {progress < 100 && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-primary inline-block mt-1"
              />
            )}
          </div>

          {/* Progress Bar Container */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_10px_#FF6B00]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
