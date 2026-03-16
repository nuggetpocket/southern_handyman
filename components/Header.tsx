
import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ChevronDown, Phone, Mail, Clock, Calendar } from 'lucide-react';
import logoUrl from '../assets/logo.png';

interface HeaderProps {
  isScrolled: boolean;
  onScheduleClick: () => void;
  onNavigateHome: () => void;
  onNavigateBlog?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, onScheduleClick, onNavigateHome, onNavigateBlog }) => {
  const [showServices, setShowServices] = useState(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-2 md:py-5'}`}>

      {/* Top banner — logo + company name + Book Now on mobile, company name only on desktop */}
      {!isScrolled && (
        <div className="w-full bg-slate-900 px-4 md:px-8 py-2 flex items-center justify-between md:justify-center">
          {/* Mobile: logo on left */}
          <button onClick={onNavigateHome} className="md:hidden outline-none shrink-0" aria-label="Southern Handyman Home">
            <img src={logoUrl} alt="Southern Handyman & Assembly" className="h-10 w-auto" />
          </button>

          {/* Company name — centered on mobile, full-width centered on desktop */}
          <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.35em] text-white">
            Southern Handyman <span className="text-red-500 mx-1.5">·</span> Services
          </span>

          {/* Mobile: Book Now on right */}
          <button
            onClick={onScheduleClick}
            className="md:hidden bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 shrink-0"
          >
            Book Now
          </button>
        </div>
      )}

      {/* Desktop credibility bar */}
      {!isScrolled && (
        <div className="hidden lg:flex justify-between items-center px-8 pb-4 text-xs font-medium text-gray-500 border-b border-gray-100/50 mb-4">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-bold"><Phone className="w-3.5 h-3.5 text-red-600" /> (346) 629-2497</span>
            <span className="flex items-center gap-1.5 font-bold"><Mail className="w-3.5 h-3.5 text-red-600" /> help@southernhandyman.com</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-bold"><Clock className="w-3.5 h-3.5 text-red-600" /> Mon - Fri 08:00 - 20:00 / Houston & Katy</span>
          </div>
        </div>
      )}

      {/* Desktop nav */}
      <nav className="hidden md:flex max-w-7xl mx-auto px-6 items-center justify-between" aria-label="Main Navigation">
        <div className="flex items-center gap-10">
          <button
            onClick={onNavigateHome}
            className="flex items-center group outline-none"
            aria-label="Southern Handyman Home"
          >
            <img
              src={logoUrl}
              alt="Southern Handyman & Assembly"
              className="h-24 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </button>

          <ul className="flex items-center space-x-8 text-[15px] font-bold text-slate-600 uppercase tracking-widest">
            <li><button onClick={onNavigateHome} className="hover:text-red-600 transition-colors">Home</button></li>
            <li
              className="relative py-2"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-red-600 transition-colors"
                aria-haspopup="true"
                aria-expanded={showServices}
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
              </button>
              {showServices && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4">
                  {SERVICES.map((service) => (
                    <a key={service.id} href={`#${service.id}`} className="group flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="text-red-600 mt-1 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                      <div>
                        <div className="font-bold text-slate-900 mb-1">{service.title}</div>
                        <div className="text-xs text-slate-500 leading-relaxed font-medium">{service.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </li>
            <li>
              <a href="https://www.yelp.com/biz_photos/southern-handyman-and-assembly-katy-2" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                Projects
              </a>
            </li>
            <li>
              <button onClick={onNavigateBlog} className="hover:text-red-600 transition-colors">Blog</button>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <button
            onClick={onScheduleClick}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-100 active:scale-95 border-beam flex items-center gap-2"
          >
            Book Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
