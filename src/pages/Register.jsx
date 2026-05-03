import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Globe, ArrowRight } from 'lucide-react';
import { auth, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { BASE_URL } from '../config';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Get the Firebase ID token
      const token = await userCredential.user.getIdToken();
      
      // Verify/Register with backend
      await axios.post(`${BASE_URL}/api/auth/verify-token`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      
      // Get the Firebase ID token
      const token = await userCredential.user.getIdToken();
      
      // Verify/Register with backend
      await axios.post(`${BASE_URL}/api/auth/verify-token`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 px-6"
      >
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading mb-2">Create Account</h2>
            <p className="text-text-muted">Start your DevOps automation journey</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              disabled={loading}
              magnetic
            >
              {loading ? "Creating Account..." : "Create Account"}
              <UserPlus className="w-4 h-4" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-2 text-text-muted">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center gap-3 w-full h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Globe className="w-5 h-5 text-primary" />
              <span>Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
