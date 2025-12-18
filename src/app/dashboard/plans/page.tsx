"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';
import { auth } from '@/lib/auth';

const PLANS = {
  basic: {
    name: 'Basic',
    price: 5,
    skuLimit: 5,
    description: '30‑day free trial. Best for trying WorldPulse with a small set of products.',
    features: [
      'Up to 5 products',
      'Core digital product pages (story, info, care)',
      'QR codes for each product',
    ],
  },
  standard: {
    name: 'Standard',
    price: 20,
    skuLimit: 25,
    description: 'For growing brands with a focused catalog where every product deserves a rich story.',
    features: [
      'Up to 25 products',
      'Everything in Basic',
      'Brand styling (logo & colors)',
      'Ready for all add‑ons (AI, NFC, blockchain, analytics)',
    ],
    popular: true,
  },
  pro: {
    name: 'Pro',
    price: 149,
    skuLimit: 100,
    description: 'For wineries, local producers, and makers with larger catalogs that need a premium experience.',
    features: [
      'Up to 100 products',
      'Everything in Standard',
      'Ideal base for NFC & blockchain verification add‑ons',
      'Best fit for multi‑channel or seasonal collections',
    ],
  },
};

const ADDONS = [
  { category: 'Story & Content', name: 'AI Storytelling Pro', price: '$19/mo' },
  { category: 'Story & Content', name: 'Gallery & Timeline', price: '$5/mo' },
  { category: 'Commerce', name: 'Coupons & Upsells', price: '$9/mo' },
  { category: 'Verification', name: 'NFC Secure', price: '$1.00/tag' },
  { category: 'Verification', name: 'Blockchain Provenance', price: '$19/mo' },
  { category: 'Analytics', name: 'Analytics Pro', price: '$15/mo' },
  { category: 'Compliance', name: 'ESPR Compliance Pack', price: '$29/mo' },
];

export default function PlansPage() {
  const [user, setUser] = useState<ReturnType<typeof auth.getCurrentUser>>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const currentPlan = user?.plan || 'free';

  const handleSelectPlan = async (planKey: string) => {
    setLoading(planKey);
    // Simulate checkout - in production, integrate with Stripe
    setTimeout(() => {
      alert(`Redirecting to checkout for ${planKey} plan...`);
      setLoading(null);
    }, 1000);
  };

  return (
    <AppLayout>
      <main className="min-h-screen">
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">Pricing</h1>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Choose a plan based on how many products you want to connect. Add optional modules anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {Object.entries(PLANS).map(([key, plan]) => (
              <div
                key={key}
                className={`bg-white rounded-3xl shadow-sm p-10 hover:border-gray-200 transition-all ${
                  plan.popular ? 'border-2 border-blue-600 shadow-lg relative' : 'border border-gray-100/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}
                <h2 className="text-2xl font-light text-gray-900 mb-4">{plan.name}</h2>
                <div className="mb-6">
                  <span className="text-5xl font-light text-gray-900">${plan.price}</span>
                  <span className="text-gray-400 text-xl ml-2">/mo</span>
                </div>
                <p className="text-sm text-gray-600 mb-6 font-light leading-relaxed">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 font-light flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(key)}
                  disabled={loading === key}
                  className={`w-full py-4 px-6 rounded-2xl font-medium text-sm tracking-wide transition-all duration-200 ${
                    loading === key
                      ? 'bg-gray-400 text-white cursor-wait'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md'
                  }`}
                >
                  {loading === key ? 'Processing...' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6 text-center">Available Add‑Ons</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {ADDONS.map((addon, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-full font-light border border-blue-100"
                >
                  {addon.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-light mb-4 tracking-tight">Add‑Ons</h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                Choose modules to enhance storytelling, verification, analytics, and compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADDONS.map((addon, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-3xl border border-gray-700/50 p-8 hover:border-gray-600 transition-all backdrop-blur-sm"
                >
                  <span className="inline-block px-3 py-1.5 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full mb-4">
                    {addon.category}
                  </span>
                  <h2 className="text-xl font-light text-white mb-3">{addon.name}</h2>
                  <p className="text-lg font-light text-gray-300">{addon.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
