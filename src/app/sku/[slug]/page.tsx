import Link from 'next/link';

export default function PublicSKUPage({ params }: { params: { slug: string } }) {
  const productName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Minimal header */}
      <header className="py-4 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <span className="text-lg font-light text-gray-900">WorldPulse</span>
          <Link 
            href="/signup"
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
          >
            Create yours
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 overflow-hidden">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#032422] to-[#101010] p-12 text-center">
            <div className="w-24 h-24 bg-[#E2ECE9]/20 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl">🏷️</span>
            </div>
            <h1 className="text-3xl font-bold text-[#E2ECE9] mb-2">{productName}</h1>
            <p className="text-[#E2ECE9]/70">Digital Product Passport</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <section>
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Origin Story</h2>
              <p className="text-gray-700 leading-relaxed">
                This product was born from a commitment to excellence and craftsmanship. Every detail reflects 
                generations of expertise, passed down through careful apprenticeship and refined through modern innovation.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Materials</h2>
              <p className="text-gray-700 leading-relaxed">
                Premium, responsibly-sourced materials selected for durability and minimal environmental impact. 
                Every component is traceable to its origin.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Sustainability</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">Carbon Neutral</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">B Corp Certified</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">Recyclable</span>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Care Instructions</h2>
              <p className="text-gray-700 leading-relaxed">
                Store in a cool, dry place. Clean with a soft cloth. Avoid direct sunlight for extended periods. 
                With proper care, this product will last for generations.
              </p>
            </section>
          </div>

          {/* Verification badge */}
          <div className="px-8 pb-8">
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verified Authentic</p>
                <p className="text-xs text-gray-500">This product passport is genuine</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Want to create digital product passports for your products?</p>
          <Link 
            href="/signup"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            Get Started Free
          </Link>
        </div>
      </main>
    </div>
  );
}


