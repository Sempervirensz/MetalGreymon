import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">Set new password</h1>
        <form className="space-y-4">
          <input type="password" placeholder="New password" className="w-full px-4 py-3 border rounded-lg" />
          <input type="password" placeholder="Confirm password" className="w-full px-4 py-3 border rounded-lg" />
          <Button className="w-full">Update Password</Button>
        </form>
      </Card>
    </AuthLayout>
  );
}

