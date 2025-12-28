'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Coffee, Sun, Leaf, ExternalLink, Sprout, Scale, BarChart3 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const ProvenanceMap = dynamic(() => import("./ProvenanceMap"), { ssr: false });

// Coffee provenance steps
const coffeeSteps = [
  { name: "Tecuitata (San Blas)", role: "Origin / Growing Region", city: "Nayarit", country: "Mexico", lat: 21.4333, lon: -105.1330 },
  { name: "San Blas", role: "Primary Processing (Municipality)", city: "Nayarit", country: "Mexico", lat: 21.5412514, lon: -105.2842991 },
  { name: "Tepic", role: "Regional Consolidation", city: "Nayarit", country: "Mexico", lat: 21.50833, lon: -104.89306 },
  { name: "Capulin International", role: "Distribution / Orders", city: "Tucson", country: "USA", lat: 32.220673, lon: -110.944528 },
];

// Assets
const heroImage = "/images/selva/heropagecoffee.png";
const farmerImage = "/images/selva/coffee_farmer_hand_sorting_beans.png";
const beanTexture = "/images/selva/texture_of_roasted_coffee_beans.png";
const bagImage = "/images/selva/paper_coffee_bag_in_nature.png";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function CaplinCoffeeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FDFBF7] text-neutral-900 overflow-x-hidden">
      
      {/* Navbar Overlay - simplified for gallery feel */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white lg:mix-blend-normal lg:text-neutral-900">
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tight">Caplin.</span>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">NAYARIT, MEXICO</span>
        </div>
        <div className="hidden lg:flex flex-col">
           {/* Desktop Nav Placeholder if needed, or keeping it clean */}
        </div>
      </nav>

      {/* HERO SECTION - PHOTO GALLERY LAYOUT */}
      <header className="relative min-h-[100dvh] flex flex-col lg:grid lg:grid-cols-2 bg-[#FDFBF7]">
        
        {/* RIGHT COLUMN (Image Stage) - Appears FIRST on mobile (order-1), Right on desktop */}
        <div className="order-1 lg:order-2 w-full h-[65vh] lg:h-screen relative flex items-center justify-center p-6 lg:p-12 lg:sticky lg:top-0 bg-[#EBEBE6] lg:bg-transparent overflow-hidden">
           
           {/* Subtle Background for Image Side */}
           <div className="absolute inset-0 z-0 bg-neutral-100/50 hidden lg:block"></div>

           {/* The Product Frame - Gallery Style */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative z-10 w-full h-full max-h-[90vh] flex items-center justify-start lg:justify-center lg:translate-x-[-8%]"
           >
              <div className="relative w-full h-full max-w-[85%] lg:max-w-full rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 bg-white">
                 <img 
                   src={heroImage} 
                   alt="Caplin Coffee Bag in Jungle" 
                   className="w-full h-full object-cover"
                 />
                 {/* Subtle inner shadow for depth */}
                 <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none rounded-[2rem]" />
              </div>
           </motion.div>
        </div>

        {/* LEFT COLUMN (Passport Panel) - Appears SECOND on mobile (order-2), Left on desktop */}
        <div className="order-2 lg:order-1 w-full flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-20 bg-[#FDFBF7] text-neutral-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
          >
             {/* Brand Header */}
            <div className="flex flex-col gap-1 mb-8 lg:mb-12">
               <span className="font-bold text-2xl tracking-tight text-neutral-900">
                 Caplin.
               </span>
               <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                 NAYARIT, MEXICO
               </span>
            </div>

            <h1 className="font-bold text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter text-neutral-900 leading-[0.9] mb-8 lg:mb-10 -ml-1">
              Caplin <br/> Coffee.
            </h1>

            <div className="mb-12 lg:mb-16">
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-800 italic">
                "Re-Presenting the Magic of a 'Natural', Highly Stimulating Low Acid Coffee!"
              </p>
            </div>

            {/* Clean Specs Grid */}
            <div className="w-full mb-12 lg:mb-16">
               <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div className="flex flex-col gap-1">
                     <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">REGION</span>
                     <span className="font-medium text-neutral-900">Nayarit, Mexico</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">NET WEIGHT</span>
                     <span className="font-medium text-neutral-900">340g / 12oz</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">PROCESS</span>
                     <span className="font-medium text-neutral-900">Natural • Traditionally Sun Dried (CAPULIN)</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">VARIETAL</span>
                     <span className="font-medium text-neutral-900">Arabica Typica</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

      </header>

      {/* Interactive Provenance Map */}
      <ProvenanceMap 
        steps={coffeeSteps}
        title="Bean Journey" 
        primaryColor="#ea580c"
      />

      {/* PASSPORT DATA: "THE BEANS" */}
      <section className="py-24 px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: The "Passport" */}
          <div className="md:col-span-4 sticky top-24">
            <FadeIn>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200/50">
                <div className="flex items-center gap-3 mb-6 border-b border-neutral-200 pb-4">
                  <Sprout className="text-orange-600 w-5 h-5" />
                  <span className="font-bold text-lg">Crop Passport</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-1">Varietal</span>
                    <span className="font-medium text-neutral-900 text-lg">Bourbon & Typica</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-1">Process</span>
                    <span className="font-medium text-neutral-900 text-lg">Natural (Sun-Dried)</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-1">Altitude</span>
                    <span className="font-medium text-neutral-900 text-lg">1,400 MASL</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-1">Farmer Cooperative</span>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                         <img src={farmerImage} alt="Farmer" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-neutral-900">Union de la Selva</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">Roast Date</span>
                    <span className="font-mono text-xs bg-amber-50 px-2 py-1 rounded text-amber-800">DEC 18, 2025</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: The "Story of THIS Bag" */}
          <div className="md:col-span-7 md:col-start-6 space-y-20">
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-900 leading-tight">
                01. ORIGIN / GROWING REGION
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Shaded jungle canopy • traditional sun drying on tables
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-100">
                 <img src={beanTexture} alt="Coffee Texture" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                   <div className="text-center text-white p-8">
                     <Sun className="w-12 h-12 mx-auto mb-4 opacity-80" />
                     <p className="text-2xl font-bold">100% Sun Dried</p>
                     <p className="opacity-80 mt-2">No water processing. Careful turning, covering at night, and re-spreading each morning. ~Two weeks of constant care.</p>
                   </div>
                 </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
               <h3 className="text-2xl font-bold mb-4">Tasting Profile</h3>
               <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-white/50 rounded-xl">
                      <span className="block text-2xl mb-1">🍫</span>
                      <span className="font-bold text-neutral-900">Dark Chocolate</span>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <span className="block text-2xl mb-1">🍒</span>
                      <span className="font-bold text-neutral-900">Wild Cherry</span>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <span className="block text-2xl mb-1">🍯</span>
                      <span className="font-bold text-neutral-900">Raw Honey</span>
                    </div>
                 </div>
                 <p className="text-center text-neutral-600 mt-6 text-sm">
                   "A heavy body with a syrupy mouthfeel and a long, sweet finish."
                 </p>
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* POWER TO THE COMMUNITY */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="px-6 max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="order-2 md:order-1">
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">POWER TO THE COMMUNITY</h2>
                 <p className="text-white/70 text-lg leading-relaxed mb-8">
                   CAPULIN is built to keep labor and income in coffee villages through hand processing and traditional drying—supporting forests, streams, and wildlife while reducing the harms linked to water-processed coffee.
                 </p>
                 <div className="flex flex-wrap gap-4">
                   <div className="text-center px-6 py-4 border border-white/10 rounded-xl bg-white/5">
                     <Sun className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                     <span className="text-xs text-white/50 uppercase tracking-widest">Traditionally Sun Dried</span>
                   </div>
                   <div className="text-center px-6 py-4 border border-white/10 rounded-xl bg-white/5">
                     <Leaf className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                     <span className="text-xs text-white/50 uppercase tracking-widest">Hand Crafted</span>
                   </div>
                   <div className="text-center px-6 py-4 border border-white/10 rounded-xl bg-white/5">
                     <Sprout className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                     <span className="text-xs text-white/50 uppercase tracking-widest">Jungle Shade Grown</span>
                   </div>
                 </div>
               </div>
               <div className="order-1 md:order-2 h-96 md:h-[600px] rounded-3xl overflow-hidden relative">
                 <img src={bagImage} alt="Coffee Bag" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200">
        <div className="px-6 max-w-2xl mx-auto text-center">
          <FadeIn>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">CAPULIN INTERNATIONAL (USA)</h3>
            <p className="text-3xl font-bold text-orange-600 mb-2">$18.95 per pound</p>
            <p className="text-neutral-600">shipped within the continental USA (includes taxes and handling).</p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER - CTA */}
      <footer className="bg-[#FDFBF7] py-24 px-6 border-t border-neutral-200">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <FadeIn>
            <Coffee className="w-12 h-12 mx-auto text-orange-600 mb-6" strokeWidth={1} />
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">Taste the Jungle.</h2>
            <button className="rounded-full px-8 text-lg h-14 shadow-xl hover:scale-105 transition-transform bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              Order Fresh Beans
            </button>
            <p className="text-xs text-neutral-500 mt-8">
              Harvest 2024 • Limited Availability
            </p>

            <div className="mt-16 pt-8 border-t border-neutral-200/40 flex flex-col items-center gap-4">
              <Link 
                href="/analytics/caplin-coffee"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors group font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </Link>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-orange-600 transition-colors group"
              >
                Visit Cooperative Website
                <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
      </footer>

    </div>
  );
}
