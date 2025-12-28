"use client";

import Link from 'next/link';
import ProductAnalytics from '@/components/analytics/ProductAnalytics';

export default function AgumonAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link href="/examples/agumon" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
            ← Back to Air Force 1
          </Link>
        </div>
      </div>
      <ProductAnalytics 
        productName="Air Force 1"
        productId="AF1_NIKE"
      />
    </div>
  );
}

