import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Loader2, Server, GitBranch, Container, AlertTriangle, XCircle, Info, ExternalLink, RefreshCcw, Home } from 'lucide-react';
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Button } from '../ui/Button';

export const LiveDashboard = ({ jobId, formData, onRetry, onGoHome }) => {
  const [logs, setLogs] = useState([]);
  const [jobStatus, setJobStatus] = useState('queued'); // queued, in-progress, success, failed
  const [jobData, setJobData] = useState(null);
  const terminalRef = useRef(null);

  // Masking utility
  const obfuscate = (str) => {
    if (!str) return 'Not provided';
    if (str.length <= 4) return '••••';
    return `••••${str.slice(-4)}`;
  };

  // Subscribe to Status
  useEffect(() => {
    if (!jobId) {
      setLogs([]);
      setJobStatus('queued');
      setJobData(null);
      return;
    }

    const jobRef = doc(db, "jobs", jobId);
    const unsubscribe = onSnapshot(jobRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setJobStatus(data.status);
        setJobData(data);
      }
    });

    return () => unsubscribe();
  }, [jobId]);

  // Subscribe to Logs
  useEffect(() => {
    if (!jobId) return;

    const logsRef = collection(db, "jobs", jobId, "logs");
    const q = query(logsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newLogs = snapshot.docs.map(doc => doc.data());
      setLogs(newLogs);
    });

    return () => unsubscribe();
  }, [jobId]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-300';
    }
  };

  const getStatusConfig = () => {
    switch (jobStatus) {
      case 'success':
        return {
          icon: <CheckCircle2 className="text-green-500" />,
          title: "Deployment Successful",
          bannerClass: "bg-green-500/10 border-green-500/50 text-green-400",
          details: jobData?.details?.runCommand || "Your application is live."
        };
      case 'failed':
        return {
          icon: <XCircle className="text-red-500" />,
          title: "Build Failed",
          bannerClass: "bg-red-500/10 border-red-500/50 text-red-400",
          details: jobData?.error || "An unexpected error occurred during build."
        };
      case 'in-progress':
        return {
          icon: <Loader2 className="text-primary animate-spin" />,
          title: "Build In Progress",
          bannerClass: "bg-primary/10 border-primary/50 text-primary",
          details: "Streaming live build logs..."
        };
      default:
        return {
          icon: <Info className="text-blue-400" />,
          title: "Waiting for worker...",
          bannerClass: "bg-blue-500/10 border-blue-500/50 text-blue-400",
          details: "Job has been queued and will start shortly."
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div 
      layoutId="dashboard-container"
      className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 h-[80vh] min-h-[600px]"
    >
      {/* Left Side: Summary */}
      <motion.div 
        className="lg:col-span-3 glass rounded-xl p-5 border border-white/10 flex flex-col bg-surface/80 backdrop-blur-xl overflow-y-auto no-scrollbar"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold font-heading mb-5 flex items-center gap-2">
          <Server className="text-primary w-5 h-5" />
          Deployment Summary
        </h3>
        
        <div className="space-y-5 flex-grow">
          <div>
            <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">Project</h4>
            <div className="bg-black/20 rounded-lg p-3 border border-white/5">
              <p className="text-sm font-medium leading-tight">{formData.projectGoals || 'N/A'}</p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-2">{formData.projectDetails || 'No details provided.'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">Registry</h4>
            <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-text-muted">Username</span>
                <span className="text-[13px] font-medium">{formData.dockerUsername || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-text-muted">Password</span>
                <span className="text-[13px] font-medium">{obfuscate(formData.dockerPassword)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">Build</h4>
            <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-text-muted flex items-center gap-1"><Container size={12}/> Image</span>
                <span className="text-[13px] font-medium truncate max-w-[120px]">{formData.imageName || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-text-muted flex items-center gap-1"><GitBranch size={12}/> Token</span>
                <span className="text-[13px] font-medium">{obfuscate(formData.githubToken)}</span>
              </div>
            </div>
          </div>

          {/* Resource Links Section */}
          {(jobData?.githubBranchUrl || jobData?.dockerHubUrl) && (
            <div>
              <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">Resource Links</h4>
              <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-2.5">
                {jobData?.githubBranchUrl && (
                  <a 
                    href={jobData.githubBranchUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center group cursor-pointer"
                  >
                    <span className="text-[13px] text-text-muted flex items-center gap-1">
                      <GitBranch size={13} className="group-hover:text-primary transition-colors"/> GitHub Repo
                    </span>
                    <ExternalLink size={13} className="text-text-muted group-hover:text-primary transition-colors" />
                  </a>
                )}
                {jobData?.dockerHubUrl && (
                  <a 
                    href={jobData.dockerHubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center group cursor-pointer"
                  >
                    <span className="text-[13px] text-text-muted flex items-center gap-1">
                      <Container size={13} className="group-hover:text-primary transition-colors"/> Docker Hub
                    </span>
                    <ExternalLink size={13} className="text-text-muted group-hover:text-primary transition-colors" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Info Banner at Bottom of Left Panel */}
        <div className={`mt-6 rounded-xl border p-4 ${statusConfig.bannerClass}`}>
          <div className="flex items-center gap-2 font-bold mb-1">
            {statusConfig.icon}
            <span className="text-sm uppercase tracking-wider">{statusConfig.title}</span>
          </div>
          <p className="text-xs opacity-90 leading-relaxed truncate">{statusConfig.details}</p>
        </div>
      </motion.div>

      {/* Right Side: Live Terminal */}
      <motion.div 
        className="lg:col-span-9 bg-[#0A0A0A] rounded-xl p-5 border border-white/10 shadow-2xl flex flex-col font-mono text-[13px] relative overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3.5 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2 text-text-muted">
            <Terminal size={16} />
            <span>agent-deploy.log</span>
            {jobId && <span className="text-[9px] opacity-30 ml-2 tracking-tighter">#{jobId.slice(-8)}</span>}
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
        </div>

        {/* Status Overlay for Success/Failure */}
        <AnimatePresence>
          {jobStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>Deployment Successful!</span>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={`https://hub.docker.com/r/${formData.dockerUsername}/${formData.imageName.split(':')[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 text-primary hover:underline"
                  >
                    View on Docker Hub <ExternalLink size={12} />
                  </a>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onGoHome}
                    className="h-8 px-3 border border-green-500/20 hover:bg-green-500/10 text-green-400 text-xs gap-2"
                  >
                    <Home size={14} /> Home
                  </Button>
                </div>
              </div>
              <div className="bg-black/40 p-2 rounded border border-white/5 text-[12px]">
                <code className="text-gray-400">$ {jobData?.details?.runCommand}</code>
              </div>
            </motion.div>
          )}

          {jobStatus === 'failed' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <AlertTriangle size={16} />
                  <span>Build Failed at step: {jobData?.failedStep || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onRetry}
                    className="h-8 px-3 border border-red-500/30 hover:bg-red-500/10 text-red-400 text-xs gap-2"
                  >
                    <RefreshCcw size={14} /> Retry
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onGoHome}
                    className="h-8 px-3 border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs gap-2"
                  >
                    <Home size={14} /> Home
                  </Button>
                </div>
              </div>
              <p className="text-xs text-red-300/80 italic">{jobData?.error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="flex-grow overflow-y-auto space-y-1.5 pr-2 no-scrollbar"
        >
          {logs.length === 0 && jobStatus === 'queued' && (
            <div className="text-gray-500 italic py-4">
              Waiting for worker to initialize...
            </div>
          )}

          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 group"
            >
              <span className="text-[10px] text-white/10 select-none pt-1">[{new Date(log.timestamp?.seconds * 1000).toLocaleTimeString([], { hour12: false })}]</span>
              <span className={`${getLogColor(log.type)} break-all leading-relaxed`}>{log.message}</span>
            </motion.div>
          ))}
          
          {(jobStatus === 'in-progress' || jobStatus === 'queued') && (
             <div className="flex items-center gap-2 text-primary mt-2">
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
