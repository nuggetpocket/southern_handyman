
import React from 'react';
import { Calendar, ArrowRight, Star } from 'lucide-react';

interface ContactCTAProps {
  onScheduleClick: () => void;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ onScheduleClick }) => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center shadow-2xl border-4 border-slate-800">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/40 via-transparent to-yellow-900/20 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-yellow-400 text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
              <Star className="w-3 h-3" /> Special Houston Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Ready to fix <br className="sm:hidden" /> <span className="text-yellow-400 underline decoration-red-600 decoration-4 underline-offset-8">your home?</span>
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Schedule a visit today and see why Southern Handyman is the #1 choice for professionals. No hidden fees, just honest, top-tier craftsmanship.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={onScheduleClick} className="bg-yellow-400 text-slate-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/20 border-beam">
                <Calendar className="w-5 h-5 text-red-600" />
                Schedule Online
              </button>
              <button onClick={onScheduleClick} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 group hover:bg-white/20 transition-all active:scale-95 shadow-xl">
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
