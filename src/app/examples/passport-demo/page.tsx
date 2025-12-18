"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ArtisanalPassportDemo to avoid SSR issues with leaflet
const ArtisanalPassportDemo = dynamic(
  () => import('@/components/passports/ArtisanalPassportDemo'),
  { ssr: false }
);

function PassportDemoContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') || 'food';

  return <ArtisanalPassportDemo initialProductId={productId} />;
}

export default function PassportDemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50 flex items-center justify-center">Loading...</div>}>
      <PassportDemoContent />
    </Suspense>
  );
}


