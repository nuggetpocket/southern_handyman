
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Calendar, CheckCircle2, ShieldCheck, ArrowLeft, Loader2, MessageSquare, Signal, Shield, Cpu, Zap, Send, Smartphone, Globe, Lock } from 'lucide-react';
import { SERVICES } from '../constants';
import { HelpCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'service' | 'datetime' | 'details' | 'transmitting' | 'success';

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [leadBrief, setLeadBrief] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState("Lookin' for that 10mm socket...");

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });

  // Humorous Southern Handyman Loading Text
  useEffect(() => {
    if (step === 'transmitting') {
      const texts = [
        "Lookin' for that 10mm socket...",
        "Measurin' twice... cuttin' once... hopin' for the best.",
        "Waitin' for the humidity to drop...",
        "Fixin' to fix it...",
        "Grabbing a quick sweet tea break...",
        "Findin' where I left my tape measure...",
        "Eyeballing the level... yep, looks straight.",
        "Tightening it 'til it's 'good enough'...",
        "Finalizing your secure Southern relay...",
        "Dispatching the confirmation SMS..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 900);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isOpen) return null;

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykjozvn';

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  });

  const submitBooking = async () => {
    setStep('transmitting');
    setProgress(5);
    setError(null);

    const serviceTitle = SERVICES.find(s => s.id === selectedService)?.title || selectedService;

    try {
      // Step 1: AI Lead Synthesis (best-effort — failure does not block submission)
      let brief = `New lead for ${serviceTitle} from ${formData.name}.`;
      try {
        const ai = new GoogleGenAI({ apiKey: (import.meta as any).env?.VITE_API_KEY || '' });
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Summarize this lead into a professional 1-sentence notification.
                    Customer: ${formData.name}. Needs: ${formData.description}. Address: ${formData.address}.`,
        });
        brief = aiResponse.text?.trim() || brief;
      } catch {
        // AI unavailable — continue with default summary
      }
      setLeadBrief(brief);

      // Step 2: Formspree Transmission
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        service: serviceTitle,
        appointment: `${selectedDate} at ${selectedTime}`,
        description: formData.description,
        ai_summary: brief,
        _subject: `NEW LEAD: ${formData.name} - ${serviceTitle}`,
        _replyto: formData.phone,
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail = result?.errors?.map((e: any) => e.message).join(', ') || result?.error || `HTTP ${response.status}`;
        throw new Error(`Formspree error: ${detail}`);
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
      setStep('success');
    } catch (err: any) {
      console.error("Transmission error:", err);
      setError(err?.message || "Delivery failed. Please try again or call Sam directly at (346) 629-2497.");
      setStep('details'); 
    }
  };

  const handleNext = () => {
    if (step === 'service') setStep('datetime');
    else if (step === 'datetime') setStep('details');
    else if (step === 'details') {
      submitBooking();
    }
  };

  const handleBack = () => {
    if (step === 'datetime') setStep('service');
    else if (step === 'details') setStep('datetime');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep('service');
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({ name: '', phone: '', address: '', description: '' });
      setProgress(0);
      setLeadBrief('');
    }, 300);
  };

  const isFormValid = formData.name && formData.phone && formData.address;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={resetAndClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.4)] overflow-hidden animate-zoom-in">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            {step !== 'service' && step !== 'success' && step !== 'transmitting' && (
              <button onClick={handleBack} className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div key={step} className="animate-step-in">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                {step === 'service' && 'Select Service'}
                {step === 'datetime' && 'Date & Time'}
                {step === 'details' && 'Final Details'}
                {step === 'transmitting' && 'SECURE DISPATCH'}
                {step === 'success' && 'Lead Delivered'}
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                {step === 'transmitting' ? 'Linking to Southern Hub' : 'Direct-to-Phone Lead Delivery'}
              </p>
            </div>
          </div>
          <button onClick={resetAndClose} className="p-2 hover:bg-slate-200/50 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
          
          {step === 'service' && (
            <div key="step-service" className="grid sm:grid-cols-2 gap-4 animate-step-in">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); handleNext(); }}
                  className={`group flex items-start gap-4 p-5 rounded-3xl border-2 text-left transition-all duration-300 ${selectedService === s.id ? 'border-red-600 bg-red-50/50 shadow-lg shadow-red-100' : 'border-slate-100 hover:border-red-200 hover:bg-slate-50'}`}
                >
                  <div className={`p-3 rounded-2xl transition-colors ${selectedService === s.id ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1">{s.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">{s.description}</div>
                  </div>
                </button>
              ))}
              {/* Other option */}
              <button
                onClick={() => { setSelectedService('other'); handleNext(); }}
                className={`group flex items-start gap-4 p-5 rounded-3xl border-2 text-left transition-all duration-300 ${selectedService === 'other' ? 'border-red-600 bg-red-50/50 shadow-lg shadow-red-100' : 'border-slate-100 hover:border-red-200 hover:bg-slate-50'}`}
              >
                <div className={`p-3 rounded-2xl transition-colors ${selectedService === 'other' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Other</div>
                  <div className="text-xs text-slate-500 leading-relaxed font-medium">Something else? Describe your job in the next step.</div>
                </div>
              </button>
            </div>
          )}

          {step === 'datetime' && (
            <div key="step-datetime" className="space-y-8 animate-step-in">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Pick a Day</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto no-scrollbar">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all ${selectedDate === date ? 'border-red-600 bg-red-600 text-white shadow-xl shadow-red-200' : 'border-slate-100 hover:border-red-200 text-slate-600'}`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all ${!selectedDate ? 'opacity-40 cursor-not-allowed' : selectedTime === time ? 'border-red-600 bg-red-600 text-white shadow-xl shadow-red-200' : 'border-slate-100 hover:border-red-200 text-slate-600'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!selectedDate || !selectedTime}
                onClick={handleNext}
                className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all shadow-2xl shadow-red-100 border-beam"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'details' && (
            <div key="step-details" className="space-y-6 animate-step-in">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold animate-pulse">
                  {error}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe" 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all font-bold placeholder:text-slate-300" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1">Your Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(832) 000-0000" 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all font-bold placeholder:text-slate-300" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-1">Home Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Katy, TX" 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all font-bold placeholder:text-slate-300" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-1">Describe the Job</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3} 
                  placeholder="e.g. My ceiling fan is wobbling..." 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all font-bold placeholder:text-slate-300 resize-none"
                ></textarea>
              </div>
              
              <button
                disabled={!isFormValid}
                onClick={handleNext}
                className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-2xl shadow-red-100 disabled:opacity-50 border-beam"
              >
                Submit <Zap className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'transmitting' && (
            <div key="step-transmitting" className="py-24 flex flex-col items-center text-center animate-step-in">
              <div className="mb-10 flex flex-col items-center">
                 <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Confirming with the Hub</h4>
                 <div className="h-0.5 w-12 bg-red-600 rounded-full mb-8 animate-pulse" />
                 
                 <div className="relative flex items-center justify-center w-24 h-24">
                   <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                   <div className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin" />
                   <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-red-600" />
                   </div>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <p className="text-sm font-bold text-slate-600 italic animate-pulse">
                   "{loadingText}"
                 </p>
                 <div className="flex gap-1 justify-center">
                   {[0, 1, 2].map((i) => (
                     <div 
                      key={i} 
                      className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" 
                      style={{ animationDelay: `${i * 0.15}s` }} 
                     />
                   ))}
                 </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div key="step-success" className="py-16 text-center animate-step-in">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner border border-green-100 scale-110">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <h2 className="text-4xl font-black text-green-600 mb-6 tracking-tight leading-tight">Rest easy, neighbor, we got it from here!</h2>
              <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                We’re reviewing your details right now. A confirmation text for your appointment on <span className="text-slate-900 font-bold underline decoration-green-200">{selectedDate}</span> at <span className="text-slate-900 font-bold underline decoration-green-200">{selectedTime}</span> has been sent to <span className="text-slate-900 font-bold">{formData.phone}</span>.
              </p>
              
              <button
                onClick={resetAndClose}
                className="w-full max-w-xs mx-auto bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95"
              >
                Done
              </button>
            </div>
          )}

        </div>

        {/* Footer Summary */}
        {step !== 'success' && step !== 'transmitting' && (
          <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
              <span className={`flex items-center gap-1.5 transition-colors duration-300 ${selectedService ? 'text-red-600' : ''}`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${selectedService ? 'bg-red-600' : 'bg-slate-300'}`} /> Service
              </span>
              <span className={`flex items-center gap-1.5 transition-colors duration-300 ${selectedDate ? 'text-red-600' : ''}`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${selectedDate ? 'bg-red-600' : 'bg-slate-300'}`} /> Time
              </span>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-red-600" /> Formspree Live Relay
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduler;
