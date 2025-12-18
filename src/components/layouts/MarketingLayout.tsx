import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-600">
            WorldPulse
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/examples" className="text-gray-600 hover:text-gray-900">
              Examples
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/product" className="text-gray-600 hover:text-gray-900">
              How it works
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Start Free</Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/product">How it works</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/examples">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/legal/privacy">Privacy</Link></li>
                <li><Link href="/legal/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-500">© 2024 WorldPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

