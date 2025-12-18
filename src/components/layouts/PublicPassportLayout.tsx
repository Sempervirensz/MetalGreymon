import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PublicPassportLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand-600">
            WorldPulse
          </Link>
          <Link href="/signup">
            <Button size="sm">Create yours</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}


