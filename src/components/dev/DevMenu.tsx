'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, ShoppingBag, Coffee, Wine, Shirt, Table, Cookie, Zap } from 'lucide-react';

const routes = [
  // Marketing
  { name: 'Home', path: '/', icon: Home },
  { name: 'Pricing', path: '/pricing', icon: ShoppingBag },
  { name: 'Product', path: '/product', icon: ShoppingBag },
  { name: 'About', path: '/about', icon: ShoppingBag },
  { name: 'Contact', path: '/contact', icon: ShoppingBag },
  { name: 'FAQ', path: '/faq', icon: ShoppingBag },
  
  // Examples
  { name: 'Examples', path: '/examples', icon: Zap },
  { name: 'Wabi-Sabi', path: '/examples/wabi-sabi', icon: Coffee },
  { name: 'Domaine Étoile', path: '/examples/sprinkle-star', icon: Wine },
  { name: 'Selva Coffee', path: '/examples/laguardia', icon: Coffee },
  { name: 'Air Force 1', path: '/examples/agumon', icon: Shirt },
  { name: 'Passport Demo', path: '/examples/passport-demo', icon: Zap },
  
  // Passport Demo Products
  { name: 'Sauvignon Blanc', path: '/examples/passport-demo?product=food', icon: Wine },
  { name: 'Madagascar Chocolate', path: '/examples/passport-demo?product=chocolate', icon: Cookie },
  { name: 'eatPurposefully', path: '/examples/passport-demo?product=granola', icon: Cookie },
  { name: 'Denim Jacket', path: '/examples/passport-demo?product=fashion', icon: Shirt },
  { name: 'Walnut Table', path: '/examples/passport-demo?product=furniture', icon: Table },
  
  // Auth
  { name: 'Login', path: '/login', icon: ShoppingBag },
  { name: 'Signup', path: '/signup', icon: ShoppingBag },
  
  // Dashboard
  { name: 'Dashboard', path: '/dashboard', icon: ShoppingBag },
  { name: 'Create DPP', path: '/dashboard/content', icon: ShoppingBag },
  { name: 'Preview', path: '/dashboard/preview', icon: ShoppingBag },
  { name: 'Published', path: '/dashboard/published', icon: ShoppingBag },
  { name: 'Plans', path: '/dashboard/plans', icon: ShoppingBag },
];

export default function DevMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999] bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all"
        aria-label="Toggle dev menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[9998] w-80 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Dev Menu</h2>
            <p className="text-xs text-gray-500 mt-1">Quick navigation</p>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
            <div className="p-2">
              {routes.map((route) => {
                const Icon = route.icon;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-700"
                  >
                    <Icon size={16} className="text-gray-400" />
                    <span>{route.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

