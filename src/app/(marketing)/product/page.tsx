import { MarketingLayout } from "@/components/layouts/MarketingLayout";

export default function ProductPage() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">How WorldPulse Works</h1>
          <div className="prose prose-lg">
            <p className="text-xl text-gray-600 mb-8">
              WorldPulse makes it easy to create digital product passports that 
              showcase your product's journey, materials, and sustainability credentials.
            </p>
            {/* Placeholder for full product page content */}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

