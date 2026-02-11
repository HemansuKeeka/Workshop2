
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { SKILL_OPTIONS } from '../../constants';
import { supabase } from '../../supabase';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 chars';
    if (selectedSkills.length === 0) newErrors.skills = 'Select at least one role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name }
        }
      });

      if (error) throw error;

      // If they are logged in immediately (Confirm Email disabled)
      if (data.session) {
        // Sync skills to profile
        await supabase.from('profiles').update({ skills: selectedSkills }).eq('id', data.user!.id);
        navigate('/welcome');
      } else {
        setErrors({ auth: "Success! Check your email for a verification link." });
      }
    } catch (err: any) {
      let msg = err.message || 'Signup failed';
      if (msg.includes('fetch')) {
        msg = "Network Error: Supabase project is unreachable. Check your dashboard if the project is paused, or disable ad-blockers.";
      }
      setErrors({ auth: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full glass p-10 rounded-[3rem] shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600 rounded-t-[3rem]"></div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Join FreeFlow</h2>
          <Link to="/signin" className="text-indigo-600 font-bold hover:underline">Log In</Link>
        </div>

        {errors.auth && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start space-x-3 text-sm font-bold">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{errors.auth}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Jane Smith"
              />
              {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="jane@flow.com"
              />
              {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Password</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Primary Roles</label>
            <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 scrollbar-hide">
              {SKILL_OPTIONS.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                    selectedSkills.includes(skill) 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {errors.skills && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.skills}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-xl shadow-indigo-100 disabled:opacity-70 group"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Claim Account</span><ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;