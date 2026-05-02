import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ConfigForm } from '../components/dashboard/ConfigForm';
import { LiveDashboard } from '../components/dashboard/LiveDashboard';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import axios from 'axios';
import BASE_URL from '../App'
export const Home = () => {
  const { currentUser } = useAuth();

  // view can be 'hero', 'form', or 'dashboard'
  const [view, setView] = useState('hero');

  const [formData, setFormData] = useState({
    projectGoals: '',
    projectDetails: '',
    dockerUsername: '',
    githubRepo: '',
    dockerPassword: '',
    imageName: '',
    githubToken: '',
    hookUrl: ''
  });

  const [step, setStep] = useState(1);
  const [blobs, setBlobs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Generate random blobs on mount for dynamic background
    const newBlobs = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 400 + 300, // 300px to 700px
      color: Math.random() > 0.5 ? 'bg-primary' : 'bg-secondary',
      duration: Math.random() * 15 + 15, // 15s to 30s
      delay: Math.random() * 5
    }));
    setBlobs(newBlobs);
  }, []);

  const handleLaunch = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await axios.post(`http://localhost:5000/run`, {
        goal: formData.projectGoals + " " + formData.projectDetails,
        dockerUsername: formData.dockerUsername,
        dockerPassword: formData.dockerPassword,
        githubRepo: formData.githubRepo,
        gitToken: formData.githubToken,
        renderWebhook: formData.hookUrl,
        imageName: formData.imageName
      });
      if (response.data.status === 'queued') {
        setView('dashboard');
      } else {
        setSubmitError("Failed to validate configuration.");
      }
    } catch (error) {
      console.error("Error submitting config:", error);
      setSubmitError("Server error. Ensure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-bg-base pt-24 pb-12 px-6 flex flex-col items-center justify-center">

      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay
            }}
            style={{
              width: blob.size,
              height: blob.size,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`absolute rounded-full blur-[100px] ${blob.color}`}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-bg-base/60 to-bg-base" />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col items-center justify-center min-h-[60vh]">

        {view === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold font-heading">
                Welcome back, <span className="text-primary">{currentUser?.name || 'User'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-muted font-light">
                What is today's agenda?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                variant="ghost"
                className="w-full sm:w-auto h-12 px-8 border border-white/10 hover:bg-white/5"
                onClick={() => alert("Older work functionality coming soon!")}
              >
                Older Work
              </Button>
              <Button
                variant="primary"
                className="w-full sm:w-auto h-12 px-8"
                magnetic
                onClick={() => setView('form')}
              >
                Create New
              </Button>
            </div>
          </motion.div>
        )}

        {view === 'form' && (
          <ConfigForm
            formData={formData}
            setFormData={setFormData}
            step={step}
            setStep={setStep}
            onSubmit={handleLaunch}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {view === 'dashboard' && (
          <LiveDashboard formData={formData} />
        )}
      </div>
    </div>
  );
};
