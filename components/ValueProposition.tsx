
import React from 'react';
import { FEATURES } from '../constants';

const ValueProposition: React.FC = () => {
  const accentColors = [
    { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', hover: 'group-hover:bg-blue-600', accent: 'border-t-blue-500' },
    { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', hover: 'group-hover:bg-indigo-600', accent: 'border-t-indigo-600' },
    { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100', hover: 'group-hover:bg-sky-600', accent: 'border-t-sky-400' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" aria-labelledby="value-prop-heading">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Why We Are Different
            </div>
            <h2 id="value-prop-heading" className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              A standard of care <br />
              <span className="text-blue-600">you can actually trust.</span>
            </h2>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2.5rem] max-w-md border-l-8 border-blue-500 shadow-sm">
            <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed italic">
              "We've eliminated the typical frustrations of home service. No unreturned calls, no messy worksites, and absolute transparency."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {FEATURES.map((feature, idx) => {
            const style = accentColors[idx % accentColors.length];
            return (
              <article 
                key={feature.id} 
                className={`group relative bg-white rounded-[3rem] border-2 border-slate-50 border-t-8 ${style.accent} shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 card-lift overflow-hidden flex flex-col p-8 sm:p-12`}
              >
                <div className={`mb-10 inline-flex p-6 ${style.bg} ${style.text} rounded-3xl ${style.hover} group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border ${style.border}/50 shadow-sm`}>
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-10 h-10' })}
                </div>
                <div className="flex-grow flex flex-col text-left">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight transition-colors">{feature.title}</h3>
                  <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed mb-10">{feature.description}</p>
                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center gap-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${style.text.replace('text', 'bg')} animate-pulse`} />
                      Verified Southern Guarantee
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
