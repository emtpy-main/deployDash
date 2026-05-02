import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Rocket, Server, GitBranch, Container, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

export const ConfigForm = ({ formData, setFormData, step, setStep, onSubmit, isSubmitting, submitError }) => {
  const steps = [
    { id: 1, title: 'Project Details', icon: Settings },
    { id: 2, title: 'Container Registry', icon: Server },
    { id: 3, title: 'Image Settings', icon: Container },
    { id: 4, title: 'Source Code', icon: GitBranch },
    { id: 5, title: 'Finalize', icon: Rocket }
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else onSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.projectGoals.trim() !== '' && formData.projectDetails.trim() !== '';
      case 2: return formData.dockerUsername.trim() !== '' && formData.dockerPassword.trim() !== '';
      case 3: return formData.imageName.trim() !== '';
      case 4: return formData.githubToken.trim() !== '';
      case 5: return true; // Optional
      default: return false;
    }
  };

  const currentStep = steps[step - 1];
  const StepIcon = currentStep.icon;

  return (
    <motion.div
      layoutId="dashboard-container"
      className="w-full max-w-2xl mx-auto rounded-2xl p-8 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-3xl relative overflow-hidden"
    >
      {/* Optional reflection highlight for glass */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <StepIcon size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-base">{currentStep.title}</h2>
              <p className="text-sm text-text-muted">Step {step} of 5</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {submitError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {submitError}
        </div>
      )}

      {/* Form Content Area */}
      <div className="min-h-[220px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">Project Goals <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.projectGoals}
                    onChange={(e) => handleChange('projectGoals', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="e.g., Automate deployments"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">Details about the project <span className="text-red-500">*</span></label>
                  <textarea
                    value={formData.projectDetails}
                    onChange={(e) => handleChange('projectDetails', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-none"
                    placeholder="Provide some context..."
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">Docker Username <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.dockerUsername}
                    onChange={(e) => handleChange('dockerUsername', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">Docker Password <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    value={formData.dockerPassword}
                    onChange={(e) => handleChange('dockerPassword', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">Custom Docker Image Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.imageName}
                    onChange={(e) => handleChange('imageName', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="username/my-app:latest"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">GitHub Repo Link <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.githubRepo}
                    onChange={(e) => handleChange('githubRepo', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">GitHub Token ID <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    value={formData.githubToken}
                    onChange={(e) => handleChange('githubToken', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="ghp_••••••••••••••••"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted ml-1">Render Deploy Hook URL (Optional)</label>
                  <input
                    type="text"
                    value={formData.hookUrl}
                    onChange={(e) => handleChange('hookUrl', e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="https://api.render.com/deploy/..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1 || isSubmitting}
          className={step === 1 ? 'opacity-0 pointer-events-none' : ''}
        >
          <ChevronLeft size={16} className="mr-2" />
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isStepValid() || isSubmitting}
          magnetic
        >
          {step === 5 ? (isSubmitting ? 'Submitting...' : 'Launch Agent') : 'Next'}
          {step !== 5 && <ChevronRight size={16} className="ml-2" />}
        </Button>
      </div>
    </motion.div>
  );
};
