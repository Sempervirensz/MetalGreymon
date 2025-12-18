"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Denim Jacket",
    description: "Okayama selvedge craftsmanship",
    image: "/images/Iphone Scroll/fashion_denim_hero.jpg",
  },
  {
    id: 2,
    title: "Walnut Table",
    description: "FSC certified Danish design",
    image: "/images/Iphone Scroll/furniture_hero_walnut.jpg",
  },
  {
    id: 3,
    title: "Estate Wine",
    description: "Single-vineyard provenance",
    image: "/images/Iphone Scroll/food_hero_wine.jpg",
  },
  {
    id: 4,
    title: "Wine Cellar",
    description: "Cold-fermented excellence",
    image: "/images/Iphone Scroll/food_3_wine.jpg",
  },
  {
    id: 5,
    title: "Artisan Granola",
    description: "Hand-mixed slow-baked",
    image: "/images/Iphone Scroll/granola3.jpg",
  },
];

export function PhoneCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    setIsAutoPlaying(false);
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    setIsAutoPlaying(false);
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      const duration = 4000;

      if (progressRef.current) {
        progressRef.current.style.transition = `width ${duration}ms linear`;
        progressRef.current.style.width = "100%";
      }

      autoPlayTimer.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
        if (progressRef.current) {
          progressRef.current.style.width = "0%";
        }
      }, duration);
    } else {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
      if (progressRef.current) {
        progressRef.current.style.width = "0%";
      }
    }

    return () => {
      if (autoPlayTimer.current) {
        clearTimeout(autoPlayTimer.current);
      }
    };
  }, [isAutoPlaying, isHovered, activeIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goPrev, goNext, toggleAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;

    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }

    setTouchStartX(null);
  };

  return (
    <div 
      className="w-full flex flex-col items-center gap-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full max-w-7xl h-[600px] flex items-center justify-center overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-radial from-[#E2ECE9]/5 via-transparent to-transparent pointer-events-none" />
        
        {slides.map((slide, index) => {
          const offset = index - activeIndex;
          const wrapOffset =
            offset > slides.length / 2
              ? offset - slides.length
              : offset < -slides.length / 2
              ? offset + slides.length
              : offset;

          if (Math.abs(wrapOffset) > 2) return null;

          const isActive = wrapOffset === 0;
          const baseSpacing = 260;
          const translateX = wrapOffset * baseSpacing;
          const scale = isActive ? 1 : Math.max(0.65, 1 - Math.abs(wrapOffset) * 0.12);
          const rotateY = wrapOffset * -16;
          const opacity = isActive ? 1 : Math.max(0.25, 1 - Math.abs(wrapOffset) * 0.3);
          const zIndex = 30 - Math.abs(wrapOffset) * 3;
          const blur = Math.abs(wrapOffset) * 2.5;

          return (
            <div
              key={slide.id}
              onClick={() => {
                setIsAutoPlaying(false);
                goTo(index);
              }}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer will-change-transform"
              style={{
                transform: `
                  translateX(${translateX}px)
                  scale(${scale})
                  perspective(1800px)
                  rotateY(${rotateY}deg)
                `,
                opacity,
                zIndex,
                filter: isActive ? "blur(0px)" : `blur(${blur}px)`,
              }}
            >
              <div className="relative w-[300px] h-[600px]">
                {isActive && (
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#E2ECE9]/20 via-[#E2ECE9]/10 to-transparent rounded-[3.8rem] blur-xl animate-pulse" />
                )}
                
                <div className="relative w-full h-full rounded-[3.5rem] bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] shadow-2xl border-2 border-neutral-800/60 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/8 via-transparent to-black/30 rounded-[3.5rem] pointer-events-none animate-shimmer" />
                  
                  <div className="absolute top-0 left-0 right-0 h-14 bg-black rounded-t-[3.5rem] z-30">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-black rounded-full flex items-center justify-end pr-4 shadow-inner border border-neutral-900/50">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_4px_2px_rgba(255,255,255,0.12)]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-black rounded-b-[3.5rem] z-30 flex items-center justify-center">
                    <div className="w-32 h-1 bg-white/30 rounded-full" />
                  </div>

                  <div className="relative w-[93%] h-[89%] rounded-[2.6rem] overflow-hidden bg-black shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
                    <div className={`w-full h-full transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-80"}`}>
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay with title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{slide.title}</h3>
                        <p className="text-sm text-white/70">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={goPrev}
          className="group absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-xl border border-white/20 rounded-full p-4 text-white hover:bg-black/90 hover:scale-110 hover:border-[#E2ECE9]/40 transition-all duration-300 z-50 shadow-2xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={goNext}
          className="group absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-xl border border-white/20 rounded-full p-4 text-white hover:bg-black/90 hover:scale-110 hover:border-[#E2ECE9]/40 transition-all duration-300 z-50 shadow-2xl"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#E2ECE9] to-[#E2ECE9]/60 rounded-full"
            style={{ width: "0%" }}
          />
        </div>

        <div className="flex gap-3 items-center justify-center flex-wrap max-w-4xl">
          {slides.map((slide, i) => {
            const isAdjacent = Math.abs(i - activeIndex) === 1;
            
            return (
              <button
                key={slide.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  goTo(i);
                }}
                className="flex flex-col items-center gap-2 group"
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-10 bg-[#E2ECE9] shadow-lg shadow-[#E2ECE9]/50"
                      : isAdjacent
                      ? "w-3 bg-white/40 group-hover:bg-white/60 group-hover:w-4"
                      : "w-2 bg-white/30 group-hover:bg-white/50 group-hover:w-3"
                  }`}
                />
                {i === activeIndex && (
                  <span className="text-xs text-[#E2ECE9]/80 font-medium animate-fade-in">
                    {slide.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-sm text-[#FCFCFC]/80 transition-all duration-200"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="text-center mt-2 animate-fade-in">
        <h3 className="text-2xl font-bold text-[#E2ECE9] mb-2">
          {slides[activeIndex].title}
        </h3>
        <p className="text-sm text-[#FCFCFC]/60 max-w-md mx-auto">
          {slides[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
