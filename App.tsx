
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import LandingPage from './components/LandingPage.tsx';
import SignIn from './components/Auth/SignIn.tsx';
import SignUp from './components/Auth/SignUp.tsx';
import Welcome from './components/Welcome.tsx';
import { UserProfile } from './types.ts';
import { supabase } from './supabase.ts';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDbOffline, setIsDbOffline] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Check session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setCurrentUser({ ...profile, id: session.user.id } as UserProfile);
          }
        }
      } catch (err: any) {
        if (err.message?.includes('fetch')) {
          setIsDbOffline(true);
        }
      } finally {
        setLoading(false);
      }
    };

    initApp();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profile) setCurrentUser({ ...profile, id: session.user.id } as UserProfile);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {isDbOffline && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 sticky top-0 z-[60] flex items-center justify-center space-x-4">
            <WifiOff className="w-5 h-5 text-amber-600" />
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Supabase Offline (Project Paused or Ad-Blocker active)
            </p>
            <button onClick={() => window.location.reload()} className="p-1 hover:bg-amber-100 rounded">
              <RefreshCw className="w-4 h-4 text-amber-800" />
            </button>
          </div>
        )}
        
        <Navbar user={currentUser} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={currentUser ? <Navigate to="/welcome" /> : <SignIn />} />
            <Route path="/signup" element={currentUser ? <Navigate to="/welcome" /> : <SignUp />} />
            <Route path="/welcome" element={currentUser ? <Welcome user={currentUser} /> : <Navigate to="/signin" />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <span className="text-2xl font-bold gradient-text">FreeFlow</span>
                <p className="mt-4 text-slate-400 max-w-xs text-sm">
                  The world's premier community for elite freelancers. Build, grow, and thrive together.
                </p>
              </div>
              <div className="text-sm">
                <h4 className="font-black uppercase tracking-widest mb-4 opacity-50">Platform</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-slate-500 text-xs text-center uppercase tracking-widest">
              © 2024 FreeFlow Community. Built for the elite.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
