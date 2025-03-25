import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function SuperAdminResetPasswordPage() {
    return (
        <AuthLayout>
            <div className="max-w-md w-full">
                <ResetPasswordForm role="super-admin" />
            </div>
        </AuthLayout>
    );
}