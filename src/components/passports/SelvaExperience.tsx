'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Coffee, Sun, Leaf, ExternalLink, Sprout, Scale } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const ProvenanceMap = dynamic(() => import("./ProvenanceMap"), { ssr: false });

// Coffee provenance steps
const coffeeSteps = [
  { name: "Selva Highland Farm", role: "Cultivation", city: "Chiapas", country: "Mexico", lat: 15.768, lon: -92.636 },
  { name: "Union de la Selva", role: "Harvest & Drying", city: "San Cristóbal", country: "Mexico", lat: 16.737, lon: -92.638 },
  { name: "Oaxaca Micro-Roastery", role: "Roasting", city: "Oaxaca", country: "Mexico", lat: 17.073, lon: -96.726 },
  { name: "Fairtrade Warehouse", role: "Quality Control", city: "Mexico City", country: "Mexico", lat: 19.432, lon: -99.133 },
  { name: "Direct Trade Partner", role: "Distribution", city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
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

const FeatureCard = ({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200/50 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center text-lime-800 mb-4">
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-amber-950">{title}</h3>
    <p className="text-amber-800/70 leading-relaxed">{desc}</p>
  </div>
);

export default function SelvaExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-amber-50 text-amber-950 overflow-x-hidden">
      
      {/* Navbar Overlay */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tight">Selva.</span>
          <span className="text-[10px] uppercase tracking-widest opacity-80 font-mono">Chiapas, Mexico</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Harvest 2024
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-[95vh] flex items-end pb-24 md:pb-32 justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Coffee drying in Mexican Jungle" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-white/80 text-lg md:text-xl tracking-wide uppercase">100% Natural • Sun-Dried • Fairtrade</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter drop-shadow-lg leading-[0.9]"
          >
            Sunsera <br/> Coffee
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 text-sm"
          >
            12 oz (340 g)
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-lg mx-auto font-light leading-relaxed border-t border-white/30 pt-8"
          >
            Wild-grown in the shade of the rainforest
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"
        >
          <ArrowDown className="w-6 h-6" strokeWidth={1.5} />
        </motion.div>
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
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-200/50">
                <div className="flex items-center gap-3 mb-6 border-b border-amber-200 pb-4">
                  <Sprout className="text-orange-600 w-5 h-5" />
                  <span className="font-bold text-lg">Crop Passport</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">Varietal</span>
                    <span className="font-medium text-amber-950 text-lg">Bourbon & Typica</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">Process</span>
                    <span className="font-medium text-amber-950 text-lg">Natural (Sun-Dried)</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">Altitude</span>
                    <span className="font-medium text-amber-950 text-lg">1,400 MASL</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">Farmer Cooperative</span>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                         <img src={farmerImage} alt="Farmer" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-amber-950">Union de la Selva</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-amber-600">Roast Date</span>
                    <span className="font-mono text-xs bg-lime-100 px-2 py-1 rounded text-lime-800">DEC 18, 2025</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: The "Story of THIS Bag" */}
          <div className="md:col-span-7 md:col-start-6 space-y-20">
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-amber-950 leading-tight">
                Not a plantation. <br/>
                <span className="text-orange-600">A wild ecosystem.</span>
              </h2>
              <p className="text-xl text-amber-800/70 leading-relaxed">
                Most coffee is grown in tidy rows under the hot sun. Ours grows wild under the shade of ancient mahogany and fruit trees. 
                <strong className="text-amber-950 font-medium block mt-4">This biodiversity creates a bean that is denser, sweeter, and cleaner.</strong>
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-100">
                 <img src={beanTexture} alt="Coffee Texture" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                   <div className="text-center text-white p-8">
                     <Sun className="w-12 h-12 mx-auto mb-4 opacity-80" />
                     <p className="text-2xl font-bold">100% Sun Dried</p>
                     <p className="opacity-80 mt-2">No mechanical dryers. Just time and Mexican sunshine.</p>
                   </div>
                 </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
               <h3 className="text-2xl font-bold mb-4 text-amber-950">Tasting Profile</h3>
               <div className="bg-lime-100/50 p-6 rounded-2xl border border-lime-200">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-white/50 rounded-xl">
                      <span className="block text-2xl mb-1">🍫</span>
                      <span className="font-bold text-amber-950">Dark Chocolate</span>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <span className="block text-2xl mb-1">🍒</span>
                      <span className="font-bold text-amber-950">Wild Cherry</span>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <span className="block text-2xl mb-1">🍯</span>
                      <span className="font-bold text-amber-950">Raw Honey</span>
                    </div>
                 </div>
                 <p className="text-center text-amber-700 mt-6 text-sm">
                   "A heavy body with a syrupy mouthfeel and a long, sweet finish."
                 </p>
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MISSION & FAIRTRADE */}
      <section className="py-24 bg-amber-950 text-amber-50">
        <div className="px-6 max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="order-2 md:order-1">
                 <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block">Fairtrade Certified</span>
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Power to the Farmer.</h2>
                 <p className="text-white/70 text-lg leading-relaxed mb-8">
                   We don't just buy beans; we invest in communities. We pay 25% above Fairtrade minimums directly to the families who tend the land.
                   No middlemen. No exploitation.
                 </p>
                 <div className="flex gap-4">
                   <div className="text-center px-6 py-4 border border-white/10 rounded-xl bg-white/5">
                     <Scale className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                     <span className="text-xs text-white/50 uppercase tracking-widest">Direct Trade</span>
                   </div>
                   <div className="text-center px-6 py-4 border border-white/10 rounded-xl bg-white/5">
                     <Leaf className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                     <span className="text-xs text-white/50 uppercase tracking-widest">Organic</span>
                   </div>
                 </div>
               </div>
               <div className="order-1 md:order-2 h-96 md:h-[600px] rounded-3xl overflow-hidden relative">
                 <img src={bagImage} alt="Coffee Bag" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                 <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent" />
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER - CTA */}
      <footer className="bg-amber-50 py-24 px-6 border-t border-amber-200">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <FadeIn>
            <Coffee className="w-12 h-12 mx-auto text-orange-600 mb-6" strokeWidth={1} />
            <h2 className="text-3xl font-bold mb-4 text-amber-950">Taste the Jungle.</h2>
            <p className="text-amber-700 text-lg mb-8">
              Small batch roasted in Oaxaca City. Shipped within 48 hours of roasting.
            </p>
            <button className="rounded-full px-8 text-lg h-14 shadow-xl hover:scale-105 transition-transform bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              Order Fresh Beans
            </button>
            <p className="text-xs text-amber-600 mt-8">
              Harvest 2024 • Limited Availability
            </p>

            <div className="mt-16 pt-8 border-t border-amber-200">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-orange-600 transition-colors group"
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



