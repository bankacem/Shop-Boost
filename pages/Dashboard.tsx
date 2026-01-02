
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, BarChart2, Zap, LogOut, DollarSign, TrendingUp, Split, Layout, Trash2 } from 'lucide-react';
import { User, PageData } from '../types';
import { storageService } from '../services/storageService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PageData[]>([]);

  useEffect(() => {
    const loadedPages = storageService.getPages();
    setPages(loadedPages);
  }, []);

  const createNewPage = () => {
    const newId = Math.random().toString(36).substring(7);
    const newPage: PageData = {
      id: newId,
      title: 'New Shopify Funnel',
      status: 'draft',
      views: 0,
      revenue: 0,
      lastModified: 'Just now',
      blocks: []
    };
    storageService.savePage(newPage);
    navigate(`/editor/${newId}`);
  };

  const deletePage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      storageService.deletePage(id);
      setPages(storageService.getPages());
    }
  };

  const totalViews = pages.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalRevenue = pages.reduce((acc, p) => acc + (p.revenue || 0), 0);
  const avgConversion = totalViews > 0 ? ((pages.reduce((acc, p) => acc + (p.revenue > 0 ? 1 : 0), 0) / pages.length) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-6 h-6 fill-current" />
            <span className="text-lg font-bold text-slate-900">ShopBoost</span>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <SidebarLink icon={<Layout className="w-5 h-5" />} label="My Pages" active />
          <SidebarLink icon={<BarChart2 className="w-5 h-5" />} label="Analytics" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-slate-500 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-grow">
        <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Store Performance</h1>
            <p className="text-sm text-slate-500">Real-time data from your ShopBoost funnels.</p>
          </div>
          <button onClick={createNewPage} className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create New Page
          </button>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<BarChart2 className="text-blue-600" />} label="Live Views" value={totalViews.toLocaleString()} trend="+Live" />
            <StatCard icon={<DollarSign className="text-emerald-600" />} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} trend="Real-time" />
            <StatCard icon={<TrendingUp className="text-indigo-600" />} label="Avg. Conversion" value={`${avgConversion}%`} trend="Target 3%" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                 <Layout className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <p className="text-slate-500 font-medium">No pages created yet. Start your first funnel!</p>
              </div>
            ) : (
              pages.map(page => (
                <div key={page.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="aspect-video bg-slate-100 relative">
                    <img src={`https://picsum.photos/800/500?random=${page.id}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Link to={`/editor/${page.id}`} className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50">Edit</Link>
                      <button onClick={() => deletePage(page.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-4">{page.title}</h3>
                    <div className="flex justify-between items-center">
                       <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Revenue</p>
                          <p className="text-sm font-bold text-emerald-600">${page.revenue.toLocaleString()}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Views</p>
                          <p className="text-sm font-bold text-slate-700">{page.views.toLocaleString()}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{trend}</span>
    </div>
    <p className="text-slate-500 text-sm mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-900">{value}</p>
  </div>
);

const SidebarLink = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold transition-all ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    {icon}
    {label}
  </button>
);

export default Dashboard;
