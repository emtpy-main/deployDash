import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, Loader2, Server, GitBranch, Container } from 'lucide-react';
import { io } from 'socket.io-client';

export const LiveDashboard = ({ formData }) => {
  const [logs, setLogs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef(null);

  // Masking utility
  const obfuscate = (str) => {
    if (!str) return 'Not provided';
    if (str.length <= 4) return '••••';
    return `••••${str.slice(-4)}`;
  };

  useEffect(() => {
    console.log('[WebSocket] Attempting to connect...');
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('[WebSocket] Connected successfully to backend:', socket.id);
    });

    socket.on('deployment_log', (message) => {
      console.log('[WebSocket] Received log:', message);
      setLogs(prev => [...prev, message]);
    });

    socket.on('deployment_complete', () => {
      console.log('[WebSocket] Deployment complete signal received.');
      setIsComplete(true);
    });

    return () => {
      console.log('[WebSocket] Disconnecting...');
      socket.disconnect();
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div 
      layoutId="dashboard-container"
      className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[80vh] min-h-[600px]"
    >
      {/* Left Side: Summary */}
      <motion.div 
        className="lg:col-span-4 glass rounded-3xl p-6 border border-white/10 flex flex-col bg-surface/80 backdrop-blur-xl overflow-y-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
          <Server className="text-primary w-5 h-5" />
          Configuration Summary
        </h3>
        
        <div className="space-y-6 flex-grow">
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Project</h4>
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <p className="text-sm font-medium">{formData.projectGoals || 'N/A'}</p>
              <p className="text-xs text-text-muted mt-1">{formData.projectDetails || 'No details provided.'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Registry</h4>
            <div className="bg-black/20 rounded-xl p-3 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Username</span>
                <span className="text-sm font-medium">{formData.dockerUsername || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Password</span>
                <span className="text-sm font-medium">{obfuscate(formData.dockerPassword)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Build</h4>
            <div className="bg-black/20 rounded-xl p-3 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted flex items-center gap-1"><Container size={14}/> Image</span>
                <span className="text-sm font-medium truncate max-w-[150px]">{formData.imageName || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted flex items-center gap-1"><GitBranch size={14}/> Token</span>
                <span className="text-sm font-medium">{obfuscate(formData.githubToken)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Live Terminal */}
      <motion.div 
        className="lg:col-span-8 bg-[#0A0A0A] rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col font-mono text-sm relative overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-text-muted">
            <Terminal size={18} />
            <span>agent-deploy.log</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar"
        >
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3"
            >
              {!isComplete && index === logs.length - 1 ? (
                <Loader2 size={16} className="text-primary animate-spin shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              )}
              <span className="text-gray-300">{log}</span>
            </motion.div>
          ))}
          
          {!isComplete && (
             <div className="flex items-center gap-2 text-gray-500 mt-2">
               <span className="animate-pulse">_</span>
             </div>
          )}
        </div>
        
        {/* Subtle glow effect overlay inside terminal */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
