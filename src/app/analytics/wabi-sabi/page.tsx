"use client";

import Link from 'next/link';
import ProductAnalytics from '@/components/analytics/ProductAnalytics';

export default function WabiSabiAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link href="/examples/wabi-sabi" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
            ← Back to Wabi-Sabi Ceramics
          </Link>
        </div>
      </div>
      <ProductAnalytics 
        productName="Wabi-Sabi Ceramics"
        productId="WABI_SABI_POT"
      />
    </div>
  );
}

