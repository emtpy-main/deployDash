import React from 'react';
import { Terminal, Mail, BookOpen, GitBranch } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-surface/30 pt-16 pb-8">
      {/* Subtle glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold font-heading">DeployDash</span>
          </div>
          <p className="text-sm text-text-muted text-center md:text-left max-w-xs">
            The intelligent DevOps agent that plans, builds, and deploys automatically.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm">
            <GitBranch size={16} /> GitHub
          </a>
          <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm">
            <BookOpen size={16} /> Docs
          </a>
          <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm">
            <Mail size={16} /> Contact
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
        <p>&copy; {new Date().getFullYear()} DeployDash. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-text-base transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text-base transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
