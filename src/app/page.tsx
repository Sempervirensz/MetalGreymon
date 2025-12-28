"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { PhoneCarousel } from "@/components/landing/PhoneCarousel";
import Link from "next/link";

const demoPassports = [
  { id: 'wabi-sabi', name: 'Artisan Ceramics', emoji: '🏺', subtitle: 'The Vessel — Kyoto' },
  { id: 'sprinkle-star', name: 'Fine Wine', emoji: '🍷', subtitle: 'Reserve Noir — Napa' },
  { id: 'laguardia', name: 'Specialty Coffee', emoji: '☕', subtitle: 'Jungle Grown — Chiapas' },
  { id: 'caplin-coffee', name: 'Caplin Coffee', emoji: '☕', subtitle: 'Nayarit, Mexico' },
];

const brandImages = [
  "/images/Brandparteners/Covemesa.jpg",
  "/images/Brandparteners/Llama.jpg",
  "/images/Brandparteners/nike.jpg",
  "/images/Brandparteners/PAGE SPRINGS.jpg",
  "/images/Brandparteners/Slideridge.png",
];

const FilmStrip = () => {
  return (
    <div className="flex gap-6 overflow-hidden py-8">
      <motion.div 
        className="flex gap-8 min-w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...brandImages, ...brandImages].map((img, i) => (
          <div key={i} className="w-40 h-24 rounded-xl bg-white/5 border border-[#E2ECE9]/10 p-4 flex items-center justify-center">
            <img 
              src={img} 
              alt={`Brand partner ${i + 1}`}
              className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(demoPassports[0]);

  return (
    <div className="bg-[#101010] min-h-screen text-[#FCFCFC] font-sans selection:bg-[#032422] selection:text-[#E2ECE9] overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="py-12 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight">WorldPulse</div>
          <nav className="hidden md:flex gap-8 text-[#FCFCFC]/60 text-sm">
            <Link href="/examples" className="hover:text-[#E2ECE9]">Examples</Link>
            <Link href="/pricing" className="hover:text-[#E2ECE9]">Pricing</Link>
            <a href="#about" className="hover:text-[#E2ECE9]">About</a>
          </nav>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowDemo(true)}
              className="text-sm font-bold border-b border-[#E2ECE9] pb-1 hover:opacity-70"
            >
              See a live passport
            </button>
            <Link href="/signup" className="text-sm font-bold bg-[#E2ECE9] text-[#032422] px-4 py-2 rounded-full hover:bg-white transition-colors">
              Get started
            </Link>
          </div>
        </header>

        <section className="py-24 text-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight max-w-4xl mx-auto"
          >
            Unveil the <span className="text-[#E2ECE9]">care</span>, <span className="text-[#E2ECE9]">craft</span>, and <span className="text-[#E2ECE9]">connections</span> behind every product.
          </motion.h1>
          
          <p className="text-lg md:text-xl font-light text-[#FCFCFC]/80 max-w-2xl mx-auto leading-relaxed mb-12">
            Scans prove authenticity, stop fakes, and show that compliance doesn't have to be cold.
          </p>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <PhoneCarousel />
          </motion.div>
        </section>

        <section className="py-12 overflow-hidden">
          <FilmStrip />
        </section>

        <section className="py-24 border-t border-[#FCFCFC]/10">
          <div className="grid md:grid-cols-2 gap-16">
            <h2 className="text-3xl font-bold text-[#E2ECE9]">What is a Digital Product Passport?</h2>
            <div className="space-y-6 text-lg text-[#FCFCFC]/70 font-light leading-relaxed">
              <p>Most buyers never see what makes a product worth choosing. Where it came from, how it was made, who made it.</p>
              <p className="text-[#FCFCFC] font-medium">A Digital Product Passport fixes that.</p>
              <p>It's a simple, scannable profile that tells the story behind a product, from raw materials to craftsmanship to care instructions. It's a quick scan that connects buyers to the full journey of what they're holding.</p>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="bg-[#E2ECE9] text-[#032422] rounded-3xl p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">About WorldPulse</h2>
                <div className="text-lg leading-relaxed opacity-80 space-y-4">
                  <p>Current DPP tools feel cold, technical, and forgettable. WorldPulse is different, combining compliance with storytelling.</p>
                  <p>Our mark signals no slavery, no greenwashing, only authenticity and transparency.</p>
                  <p>It is about creating a connection that lasts, helping companies serve people today without stealing beauty from tomorrow.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                {[
                  "No Slavery",
                  "No Greenwashing",
                  "Built for Authenticity & Transparency"
                ].map((item, i) => (
                  <div key={i} className="bg-[#032422]/5 p-6 rounded-xl flex items-center gap-4 border border-[#032422]/5">
                    <CheckCircle2 className="text-[#032422]" />
                    <span className="font-bold text-xl">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-24 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to tell your story?</h2>
          <div className="flex justify-center gap-6">
            <Link href="/signup" className="bg-[#032422] text-[#E2ECE9] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              Get started free
            </Link>
            <Link href="/contact" className="border border-[#FCFCFC]/20 text-[#FCFCFC] px-8 py-4 rounded-full font-bold hover:bg-[#FCFCFC]/10 transition-colors">
              Talk to us
            </Link>
          </div>
          <div className="mt-16 pt-8 border-t border-[#FCFCFC]/10 text-[#FCFCFC]/40 text-sm">
            © {new Date().getFullYear()} WorldPulse. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex"
            onClick={() => setShowDemo(false)}
          >
            {/* Sidebar */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="w-80 bg-[#032422] border-r border-[#E2ECE9]/10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#E2ECE9]/10">
                <h3 className="text-lg font-bold text-[#E2ECE9]">Live Passport Demo</h3>
                <p className="text-sm text-[#E2ECE9]/60 mt-1">Choose a template to preview</p>
              </div>
              
              <div className="flex-1 p-4 space-y-2">
                {demoPassports.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => setSelectedDemo(demo)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedDemo.id === demo.id
                        ? 'bg-[#E2ECE9] text-[#032422]'
                        : 'bg-[#101010]/50 text-[#E2ECE9] hover:bg-[#101010]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{demo.emoji}</span>
                      <div>
                        <div className="font-semibold">{demo.name}</div>
                        <div className={`text-xs ${selectedDemo.id === demo.id ? 'text-[#032422]/60' : 'text-[#E2ECE9]/50'}`}>
                          {demo.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-[#E2ECE9]/10 space-y-3">
                <Link
                  href={`/examples/${selectedDemo.id}`}
                  className="w-full py-3 bg-[#E2ECE9] text-[#032422] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition"
                >
                  Open Full Screen <ArrowRight size={16} />
                </Link>
                <Link
                  href="/examples"
                  className="w-full py-3 border border-[#E2ECE9]/30 text-[#E2ECE9] font-semibold rounded-xl text-center block hover:bg-[#E2ECE9]/10 transition"
                >
                  View All Examples
                </Link>
              </div>
            </motion.div>

            {/* Preview Area */}
            <div className="flex-1 flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#E2ECE9]/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedDemo.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-[#E2ECE9]">{selectedDemo.name}</h4>
                    <p className="text-xs text-[#E2ECE9]/50">{selectedDemo.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDemo(false)}
                  className="w-10 h-10 rounded-full bg-[#E2ECE9]/10 hover:bg-[#E2ECE9]/20 flex items-center justify-center transition"
                >
                  <X size={20} className="text-[#E2ECE9]" />
                </button>
              </div>

              {/* iframe */}
              <div className="flex-1 bg-[#101010]">
                <iframe
                  key={selectedDemo.id}
                  src={`/examples/${selectedDemo.id}`}
                  className="w-full h-full"
                  title={`Demo: ${selectedDemo.name}`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
