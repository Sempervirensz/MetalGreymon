import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Card>
        <h1 className="text-2xl font-bold mb-2 text-center">Reset password</h1>
        <p className="text-gray-600 text-sm text-center mb-6">Enter your email to receive a reset link</p>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
          <Button className="w-full">Send Reset Link</Button>
        </form>
        <p className="text-sm text-center mt-4">
          <Link href="/login" className="text-brand-600 hover:underline">Back to sign in</Link>
        </p>
      </Card>
    </AuthLayout>
  );
}


