import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-xl font-bold text-brand-600">
            WorldPulse
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}


