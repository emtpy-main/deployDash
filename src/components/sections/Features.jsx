import React from 'react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { FileCode2, Zap, ShieldAlert, Cloud, BrainCircuit, GitPullRequest } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Auto Dockerfile Generation',
    desc: 'Instantly generate optimized Dockerfiles by analyzing your project structure and dependencies.',
    icon: FileCode2,
  },
  {
    title: 'One-Click Deployment',
    desc: 'Push to production with a single click. We handle the complex orchestration behind the scenes.',
    icon: Zap,
  },
  {
    title: 'Self-Healing Error Fixing',
    desc: 'AI detects runtime errors and automatically rolls back or patches the issue before users notice.',
    icon: ShieldAlert,
  },
  {
    title: 'Cloud Integration',
    desc: 'Seamlessly connect with AWS, GCP, Azure, or Vercel. We adapt to your existing infrastructure.',
    icon: Cloud,
  },
  {
    title: 'Repo Analysis with AI',
    desc: 'Deep learning models scan your codebase to recommend the best deployment and scaling strategies.',
    icon: BrainCircuit,
  },
  {
    title: 'CI/CD Automation',
    desc: 'Fully automated pipelines out of the box. No more writing tedious YAML configuration files.',
    icon: GitPullRequest,
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Powerful Features</h2>
          <p className="text-text-muted max-w-2xl">
            Everything you need to automate your deployment workflow, powered by advanced AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <SpotlightCard>
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold font-heading text-text-base">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {feature.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
