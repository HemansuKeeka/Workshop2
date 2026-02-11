
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Users, FolderOpen, Plus, 
  MoreHorizontal, Smartphone, Laptop, Chrome, Watch, X, Check,
  Briefcase, Sparkles, Loader2, Rocket, Cloud
} from 'lucide-react';
import { UserProfile } from '../types.ts';
import { SKILL_OPTIONS } from '../constants.tsx';
import { supabase } from '../supabase.ts';

interface WelcomeProps {
  user: UserProfile;
}

interface PortfolioItem {
  id: string;
  name: string;
  client: string;
  tags: string[];
  created_at: string;
  platform: string;
}

const Welcome: React.FC<WelcomeProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(user.is_subscribed);
  const [loadingItems, setLoadingItems] = useState(true);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);

  const [newPortfolio, setNewPortfolio] = useState({
    projectName: '',
    clientName: '',
    selectedTags: [] as string[],
    platform: 'Other'
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setLoadingItems(true);
    try {
      const { data } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPortfolios(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolio.projectName || !newPortfolio.clientName) return;

    try {
      const { data } = await supabase
        .from('portfolios')
        .insert([{
          user_id: user.id,
          name: newPortfolio.projectName,
          client: newPortfolio.clientName,
          tags: newPortfolio.selectedTags.length > 0 ? newPortfolio.selectedTags : ['Elite Member'],
          platform: newPortfolio.platform
        }])
        .select();

      if (data) {
        setPortfolios([data[0], ...portfolios]);
        setNewPortfolio({ projectName: '', clientName: '', selectedTags: [], platform: 'Other' });
        setIsModalOpen(false);
      }
    } catch (e) {
      alert("Failed to save project.");
    }
  };

  const handleSubscribe = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      await supabase.from('profiles').update({ is_subscribed: true }).eq('id', user.id);
      setIsSubscribed(true);
      setIsProcessing(false);
      setTimeout(() => setIsUpgradeModalOpen(false), 2000);
    }, 2000);
  };

  const platformIcons: Record<string, React.ReactNode> = {
    'Mobile': <Smartphone className="w-5 h-5 text-indigo-600"/>,
    'Web': <Chrome className="w-5 h-5 text-blue-500"/>,
    'Desktop': <Laptop className="w-5 h-5 text-slate-900"/>,
    'Other': <Briefcase className="w-5 h-5 text-slate-400"/>
  };

  return (
    <div className="min-h-screen pt-20 bg-[#F4F6FB] flex">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r border-slate-100 hidden md:flex flex-col items-center py-8 space-y-8">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><LayoutGrid className="w-6 h-6"/></div>
        <div className="p-3 text-slate-400 hover:text-indigo-600 cursor-pointer transition"><Users className="w-6 h-6"/></div>
        <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 cursor-pointer"><FolderOpen className="w-6 h-6"/></div>
        <div className="mt-auto flex flex-col items-center space-y-6">
          <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-xl border-2 border-indigo-100" alt="Profile" />
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-[#7B61FF] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4 bg-white/20 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-widest">
                <Cloud className="w-3 h-3" />
                <span>Cloud Synced Workspace</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome back, {user.name}!</h2>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{portfolios.length} Active Projects</span>
                </div>
                {isSubscribed && (
                  <div className="bg-yellow-400 text-indigo-900 px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center space-x-2">
                    <Sparkles className="w-3 h-3" />
                    <span>PRO MEMBER</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 relative z-10">
              {!isSubscribed && (
                <button 
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="bg-white text-[#7B61FF] px-6 py-3 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-100 transition flex items-center space-x-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Buy Premium Package</span>
                </button>
              )}
            </div>
            <div className="absolute top-4 right-4 md:right-32 opacity-20 pointer-events-none">
              <Watch className="w-48 h-48 rotate-12" />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Project Grid</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center space-x-2 hover:bg-indigo-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto min-h-[300px]">
              {loadingItems ? (
                <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Name / Client</th>
                      <th className="px-8 py-4">Platform</th>
                      <th className="px-8 py-4">Created At</th>
                      <th className="px-8 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {portfolios.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition group">
                        <td className="px-8 py-6">
                          <h4 className="font-bold text-slate-900">{p.name}</h4>
                          <p className="text-[10px] uppercase font-black text-indigo-400 tracking-wider">{p.client}</p>
                        </td>
                        <td className="px-8 py-6">{platformIcons[p.platform] || platformIcons['Other']}</td>
                        <td className="px-8 py-6 text-xs text-slate-500 font-bold">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-6">
                          <MoreHorizontal className="w-5 h-5 text-slate-300 cursor-pointer hover:text-indigo-600" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* CREATE NEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl relative overflow-hidden">
            <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold uppercase tracking-tight">New Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleCreateProject} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">Project Name</label>
                  <input type="text" required value={newPortfolio.projectName} onChange={(e) => setNewPortfolio({...newPortfolio, projectName: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">Client</label>
                  <input type="text" required value={newPortfolio.clientName} onChange={(e) => setNewPortfolio({...newPortfolio, clientName: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2">Platform</label>
                <div className="flex space-x-2">
                  {['Mobile', 'Web', 'Desktop', 'Other'].map(p => (
                    <button key={p} type="button" onClick={() => setNewPortfolio({...newPortfolio, platform: p})} className={`flex-1 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest ${newPortfolio.platform === p ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-100'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black">Discard</button>
                <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition">Publish Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPGRADE MODAL */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-indigo-950/80 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden border-4 border-yellow-400">
            {isSubscribed ? (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-bounce"><Check className="w-10 h-10" /></div>
                <h3 className="text-3xl font-black">Elite Member</h3>
                <p className="text-slate-600">Your account is now fully upgraded. Go forth and conquer.</p>
              </div>
            ) : (
              <div className="p-10 space-y-8">
                <div className="text-center">
                  <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">Pro Package</span>
                  <h3 className="text-4xl font-black">Unlimited Access</h3>
                  <div className="text-5xl font-black text-indigo-600 mt-2">$100 <span className="text-sm text-slate-400">/mo</span></div>
                </div>
                <ul className="space-y-4 text-slate-600 font-bold text-sm">
                  <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-green-500" /> <span>Unlimited portfolio projects</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-green-500" /> <span>Verified Golden Badge</span></li>
                </ul>
                <button onClick={handleSubscribe} disabled={isProcessing} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition flex items-center justify-center">
                  {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Subscribe Now'}
                </button>
                <button onClick={() => setIsUpgradeModalOpen(false)} className="w-full text-slate-400 font-bold text-sm">Maybe later</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
