
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateHome }) => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <button 
              onClick={onNavigateHome} 
              className="flex items-center gap-2.5 mb-8 group outline-none"
              aria-label="Southern Handyman - Go to home"
            >
              <div className="bg-red-600 p-2 rounded-lg">
                <div className="w-5 h-5 border-2 border-white rounded-sm" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                Southern Handyman
              </span>
            </button>
            <p className="text-slate-500 text-lg max-w-sm mb-8">
              Setting the standard for home maintenance across a 90-mile radius of Houston. Reliable, professional, and built on a foundation of trust.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all" aria-label="Visit our Facebook page">
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all" aria-label="Visit our Instagram profile">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all" aria-label="Follow us on Twitter">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <nav aria-label="Quick links">
              <h4 className="font-bold text-slate-900 mb-6">Service Area</h4>
              <ul className="space-y-4 text-slate-500 font-medium text-sm">
                <li>Houston & Katy</li>
                <li>The Woodlands & Conroe</li>
                <li>Sugar Land & Pearland</li>
                <li>Cypress & Spring</li>
                <li>Galveston & League City</li>
              </ul>
            </nav>
          </div>

          <div>
            <nav aria-label="Service categories">
              <h4 className="font-bold text-slate-900 mb-6">Services</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-red-600 transition-colors">Plumbing Services</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Electrical Repairs</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Drywall Finishing</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Interior Painting</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100 gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            Serving a 90-Mile Radius of Houston, TX
          </div>
          <div className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} Southern Handyman. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
