"use client";

import Link from 'next/link';
import { AppLayout } from '@/components/layouts/AppLayout';

export default function AnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="mb-8">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">Analytics</h1>
          <p className="text-gray-500 font-light">Performance data for DPP #{params.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Scans</h3>
            <p className="text-4xl font-light text-gray-900">142</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">This Week</h3>
            <p className="text-4xl font-light text-gray-900">23</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Avg. Time</h3>
            <p className="text-4xl font-light text-gray-900">45s</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Bounce Rate</h3>
            <p className="text-4xl font-light text-gray-900">12%</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Scan History</h2>
          <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
            [Chart placeholder - integrate with analytics provider]
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

