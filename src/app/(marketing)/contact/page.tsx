import { MarketingLayout } from "@/components/layouts/MarketingLayout";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <MarketingLayout>
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 border rounded-lg" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
            <textarea placeholder="Message" rows={5} className="w-full px-4 py-3 border rounded-lg" />
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </section>
    </MarketingLayout>
  );
}


