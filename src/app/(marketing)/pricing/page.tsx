"use client";

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    price: 5,
    description: '30-day free trial. Best for trying WorldPulse with a small set of products.',
    features: [
      'Up to 5 products',
      'Core digital product pages (story, info, care)',
      'QR codes for each product',
    ],
  },
  {
    name: 'Standard',
    price: 20,
    popular: true,
    features: [
      'Up to 25 products',
      'Everything in Basic',
      'Brand styling (logo & colors)',
      'Ready for all add-ons (AI, NFC, blockchain, analytics)',
    ],
  },
  {
    name: 'Pro',
    price: 149,
    priceLabel: '$149+/mo',
    features: [
      'Up to 100 products',
      'Everything in Standard',
      'Ideal base for NFC & blockchain verification add-ons',
      'Best fit for multi-channel or seasonal collections',
    ],
  },
];

const addons = [
  { id: 'ai', name: 'AI Storytelling Pro', price: 19, desc: 'Generate rich narratives & brand-matched stories instantly.' },
  { id: 'gallery', name: 'Gallery & Timeline', price: 5, desc: 'Show the production journey from source → maker → finished product.' },
  { id: 'coupons', name: 'Coupons & Upsells', price: 9, desc: 'Convert scans into sales with contextual offers.' },
  { id: 'nfc', name: 'NFC Secure', price: 1, perTag: true, desc: 'Physical tap-to-verify anti-counterfeit protection.', note: '$1.00/tag (min order 10, shipping included)' },
  { id: 'blockchain', name: 'Blockchain Provenance', price: 19, desc: 'Immutable origin records for high-value products.' },
  { id: 'analytics', name: 'Analytics Pro', price: 15, desc: 'Funnel tracking, heatmaps, geographic insights.' },
  { id: 'espr', name: 'ESPR Compliance Pack', price: 29, desc: 'Pre-structured data fields, audit-ready exports, and EU DPP scaffolding.' },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('Standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const planPrice = plans.find(p => p.name === selectedPlan)?.price || 0;
  const addonTotal = addons
    .filter(a => selectedAddons.includes(a.id) && !a.perTag)
    .reduce((sum, a) => sum + a.price, 0);
  const monthlySubtotal = planPrice + addonTotal;
  const hasNFC = selectedAddons.includes('nfc');

  return (
    <div className="min-h-screen bg-wp-black text-wp-white pb-32">
      <header className="flex items-center justify-between px-8 py-6 border-b border-wp-green/30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-wp-mint flex items-center justify-center">
            <span className="text-wp-green font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">WorldPulse</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/examples" className="text-wp-mint hover:text-white transition">Examples</Link>
          <Link href="/signup" className="px-4 py-2 bg-wp-mint text-wp-green font-semibold rounded-lg hover:bg-white transition">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Pricing</h1>
          <p className="text-lg text-wp-mint/80">Choose a plan based on how many products you want to connect. Add optional modules anytime.</p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all ${
                selectedPlan === plan.name
                  ? 'bg-wp-green ring-2 ring-wp-mint'
                  : 'bg-wp-green/50 hover:bg-wp-green/70'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-wp-mint text-wp-green text-xs font-bold rounded-full uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-wp-mint mb-4">
                {plan.priceLabel || `$${plan.price}/mo`}
              </div>
              {plan.description && (
                <p className="text-sm text-wp-mint/70 mb-4">{plan.description}</p>
              )}
              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-wp-mint">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Available Add-Ons</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {addons.map(a => (
              <span key={a.id} className="px-3 py-1 bg-wp-green/50 text-wp-mint text-xs rounded-full">
                {a.name}
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`rounded-xl p-5 cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id)
                    ? 'bg-wp-green ring-2 ring-wp-mint'
                    : 'bg-wp-green/40 hover:bg-wp-green/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{addon.name}</h4>
                  <span className="text-wp-mint font-bold text-sm">
                    {addon.perTag ? addon.note : `$${addon.price}/mo`}
                  </span>
                </div>
                <p className="text-sm text-wp-mint/70">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-wp-green border-t border-wp-mint/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-semibold">{selectedPlan} Plan</span>
            <span className="text-wp-mint/60">|</span>
            <span>{selectedAddons.filter(id => !addons.find(a => a.id === id)?.perTag).length} add-ons selected</span>
            <span className="text-wp-mint/60">|</span>
            <span className="text-wp-mint font-bold text-lg">${monthlySubtotal}/mo</span>
            {hasNFC && <span className="text-xs text-wp-mint/60">(NFC tags billed per order)</span>}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedAddons([])}
              className="px-5 py-2 border border-wp-mint/50 text-wp-mint rounded-lg hover:bg-wp-mint/10 transition"
            >
              Clear add-ons
            </button>
            <Link
              href="/signup"
              className="px-6 py-2 bg-wp-mint text-wp-green font-semibold rounded-lg hover:bg-white transition"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
