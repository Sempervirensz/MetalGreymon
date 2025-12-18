"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      auth.signup(email, password);
      router.push(next);
    } catch {
      setError('Failed to create account');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-10 sm:p-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50/50 border border-red-100 text-red-600 rounded-2xl text-sm backdrop-blur-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 focus:bg-white transition-all duration-200 text-sm font-light"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 focus:bg-white transition-all duration-200 text-sm font-light"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl font-medium text-sm tracking-wide hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md mt-8"
        >
          Create Account
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500 font-light">
        Already have an account?{' '}
        <Link href="/login" className="text-gray-900 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <Link href="/" className="text-lg font-bold text-gray-900 mb-8 inline-block">WorldPulse</Link>
          <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">Get Started</h1>
          <p className="text-lg text-gray-500 font-light">Create your account</p>
        </div>
        
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
