import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Frown, CheckCircle2, Zap, Smile } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Comparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Support both mouse and touch events
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Why It's Different</h2>
          <p className="text-text-muted">
            Drag the slider to see the difference between traditional DevOps and DeployDash.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative h-[500px] w-full rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 select-none shadow-2xl"
          onMouseMove={(e) => {
            if (e.buttons === 1) handleDrag(e); // Only drag when mouse is pressed
          }}
          onTouchMove={handleDrag}
          onClick={handleDrag}
        >
          {/* Traditional Way (Underneath) */}
          <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center p-8 grayscale">
            <h3 className="text-3xl font-bold text-gray-500 mb-8 font-heading">The Old Way</h3>
            <div className="space-y-6 max-w-sm w-full">
              <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <Clock className="text-gray-500" />
                <span className="text-gray-400">Manual Setup (Days)</span>
              </div>
              <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <AlertTriangle className="text-gray-500" />
                <span className="text-gray-400">Static, Fragile Scripts</span>
              </div>
              <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <Frown className="text-gray-500" />
                <span className="text-gray-400">Hours of Debugging</span>
              </div>
            </div>
          </div>

          {/* DeployDash Way (Overlay, Clipped) */}
          <div 
            className="absolute inset-0 bg-surface flex flex-col items-center justify-center p-8"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {/* Background Glow for DeployDash side */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 font-heading relative z-10">
              The DeployDash Way
            </h3>
            <div className="space-y-6 max-w-sm w-full relative z-10">
              <div className="flex items-center gap-4 bg-primary/10 p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                <Zap className="text-secondary" />
                <span className="text-white font-medium">AI-Driven Automation (Seconds)</span>
              </div>
              <div className="flex items-center gap-4 bg-primary/10 p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                <CheckCircle2 className="text-green-400" />
                <span className="text-white font-medium">Adaptive Decision Making</span>
              </div>
              <div className="flex items-center gap-4 bg-primary/10 p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                <Smile className="text-secondary" />
                <span className="text-white font-medium">Self-Healing Deployments</span>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-8 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-text-muted mt-4">
          Click and drag to compare
        </p>
      </div>
    </section>
  );
};
