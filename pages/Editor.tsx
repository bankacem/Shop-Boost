
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Monitor, Smartphone, Layout, Save, Rocket, Plus, Trash2, 
  Settings, Zap, Sparkles, Loader2, Star, ShoppingCart, 
  User as UserIcon, Check, Clock, ShieldCheck, Wand2, Eye, MoveUp, 
  MoveDown, Globe, Split, Package, Image as ImageIcon, MousePointer2, 
  AlertCircle, Database, DollarSign
} from 'lucide-react';
import { Block, BlockType, PageData, ShopifyProduct } from '../types';
import { EDITOR_BLOCK_DEFINITIONS, MOCK_PRODUCTS } from '../constants';
import { generatePageWithAI, refineTextWithAI } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { fetchShopifyProducts } from '../services/shopifyService';

// --- Components ---

const HeroBlock = ({ content }: { content: any }) => (
  <section className="py-24 px-8 text-center bg-white">
    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight leading-tight">
      {content?.title || 'Launch Your Next Big Product'}
    </h1>
    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
      {content?.subtitle || 'High-converting Shopify landing pages built with AI.'}
    </p>
    <button className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold shadow-xl">
      {content?.buttonText || 'Shop Now'}
    </button>
  </section>
);

const Editor: React.FC<{ user: any }> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [page, setPage] = useState<PageData | null>(null);
  const [activeTab, setActiveTab] = useState<'blocks' | 'edit' | 'settings'>('blocks');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  
  // Shopify Connection States
  const [shopifyDomain, setShopifyDomain] = useState('');
  const [shopifyToken, setShopifyToken] = useState('');
  const [products, setProducts] = useState<ShopifyProduct[]>(MOCK_PRODUCTS);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const loadedPages = storageService.getPages();
    const currentPage = loadedPages.find(p => p.id === id);
    if (currentPage) {
      setPage(currentPage);
    } else {
      const newPage: PageData = {
        id: id || '',
        title: 'New Landing Funnel',
        status: 'draft',
        views: 0,
        revenue: 0,
        lastModified: 'Just now',
        blocks: []
      };
      setPage(newPage);
    }

    const config = storageService.getShopifyConfig();
    if (config) {
      setShopifyDomain(config.domain);
      setShopifyToken(config.token);
      handleConnectShopify(config.domain, config.token);
    }
  }, [id]);

  // Auto-save every 5 seconds
  useEffect(() => {
    if (!page) return;
    const timer = setTimeout(() => {
      storageService.savePage(page);
    }, 5000);
    return () => clearTimeout(timer);
  }, [page]);

  const handleConnectShopify = async (domain: string, token: string) => {
    if (!domain || !token) return;
    setIsConnecting(true);
    const fetched = await fetchShopifyProducts(domain, token);
    if (fetched) {
      setProducts(fetched);
      storageService.saveShopifyConfig(domain, token);
    }
    setIsConnecting(false);
  };

  const addBlock = (type: BlockType) => {
    if (!page) return;
    const newBlock: Block = {
      id: Math.random().toString(36).substring(7),
      type,
      content: { title: '', subtitle: '', buttonText: 'Buy Now' }
    };
    setPage({ ...page, blocks: [...page.blocks, newBlock] });
    setSelectedBlockId(newBlock.id);
    setActiveTab('edit');
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt || !page) return;
    setIsGenerating(true);
    const result = await generatePageWithAI(aiPrompt);
    if (result) {
      const blocksWithIds = result.map((b: any) => ({
        ...b,
        id: Math.random().toString(36).substring(7)
      }));
      setPage({ ...page, blocks: blocksWithIds });
    }
    setIsGenerating(false);
  };

  const handleSimulateSale = () => {
    if (!page) return;
    const amount = 49; // Mock price
    storageService.recordSale(page.id, amount);
    alert(`Success! Conversion recorded: $${amount}. Check your Dashboard!`);
  };

  if (!page) return null;

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-slate-500" /></Link>
          <div className="flex flex-col">
            <input 
              value={page.title} 
              onChange={e => setPage({...page, title: e.target.value})}
              className="text-sm font-bold text-slate-900 bg-transparent border-none p-0 focus:ring-0"
            />
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1">
               <Database className="w-3 h-3" /> Auto-saved to Local Storage
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button onClick={() => setViewMode('desktop')} className={`p-2 rounded-lg ${viewMode === 'desktop' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}><Monitor className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('mobile')} className={`p-2 rounded-lg ${viewMode === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}><Smartphone className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => { storageService.savePage(page); alert('Saved!'); }} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" /> Save Now
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2">
            <Rocket className="w-4 h-4" /> Go Live
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        <aside className="w-[320px] bg-white border-r border-slate-200 flex flex-col z-40">
          <div className="flex border-b border-slate-100">
            <button onClick={() => setActiveTab('blocks')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${activeTab === 'blocks' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Blocks</button>
            <button onClick={() => setActiveTab('edit')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${activeTab === 'edit' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Edit</button>
            <button onClick={() => setActiveTab('settings')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${activeTab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Shopify</button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {activeTab === 'blocks' && (
              <div className="space-y-6">
                <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl text-white">
                  <h3 className="text-sm font-bold flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4" /> AI Page Magic</h3>
                  <textarea 
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="Describe your landing page..."
                    className="w-full bg-white/10 border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-white/50 mb-4 resize-none"
                  />
                  <button onClick={handleAiGenerate} disabled={isGenerating} className="w-full bg-white text-indigo-600 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Layout'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {EDITOR_BLOCK_DEFINITIONS.map(def => (
                    <button key={def.type} onClick={() => addBlock(def.type)} className="flex flex-col items-center gap-2 p-4 bg-slate-50 border rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all">
                      <div className="text-slate-400">{def.icon}</div>
                      <span className="text-[10px] font-bold text-slate-600">{def.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'edit' && (
              <div className="space-y-6">
                {!selectedBlockId ? (
                   <p className="text-center text-sm font-bold text-slate-400 py-20">Click an element to edit</p>
                ) : (
                  <div className="space-y-4">
                     <p className="text-[10px] font-bold uppercase text-slate-400">Content</p>
                     <input 
                        className="w-full p-3 bg-slate-50 border rounded-xl text-sm" 
                        placeholder="Title"
                        onChange={e => {
                          const newBlocks = page.blocks.map(b => b.id === selectedBlockId ? {...b, content: {...b.content, title: e.target.value}} : b);
                          setPage({...page, blocks: newBlocks});
                        }}
                     />
                     {/* Fix: Added missing DollarSign icon from lucide-react */}
                     <button onClick={handleSimulateSale} className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4" /> Test Conversion ($49)
                     </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 border rounded-2xl space-y-4">
                   <h3 className="font-bold text-sm">Shopify Connect</h3>
                   <input 
                      value={shopifyDomain}
                      onChange={e => setShopifyDomain(e.target.value)}
                      placeholder="mystore.myshopify.com"
                      className="w-full p-2 text-xs border rounded-lg"
                   />
                   <input 
                      type="password"
                      value={shopifyToken}
                      onChange={e => setShopifyToken(e.target.value)}
                      placeholder="Storefront Access Token"
                      className="w-full p-2 text-xs border rounded-lg"
                   />
                   <button 
                      onClick={() => handleConnectShopify(shopifyDomain, shopifyToken)}
                      disabled={isConnecting}
                      className="w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                   >
                      {isConnecting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Fetch Live Products'}
                   </button>
                </div>
                {products.length > 0 && (
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Available Products</p>
                      {products.map(p => (
                         <div key={p.id} className="flex items-center gap-3 p-2 bg-white border rounded-xl">
                            <img src={p.image} className="w-8 h-8 rounded-md object-cover" />
                            <div className="min-w-0">
                               <p className="text-[10px] font-bold truncate">{p.title}</p>
                               <p className="text-[10px] text-indigo-600 font-bold">{p.price}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                )}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-grow overflow-y-auto bg-slate-100 p-12 flex justify-center items-start custom-scrollbar">
          <div className={`bg-white shadow-2xl transition-all ${viewMode === 'mobile' ? 'w-[375px] min-h-[667px]' : 'w-full max-w-5xl'}`}>
             {page.blocks.map(block => (
               <div key={block.id} onClick={() => setSelectedBlockId(block.id)} className={`relative group ${selectedBlockId === block.id ? 'ring-2 ring-indigo-500' : ''}`}>
                 {block.type === BlockType.HERO ? <HeroBlock content={block.content} /> : <div className="p-10 border-b">Block: {block.type}</div>}
               </div>
             ))}
             {page.blocks.length === 0 && <div className="p-20 text-center text-slate-300 font-bold">Canvas is Empty</div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Editor;
