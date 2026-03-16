
import React, { useRef, useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Lightbulb, Heart, ThumbsUp, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-24 md:py-32 bg-slate-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.03)_0%,transparent_50%)] -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" /> 5-Star Service Guaranteed
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Our trusted <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-[1.5rem] ml-2 shadow-xl shadow-blue-200 rotate-2">Clients</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">Local homeowners trust Southern Handyman for reliability across Greater Houston.</p>
        </div>

        <div className="relative group/container">
          <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-8 pb-12 px-4 -mx-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${index * 150}ms` }} className={`flex-shrink-0 w-[85vw] sm:w-[500px] snap-center group/card relative flex flex-col p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/40 hover:-translate-y-3 animate-step-in`}>
                <div className="flex justify-between items-center mb-10">
                  <span className="text-2xl font-black uppercase tracking-tighter text-blue-600">{testimonial.company}</span>
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 group-hover/card:bg-blue-50 group-hover/card:border-blue-100 transition-colors">
                    <span className="font-bold text-slate-900 text-sm">{testimonial.rating.toFixed(1)}</span>
                    <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
                  </div>
                </div>
                <blockquote className="text-slate-600 leading-relaxed mb-10 text-[17px] font-medium flex-grow italic">"{testimonial.content}"</blockquote>
                <div className="mt-auto mb-8">
                  <div className="font-black text-slate-900 text-2xl mb-1 group-hover/card:text-blue-600 transition-colors">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm font-bold tracking-widest uppercase">{testimonial.handle}</div>
                </div>
                <div className="flex items-center gap-8 pt-8 border-t border-slate-50">
                  <Lightbulb className="w-5 h-5 text-slate-300 group-hover/card:text-yellow-500" />
                  <ThumbsUp className="w-5 h-5 text-slate-300 group-hover/card:text-blue-500" />
                  <Heart className="w-5 h-5 text-slate-300 group-hover/card:text-red-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-transparent to-blue-50 rounded-br-[2.5rem] opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          <div className="w-full max-w-md h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-200" style={{ width: `${Math.max(5, scrollProgress)}%` }} />
          </div>
          <p className="text-slate-900 font-bold text-lg text-center flex items-center gap-1">
            Read more on <a href="https://www.yelp.com/biz/southern-handyman-and-assembly-katy-2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-all font-black inline-flex items-center gap-1.5">
              <span className="underline decoration-4 decoration-blue-100 underline-offset-4">Yelp</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
