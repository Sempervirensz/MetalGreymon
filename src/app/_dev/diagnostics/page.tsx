"use client";

import { useState, useEffect } from 'react';

export default function DiagnosticsPage() {
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    setInfo({
      'User Agent': navigator.userAgent,
      'Platform': navigator.platform,
      'Language': navigator.language,
      'Online': navigator.onLine ? 'Yes' : 'No',
      'Screen': `${screen.width}x${screen.height}`,
      'Viewport': `${window.innerWidth}x${window.innerHeight}`,
      'LocalStorage': typeof localStorage !== 'undefined' ? 'Available' : 'Not Available',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Diagnostics</h1>
      <div className="bg-white rounded-lg border p-4">
        <table className="w-full">
          <tbody>
            {Object.entries(info).map(([key, value]) => (
              <tr key={key} className="border-b last:border-0">
                <td className="py-2 font-medium text-gray-500">{key}</td>
                <td className="py-2 text-gray-900">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

