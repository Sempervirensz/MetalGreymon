'use client';

import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
};

interface MediaCarouselProps {
  items: MediaItem[];
  showThumbnails?: boolean;
  variant?: 'card' | 'hero';
  aspectRatio?: string;
  className?: string;
  thumbnailSize?: 'default' | 'mini';
}

const VARIANT_STYLES = {
  card: {
    container: 'rounded-3xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6',
    inner: 'relative overflow-hidden rounded-2xl bg-neutral-100 flex items-center justify-center',
    control: 'bg-white/90 text-neutral-900 hover:bg-white',
  },
  hero: {
    container: 'overflow-hidden rounded-3xl border border-neutral-200 shadow-lg',
    inner: 'relative overflow-hidden bg-neutral-100 flex items-center justify-center',
    control: 'bg-white/85 text-neutral-900 hover:bg-white',
  },
} as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const THUMBNAIL_STYLES = {
  default: {
    buttonBase: 'flex w-24 flex-col gap-2 rounded-2xl border p-1 text-left transition sm:w-28',
    buttonActive: 'border-neutral-900 bg-neutral-900/5',
    buttonInactive: 'border-neutral-200 hover:border-neutral-300',
    wrapper: 'relative overflow-hidden rounded-xl bg-neutral-200',
    aspect: '4 / 3',
    label: 'text-[11px] font-medium leading-tight text-neutral-700',
    showLabel: true,
    showIndexBadge: false,
  },
  mini: {
    buttonBase: 'relative h-16 w-20 overflow-hidden rounded-xl border transition sm:h-16 sm:w-24',
    buttonActive: 'border-neutral-900 ring-2 ring-neutral-900/20',
    buttonInactive: 'border-neutral-200 hover:border-neutral-300',
    wrapper: 'relative h-full w-full overflow-hidden rounded-lg bg-neutral-200',
    aspect: undefined,
    label: 'sr-only',
    showLabel: false,
    showIndexBadge: true,
  },
} as const;

// Preload video helper
function preloadVideo(src: string): HTMLVideoElement {
  const video = document.createElement('video');
  video.src = src;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  return video;
}

export default function MediaCarousel({
  items,
  showThumbnails = true,
  variant = 'card',
  aspectRatio = '16 / 9',
  className,
  thumbnailSize = 'default',
}: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeItems = useMemo(() => items ?? [], [items]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadedVideos = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Preload next video when active index changes
  useEffect(() => {
    if (!safeItems.length) return;
    
    // Preload next 2 videos
    const indicesToPreload = [
      (activeIndex + 1) % safeItems.length,
      (activeIndex + 2) % safeItems.length,
    ];
    
    indicesToPreload.forEach(idx => {
      const item = safeItems[idx];
      if (item?.type === 'video' && !preloadedVideos.current.has(item.src)) {
        const preloaded = preloadVideo(item.src);
        preloadedVideos.current.set(item.src, preloaded);
      }
    });
  }, [activeIndex, safeItems]);

  // Auto-play video when it becomes active
  useEffect(() => {
    const current = safeItems[activeIndex];
    if (current?.type === 'video' && videoRef.current) {
      // Reset and play
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay blocked - that's okay, video will show poster
      });
    }
  }, [activeIndex, safeItems]);

  const goTo = useCallback((next: number) => {
    setActiveIndex((next + safeItems.length) % safeItems.length);
  }, [safeItems.length]);

  if (!safeItems.length) {
    return null;
  }

  const current = safeItems[Math.min(activeIndex, safeItems.length - 1)];
  const styles = VARIANT_STYLES[variant];
  const thumbnailStyles = THUMBNAIL_STYLES[thumbnailSize] ?? THUMBNAIL_STYLES.default;

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.inner} style={{ aspectRatio }}>
        {current.type === 'image' ? (
          <img
            key={current.id}
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            key={current.id}
            src={current.src}
            poster={current.poster}
            muted
            autoPlay
            playsInline
            loop
            preload="auto"
            controls={false}
            disablePictureInPicture
            className="h-full w-full object-contain"
            onCanPlay={(e) => {
              // Ensure video plays as soon as it can
              const video = e.currentTarget;
              video.play().catch(() => {});
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
          <div className="text-xs uppercase tracking-wide text-white/80">{current.type === 'video' ? 'Video' : 'Still'}</div>
          <div className="text-sm font-semibold">{current.caption || current.alt}</div>
        </div>

        <button
          type="button"
          aria-label="Previous media"
          onClick={() => goTo(activeIndex - 1)}
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow transition',
            styles.control
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next media"
          onClick={() => goTo(activeIndex + 1)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow transition',
            styles.control
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {showThumbnails && safeItems.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {safeItems.map((item, i) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show ${item.type} ${item.caption || item.alt}`}
              className={cn(
                thumbnailStyles.buttonBase,
                i === activeIndex ? thumbnailStyles.buttonActive : thumbnailStyles.buttonInactive
              )}
            >
              <div
                className={thumbnailStyles.wrapper}
                style={thumbnailStyles.aspect ? { aspectRatio: thumbnailStyles.aspect } : undefined}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.alt} className="h-full w-full object-contain" />
                ) : (
                  <>
                    {item.poster ? (
                      <img src={item.poster} alt={item.alt} className="h-full w-full object-contain" />
                    ) : (
                      <video
                        src={item.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-contain"
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      <span className="rounded-full bg-black/60 px-2 py-1 text-[11px]">▶</span>
                    </span>
                  </>
                )}
                {thumbnailStyles.showIndexBadge && (
                  <span className="pointer-events-none absolute bottom-1 right-1 rounded-full bg-black/70 px-2 text-[10px] font-semibold text-white">
                    {i + 1}
                  </span>
                )}
              </div>
              {thumbnailStyles.showLabel && (
                <span className={thumbnailStyles.label}>{item.caption || item.alt}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
