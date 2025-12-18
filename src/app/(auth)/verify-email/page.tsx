import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <Card className="text-center">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-gray-600 mb-6">We've sent a verification link to your email address.</p>
        <Link href="/login" className="text-brand-600 hover:underline">Back to sign in</Link>
      </Card>
    </AuthLayout>
  );
}


