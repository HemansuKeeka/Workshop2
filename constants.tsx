
import React from 'react';
import { Zap, Globe, Shield, Star, Users, Rocket } from 'lucide-react';
import { Feature, Testimonial } from './types';

export const FEATURES: Feature[] = [
  {
    title: "Global Reach",
    description: "Connect with high-tier clients across 150+ countries and build your reputation on a global scale.",
    icon: <Globe className="w-6 h-6 text-indigo-500" />
  },
  {
    title: "Instant Payments",
    description: "No more waiting weeks. Our automated escrow system ensures you get paid the moment work is approved.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Verified Networks",
    description: "Join a curated group of top-tier talent. We verify skills so you are surrounded by only the best.",
    icon: <Shield className="w-6 h-6 text-green-500" />
  },
  {
    title: "Portfolio Mastery",
    description: "Showcase your best work with stunning interactive portfolios that capture attention instantly.",
    icon: <Star className="w-6 h-6 text-purple-500" />
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Brand Designer',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    content: 'FreeFlow changed my career. Within three months, my income doubled and I was working with my dream clients.'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Full Stack Developer',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    content: 'The community here is unmatched. I found mentors and collaborators that helped me scale my freelance business to a full agency.'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'UX Architect',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    content: 'The payment system is flawless. Never had to chase a client for an invoice since I joined. True peace of mind.'
  }
];

export const SKILL_OPTIONS = [
  "Web Development", "UI/UX Design", "Graphic Design", "Content Writing",
  "Digital Marketing", "Video Editing", "Mobile Apps", "Data Science",
  "SEO Optimization", "3D Modeling", "Branding", "Photography",
  "AI & Machine Learning", "Blockchain Dev", "Cybersecurity", "Project Management",
  "Virtual Assistant", "DevOps Engineer", "Motion Graphics", "Product Management",
  "Customer Success", "Copywriting", "Sales & Outreach", 
  "Illustration", "Game Development", "Sound Design", "Legal Consulting", 
  "Financial Planning", "Translation", "Voice Acting", "Other"
];
