"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MapPin, Fingerprint, Calendar, ShieldCheck, ArrowDown, BarChart3 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ProvenanceMap = dynamic(() => import("@/components/passports/ProvenanceMap"), { ssr: false });

const ceramicsSteps = [
  { name: "Shigaraki Clay Quarry", role: "Raw Materials", city: "Shigaraki", country: "Japan", lat: 34.932, lon: 136.045 },
  { name: "Tanaka Studio", role: "Forming", city: "Kyoto", country: "Japan", lat: 35.011, lon: 135.768 },
  { name: "Noborigama Kiln", role: "Firing", city: "Shigaraki", country: "Japan", lat: 34.935, lon: 136.050 },
  { name: "Artisan Workshop", role: "Finishing", city: "Kyoto", country: "Japan", lat: 35.003, lon: 135.769 },
  { name: "Gallery", role: "Exhibition", city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
];

// Using placeholder images
const heroImage = "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80";
const makerImage = "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1920&q=80";
const textureImage = "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1920&q=80";

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
  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full text-xs uppercase tracking-widest bg-white/50 backdrop-blur-sm">
    <Icon size={14} className="opacity-60" />
    <span>{label}</span>
  </div>
);

export default function WabiSabiExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-[#FAF9F7] text-[#1a1a1a] font-sans selection:bg-amber-200">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-serif text-lg tracking-widest uppercase">Earthen</div>
        <Link href="/examples" className="text-xs tracking-widest opacity-80 hover:opacity-100">
          ← Back to Examples
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImage} 
            alt="The Vessel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-4">
              The Vessel
            </h1>
            <p className="text-sm md:text-base tracking-[0.2em] uppercase opacity-90">
              Edition 001 — Kyoto, Japan
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

      {/* Provenance Map */}
      <ProvenanceMap 
        steps={ceramicsSteps}
        title="Vessel Journey" 
        primaryColor="#a87963"
      />

      {/* Manifesto */}
      <Section className="items-center text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-gray-800">
            "We believe that objects carry the soul of their maker. This vessel was not manufactured; it was born from the earth, shaped by hands, and fired in patience."
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Chip icon={Calendar} label="Crafted: Oct 2024" />
            <Chip icon={MapPin} label="Origin: Shigaraki" />
          </div>
        </FadeIn>
      </Section>

      {/* The Maker */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={makerImage} 
            alt="Potter hands" 
            className="w-full h-full object-cover grayscale contrast-[1.1] brightness-75"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div className="md:col-start-2">
            <FadeIn className="bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-sm">
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block opacity-80">
                02. The Maker
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Master Kenjiro</h2>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                "The clay speaks. My job is simply to listen." 
                <br/><br/>
                With over 40 years of experience, Master Kenjiro shapes each piece on a kick-wheel, ensuring that the rhythm of his body is imprinted into the form of the vessel.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Material & Texture */}
      <section className="min-h-screen flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-12 md:p-24 order-2 md:order-1">
          <FadeIn>
            <span className="text-xs font-bold tracking-widest uppercase text-amber-700 mb-4 block">
              03. The Surface
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Wabi-Sabi Aesthetics</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              The glaze is a natural ash glaze, resulting from the wood ash in the kiln settling on the piece during the 3-day firing process. The "imperfections"—crackles, asymmetry, and color variations—are intentional celebrations of nature's unpredictability.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="font-serif text-xl mb-2">Firing</h4>
                <p className="text-sm text-gray-500">Anagama Wood Kiln, 1300°C</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Glaze</h4>
                <p className="text-sm text-gray-500">Natural Wood Ash</p>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative order-1 md:order-2">
          <img 
            src={textureImage} 
            alt="Glaze texture" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Certificate */}
      <Section className="bg-gray-100 text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto border border-gray-200 bg-white p-12 relative shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full border border-gray-200">
              <ShieldCheck size={32} className="text-amber-600" strokeWidth={1} />
            </div>
            
            <h2 className="font-serif text-3xl mb-2 mt-4">Certificate of Authenticity</h2>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">Digital Provenance Record</p>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 text-left border-t border-b border-dashed border-gray-200 py-8 mb-8">
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Product</span>
                <span className="font-serif text-xl">The Vessel 001</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Serial Number</span>
                <span className="font-mono text-sm">8821-CV-01-A</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Date of Firing</span>
                <span className="font-mono text-sm">2024.10.14</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-gray-500 mb-1">Verified By</span>
                <span className="font-serif text-xl italic">Kenjiro S.</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 text-gray-500 text-xs">
              <Fingerprint size={16} />
              <span>Blockchain Verified • Immutable Record</span>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Footer */}
      <footer className="py-24 text-center bg-[#1a1a1a] text-white">
        <div className="font-serif text-2xl tracking-widest uppercase mb-4">Earthen</div>
        <p className="text-white/40 text-xs tracking-widest mb-8">© 2024 Earthen Ceramics. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/analytics/wabi-sabi"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#032422] rounded-full font-bold hover:bg-[#E2ECE9] transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Link>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-[#E2ECE9] text-[#032422] rounded-full font-bold hover:bg-white transition-colors"
          >
            Create Your Own Passport
          </Link>
        </div>
      </footer>
    </div>
  );
}

