import { MarketingLayout } from "@/components/layouts/MarketingLayout";

const faqs = [
  { q: "What is a Digital Product Passport?", a: "A DPP is a digital record that provides transparency about a product's origin, materials, and lifecycle." },
  { q: "How much does it cost?", a: "We offer a free tier with 5 passports. Paid plans start at $29/month." },
  { q: "Can I customize the design?", a: "Yes! Pro and Enterprise plans include custom branding options." },
];

export default function FAQPage() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">FAQ</h1>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b pb-6">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}


