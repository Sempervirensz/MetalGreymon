"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = auth.getCurrentUser();

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-lg font-light text-gray-900 tracking-tight">
                WorldPulse
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500 uppercase tracking-wider capitalize">{user?.plan || 'free'}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-light transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
