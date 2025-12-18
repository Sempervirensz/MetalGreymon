'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Fingerprint, Shield, Search, Copy, CheckCircle, Box } from 'lucide-react';
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const ProvenanceMap = dynamic(() => import("./ProvenanceMap"), { ssr: false });

// Nike AF1 manufacturing provenance steps
const af1Steps = [
  { name: "Oregon Design HQ", role: "Design", city: "Beaverton", country: "USA", lat: 45.491, lon: -122.803 },
  { name: "Leather Supplier", role: "Materials", city: "Arzignano", country: "Italy", lat: 45.521, lon: -11.334 },
  { name: "Nike Factory", role: "Manufacturing", city: "Ho Chi Minh", country: "Vietnam", lat: 10.762, lon: 106.660 },
  { name: "Quality Control", role: "Inspection", city: "Memphis", country: "USA", lat: 35.149, lon: -90.048 },
  { name: "NYC Flagship", role: "Retail", city: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
];

// Assets
const heroImage = "/images/agumon/nike_air_force_1_cinematic_white_on_black.png";
const blueprintImage = "/images/agumon/nike_air_force_1_technical_blueprint.png";
const provenanceImage = "/images/agumon/urban_concrete_basketball_court_night_texture.png";
const craftImage = "/images/agumon/leather_stitching_macro_craft.png";

// Scramble hook
const CHARS = "ABCDEF0123456789XX$$##@@//";

function useScramble(text: string, speed: number = 50, trigger: boolean = true) {
  const [displayText, setDisplayText] = useState(text);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      setIteration(prev => prev + 1 / 3);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, trigger, iteration]);

  useEffect(() => {
    setIteration(0);
  }, [text, trigger]);

  return displayText;
}

// Scan Gate Component
function ScanGate({ onUnlock }: { onUnlock: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const statusText = useScramble(isHolding ? "VERIFYING TAG..." : "TAP TO AUTHENTICATE", 30, true);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isHolding) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress((prev) => Math.max(0, prev - 5));
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onUnlock, 400);
    }
  }, [progress, onUnlock]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none touch-none overflow-hidden"
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
        <div className="absolute inset-4 border border-dashed border-white/20 rounded-full" />
        
        <motion.div 
          animate={{ scale: isHolding ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isHolding ? Infinity : 0 }}
          className="absolute inset-0 rounded-full border border-orange-500/30"
          style={{ opacity: isHolding ? 0.5 : 0 }}
        />

        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-orange-500"
            pathLength="100"
            strokeDashoffset={100 * (1 - progress / 100)}
            strokeLinecap="butt"
          />
        </svg>

        <motion.button
          ref={btnRef}
          className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white text-black flex items-center justify-center font-bold cursor-pointer"
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y, scale: isHolding ? 0.9 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {progress < 100 ? (
              <motion.div
                key="lock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <Fingerprint className="w-8 h-8 md:w-10 md:h-10 mb-1" />
                <span className="font-mono text-[10px] uppercase font-black tracking-tighter">Hold</span>
              </motion.div>
            ) : (
              <motion.div
                key="unlock"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Shield className="w-8 h-8 md:w-10 md:h-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="mt-16 text-center space-y-4 relative z-10">
        <div className="font-mono text-xs tracking-[0.2em] text-white uppercase bg-black px-4 py-1 border border-white/20 inline-block">
          {statusText}
        </div>
      </div>

      <div className="absolute bottom-12 w-full px-12 flex justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest">
        <span>S/N: AF1-001 // BEAVERTON // 2025</span>
        <span>AUTH_REQ_V2.0</span>
      </div>
    </motion.div>
  );
}

// Product Hero Component  
function ProductHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-0 bg-black">
          <img 
            src={heroImage} 
            alt="AF1 Reality" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 mix-blend-difference px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-5xl md:text-[12rem] text-white tracking-tighter leading-none text-center select-none uppercase italic font-black"
          >
            AIR FORCE 1
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-sm md:text-xl tracking-[0.3em] md:tracking-[0.5em] text-white uppercase mt-4 text-center"
          >
            Since 1982
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-12 left-12 z-40 pointer-events-none hidden md:block">
        <div className="font-mono text-xs text-white/40 mb-1">
          ARCHIVE ID: <span className="text-orange-500 font-bold">AF1-82-NYC</span>
        </div>
        <div className="font-mono text-xs text-white/40">
          STATUS: <span className="bg-orange-500 text-black px-1 font-bold">UNLOCKED</span>
        </div>
      </div>
    </section>
  );
}

// Provenance Component
function Provenance() {
  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 bg-neutral-950 overflow-hidden border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden group border border-white/10">
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10" />
            <img 
              src={provenanceImage} 
              alt="NYC Court" 
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 z-20 font-mono text-xs text-black bg-orange-500 px-3 py-1 font-bold">
              RUCKER PARK, NYC
            </div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange-500/50" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-orange-500/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          <span className="font-mono text-orange-500 text-sm tracking-widest border-l-2 border-orange-500 pl-4 inline-block font-bold">
            01 / UPTOWN
          </span>
          <h2 className="text-4xl md:text-7xl leading-[0.9] uppercase font-black text-white">
            Concrete <br/>
            <span className="text-white/30">Cathedrals</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-md font-light">
            Born on the hardwood, raised on the asphalt. The Air Force 1 transcended its athletic roots to become the canvas of the streets. From 1982 to eternity, it is the uniform of the culture.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8 order-2 md:order-1 md:text-right flex flex-col items-start md:items-end"
        >
          <span className="font-mono text-orange-500 text-sm tracking-widest border-l-2 md:border-l-0 md:border-r-2 border-orange-500 pl-4 md:pl-0 md:pr-4 inline-block font-bold">
            02 / MATERIAL
          </span>
          <h2 className="text-4xl md:text-7xl leading-[0.9] uppercase font-black text-white">
            Pristine <br/>
            <span className="text-white/30">Architecture</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-md font-light">
            Crisp leather edges. The pivot point on the outsole. The encapsulated Air unit. Every detail is a deliberate architectural decision designed for durability and presence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 md:order-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden group border border-white/10">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10" />
            <img 
              src={craftImage} 
              alt="Leather Detail" 
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute top-0 right-0 z-20 font-mono text-xs text-black bg-white px-3 py-1 font-bold">
              FULL GRAIN
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Technical Specs Component
const specs = [
  { label: "Model", value: "Air Force 1 '07" },
  { label: "Style Code", value: "CW2288-111" },
  { label: "Technology", value: "Nike Air Encapsulated" },
  { label: "Upper", value: "Premium Cowhide Leather" },
  { label: "Outsole", value: "Non-Marking Rubber" },
  { label: "Release Year", value: "1982 (Original)" },
  { label: "Colorway", value: "White / White" },
  { label: "Designer", value: "Bruce Kilgore" },
];

function TechnicalSpecs() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0xAF1...1982");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-black relative border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8">
          <div>
            <h2 className="text-3xl md:text-6xl text-white font-black uppercase tracking-tighter">Specification</h2>
            <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mt-2">/// Technical Data Sheet</p>
          </div>
          <Box className="w-12 h-12 text-white/20 stroke-1 hidden md:block" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 p-8 border-l-4 border-l-orange-500">
            <h3 className="font-mono text-sm text-white mb-8 uppercase tracking-wider font-bold">Product Details</h3>
            <ul className="space-y-4">
              {specs.map((spec, i) => (
                <li key={i} className="flex justify-between items-baseline border-b border-white/10 pb-2 hover:bg-white/5 transition-colors px-2 -mx-2">
                  <span className="font-mono text-xs text-white/40 uppercase">{spec.label}</span>
                  <span className="text-sm md:text-base text-white font-semibold uppercase">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:10px_10px]" />

            <div>
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-mono text-sm text-white uppercase tracking-wider font-bold">NFC Authentication</h3>
                <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
              </div>
              
              <div className="space-y-2 mb-8 border border-white/10 p-4 bg-black/50">
                <div className="text-[10px] text-white/40 font-mono uppercase">Unique Pair ID</div>
                <div className="font-mono text-2xl text-white tracking-widest font-bold">AF1-82-NY-004</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] text-white/40 font-mono uppercase">Blockchain Contract</div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center justify-between gap-2 font-mono text-xs text-white/70 hover:text-black hover:bg-orange-500 transition-all bg-white/5 px-4 py-3 w-full border border-white/10"
                >
                  0xAF1...1982
                  {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10px] text-white/30 font-mono leading-relaxed uppercase">
                Verified Authentic by Nike Virtual Studios. This digital asset is inextricably linked to the physical product via embedded NFC tag in the left heel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Experience Component
export default function AgumonExperience() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noiseFilter%29%22%2F%3E%3C%2Fsvg%3E')]" />

      <AnimatePresence>
        {!unlocked && (
          <ScanGate onUnlock={() => setUnlocked(true)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: unlocked ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={unlocked ? 'block' : 'hidden'}
      >
        <ProductHero />
        <Provenance />
        
        {/* Interactive Provenance Map */}
        <div className="bg-neutral-950">
          <ProvenanceMap 
            steps={af1Steps}
            title="Supply Chain" 
            primaryColor="#f97316"
          />
        </div>
        
        <TechnicalSpecs />
        
        <footer className="py-12 text-center border-t border-white/5 relative z-10 bg-black">
           <div className="text-2xl mb-4 text-white/20 font-black">NIKE</div>
           <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
             © 2025 Nike, Inc. All Rights Reserved.
           </div>
        </footer>
      </motion.main>
    </div>
  );
}



