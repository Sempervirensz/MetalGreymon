import { MarketingLayout } from "@/components/layouts/MarketingLayout";

export default function AboutPage() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">About WorldPulse</h1>
          <p className="text-xl text-gray-600">
            We're building the future of product transparency.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}

