
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, BarChart2, Rocket, ArrowRight, Layout } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">ShopBoost <span className="text-indigo-600">Pages</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#templates" className="text-sm font-medium hover:text-indigo-600 transition-colors">Templates</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold hover:text-indigo-600 transition-colors">Log In</Link>
          <Link to="/login" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-24 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full">No-Code Page Builder for Shopify</span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
          Create Shopify Landing Pages <br className="hidden md:block" /> That Actually <span className="text-indigo-600">Convert.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Stop losing traffic to generic product pages. Build high-speed, custom landing pages optimized for CRO in minutes, not days. Powered by Gemini AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2">
            Start Building Free <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all">
            Watch 2min Demo
          </a>
        </div>
        
        {/* Editor Preview */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl p-2 md:p-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="rounded-xl overflow-hidden border border-slate-100 aspect-video">
            <img src="https://picsum.photos/1200/800?random=10" alt="App Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Everything You Need To Scale</h2>
            <p className="text-slate-600">Designed specifically for the modern e-commerce stack.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-indigo-600" />}
              title="Lightning Fast"
              description="Pages optimized for core web vitals and mobile speed. Never lose a lead to slow load times again."
            />
            {/* Added missing Layout icon from lucide-react */}
            <FeatureCard 
              icon={<Layout className="w-6 h-6 text-indigo-600" />}
              title="AI Page Generator"
              description="Just describe your goal and Gemini AI generates the perfect structure, copy, and layout for your brand."
            />
            <FeatureCard 
              icon={<Rocket className="w-6 h-6 text-indigo-600" />}
              title="One-Click Shopify Sync"
              description="Connect your store in seconds. Pull products, inventory, and dynamic pricing directly into your pages."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-indigo-600" />}
              title="Conversion Blocks"
              description="Ready-to-use blocks for trust badges, countdown timers, up-sells, and cross-sells out of the box."
            />
            <FeatureCard 
              icon={<BarChart2 className="w-6 h-6 text-indigo-600" />}
              title="Built-in Analytics"
              description="Track views, clicks, and conversions in real-time. Optimize your funnel with data-driven insights."
            />
            <FeatureCard 
              icon={<CheckCircle className="w-6 h-6 text-indigo-600" />}
              title="A/B Testing"
              description="Coming Soon: Test different headlines and CTA buttons to maximize your ROI automatically."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-600">Start for free and scale as you grow.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard 
            tier="Free"
            price="0"
            features={["1 Published Page", "Basic Templates", "ShopBoost Subdomain", "Community Support"]}
            buttonText="Get Started"
          />
          <PricingCard 
            tier="Starter"
            price="29"
            highlighted
            features={["10 Published Pages", "All 20+ Templates", "Custom Domain", "AI Assistant (5 runs/mo)", "Email Support"]}
            buttonText="Start 14-Day Free Trial"
          />
          <PricingCard 
            tier="Pro"
            price="79"
            features={["Unlimited Pages", "Advanced Analytics", "AI Assistant (Unlimited)", "A/B Testing Beta", "Priority Support"]}
            buttonText="Upgrade to Pro"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-6 h-6 fill-current" />
            <span className="text-xl font-bold tracking-tight">ShopBoost Pages</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a>
          </div>
          <div className="text-sm text-slate-400">
            &copy; 2024 ShopBoost Inc. Built for Shopify.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all group">
    <div className="mb-4 p-3 bg-indigo-50 rounded-xl w-fit group-hover:bg-indigo-100 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({ tier, price, features, buttonText, highlighted = false }: { tier: string, price: string, features: string[], buttonText: string, highlighted?: boolean }) => (
  <div className={`p-8 rounded-3xl border ${highlighted ? 'border-indigo-600 ring-4 ring-indigo-50 relative' : 'border-slate-200'} bg-white flex flex-col`}>
    {highlighted && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Most Popular</span>}
    <h3 className="text-lg font-bold text-slate-500 mb-2">{tier}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-extrabold">${price}</span>
      <span className="text-slate-400 font-medium">/mo</span>
    </div>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <Link 
      to="/login"
      className={`w-full py-3.5 rounded-xl font-bold text-center transition-all ${highlighted ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
    >
      {buttonText}
    </Link>
  </div>
);

export default LandingPage;
