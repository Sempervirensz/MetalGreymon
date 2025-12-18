'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MapPin, Fingerprint, Calendar, ShieldCheck, ArrowDown, Wine, Grape } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const ProvenanceMap = dynamic(() => import("./ProvenanceMap"), { ssr: false });

// Wine provenance steps
const wineSteps = [
  { name: "Grand Cru Vineyard", role: "Cultivation", city: "Napa", country: "USA", lat: 38.297, lon: -122.287 },
  { name: "Étoile Winery", role: "Fermentation", city: "St. Helena", country: "USA", lat: 38.505, lon: -122.469 },
  { name: "French Cooperage", role: "Oak Barrels", city: "Bordeaux", country: "France", lat: 44.837, lon: -0.579 },
  { name: "Estate Cellars", role: "Aging", city: "Napa", country: "USA", lat: 38.297, lon: -122.287 },
  { name: "Private Collection", role: "Distribution", city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
];

// Assets - Wine/winery imagery from Unsplash
const heroImage = "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80";
const makerImage = "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80";
const originImage = "https://images.unsplash.com/photo-1464638681648-e4f0e736be0e?w=1920&q=80";
const textureImage = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=80";

// --- Reusable Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col justify-center px-6 py-24 md:px-12 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

const Chip = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-rose-300 rounded-full text-xs uppercase tracking-widest bg-rose-50/50 backdrop-blur-sm text-rose-800">
    <Icon size={14} className="opacity-60" />
    <span>{label}</span>
  </div>
);

// --- Main Component ---

export default function SprinkleStarExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-rose-50 text-rose-950 font-sans selection:bg-rose-200/40">
      
      {/* Navigation / Header - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-serif text-lg tracking-widest uppercase">Domaine Étoile</div>
        <div className="text-xs tracking-widest opacity-80">Vintage: 2021</div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImage} 
            alt="Wine cellar" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-4">
              Reserve Noir
            </h1>
            <p className="text-sm md:text-base tracking-[0.2em] uppercase opacity-90">
              Grand Cru — Napa Valley, California
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={24} strokeWidth={1} />
        </motion.div>
      </div>

      {/* Manifesto / Intro */}
      <Section className="items-center text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-rose-900">
            "Great wine is born from the land, nurtured by sun and rain, and shaped by the patient hands of generations. Each bottle tells the story of its terroir."
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Chip icon={Calendar} label="Vintage: 2021" />
            <Chip icon={MapPin} label="Origin: Napa Valley" />
          </div>
        </FadeIn>
      </Section>

      {/* Interactive Provenance Map */}
      <ProvenanceMap 
        steps={wineSteps}
        title="Wine Journey" 
        primaryColor="#9f1239"
      />

      {/* Vineyard Origin */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={originImage} 
            alt="Misty vineyard landscape" 
            className="w-full h-full object-cover brightness-90"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div>
            <FadeIn className="bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-sm">
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block opacity-80">
                01. The Terroir
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Napa Valley</h2>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                The grapes are grown on sun-drenched hillsides where the marine fog rolls in each morning, cooling the vines and extending the growing season. This unique microclimate produces grapes with exceptional depth and complexity.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* The Winemaker - Full Width with Overlay */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={makerImage} 
            alt="Winemaker in vineyard" 
            className="w-full h-full object-cover grayscale contrast-[1.1] brightness-75"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div className="md:col-start-2">
            <FadeIn className="bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-sm">
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block opacity-80">
                02. The Winemaker
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Jean-Pierre Dubois</h2>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                "The vine knows what it needs. My role is to guide, not to force." 
                <br/><br/>
                With over 35 years of experience, Jean-Pierre tends each vine by hand, harvesting at the precise moment of perfection. His wines reflect the soul of the land and the wisdom of generations past.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Tasting Notes */}
      <section className="min-h-screen flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-12 md:p-24 order-2 md:order-1 bg-rose-50">
          <FadeIn>
            <span className="text-xs font-bold tracking-widest uppercase text-rose-700 mb-4 block">
              03. The Profile
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-rose-950">Tasting Notes</h2>
            <p className="text-rose-800 leading-relaxed text-lg mb-8">
              Deep ruby with violet undertones. Aromas of black cherry, cassis, and subtle hints of vanilla and oak. On the palate, velvety tannins give way to layers of dark fruit, espresso, and a long, elegant finish.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="font-serif text-xl mb-2 text-rose-950">Varietal</h4>
                <p className="text-sm text-rose-600">Cabernet Sauvignon, 92%</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2 text-rose-950">Aging</h4>
                <p className="text-sm text-rose-600">22 Months, French Oak</p>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative order-1 md:order-2">
           <img 
            src={textureImage} 
            alt="Wine being poured" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Certificate of Authenticity */}
      <Section className="bg-rose-100 text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto border border-rose-200 bg-white p-12 relative shadow-xl">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full border border-rose-200">
               <ShieldCheck size={32} className="text-rose-700" strokeWidth={1} />
             </div>
             
             <h2 className="font-serif text-3xl mb-2 mt-4 text-rose-950">Certificate of Authenticity</h2>
             <p className="text-xs uppercase tracking-widest text-rose-500 mb-8">Estate Bottled • Verified Origin</p>
             
             <div className="grid grid-cols-2 gap-y-8 gap-x-4 text-left border-t border-b border-dashed border-rose-200 py-8 mb-8">
               <div>
                 <span className="block text-xs uppercase text-rose-500 mb-1">Wine</span>
                 <span className="font-serif text-xl text-rose-950">Reserve Noir 2021</span>
               </div>
               <div>
                 <span className="block text-xs uppercase text-rose-500 mb-1">Bottle Number</span>
                 <span className="font-mono text-sm text-rose-700">427 of 1,200</span>
               </div>
               <div>
                 <span className="block text-xs uppercase text-rose-500 mb-1">Harvest Date</span>
                 <span className="font-mono text-sm text-rose-700">2021.09.28</span>
               </div>
               <div>
                 <span className="block text-xs uppercase text-rose-500 mb-1">Winemaker</span>
                 <span className="font-serif text-xl italic text-rose-950">J.P. Dubois</span>
               </div>
             </div>

             <div className="flex justify-center items-center gap-2 text-rose-500 text-xs">
               <Fingerprint size={16} />
               <span>Blockchain Verified • Immutable Record</span>
             </div>
          </div>
        </FadeIn>
      </Section>

      {/* Footer */}
      <footer className="py-24 text-center bg-rose-950 text-rose-100">
        <div className="font-serif text-2xl tracking-widest uppercase mb-4">Domaine Étoile</div>
        <p className="text-rose-400 text-xs tracking-widest">© 2024 Domaine Étoile Winery. All rights reserved.</p>
      </footer>
    </div>
  );
}



