
import React from 'react';
import { ArrowRight, Star, ShieldCheck, CheckCircle2, Shield, Phone } from 'lucide-react';

interface HeroProps {
  onScheduleClick: () => void;
  onViewGallery: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScheduleClick, onViewGallery }) => {
  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] flex items-center pt-24 pb-12 md:pt-44 md:pb-32 overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.4] stripe-gradient" />
        <div className="absolute top-[10%] right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50 rounded-full blur-[80px] md:blur-[150px] opacity-70" />
        <div className="absolute bottom-[10%] left-[5%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-slate-50 rounded-full blur-[80px] md:blur-[150px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Expert Local Handyman
              </div>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                A+ Local Reputation
              </div>
            </div>
            
            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-5xl lg:text-[5.5rem] font-black text-slate-900 leading-[1.1] md:leading-[1] tracking-tighter mb-4 md:mb-8">
              Home Repairs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">Zero Stress.</span>
            </h1>
            
            <p className="text-slate-500 text-base md:text-lg lg:text-xl max-w-xl mb-6 md:mb-12 leading-relaxed font-medium">
              We specialize in high-end maintenance of Houston properties. No "no-shows," no hidden fees, and a <strong className="text-slate-900">100% Satisfaction Guarantee</strong>.
            </p>
            
            <div className="flex flex-col gap-3 md:gap-5 mb-10 md:mb-16">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-5">
                <button 
                  onClick={onScheduleClick} 
                  className="w-full sm:w-auto bg-red-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 md:gap-3 group hover:bg-red-700 transition-all duration-300 shadow-2xl shadow-red-200 active:scale-95 border-beam"
                >
                  Schedule Now
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onViewGallery} 
                  className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:border-blue-600 hover:text-blue-600 transition-all items-center justify-center active:scale-95"
                >
                  See Our Results
                </button>
              </div>
              
              <div className="pt-2">
                <a 
                  href="tel:8323295204" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-xs md:text-sm hover:bg-red-700 transition-all shadow-xl active:scale-95 group"
                >
                  <Phone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  Contact Us (Call Now)
                </a>
              </div>
            </div>

            <div className="flex items-center gap-8 py-6 border-t border-slate-100">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />)}
                </div>
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Verified 5-Star Reviews</div>
              </div>
              <div className="h-10 w-px bg-slate-100" />
              <div className="flex flex-col">
                <div className="text-2xl font-black text-slate-900 leading-none mb-1">90Mi</div>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Houston Radius Coverage</div>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 hidden md:block">
            <div className="relative z-10 w-full aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-slate-900 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-overlay" />
              <div className="relative p-12 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 flex flex-col items-center gap-6 text-center max-w-[80%]">
                <div className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center text-white shadow-[0_20px_40px_rgba(59,130,246,0.3)]">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <div>
                  <div className="text-white font-black text-2xl tracking-tight uppercase mb-2">The Southern Seal</div>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">Every project is personally backed by our founder's promise of integrity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
