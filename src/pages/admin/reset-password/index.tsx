import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function AdminResetPasswordPage() {
    return (
        <AuthLayout>
            <div className="max-w-md w-full">
                <ResetPasswordForm role="admin" />
            </div>
        </AuthLayout>
    );
} 