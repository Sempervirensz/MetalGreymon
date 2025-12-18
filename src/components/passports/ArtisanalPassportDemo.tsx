'use client';

import React, { useMemo, useState } from "react";
import AccessCard from "./AccessCard";
import MediaCarousel, { type MediaItem } from "./MediaCarousel";
import WabiSabiExperience from "./WabiSabiExperience";
import SprinkleStarExperience from "./SprinkleStarExperience";
import SelvaExperience from "./SelvaExperience";
import AgumonExperience from "./AgumonExperience";
import dynamic from "next/dynamic";

const ProvenanceMap = dynamic(() => import("./ProvenanceMap"), { ssr: false });

/**
 * WorldPulse — Artisanal Product Passport (Beautified Demo)
 * Single-file React component using Tailwind CSS
 * Includes: refined typography, glass gradient cards, holographic seal,
 * shimmer + micro-interactions, animated map pins, and improved composition.
 */

// ---------- Types ----------
interface Step {
  name: string;
  role: string;
  city: string;
  country: string;
  lat: number; // -90..90
  lon: number; // -180..180
}

interface Certificate {
  productId: string;
  edition: string;
  block: number;
  hash: string; // short display like 0xA13F…92B
  issuer: string;
  timestamp: string; // ISO or pretty
  signature: string; // display name only
}

interface Maker {
  name: string;
  bio: string;
  portraitUrl: string;
  workshopUrl: string;
}

interface ProductSpec {
  id: string;
  title: string;
  tagline: string;
  category: "Food" | "Fashion" | "Furniture";
  theme: {
    from: string; // tailwind from-*
    via?: string; // optional via-*
    to: string;   // tailwind to-*
  };
  heroUrl: string;
  description: string;
  certificate: Certificate;
  steps: Step[];
  maker: Maker;
  materials: string[];
  care: string[];
  heroMedia: MediaItem[];
  media: MediaItem[];
  demoUrl: string; // what the NFC/QR would open
}

// ---------- Utilities ----------
const fmtShort = (s: string) => (s.length > 22 ? s.slice(0, 18) + "…" + s.slice(-3) : s);

function latLonToPerc(lat: number, lon: number) {
  // Equirectangular projection to percentage coords of a 2:1 aspect map
  const x = ((lon + 180) / 360) * 100; // 0..100
  const y = ((90 - lat) / 180) * 100;  // 0..100
  return { x, y };
}

function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

// ---------- Demo Data ----------
const PRODUCTS: ProductSpec[] = [
  {
  id: "food",
  title: "Sauvignon Blanc — Napa Valley (2019)",
  tagline: "Single-vineyard • Cold-fermented • Stainless & French oak",
  category: "Food",
  theme: { from: "from-rose-700", via: "via-red-600", to: "to-amber-600" },
  heroUrl: "/images/food/food_hero_wine.jpg",

  description:
    "Estate Sauvignon Blanc from Rutherford, picked at dawn and pressed within hours. A cool ferment preserves citrus and stone-fruit aromatics; a kiss of French oak adds texture without weight.",

  certificate: {
    productId: "WP-FOOD-WIN-0001",
    edition: "Founders Demo • 001",
    block: 128441,
    hash: "0xA13F8C29E41D92B",
    issuer: "WorldPulse Registry",
    timestamp: "2025-10-10 14:22 UTC",
    signature: "WorldPulse Signature",
  },

  steps: [
    { name: "Rutherford Estate", role: "Vineyard", city: "Rutherford", country: "USA", lat: 38.463, lon: -122.423 },
    { name: "St. Helena Winery", role: "Fermentation", city: "St. Helena", country: "USA", lat: 38.505, lon: -122.469 },
    { name: "Cognac Cooperage", role: "Barrels", city: "Cognac", country: "France", lat: 45.694, lon: -0.328 },
    { name: "Bottling Line", role: "Bottling", city: "Napa", country: "USA", lat: 38.297, lon: -122.287 },
    { name: "SF Restaurant Partner", role: "Retail", city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
  ],

  maker: {
    name: "Rutherford Cellars",
    bio: "Family-run winery crafting site-expressive whites with gentle handling and patient elevage.",
    portraitUrl: "/images/food/food_2_wine.jpg",
    workshopUrl: "/images/food/food_3_wine.jpg",
  },

  materials: ["Sauvignon Blanc grapes", "French oak barrels", "Glass bottle • cork/closure"],
  care: ["Serve 48–52°F (9–11°C)", "Store on side at ~55°F", "Enjoy within 3–5 years"],
  heroMedia: [
    {
      id: "food-hero-image",
      type: "image",
      src: "/images/food/food_hero_wine.jpg",
      alt: "Sauvignon Blanc hero bottle shot",
      caption: "Hero still — Rutherford estate bottle with vineyard notes.",
    },
    {
      id: "food-hero-video",
      type: "video",
      src: "/images/food/food_hero_vid_wine.mp4",
      poster: "/images/food/food_hero_wine.jpg",
      alt: "Cold ferment taking place in the cellar",
      caption: "Hero clip — dawn-harvest fruit entering the press.",
    },
  ],
  media: [
    {
      id: "food-image-harvest",
      type: "image",
      src: "/images/food/food_2_wine.jpg",
      alt: "Hand-harvested Sauvignon Blanc grapes",
      caption: "Family team hand-harvests the block just before sunrise.",
    },
    {
      id: "food-image-barrel",
      type: "image",
      src: "/images/food/food_3_wine.jpg",
      alt: "French oak barrels in a dim cellar",
      caption: "Neutral French oak adds texture without excess weight.",
    },
  ],
  demoUrl: "https://app.worldxpulse.com/p/wine-demo",
},
  {
    id: "chocolate",
    title: "Single-Origin Chocolate Bar — Ambanja, Madagascar",
    tagline: "Bean-to-bar • Sambirano Valley • Floral acidity",
    category: "Food",
    theme: { from: "from-amber-800", via: "via-rose-700", to: "to-amber-600" },
    heroUrl: "/images/StoneGrindz/chocolatehero.jpeg",
    description:
      "Single-origin cocoa from Ambanja, Madagascar, harvested by hand in the lush Sambirano Valley. Beans are fermented in wooden boxes, sun-dried beneath tropical skies, and transformed locally through a careful bean-to-bar process. Bright citrus acidity, red fruit, and soft floral notes emerge naturally—no added flavors, no shortcuts. Crafted with respect for land, farmers, and time.",
    certificate: {
      productId: "WP-FOOD-CHO-0001",
      edition: "Founders Demo • 001",
      block: 128441,
      hash: "0xA13F8C29E41D92B",
      issuer: "WorldPulse Registry",
      timestamp: "2025-10-10 14:22 UTC",
      signature: "WorldPulse Signature",
    },
    steps: [
      { name: "Ambanja Cocoa Farms", role: "Cultivation", city: "Ambanja", country: "Madagascar", lat: -13.6860, lon: 48.4590 },
      { name: "Sambirano Fermentation Center", role: "Fermentation & Drying", city: "Near Ambanja", country: "Madagascar", lat: -13.6700, lon: 48.4500 },
      { name: "Bean-to-Bar Chocolate Maker", role: "Roasting, Grinding & Conching", city: "Antananarivo", country: "Madagascar", lat: -18.8792, lon: 47.5079 },
      { name: "Molding & Packaging Facility", role: "Molding & Wrapping", city: "Antananarivo", country: "Madagascar", lat: -18.8792, lon: 47.5200 },
      { name: "Retail & Distribution Partner", role: "Retail", city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
    ],
    maker: {
      name: "Sambirano Valley Collective",
      bio: "A network of smallholder cocoa farmers practicing low-intervention agriculture, shade-grown cultivation, and post-harvest techniques passed down through generations. Emphasis on flavor-first cocoa rather than commodity yield.",
      portraitUrl: "/images/StoneGrindz/chocolate2.jpg",
      workshopUrl: "/images/StoneGrindz/chocolate3.jpg",
    },
    materials: ["Cocoa beans (70%) • Ambanja, Madagascar", "Organic cane sugar", "Cocoa butter (from same origin)", "Contains no soy, dairy, or artificial additives"],
    care: ["Store at 60–68°F (16–20°C)", "Keep dry and away from direct sunlight", "Best enjoyed at room temperature"],
    heroMedia: [
      {
        id: "chocolate-hero-image",
        type: "image",
        src: "/images/StoneGrindz/chocolatehero.jpeg",
        alt: "Single-origin chocolate bar hero shot",
        caption: "Hero still — Ambanja chocolate bar with provenance notes.",
      },
      {
        id: "chocolate-hero-video",
        type: "video",
        src: "/images/StoneGrindz/chocolateherovid.mp4",
        poster: "/images/StoneGrindz/chocolatehero.jpeg",
        alt: "Bean-to-bar chocolate making process",
        caption: "Hero clip — cocoa beans being transformed into chocolate.",
      },
    ],
    media: [
      {
        id: "chocolate-image-cocoa",
        type: "image",
        src: "/images/StoneGrindz/chocolate2.jpg",
        alt: "Cocoa beans from Sambirano Valley",
        caption: "Smallholder farms in the Sambirano Valley produce naturally aromatic cocoa.",
      },
      {
        id: "chocolate-image-process",
        type: "image",
        src: "/images/StoneGrindz/chocolate3.jpg",
        alt: "Chocolate making process",
        caption: "Careful low-and-slow roasting highlights citrus and berry aromatics.",
      },
    ],
    demoUrl: "https://app.worldxpulse.com/p/chocolate-demo",
  },
  {
    id: "granola",
    title: "eatPurposefully granola",
    tagline: "Cold-climate oats • Hand-mixed • Slow-baked clusters",
    category: "Food",
    theme: { from: "from-amber-600", via: "via-yellow-500", to: "to-amber-700" },
    heroUrl: "/images/Eat Purposefully/granolahero.jpg",
    description:
      "This granola begins with cold-climate oats, layered with thoughtfully sourced nuts and seeds, and gently sweetened with pure maple syrup. Ingredients are mixed by hand and slow-baked to encourage natural clustering—no gums, no syrups, no shortcuts. The result is a clean, balanced granola with real texture and honest flavor. Crafted for everyday nourishment, with respect for ingredients, people, and place.",
    certificate: {
      productId: "WP-FOOD-GRA-0001",
      edition: "Founders Demo • 001",
      block: 128441,
      hash: "0xA13F8C29E41D92B",
      issuer: "WorldPulse Registry",
      timestamp: "2025-10-10 14:22 UTC",
      signature: "WorldPulse Signature",
    },
    steps: [
      { name: "Organic Oat Farms", role: "Cultivation", city: "Saskatchewan", country: "Canada", lat: 52.1332, lon: -106.6700 },
      { name: "Nut & Seed Growers", role: "Harvest", city: "Central Valley", country: "USA", lat: 36.7783, lon: -119.4179 },
      { name: "Natural Sweetener Source", role: "Maple Syrup", city: "Quebec", country: "Canada", lat: 46.8139, lon: -71.2080 },
      { name: "Small-Batch Kitchen", role: "Mixing & Baking", city: "Portland", country: "USA", lat: 45.5152, lon: -122.6784 },
      { name: "Retail & Distribution Partner", role: "Retail", city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
    ],
    maker: {
      name: "WorldPulse Kitchen Collective",
      bio: "A small-batch food collective focused on transparent sourcing, minimal processing, and ingredient literacy. Recipes prioritize texture, balance, and digestibility over excessive sweetness or fillers.",
      portraitUrl: "/images/Eat Purposefully/granola2.jpg",
      workshopUrl: "/images/Eat Purposefully/granola3.jpg",
    },
    materials: ["Organic rolled oats", "Almonds, pumpkin seeds, sunflower seeds", "Pure maple syrup", "Coconut oil", "Sea salt", "Contains no artificial flavors, preservatives, soy, or refined sugars"],
    care: ["Store in a cool, dry place", "Reseal after opening to maintain crunch", "Enjoy within freshness window noted on packaging"],
    heroMedia: [
      {
        id: "granola-hero-image",
        type: "image",
        src: "/images/Eat Purposefully/granolahero.jpg",
        alt: "Artisan granola hero shot",
        caption: "Hero still — small-batch granola with natural clusters.",
      },
      {
        id: "granola-hero-video",
        type: "video",
        src: "/images/Eat Purposefully/granolavid.mp4",
        poster: "/images/Eat Purposefully/granolahero.jpg",
        alt: "Granola mixing and baking process",
        caption: "Hero clip — hand-mixing and slow-baking in small batches.",
      },
    ],
    media: [
      {
        id: "granola-image-oats",
        type: "image",
        src: "/images/Eat Purposefully/granola2.jpg",
        alt: "Cold-climate oats and ingredients",
        caption: "Cold-climate oats grown in nutrient-rich prairie soils.",
      },
      {
        id: "granola-image-baking",
        type: "image",
        src: "/images/Eat Purposefully/granola3.jpg",
        alt: "Granola being slow-baked",
        caption: "Slow-baked at low temperatures to form large clusters naturally.",
      },
    ],
    demoUrl: "https://app.worldxpulse.com/p/granola-demo",
  },
  {
    id: "fashion",
    title: "Okayama Selvedge Denim Jacket",
    tagline: "13.5oz selvedge • Vegetable-tanned trims",
    category: "Fashion",
    theme: { from: "from-indigo-600", via: "via-sky-700", to: "to-slate-900" },
    heroUrl: "/images/fashion/fashion_denim_hero.jpg",
    description:
      "Cut from shuttle-loomed selvedge woven in Okayama. Stitched with core-spun thread, finished with hand-burnished leather collar and copper hardware.",
    certificate: {
      productId: "WP-FSHN-DNM-0001",
      edition: "Founders Demo • 002",
      block: 128777,
      hash: "0xB7C42011AA6F1CE",
      issuer: "WorldPulse Registry",
      timestamp: "2025-10-11 09:12 UTC",
      signature: "WorldPulse Signature",
    },
    steps: [
      { name: "High Plains Farm", role: "Cotton", city: "Lubbock", country: "USA", lat: 33.582, lon: -101.853 },
      { name: "Osaka Spinner", role: "Spinning", city: "Osaka", country: "Japan", lat: 34.693, lon: 135.502 },
      { name: "Okayama Mill", role: "Weaving", city: "Okayama", country: "Japan", lat: 34.655, lon: 133.918 },
      { name: "LA Workshop", role: "Cut & Sew", city: "Los Angeles", country: "USA", lat: 34.052, lon: -118.244 },
      { name: "Portland Retailer", role: "Retail", city: "Portland", country: "USA", lat: 45.515, lon: -122.679 },
    ],
    maker: {
      name: "Hoshino Works",
      bio: "Three generations of denim craft—from shuttle looms to hand-finishing.",
      portraitUrl: "/images/fashion/fashion_2_denim.jpg",
      workshopUrl: "/images/fashion/fashion_3_denim.jpg",
    },
    materials: ["13.5oz selvedge", "Copper hardware", "Veg-tan leather"],
    care: ["Cold wash inside-out", "Line dry", "No bleach"],
    heroMedia: [
      {
        id: "fashion-hero-image",
        type: "image",
        src: "/images/fashion/fashion_denim_hero.jpg",
        alt: "Selvedge denim jacket hero shot",
        caption: "Hero still — core wash and leather collar details.",
      },
      {
        id: "fashion-hero-video",
        type: "video",
        src: "/images/fashion/fashion_hero_vid_denim.mp4",
        poster: "/images/fashion/fashion_denim_hero.jpg",
        alt: "Hero clip highlighting selvedge details",
        caption: "Hero clip — selvedge jacket on model in the studio.",
      },
    ],
    media: [
      {
        id: "fashion-detail-image",
        type: "image",
        src: "/images/fashion/fashion_2_denim.jpg",
        alt: "Denim panels stacked with leather trims",
        caption: "Vegetable-tanned trims patina alongside the denim.",
      },
      {
        id: "fashion-workshop-image",
        type: "image",
        src: "/images/fashion/fashion_3_denim.jpg",
        alt: "Tailor working inside a bright workshop",
        caption: "Three generations share the same Okayama workshop floor.",
      },
    ],
    demoUrl: "https://app.worldxpulse.com/p/denim-demo",
  },
  {
    id: "furniture",
    title: "Walnut Coffee Table",
    tagline: "Solid FSC walnut • Hand-rubbed oil",
    category: "Furniture",
    theme: { from: "from-rose-500", via: "via-amber-600", to: "to-stone-800" },
    heroUrl: "/images/furniture/furniture_hero_walnut.jpg",
    description:
      "From Oregon black walnut to a Danish-inspired silhouette. Joinery you can feel; a finish that grows richer with every year.",
    certificate: {
      productId: "WP-FURN-WAL-0001",
      edition: "Founders Demo • 003",
      block: 129002,
      hash: "0x9C1E07AD44F9C21",
      issuer: "WorldPulse Registry",
      timestamp: "2025-10-12 16:45 UTC",
      signature: "WorldPulse Signature",
    },
    steps: [
      { name: "McKenzie Forest", role: "Forest", city: "Eugene", country: "USA", lat: 44.052, lon: -123.086 },
      { name: "Salem Mill", role: "Milling", city: "Salem", country: "USA", lat: 44.942, lon: -123.036 },
      { name: "Nord Atelier", role: "Workshop", city: "Copenhagen", country: "Denmark", lat: 55.676, lon: 12.568 },
      { name: "Showroom", role: "Retail", city: "Stockholm", country: "Sweden", lat: 59.329, lon: 18.068 },
    ],
    maker: {
      name: "Nord Atelier",
      bio: "Small-batch studio blending Pacific Northwest timber with Scandinavian joinery.",
      portraitUrl: "/images/furniture/furniture_2_walnut.jpg",
      workshopUrl: "/images/furniture/furniture_3_walnut.jpg",
    },
    materials: ["FSC walnut", "Natural oil finish", "Bridle joints"],
    care: ["Wipe with dry cloth", "Re-oil yearly", "Avoid direct heat"],
    heroMedia: [
      {
        id: "furniture-hero-image",
        type: "image",
        src: "/images/furniture/furniture_hero_walnut.jpg",
        alt: "Walnut coffee table hero shot",
        caption: "Hero still — Danish-inspired silhouette in FSC walnut.",
      },
      {
        id: "furniture-hero-video",
        type: "video",
        src: "/images/furniture/furniture_hero_vid_walnut.mp4",
        poster: "/images/furniture/furniture_hero_walnut.jpg",
        alt: "Craftsperson sanding a walnut tabletop",
        caption: "Hero clip — sanding and oiling the tabletop in Copenhagen.",
      },
    ],
    media: [
      {
        id: "furniture-image-detail",
        type: "image",
        src: "/images/furniture/furniture_2_walnut.jpg",
        alt: "Walnut table detail with joinery",
        caption: "Joinery details stay exposed rather than hidden with trim.",
      },
      {
        id: "furniture-image-studio",
        type: "image",
        src: "/images/furniture/furniture_3_walnut.jpg",
        alt: "Nord Atelier studio with furniture pieces",
        caption: "Finishing room keeps humidity tightly controlled.",
      },
    ],
    demoUrl: "https://app.worldxpulse.com/p/walnut-table-demo",
  },
];

// ---------- Components ----------
function GradientBadge({ from, via, to, children }: { from: string; via?: string; to: string; children: React.ReactNode }) {
  return (
    <span className={classNames(
      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-sm",
      `bg-gradient-to-r ${from} ${via ? via : ''} ${to}`
    )}>
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 bg-white/70 px-2.5 py-1 text-[11px] text-neutral-700 backdrop-blur">
      {children}
    </span>
  );
}

function HoloStamp() {
  return (
    <div className="relative h-10 w-10 shrink-0 rounded-full">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,theme(colors.pink.400),theme(colors.violet.500),theme(colors.sky.400),theme(colors.emerald.400),theme(colors.pink.400))] opacity-90"/>
      <div className="absolute inset-0 rounded-full border border-white/70 mix-blend-overlay"/>
      <div className="absolute inset-1 rounded-full bg-white/40 backdrop-blur-sm"/>
      <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-5 w-5 text-neutral-900/80"><path fill="currentColor" d="M9 12l2 2 4-4 1.5 1.5L11 15l-3.5-3.5L9 12z"/></svg>
    </div>
  );
}

function CertCard({ p, showHeader, toggleHeader }: { p: ProductSpec; showHeader: boolean; toggleHeader: () => void }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-neutral-200 to-white shadow-xl">
      <div className="relative rounded-2xl bg-white/90 p-5 sm:p-6 backdrop-blur">
        {/* Title Row */}
        <div className="mb-4 flex items-center justify-between">
          <div className="relative">
            <div className="text-sm font-semibold tracking-wide text-neutral-800">Certificate of Authenticity</div>
            <div className="absolute -bottom-1 left-0 h-[2px] w-24 bg-gradient-to-r from-neutral-800/60 to-transparent"/>
          </div>
          <div className="flex items-center gap-2">
            <HoloStamp />
            <GradientBadge from={p.theme.from} via={p.theme.via} to={p.theme.to}>WorldPulse Demo</GradientBadge>
            <button
              type="button"
              onClick={toggleHeader}
              className="rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-medium text-neutral-600 transition hover:border-neutral-300"
            >
              {showHeader ? "Hide blockchain header" : "Show blockchain header"}
            </button>
          </div>
        </div>

        {/* Meta chips */}
        {showHeader && (
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Chip>Block #{p.certificate.block.toLocaleString()}</Chip>
            <Chip>Hash {fmtShort(p.certificate.hash)}</Chip>
            <Chip>Issuer {p.certificate.issuer}</Chip>
            <Chip>Time {p.certificate.timestamp}</Chip>
          </div>
        )}

        {/* Details w/ subtle guilloche bg */}
        <div className="relative mb-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <pattern id="g" x="0" y="0" width="0.1" height="0.1">
                  <circle cx="1" cy="1" r="1" fill="black" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
          </div>
          <div className="relative grid grid-cols-2 gap-4 p-4 text-sm">
            <div>
              <dt className="text-neutral-500">Product ID</dt>
              <dd className="font-medium text-neutral-900">{p.certificate.productId}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Edition</dt>
              <dd className="font-medium text-neutral-900">{p.certificate.edition}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Signature</dt>
              <dd className="inline-flex items-center gap-2 font-medium text-neutral-900">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600"><path d="M20 6L9 17l-5-5"/></svg>
                {p.certificate.signature}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500">Status</dt>
              <dd className="inline-flex items-center gap-2 font-medium text-neutral-900">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"/> Verified (mock)
              </dd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-neutral-500">
          <span className="h-1 w-1 rounded-full bg-neutral-300"/>
          Stylized demonstration. No real blockchain transaction is performed.
        </div>
      </div>

      {/* Decorative chain motif */}
      <div className="pointer-events-none absolute -bottom-2 right-3 flex gap-1 opacity-70">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-2 w-6 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-100"/>
        ))}
      </div>
    </div>
  );
}

function OriginMap({ steps, activeIndex, setActiveIndex }: { steps: Step[]; activeIndex: number; setActiveIndex: (i: number) => void; }) {
  const points = useMemo(() => steps.map(s => latLonToPerc(s.lat, s.lon)), [steps]);
  const polyPoints = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Map image */}
      <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png"
          alt="World map"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          style={{ filter: "sepia(1) hue-rotate(170deg) saturate(1.6) contrast(0.95) brightness(1.05)" }}
        />
        {/* Color wash to move away from pure B/W */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-200/70 via-cyan-100/60 to-emerald-100/70 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-screen" />
        {/* SVG overlay lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
          <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0.3" stdDeviation="0.6" floodOpacity="0.35"/>
            </filter>
          </defs>
          <polyline points={polyPoints} fill="none" stroke="#111827" strokeOpacity="0.45" strokeWidth="0.35" filter="url(#shadow)" />
        </svg>
        {/* Pins */}
        {points.map((p, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`${steps[i].role}: ${steps[i].city}, ${steps[i].country}`}
            className={classNames(
              "absolute -translate-x-1/2 -translate-y-full rounded-full border border-white/80 shadow",
              activeIndex === i ? "bg-emerald-500" : "bg-neutral-900"
            )}
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: activeIndex === i ? 16 : 11, height: activeIndex === i ? 16 : 11 }}
          >
            {activeIndex === i && (
              <span className="pointer-events-none absolute -inset-2 rounded-full border border-emerald-500/50 animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={classNames(
              "group flex items-start gap-3 rounded-xl border p-3 text-left transition",
              activeIndex === i ? "border-emerald-500/80 bg-emerald-50" : "border-neutral-200 hover:bg-neutral-50"
            )}
          >
            <div className={classNames("mt-0.5 h-5 w-5 rounded-full transition", activeIndex === i ? "bg-emerald-500" : "bg-neutral-300 group-hover:bg-neutral-400")}/>
            <div>
              <div className="text-sm font-semibold text-neutral-900">{i + 1}. {s.name}</div>
              <div className="text-xs text-neutral-600">{s.role} • {s.city}, {s.country}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Pills({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="mb-2 text-sm font-semibold text-neutral-900">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((x, i) => (
          <span key={i} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">{x}</span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-neutral-500">
        <span className="h-1 w-1 rounded-full bg-neutral-400"/> {kicker}
      </div>
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
    </div>
  );
}

// Tab type including special experience views
type TabId = ProductSpec["id"] | "wabisabi" | "sprinklestar" | "selva" | "agumon";

interface ArtisanalPassportDemoProps {
  initialProductId?: string;
}

export default function ArtisanalPassportDemo({ initialProductId = "food" }: ArtisanalPassportDemoProps) {
  const [selectedId, setSelectedId] = useState<TabId>(initialProductId as TabId);
  const p = useMemo(() => PRODUCTS.find(x => x.id === selectedId), [selectedId]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProducerTools, setShowProducerTools] = useState(false);
  const [showBlockchainHeaderRow, setShowBlockchainHeaderRow] = useState(true);
  const handleSelect = (id: TabId) => {
    setSelectedId(id);
    setActiveIndex(0);
  };

  // If WabiSabi or SprinkleStar is selected, render their full experience
  if (selectedId === "wabisabi") {
    return (
      <div>
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-white shadow-sm" />
              <div className="text-sm font-semibold tracking-wide text-white">WorldPulse</div>
            </div>
            <div className="flex gap-1">
              {[...PRODUCTS.map(x => ({ id: x.id, label: x.id === "food" ? "Food" : x.id === "chocolate" ? "Chocolate" : x.id === "granola" ? "Granola" : x.id === "fashion" ? "Fashion" : "Furniture" })), { id: "wabisabi", label: "WabiSabi" }, { id: "sprinklestar", label: "SprinkleStar" }, { id: "selva", label: "Selva" }, { id: "agumon", label: "Agumon" }].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSelect(tab.id as TabId)}
                  className={classNames(
                    "rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap",
                    selectedId === tab.id ? "bg-white text-black shadow" : "text-white/70 hover:bg-white/20"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <WabiSabiExperience />
      </div>
    );
  }

  if (selectedId === "sprinklestar") {
    return (
      <div>
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-white shadow-sm" />
              <div className="text-sm font-semibold tracking-wide text-white">WorldPulse</div>
            </div>
            <div className="flex gap-1">
              {[...PRODUCTS.map(x => ({ id: x.id, label: x.id === "food" ? "Food" : x.id === "chocolate" ? "Chocolate" : x.id === "granola" ? "Granola" : x.id === "fashion" ? "Fashion" : "Furniture" })), { id: "wabisabi", label: "WabiSabi" }, { id: "sprinklestar", label: "SprinkleStar" }, { id: "selva", label: "Selva" }, { id: "agumon", label: "Agumon" }].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSelect(tab.id as TabId)}
                  className={classNames(
                    "rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap",
                    selectedId === tab.id ? "bg-white text-black shadow" : "text-white/70 hover:bg-white/20"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <SprinkleStarExperience />
      </div>
    );
  }

  if (selectedId === "selva") {
    return (
      <div>
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-white shadow-sm" />
              <div className="text-sm font-semibold tracking-wide text-white">WorldPulse</div>
            </div>
            <div className="flex gap-1">
              {[...PRODUCTS.map(x => ({ id: x.id, label: x.id === "food" ? "Food" : x.id === "chocolate" ? "Chocolate" : x.id === "granola" ? "Granola" : x.id === "fashion" ? "Fashion" : "Furniture" })), { id: "wabisabi", label: "WabiSabi" }, { id: "sprinklestar", label: "SprinkleStar" }, { id: "selva", label: "Selva" }, { id: "agumon", label: "Agumon" }].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSelect(tab.id as TabId)}
                  className={classNames(
                    "rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap",
                    selectedId === tab.id ? "bg-white text-black shadow" : "text-white/70 hover:bg-white/20"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <SelvaExperience />
      </div>
    );
  }

  if (selectedId === "agumon") {
    return (
      <div>
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-white shadow-sm" />
              <div className="text-sm font-semibold tracking-wide text-white">WorldPulse</div>
            </div>
            <div className="flex gap-1">
              {[...PRODUCTS.map(x => ({ id: x.id, label: x.id === "food" ? "Food" : x.id === "chocolate" ? "Chocolate" : x.id === "granola" ? "Granola" : x.id === "fashion" ? "Fashion" : "Furniture" })), { id: "wabisabi", label: "WabiSabi" }, { id: "sprinklestar", label: "SprinkleStar" }, { id: "selva", label: "Selva" }, { id: "agumon", label: "Agumon" }].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSelect(tab.id as TabId)}
                  className={classNames(
                    "rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap",
                    selectedId === tab.id ? "bg-white text-black shadow" : "text-white/70 hover:bg-white/20"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <AgumonExperience />
      </div>
    );
  }

  // Regular product passport view - p is guaranteed to exist here
  const product = p!;

  const makerMedia = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = [];
    if (product.maker.portraitUrl) {
      items.push({
        id: `${product.id}-maker-portrait`,
        type: "image",
        src: product.maker.portraitUrl,
        alt: `${product.maker.name} portrait`,
        caption: `${product.maker.name} — portrait`,
      });
    }
    if (product.maker.workshopUrl) {
      items.push({
        id: `${product.id}-maker-workshop`,
        type: "image",
        src: product.maker.workshopUrl,
        alt: `${product.maker.name} workshop`,
        caption: `${product.maker.name} — workshop`,
      });
    }
    return items;
  }, [product]);

  const galleryItems = useMemo(() => {
    const seen = new Set<string>();
    return [...product.heroMedia, ...product.media, ...makerMedia].filter(item => {
      const signature = `${item.type}-${item.src}`;
      if (seen.has(signature)) return false;
      seen.add(signature);
      return true;
    });
  }, [product.heroMedia, product.media, makerMedia]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 pb-16 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-200/80 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-neutral-900 shadow-sm" />
            <div className="text-sm font-semibold tracking-wide">WorldPulse • Artisanal Passport</div>
          </div>
          <nav className="flex gap-1">
            {[...PRODUCTS.map(x => ({ id: x.id, label: x.id === "food" ? "Food" : x.id === "chocolate" ? "Chocolate" : x.id === "granola" ? "Granola" : x.id === "fashion" ? "Fashion" : "Furniture" })), { id: "wabisabi", label: "WabiSabi" }, { id: "sprinklestar", label: "SprinkleStar" }, { id: "selva", label: "Selva" }, { id: "agumon", label: "Agumon" }].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id as TabId)}
                className={classNames(
                  "rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap",
                  selectedId === tab.id ? "bg-neutral-900 text-white shadow" : "text-neutral-700 hover:bg-neutral-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4">
        {/* Title block */}
        <section className="mt-6 text-center">
          <div className="inline-flex items-center gap-2">
            <GradientBadge from={product.theme.from} via={product.theme.via} to={product.theme.to}>{product.category}</GradientBadge>
            <span className="text-xs text-neutral-500">Demo</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-2 text-base text-neutral-600 sm:text-lg">{product.tagline}</p>
        </section>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setShowProducerTools(prev => !prev)}
            className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300"
          >
            {showProducerTools ? "Hide Producer Tools" : "Show Producer Tools"}
          </button>
        </div>

        {/* Hero carousel */}
        <section className="mt-6">
          <MediaCarousel
            key={`hero-${product.id}`}
            items={product.heroMedia}
            showThumbnails
            thumbnailSize="mini"
            variant="hero"
            aspectRatio="16 / 9"
          />
        </section>

        {/* Two-column: Cert + Story */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CertCard
            p={product}
            showHeader={showBlockchainHeaderRow}
            toggleHeader={() => setShowBlockchainHeaderRow(prev => !prev)}
          />
          <div className="rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6">
            <SectionTitle kicker="Story" title="Provenance & Craft" />
            <p className="text-[15px] leading-relaxed text-neutral-700">{product.description}</p>
            <div className="mt-4 text-xs text-neutral-500">Crafted with respect for origin, people, and place.</div>
          </div>
        </section>

        {/* Map */}
        <section className="mt-8">
          <SectionTitle kicker="Origins" title="Where it was made" />
          {product.id === "chocolate" ? (
            <ProvenanceMap 
              steps={product.steps} 
              title="Bean Journey" 
              primaryColor="#92400e"
            />
          ) : (
            <OriginMap steps={product.steps} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          )}
        </section>

        {/* Maker showcase */}
        <section className="mt-8">
          <SectionTitle kicker="Makers" title="Who crafted it" />
          <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:gap-6 lg:space-y-0">
            <div className="space-y-4">
              <MediaCarousel
                key={`maker-${product.id}`}
                items={makerMedia}
                showThumbnails={false}
                variant="hero"
                aspectRatio="4 / 3"
              />
              <div className="rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold text-neutral-900">{product.maker.name}</div>
                <p className="mt-2 text-sm text-neutral-700">{product.maker.bio}</p>
              </div>
            </div>
            <div className="grid gap-4">
              <Pills title="Materials" items={product.materials} />
              <Pills title="Care" items={product.care} />
            </div>
          </div>
        </section>

        {/* Gallery summary */}
        <section className="mt-10">
          <SectionTitle kicker="Gallery" title="See the craft in motion" />
          <MediaCarousel key={`gallery-${product.id}`} items={galleryItems} />
        </section>

        {/* Producer tools */}
        {showProducerTools && (
          <section className="mt-10 space-y-6 rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            <div>
              <SectionTitle kicker="Access" title="Tap or scan to open" />
              <AccessCard url={product.demoUrl} />
            </div>
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-4 text-xs text-neutral-600">
              <div className="font-semibold text-neutral-800">Swap Content (Quick Guide)</div>
              <ul className="mt-2 list-disc pl-5">
                <li>Change product copy, images, and steps inside the <span className="font-mono">PRODUCTS</span> array (top of file).</li>
                <li>Each step accepts <span className="font-mono">lat</span>/<span className="font-mono">lon</span> — pins update automatically.</li>
                <li>The certificate is visual only. Replace text; no chain action occurs.</li>
                <li>To make separate pages, duplicate this component per product and route by URL.</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* Local styles for subtle animations */}
      <style>{`
        .font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }
        @keyframes sheen { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        .animate-sheen { background-size: 200% 100%; animation: sheen 2.2s linear infinite; }
      `}</style>
    </main>
  );
}
