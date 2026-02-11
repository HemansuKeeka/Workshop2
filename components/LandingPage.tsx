
import React from 'react';
import { Link } from 'react-router-dom';
// Added missing Star and Rocket icons from lucide-react
import { ArrowRight, CheckCircle, Users, Trophy, Zap, MousePointer2, Star, Rocket } from 'lucide-react';
import { FEATURES, TESTIMONIALS } from '../constants';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-8 animate-bounce">
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-600 font-semibold text-sm">Voted #1 Community for Freelancers 2024</span>
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
            
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 grayscale opacity-50">
              <span className="text-2xl font-bold">Microsoft</span>
              <span className="text-2xl font-bold">Apple</span>
              <span className="text-2xl font-bold">Google</span>
              <span className="text-2xl font-bold">Meta</span>
              <span className="text-2xl font-bold">Netflix</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">50K+</div>
              <div className="text-indigo-100">Freelancers</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">$120M+</div>
              <div className="text-indigo-100">Payouts Sent</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">150+</div>
              <div className="text-indigo-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">98%</div>
              <div className="text-indigo-100">Success Rate</div>
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

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/workspace/800/600" 
                alt="Workspace" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -top-6 -left-6 w-full h-full bg-indigo-600 rounded-3xl -z-0 opacity-10"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Escape the Gig Economy Rat Race</h2>
            <div className="space-y-6">
              {[
                "Work with high-ticket clients who value your craft",
                "Automated proposal generation and contract management",
                "Zero commission on your first $10,000 earned",
                "Dedicated success manager for top tier members"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="mt-1 bg-indigo-100 p-1 rounded-full text-indigo-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-lg text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
            <Link 
              to="/signup" 
              className="mt-10 inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Loved by 50,000+ Pros</h2>
            <p className="text-lg text-slate-600">Join a community that actually wants you to win.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-center space-x-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-indigo-600">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{t.content}"</p>
                <div className="mt-6 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Everything you need to reach the next level.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Basic */}
            <div className="p-8 rounded-3xl bg-slate-800 border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Free Forever</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-slate-400 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> <span>Basic Portfolio</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> <span>Community Discord</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> <span>Public Job Board</span></li>
              </ul>
              <Link to="/signup" className="block w-full text-center py-4 rounded-xl border border-slate-600 font-bold hover:bg-slate-700 transition">Get Started</Link>
            </div>
            
            {/* Pro */}
            <div className="p-10 rounded-3xl bg-indigo-600 border-4 border-indigo-400 relative scale-105 shadow-2xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-indigo-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro Access</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-indigo-100 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-white" /> <span>Elite Verified Badge</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-white" /> <span>Auto-matching Engine</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-white" /> <span>Premium Templates</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-white" /> <span>No Transaction Fees</span></li>
              </ul>
              <Link to="/signup" className="block w-full text-center py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg">Upgrade Now</Link>
            </div>
            
            {/* Enterprise */}
            <div className="p-8 rounded-3xl bg-slate-800 border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Agency</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-slate-400 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> <span>Multi-user Dashboard</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> <span>Team Management</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> <span>API Access</span></li>
              </ul>
              <Link to="/signup" className="block w-full text-center py-4 rounded-xl border border-slate-600 font-bold hover:bg-slate-700 transition">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-indigo-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-indigo-100">
            <div className="absolute top-0 right-0 p-8 text-indigo-100">
              <Rocket className="w-32 h-32" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 relative z-10">Ready to level up your freelance game?</h2>
            <p className="text-xl text-slate-600 mb-10 relative z-10">Join 50,000+ elite freelancers today. Your future self will thank you.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
              <Link 
                to="/signup" 
                className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition shadow-2xl shadow-indigo-200"
              >
                Claim Your Spot
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">No credit card required for basic access.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
