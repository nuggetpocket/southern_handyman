
import React from 'react';
import { 
  Wrench, 
  Home, 
  Droplets, 
  Zap, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  Star,
  Paintbrush,
  HardHat,
  Ruler,
  Package
} from 'lucide-react';
import { Service, Testimonial, Feature, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'renovation',
    title: 'Home Renovation',
    description: 'Complete room transformations and modern upgrades tailored for Houston living.',
    icon: <HardHat className="w-6 h-6" />
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    description: 'Custom shelving, trim work, and master-level woodworking for any space.',
    icon: <Ruler className="w-6 h-6" />
  },
  {
    id: 'assembly',
    title: 'Furniture Assembly',
    description: 'Expert assembly of all major brands, from complex gym sets to office suites.',
    icon: <Package className="w-6 h-6" />
  },
  {
    id: 'electrical',
    title: 'Lighting & Electrical',
    description: 'Safe installation of smart home devices and elegant lighting fixtures.',
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'Reliable fixture installation and minor plumbing repairs for peace of mind.',
    icon: <Droplets className="w-6 h-6" />
  },
  {
    id: 'drywall',
    title: 'Drywall & Ceiling',
    description: 'Seamless patching and professional finishing for a flawless wall surface.',
    icon: <Hammer className="w-6 h-6" />
  },
  {
    id: 'painting',
    title: 'Painting & Touch-ups',
    description: 'High-quality interior painting and meticulous trim detailing.',
    icon: <Paintbrush className="w-6 h-6" />
  },
  {
    id: 'repair',
    title: 'General Maintenance',
    description: 'Fixing everything from leaky faucets to creaky doors with total precision.',
    icon: <Wrench className="w-6 h-6" />
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Nikki C.',
    handle: 'Cypress, TX',
    company: 'Lighting',
    rating: 5.0,
    content: "Needed some LED lights changed out and Sam was awesome. He charged about 1/5 of what other people estimated! He kept in constant communication with me, was very friendly, and took care of what we needed done in about 20 minutes.",
    color: '#2563eb'
  },
  {
    id: '2',
    name: 'Miles L.',
    handle: 'Houston, TX',
    company: 'Carpentry',
    rating: 5.0,
    content: "Sam fixed our french door, which has been hard to open and close for a few years now. He was done in less than an hour and we were able to save a ton vs. replacing the door. Nice, easy-going guy.",
    color: '#3b82f6'
  },
  {
    id: '3',
    name: 'J.J. B.',
    handle: 'Houston, TX',
    company: 'Maintenance',
    rating: 5.0,
    content: "It was a Small Job. Sam kept in touch with me until he could find time. It was worth wait . Did a great job",
    color: '#1d4ed8'
  },
  {
    id: '4',
    name: 'Nick R.',
    handle: 'Woodlands, TX',
    company: 'Interior',
    rating: 5.0,
    content: "I called Sam on an Monday night to put up blinds for my bedroom. Sam got to work early Tuesday morning and did the job very well and fast! Very fast and reasonably. I would hire him again.",
    color: '#60a5fa'
  },
  {
    id: '5',
    name: 'Angelique P.',
    handle: 'Conroe, TX',
    company: 'Assembly',
    rating: 5.0,
    content: "Cyrus showed up within an hour of scheduling. He moved and assembled some furniture for me. He was neat, clean and efficient. I will be calling him again for future projects. I highly recommend!!",
    color: '#2563eb'
  },
  {
    id: '6',
    name: 'Joey R.',
    handle: 'Katy, TX',
    company: 'Repairs',
    rating: 5.0,
    content: "Sam was great! Very quick response; fair price; quality work - he even stayed late to finish the job. Highly recommended!",
    color: '#3b82f6'
  }
];

export const FEATURES: Feature[] = [
  {
    id: 'trust',
    title: 'Verified Expertise',
    description: 'Every technician is fully background-checked and highly skilled in their respective trade.',
    icon: <ShieldCheck className="w-12 h-12 text-blue-600" />
  },
  {
    id: 'speed',
    title: 'Quick Turnaround',
    description: 'We respect your time. Most repairs are completed within the same day of scheduling.',
    icon: <Clock className="w-12 h-12 text-blue-600" />
  },
  {
    id: 'quality',
    title: 'Southern Quality Guarantee',
    description: 'We don\'t leave until you\'re 100% satisfied. Our reputation is our most valuable asset.',
    icon: <Star className="w-12 h-12 text-blue-600" />
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '10 Home Maintenance Tips for Houston Summers',
    excerpt: 'Beat the Texas heat with these essential home maintenance tasks designed for the Houston climate.',
    content: `The intense heat of a Houston summer is more than just a discomfort for residents; it is a significant stress test for residential infrastructure across our 90-mile service radius. The extreme temperatures combined with Gulf Coast humidity can cause materials to expand, seals to fail, and mechanical systems to work overtime. Taking a proactive approach before temperatures peak can save you thousands in emergency repairs and keep your home comfortable all season long.

Start with your HVAC system — it is the single most important piece of equipment in a Houston home during summer. Replace air filters monthly during peak cooling season, clear debris from the outdoor condenser unit, and schedule a professional tune-up before Memorial Day. A system running on a dirty filter in 100-degree heat is a system on the verge of failure. While you are at it, check that attic insulation meets the recommended R-38 rating for Houston's climate zone; poor attic insulation forces your AC to run 20–30% longer than necessary.

Next, turn your attention to the building envelope. Inspect all window and door caulking for cracks or gaps — Gulf Coast UV breaks down sealants faster than in cooler climates, and even small gaps let conditioned air escape and humid air seep in. Check weatherstripping on every exterior door and replace anything that no longer makes a firm seal. On the exterior, inspect your roof for missing or curled shingles and ensure attic vents are unobstructed; trapped heat in a poorly ventilated attic can exceed 160°F and dramatically shorten shingle lifespan.

Finally, address your plumbing and outdoor spaces. Houston's clay soil expands in wet seasons and contracts in dry heat, which stresses water lines and slab foundations. Look for wet spots in the yard that might indicate a slow leak, and insulate any exposed pipes in unconditioned spaces. For your outdoor areas, inspect deck boards and fence posts for rot or cracking caused by the previous winter's freeze-thaw cycles, and apply a UV-protective sealant before the summer sun does further damage. A few hours of preventive work now pays dividends in comfort and savings for the months ahead.`,
    category: 'Seasonal',
    date: 'June 12, 2024',
    readTime: '6 min',
    tags: ['Houston', 'Summer', 'Maintenance'],
    metaTitle: '10 Expert Houston Summer Home Maintenance Tips | Southern Handyman',
    metaDescription: 'Keep your Houston home cool and safe this summer. Our expert guide covers AC care, humidity control, and exterior maintenance for Texas heat.'
  },
  {
    id: '2',
    title: 'How to Prepare Your Katy Home for Hurricane Season',
    excerpt: 'Protect your property and family with our comprehensive hurricane preparedness checklist for Katy residents.',
    content: `Hurricane preparedness is a way of life for homeowners in Katy, Pearland, and the entire 90-mile Greater Houston area. With the Gulf of Mexico just 50 miles to the south, named storms can intensify rapidly and make landfall with little warning. The homeowners who fare best are those who complete their preparations well before a storm appears on the radar — not in the frantic 48 hours before landfall when hardware store shelves are bare and contractors are fully booked.

The roof is your first and most critical line of defense. Have a qualified professional inspect it every spring for loose or missing shingles, deteriorated flashing around chimneys and vents, and any soft spots that could fail under wind pressure. If your home was built before 2002, it may predate modern hurricane-strap requirements; retrofitting these metal connectors between your roof trusses and top plate can dramatically improve wind resistance at a relatively modest cost. While you are up there, clean your gutters and ensure all downspouts extend at least four feet from the foundation — flooding from overwhelmed gutters is one of the most common and preventable forms of storm damage.

Move outward to your windows, doors, and garage. Storm shutters or impact-resistant windows are the gold standard, but high-quality plywood panels cut to size and pre-drilled for quick installation are a proven alternative. Standard garage doors are often the weakest point in a home's shell; a horizontal brace kit can prevent them from bowing inward and compromising the structural envelope. For entry doors, ensure all hinges have three-inch screws reaching into the door frame's structural members, and consider upgrading to a deadbolt with a reinforced strike plate.

Finally, survey your yard and outdoor spaces well in advance of storm season. Trim trees so no branch larger than two inches in diameter hangs within 10 feet of the house, and remove any dead limbs entirely. Anchor or store outdoor furniture, grills, and potted plants — these become dangerous projectiles in 80-mph winds. Keep a three-day supply of water, a charged power bank, and a manual can opener in an accessible location. Having Southern Handyman's number saved in your phone means that once the storm passes, you can get a rapid damage assessment and start repairs before moisture and mold set in.`,
    category: 'Safety',
    date: 'May 28, 2024',
    readTime: '8 min',
    tags: ['Katy', 'Safety', 'Hurricane'],
    metaTitle: 'Katy TX Hurricane Preparedness Guide for Homeowners',
    metaDescription: 'Essential hurricane prep steps for Katy, TX residents. Learn how to secure your roof, gutters, and yard before the storm hits.'
  }
];
