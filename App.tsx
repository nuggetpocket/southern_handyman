
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import AppointmentScheduler from './components/AppointmentScheduler';
import { Search, Calendar, CheckCircle2, MapPin, Sparkles, Loader2 } from 'lucide-react';

// Lazy load heavy components
const Gallery = lazy(() => import('./components/Gallery'));
const Blog = lazy(() => import('./components/Blog'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
  </div>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'blog'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSchedulerOpen) {
      document.body.classList.add('scheduler-active');
    } else {
      document.body.classList.remove('scheduler-active');
    }
  }, [isSchedulerOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const openScheduler = () => setIsSchedulerOpen(true);
  const closeScheduler = () => setIsSchedulerOpen(false);
  
  const navigateToGallery = () => {
    window.open('https://www.yelp.com/biz_photos/southern-handyman-and-assembly-katy-2', '_blank', 'noopener,noreferrer');
  };
  
  const navigateToHome = () => setCurrentPage('home');
  const navigateToBlog = () => setCurrentPage('blog');

  return (
    <div className={`min-h-screen selection:bg-blue-100 selection:text-blue-900 ${isSchedulerOpen ? 'overflow-hidden' : ''}`}>
      <Header 
        isScrolled={isScrolled} 
        onScheduleClick={openScheduler} 
        onNavigateHome={navigateToHome}
        onNavigateBlog={navigateToBlog}
      />
      
      <main className="animate-fade-in">
        <Suspense fallback={<LoadingFallback />}>
          {currentPage === 'home' ? (
            <>
              <Hero onScheduleClick={openScheduler} onViewGallery={navigateToGallery} />
              
              <ValueProposition />

              <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-20">
                    <div className="text-blue-600 font-black text-[11px] uppercase tracking-[0.3em] mb-4">Our Process</div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">The 3-Step <span className="text-blue-500 italic">Peace of Mind</span></h2>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Search className="w-8 h-8" />
                      </div>
                      <div className="absolute top-10 right-10 text-5xl font-black text-slate-100 group-hover:text-blue-50">01</div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4">Book with Ease</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">Book online in 60 seconds. You'll receive instant confirmation and a photo of your technician for added safety.</p>
                    </div>
                    
                    <div className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div className="absolute top-10 right-10 text-5xl font-black text-slate-100 group-hover:text-blue-50">02</div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4">Expert Execution</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">We arrive in a marked vehicle, on time, with all necessary tools. We work clean and respect your home.</p>
                    </div>

                    <div className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="absolute top-10 right-10 text-5xl font-black text-slate-100 group-hover:text-green-50">03</div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4">The Final Handshake</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">We walk you through the completed work. You only pay once you are 100% satisfied with the result.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-24 bg-slate-50/50">
                 <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-xl border border-slate-100 overflow-hidden relative text-center">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -mr-32 -mt-32" />
                      
                      <div className="relative z-10 flex flex-col items-center">
                         <div className="inline-flex items-center gap-2 mb-8 px-4 py-1 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest">Founder's Promise</div>
                         <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">"We don't just fix homes, <br/><span className="text-blue-600">we build relationships.</span>"</h2>
                         <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10 max-w-2xl">Hi, I'm Sam. We operate with a simple rule: if it's not good enough for my own mother's home, it's not good enough for yours.</p>
                         
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="text-center sm:text-left">
                              <div className="text-2xl font-black text-slate-900">Sam R.</div>
                              <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Owner & Operator</div>
                            </div>
                            <div className="hidden sm:block h-10 w-px bg-slate-200" />
                            <div className="flex items-center gap-2">
                               <MapPin className="w-5 h-5 text-blue-600" />
                               <span className="font-black text-slate-900 text-sm">Born & Raised in Houston, TX</span>
                            </div>
                         </div>

                         <div className="mt-12 inline-flex items-center gap-2.5 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm border border-red-100">
                            <Sparkles className="w-4 h-4" />
                            Houston's Choice for Home Repair
                         </div>
                      </div>
                    </div>
                 </div>
              </section>

              <Testimonials />
              <ContactCTA onScheduleClick={openScheduler} />
            </>
          ) : currentPage === 'gallery' ? (
            <Gallery onBackHome={navigateToHome} />
          ) : (
            <Blog onBackHome={navigateToHome} />
          )}
        </Suspense>
      </main>

      <Footer onNavigateHome={navigateToHome} />
      <AppointmentScheduler isOpen={isSchedulerOpen} onClose={closeScheduler} />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-screen stripe-gradient" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-30" />
      </div>
    </div>
  );
};

export default App;
