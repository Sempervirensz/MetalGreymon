"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ExternalLink } from 'lucide-react';

const variants = [
  // Original 3 variants
  {
    id: 'wabi-sabi',
    name: 'Wabi-Sabi Ceramics',
    subtitle: 'The Vessel — Edition 001',
    category: 'Artisan Goods',
    thumbnail: '🏺',
    color: 'from-amber-900/20 to-stone-900/40',
    image: '/images/wabisabi/cinematic_ceramic_vase_in_natural_light.png',
    description: 'A serene, scroll-driven experience celebrating handcrafted Japanese ceramics with provenance mapping and maker stories.',
    features: ['Parallax scroll', 'Maker profile', 'Certificate of authenticity'],
  },
  {
    id: 'sprinkle-star',
    name: 'Domaine Étoile',
    subtitle: 'Reserve Noir — 2021 Vintage',
    category: 'Wine & Spirits',
    thumbnail: '🍷',
    color: 'from-red-900/30 to-purple-900/40',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    description: 'An elegant wine passport featuring tasting notes, vineyard provenance, and winemaker heritage.',
    features: ['Tasting profile', 'Vineyard map', 'Blockchain verified'],
  },
  {
    id: 'laguardia',
    name: 'Selva Coffee',
    subtitle: 'Jungle Grown — Chiapas, Mexico',
    category: 'Food & Beverage',
    thumbnail: '☕',
    color: 'from-green-900/30 to-amber-900/40',
    image: '/images/selva/coffee_cherries_on_branch_in_mexico.png',
    description: 'Bold, magazine-style layout showcasing origin story, fair trade credentials, and flavor profiles.',
    features: ['Crop passport', 'Fairtrade certified', 'Tasting notes'],
  },
  // New variants from TokyoDrift - use original passport-demo
  {
    id: 'food',
    name: 'Sauvignon Blanc',
    subtitle: 'Napa Valley — 2019 Vintage',
    category: 'Wine & Spirits',
    thumbnail: '🍷',
    color: 'from-rose-700/30 to-amber-600/40',
    image: '/images/food/food_hero_wine.jpg',
    description: 'Estate Sauvignon Blanc from Rutherford, picked at dawn and pressed within hours. Cold ferment preserves citrus and stone-fruit aromatics.',
    features: ['Single-vineyard', 'Cold-fermented', 'French oak'],
    useOriginal: true,
  },
  {
    id: 'chocolate',
    name: 'Madagascar Chocolate',
    subtitle: 'Single-Origin — Ambanja',
    category: 'Food & Beverage',
    thumbnail: '🍫',
    color: 'from-amber-800/30 to-rose-700/40',
    image: '/images/StoneGrindz/chocolatehero.jpeg',
    description: 'Single-origin cocoa from Ambanja, Madagascar. Beans are fermented in wooden boxes, sun-dried beneath tropical skies.',
    features: ['Bean-to-bar', 'Sambirano Valley', 'Floral acidity'],
    useOriginal: true,
  },
  {
    id: 'granola',
    name: 'eatPurposefully Granola',
    subtitle: 'Hand-mixed • Slow-baked',
    category: 'Food & Beverage',
    thumbnail: '🥣',
    color: 'from-amber-600/30 to-yellow-500/40',
    image: '/images/Eat Purposefully/granolahero.jpg',
    description: 'Cold-climate oats, layered with nuts and seeds, gently sweetened with pure maple syrup. Mixed by hand and slow-baked.',
    features: ['Cold-climate oats', 'Hand-mixed', 'No shortcuts'],
    useOriginal: true,
  },
  {
    id: 'fashion',
    name: 'Okayama Denim Jacket',
    subtitle: 'Selvedge — 13.5oz',
    category: 'Fashion',
    thumbnail: '🧥',
    color: 'from-indigo-600/30 to-slate-900/40',
    image: '/images/fashion/fashion_denim_hero.jpg',
    description: 'Cut from shuttle-loomed selvedge woven in Okayama. Stitched with core-spun thread, finished with hand-burnished leather.',
    features: ['Selvedge denim', 'Vegetable-tanned trims', 'Copper hardware'],
    useOriginal: true,
  },
  {
    id: 'furniture',
    name: 'Walnut Coffee Table',
    subtitle: 'FSC Walnut — Hand-rubbed',
    category: 'Furniture',
    thumbnail: '🪑',
    color: 'from-rose-500/30 to-stone-800/40',
    image: '/images/furniture/furniture_hero_walnut.jpg',
    description: 'From Oregon black walnut to a Danish-inspired silhouette. Joinery you can feel; a finish that grows richer with every year.',
    features: ['FSC certified', 'Danish design', 'Bridle joints'],
    useOriginal: true,
  },
  {
    id: 'agumon',
    name: 'Air Force 1',
    subtitle: 'Nike — Since 1982',
    category: 'Footwear',
    thumbnail: '👟',
    color: 'from-orange-500/30 to-black/60',
    image: '/images/agumon/nike_air_force_1_cinematic_white_on_black.png',
    description: 'Born on the hardwood, raised on the asphalt. The Air Force 1 transcended its athletic roots to become the canvas of the streets.',
    features: ['NFC verified', 'Premium leather', 'Heritage icon'],
  },
];

export default function ExamplesPage() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewVariant = variants.find(v => v.id === previewId);

  return (
    <div className="min-h-screen bg-wp-black text-wp-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-wp-black/90 backdrop-blur-md border-b border-wp-green/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-wp-mint flex items-center justify-center">
              <span className="text-wp-green font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-semibold">WorldPulse</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-wp-mint/80 hover:text-wp-white transition text-sm">
              Pricing
            </Link>
            <Link href="/signup" className="px-5 py-2 bg-wp-mint text-wp-green font-semibold rounded-full hover:bg-white transition text-sm">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Example <span className="text-wp-mint">Passports</span>
          </h1>
          <p className="text-xl text-wp-mint/70 max-w-2xl mx-auto">
            Explore {variants.length} different styles of Digital Product Passports. Each template is fully customizable to match your brand.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {['All', 'Food & Beverage', 'Wine & Spirits', 'Fashion', 'Furniture', 'Footwear', 'Artisan Goods'].map((cat) => (
            <span key={cat} className="px-4 py-2 bg-wp-green/50 text-wp-mint/80 text-sm rounded-full border border-wp-mint/10 hover:border-wp-mint/30 cursor-pointer transition">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Variants Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${variant.color} border border-wp-mint/10 hover:border-wp-mint/30 transition-all duration-300`}>
                  {/* Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={variant.image}
                      alt={variant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wp-black via-wp-black/20 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-wp-black/60 backdrop-blur-sm text-wp-mint text-xs rounded-full border border-wp-mint/20">
                        {variant.category}
                      </span>
                    </div>

                    {/* Preview button */}
                    <button
                      onClick={() => setPreviewId(variant.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-wp-mint/20 backdrop-blur-sm rounded-full flex items-center justify-center text-wp-mint hover:bg-wp-mint hover:text-wp-green transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{variant.thumbnail}</span>
                      <div>
                        <h3 className="text-lg font-bold text-wp-white leading-tight">{variant.name}</h3>
                        <p className="text-xs text-wp-mint/60">{variant.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-wp-mint/70 mb-3 line-clamp-2">
                      {variant.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {variant.features.map((feature) => (
                        <span key={feature} className="px-2 py-0.5 bg-wp-green/50 text-wp-mint/80 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={'useOriginal' in variant && variant.useOriginal ? `/examples/passport-demo?product=${variant.id}` : `/examples/${variant.id}`}
                        className="flex-1 py-2.5 bg-wp-mint text-wp-green font-semibold rounded-lg text-center hover:bg-white transition text-sm"
                      >
                        View Experience
                      </Link>
                      <button
                        onClick={() => setPreviewId(variant.id)}
                        className="px-3 py-2.5 border border-wp-mint/30 text-wp-mint rounded-lg hover:bg-wp-mint/10 transition"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-wp-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to create your own?</h2>
          <p className="text-wp-mint/70 mb-8 text-lg">
            Start with any template and customize it to match your brand perfectly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-wp-mint text-wp-green font-bold rounded-full hover:bg-white transition"
            >
              Start Creating Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-wp-mint/50 text-wp-mint font-semibold rounded-full hover:bg-wp-mint/10 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewVariant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setPreviewId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-wp-black rounded-3xl overflow-hidden border border-wp-mint/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-wp-green/30">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{previewVariant.thumbnail}</span>
                  <div>
                    <h3 className="font-bold">{previewVariant.name}</h3>
                    <p className="text-sm text-wp-mint/60">{previewVariant.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={'useOriginal' in previewVariant && previewVariant.useOriginal ? `/examples/passport-demo?product=${previewVariant.id}` : `/examples/${previewVariant.id}`}
                    className="px-4 py-2 bg-wp-mint text-wp-green font-semibold rounded-lg hover:bg-white transition text-sm flex items-center gap-2"
                  >
                    Open Full Experience <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => setPreviewId(null)}
                    className="w-10 h-10 rounded-full bg-wp-green hover:bg-wp-mint/20 flex items-center justify-center transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Preview iframe */}
              <div className="aspect-video bg-wp-green">
                <iframe
                  src={'useOriginal' in previewVariant && previewVariant.useOriginal ? `/examples/passport-demo?product=${previewVariant.id}` : `/examples/${previewVariant.id}`}
                  className="w-full h-full"
                  title={`Preview: ${previewVariant.name}`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
