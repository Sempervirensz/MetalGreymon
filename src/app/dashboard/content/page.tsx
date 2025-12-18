"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';

const fields = [
  { name: 'productName', label: 'WINE/PRODUCT NAME', placeholder: 'Enter wine or product name' },
  { name: 'heroImage', label: 'HERO IMAGE URL', placeholder: 'https://example.com/image.jpg' },
  { name: 'originStory', label: 'ORIGIN STORY', placeholder: 'Tell the story behind this product...', textarea: true },
  { name: 'externalUrl', label: 'EXTERNAL PRODUCT URL', placeholder: 'https://example.com/product' },
  { name: 'workshopImage', label: 'WORKSHOP IMAGE URL', placeholder: 'https://example.com/workshop.jpg' },
  { name: 'materials', label: 'MATERIALS', placeholder: 'List materials or ingredients...', textarea: true },
  { name: 'careInstructions', label: 'CARE INSTRUCTIONS', placeholder: 'How to care for this product...', textarea: true },
  { name: 'videoUrl', label: 'SHORT VIDEO URL', placeholder: 'https://example.com/video.mp4' },
  { name: 'productionDetails', label: 'PRODUCTION DETAILS', placeholder: 'Details about how this was made...', textarea: true },
  { name: 'tastingNotes', label: 'TASTING NOTES', placeholder: 'Rich, full-bodied with notes of...', textarea: true },
  { name: 'awards', label: 'AWARDS & REVIEWS', placeholder: 'Awards, ratings, or reviews...', textarea: true },
  { name: 'productionSteps', label: 'PRODUCTION STEPS', placeholder: 'Step-by-step production process...', textarea: true },
  { name: 'stepCoordinates', label: 'STEP COORDINATES', placeholder: 'Geographic coordinates or locations' },
  { name: 'galleryUrls', label: 'GALLERY MEDIA URLS (COMMA-SEPARATED)', placeholder: 'https://example.com/img1.jpg, https://example.com/img2.jpg', textarea: true },
  { name: 'productDetails', label: 'PRODUCT DETAILS', placeholder: 'Additional product specifications...', textarea: true },
];

export default function CreatePage() {
  const router = useRouter();
  const [dppType, setDppType] = useState('Product DPP');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAIGenerate = async () => {
    if (!formData.productName?.trim()) return;
    
    setAiLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        originStory: `${prev.productName} was born from a commitment to excellence and craftsmanship. Every detail reflects generations of expertise.`,
        materials: 'Premium, responsibly-sourced materials selected for durability and minimal environmental impact.',
        careInstructions: 'Store in a cool, dry place. Handle with care. With proper care, this product will last for generations.',
        productionDetails: 'Crafted using time-honored techniques combined with sustainable practices.',
      }));
      setAiLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      router.push('/dashboard/preview?id=new');
    }, 1000);
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-wp-black text-wp-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-wp-green/30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-wp-mint flex items-center justify-center">
            <span className="text-wp-green font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">WorldPulse</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-wp-mint text-sm">Free</span>
          <button 
            onClick={() => { auth.logout(); router.push('/login'); }}
            className="text-wp-mint/70 hover:text-wp-white text-sm transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Create Digital Product Passport</h1>
        <p className="text-wp-mint/70 mb-8">Build your DPP with all product information</p>

        <div className="bg-wp-green rounded-2xl p-8">
          {/* DPP Type */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-wp-mint/80 mb-2 uppercase tracking-wide">
              DPP Type
            </label>
            <select
              value={dppType}
              onChange={(e) => setDppType(e.target.value)}
              className="w-full bg-wp-black/50 border border-wp-mint/20 rounded-lg px-4 py-3 text-wp-white focus:outline-none focus:ring-2 focus:ring-wp-mint/50"
            >
              <option>Product DPP</option>
              <option>Wine DPP</option>
              <option>Artisan DPP</option>
            </select>
          </div>

          {/* AI Generate Button */}
          <div className="mb-8">
            <button
              onClick={handleAIGenerate}
              disabled={aiLoading || !formData.productName?.trim()}
              className="w-full py-3 bg-wp-mint/20 border border-wp-mint/40 text-wp-mint font-semibold rounded-lg hover:bg-wp-mint/30 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <span>✨</span> AI Generate Content & Image
                </>
              )}
            </button>
            <p className="text-xs text-wp-mint/50 mt-2 text-center">
              Enter a product name above, then click to auto-fill fields and generate a hero image
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold text-wp-mint/80 mb-2 uppercase tracking-wide">
                  {field.label}
                </label>
                {field.textarea ? (
                  <textarea
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={3}
                    className="w-full bg-wp-black/50 border border-wp-mint/20 rounded-lg px-4 py-3 text-wp-white placeholder-wp-mint/40 focus:outline-none focus:ring-2 focus:ring-wp-mint/50 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full bg-wp-black/50 border border-wp-mint/20 rounded-lg px-4 py-3 text-wp-white placeholder-wp-mint/40 focus:outline-none focus:ring-2 focus:ring-wp-mint/50"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-wp-mint text-wp-green font-semibold rounded-lg hover:bg-white transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save & Preview'}
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-3 border border-wp-mint/50 text-wp-mint rounded-lg hover:bg-wp-mint/10 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
