
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Trophy, Star, Rocket } from 'lucide-react';
import { FEATURES, TESTIMONIALS } from '../constants.tsx';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-8 animate-bounce">
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">Top Rated Freelancer Network</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              The Future of <span className="gradient-text">Freelance</span> is Here.
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Stop job hunting and start career building. Join the elite network where the world's best talent scales their business, automates their workflow, and lands global gigs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-2xl shadow-indigo-200 group"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features" 
                className="w-full sm:w-auto px-10 py-5 glass text-slate-900 rounded-2xl font-bold text-lg hover:bg-white/80 transition flex items-center justify-center"
              >
                See Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Professionals</h2>
            <p className="text-lg text-slate-600">Everything you need to run a high-ticket freelance business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-indigo-50" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-indigo-600 font-bold uppercase">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed text-sm">"{t.content}"</p>
                <div className="mt-6 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Rocket className="w-64 h-64" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10 uppercase tracking-tight">Ready to Flow?</h2>
            <p className="text-xl text-indigo-100 mb-10 relative z-10">Join 50,000+ elite freelancers today. Scale your craft, automate your business.</p>
            <Link 
              to="/signup" 
              className="relative z-10 px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-slate-100 transition shadow-2xl"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
