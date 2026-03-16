
import React from 'react';
import { ArrowLeft, ChevronRight, Layout, Zap, TreePine, Paintbrush, Pipette as Pipe, Package, Bath, Hammer, Scissors, Smartphone, Grid, Ruler } from 'lucide-react';

interface GalleryProps {
  onBackHome: () => void;
}

const GALLERY_ITEMS = [
  {
    title: 'Luxury Vinyl Flooring',
    category: 'Interior',
    icon: <Layout className="w-12 h-12" />,
    description: 'Precision installation of wide-plank flooring with seamless transitions.'
  },
  {
    title: 'Modern Pendant Lighting',
    category: 'Electrical',
    icon: <Zap className="w-12 h-12" />,
    description: 'Custom tri-pendant installation over kitchen islands for elevated aesthetics.'
  },
  {
    title: 'Custom Cedar Pergola',
    category: 'Outdoor',
    icon: <TreePine className="w-12 h-12" />,
    description: 'High-durability outdoor living structure built for style and longevity.'
  },
  {
    title: 'Hardwood Door Restoration',
    category: 'Finishing',
    icon: <Paintbrush className="w-12 h-12" />,
    description: 'Professional sanding and refinishing of primary entryways.'
  },
  {
    title: 'Irrigation & Pipework',
    category: 'Plumbing',
    icon: <Pipe className="w-12 h-12" />,
    description: 'Expert insulation and valve maintenance for critical home systems.'
  },
  {
    title: 'Professional Shed Assembly',
    category: 'Construction',
    icon: <Package className="w-12 h-12" />,
    description: 'Leveling and assembly of multi-door storage structures.'
  },
  {
    title: 'Full Shower Refresh',
    category: 'Bath',
    icon: <Bath className="w-12 h-12" />,
    description: 'Fixture updates and sliding glass door precision installation.'
  },
  {
    title: 'Built-in Shelving Units',
    category: 'Carpentry',
    icon: <Hammer className="w-12 h-12" />,
    description: 'Custom millwork integrated directly into existing wall structures.'
  },
  {
    title: 'Custom Window Trim',
    category: 'Finishing',
    icon: <Scissors className="w-12 h-12" />,
    description: 'Modern window casing and high-efficiency glass installation.'
  },
  {
    title: 'Smart Home Hub Install',
    category: 'Tech',
    icon: <Smartphone className="w-12 h-12" />,
    description: 'Professional mounting and concealed wiring for smart systems.'
  },
  {
    title: 'Kitchen Backsplash',
    category: 'Tiling',
    icon: <Grid className="w-12 h-12" />,
    description: 'Geometric tile installation with high-durability epoxy grout.'
  },
  {
    title: 'Patio Leveling',
    category: 'Outdoor',
    icon: <Ruler className="w-12 h-12" />,
    description: 'Correction of settled concrete patios for proper drainage.'
  }
];

const Gallery: React.FC<GalleryProps> = ({ onBackHome }) => {
  return (
    <div className="pt-40 pb-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <button 
              onClick={onBackHome}
              className="group flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Our Work Speaks <br />
              <span className="text-slate-400">for itself.</span>
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Portfolio Overview</div>
            <div className="text-2xl font-black text-slate-900">12 Recent Projects</div>
          </div>
        </div>

        {/* 4x3 Grid Layout - Icon Based */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden card-lift shadow-sm hover:shadow-xl transition-all duration-500 p-8 flex flex-col"
            >
              <div className="mb-6 w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              
              <div className="relative">
                <div className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-md mb-3">
                  {item.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <div className="mt-2 flex items-center gap-1 text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Project Details <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 p-12 md:p-16 bg-slate-50 rounded-[3rem] border border-slate-100 text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Inspired by our craftsmanship?</h3>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto font-medium">
            Join thousands of happy homeowners. Let's start your next home improvement project today.
          </p>
          <button 
            onClick={onBackHome}
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 border-beam"
          >
            Get a Quote <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
