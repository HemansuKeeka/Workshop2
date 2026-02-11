
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Missing credentials');
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      navigate('/welcome');
    } catch (err: any) {
      let msg = err.message || 'Login failed';
      if (msg.includes('fetch')) {
        msg = "Database Unreachable: Ensure your Supabase project isn't paused and your internet/ad-blocker allows connection.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8 font-medium tracking-tight">Access your elite freelancer workspace.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start space-x-3 text-sm font-bold">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 transition outline-none"
                placeholder="jane@flow.com"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 transition outline-none"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-100 disabled:opacity-70 group"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New here? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Join the Elite</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;