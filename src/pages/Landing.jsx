import React from 'react';
import { Hero } from '../components/sections/Hero';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Features } from '../components/sections/Features';
import { Demo } from '../components/sections/Demo';
import { Comparison } from '../components/sections/Comparison';
import { CTA } from '../components/sections/CTA';

export const Landing = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Demo />
      <Comparison />
      <CTA />
    </>
  );
};
