"use client";

import Link from 'next/link';
import { AppLayout } from '@/components/layouts/AppLayout';

const publishedItems = [
  { id: '1', name: 'Premium Coffee Blend', slug: 'premium-coffee', publishedAt: '2024-01-15', scans: 142 },
  { id: '3', name: 'Handcrafted Leather Bag', slug: 'leather-bag', publishedAt: '2024-01-10', scans: 89 },
];

export default function PublishedPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">Published</h1>
          <p className="text-lg text-gray-500 font-light">Your live Digital Product Passports</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="p-8">
            {publishedItems.length === 0 ? (
              <div className="text-center py-16 text-gray-400 font-light">
                <p className="text-lg">No published DPPs yet.</p>
                <Link href="/dashboard/content" className="text-gray-900 underline mt-2 inline-block">
                  Create your first one
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {publishedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl hover:bg-gray-50/50 hover:border-gray-200 transition-all duration-200">
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Published {item.publishedAt} • {item.scans} scans
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/sku/${item.slug}`}
                        target="_blank"
                        className="px-5 py-2.5 text-sm border border-gray-200 rounded-2xl hover:bg-gray-100 font-light transition-all duration-200"
                      >
                        View Live
                      </Link>
                      <Link
                        href={`/dashboard/analytics/${item.id}`}
                        className="px-5 py-2.5 text-sm bg-gray-900 text-white rounded-2xl hover:bg-gray-800 font-light transition-all duration-200"
                      >
                        Analytics
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}


