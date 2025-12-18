"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layouts/AppLayout';
import { auth } from '@/lib/auth';

type SKU = {
  id: string;
  name: string;
  template: string;
  status: 'draft' | 'published';
  slug: string | null;
};

const PLAN_LIMITS = {
  free: 1,
  silver: 5,
  gold: 25,
};

// Mock data for demo
const mockSKUs: SKU[] = [
  { id: '1', name: 'Premium Coffee Blend', template: 'product', status: 'published', slug: 'premium-coffee' },
  { id: '2', name: 'Organic Cotton T-Shirt', template: 'storytelling', status: 'draft', slug: null },
];

export default function DashboardPage() {
  const [user, setUser] = useState<ReturnType<typeof auth.getCurrentUser>>(null);
  const [skus] = useState<SKU[]>(mockSKUs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(auth.getCurrentUser());
    setLoading(false);
  }, []);

  const limit = user ? PLAN_LIMITS[user.plan] : 0;
  const publishedCount = skus.filter(s => s.status === 'published').length;

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center py-12">
            <p className="text-gray-400 font-light">Loading...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">Dashboard</h1>
          <p className="text-lg text-gray-500 font-light">Manage your Digital Product Passports</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Current Plan</h3>
            <p className="text-4xl font-light capitalize mt-2 text-gray-900">{user?.plan || 'Free'}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">DPPs</h3>
            <p className="text-4xl font-light mt-2 text-gray-900">{skus.length} <span className="text-2xl text-gray-400">/ {limit}</span></p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Published</h3>
            <p className="text-4xl font-light mt-2 text-gray-900">{publishedCount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-12 text-center">
          {skus.length >= limit ? (
            <div className="p-6 bg-yellow-50/50 border border-yellow-100 rounded-3xl backdrop-blur-sm">
              <p className="text-yellow-800 font-light">
                You've reached your limit. <Link href="/dashboard/plans" className="underline font-medium">Upgrade your plan</Link> to create more DPPs.
              </p>
            </div>
          ) : (
            <Link
              href="/dashboard/content"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium text-sm tracking-wide hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Create New DPP
            </Link>
          )}
        </div>

        {/* SKUs List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="p-8 border-b border-gray-100/50">
            <h2 className="text-2xl font-light text-gray-900">Your Digital Product Passports</h2>
          </div>
          <div className="p-8">
            {skus.length === 0 ? (
              <div className="text-center py-16 text-gray-400 font-light">
                <p className="text-lg">No DPPs yet.</p>
                <p className="text-sm mt-2">Create your first Digital Product Passport to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {skus.map((sku) => (
                  <div key={sku.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl hover:bg-gray-50/50 hover:border-gray-200 transition-all duration-200">
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-gray-900 mb-1">{sku.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                        {sku.template} • <span className="capitalize">{sku.status}</span>
                      </p>
                      {sku.status === 'published' && sku.slug && (
                        <Link
                          href={`/sku/${sku.slug}`}
                          target="_blank"
                          className="text-sm text-gray-600 hover:text-gray-900 font-light mt-2 inline-block"
                        >
                          View live →
                        </Link>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/preview?id=${sku.id}`}
                        className="px-5 py-2.5 text-sm border border-gray-200 rounded-2xl hover:bg-gray-100 font-light transition-all duration-200"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/dashboard/analytics/${sku.id}`}
                        className="px-5 py-2.5 text-sm border border-gray-200 rounded-2xl hover:bg-gray-100 font-light transition-all duration-200"
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
