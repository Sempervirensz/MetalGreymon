"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layouts/AppLayout';

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const handlePublish = () => {
    alert('Publishing DPP...');
    router.push('/dashboard/published');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">Preview</h1>
          <p className="text-gray-500 font-light">See how your DPP will look to customers</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/content"
            className="px-6 py-3 border border-gray-200 rounded-2xl font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all"
          >
            Edit
          </Link>
          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-medium text-sm hover:bg-gray-800 transition-all shadow-sm"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 overflow-hidden">
        <div className="bg-gray-900 p-8 flex justify-center">
          <div className="w-[300px] h-[600px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-black rounded-t-[40px] flex items-center justify-center">
              <div className="w-24 h-5 bg-black rounded-full" />
            </div>
            <div className="pt-10 p-6 h-full overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🛍️</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Premium Product</h2>
                <p className="text-sm text-gray-500">by WorldPulse</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Origin</h3>
                  <p className="text-sm text-gray-700">Crafted with care using traditional methods...</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Materials</h3>
                  <p className="text-sm text-gray-700">100% sustainably sourced materials...</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Care</h3>
                  <p className="text-sm text-gray-700">Store in a cool, dry place...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <PreviewContent />
      </Suspense>
    </AppLayout>
  );
}
