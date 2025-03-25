import { FaShieldAlt, FaLock } from "react-icons/fa";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SuperAdminSignupPage() {
    const handleSubmit = async (data: any) => {
        // TODO: Implement super admin signup logic
        console.log("Super admin signup data:", data);
    };

    return (
        <AuthLayout>
            <AuthForm
                type="signup"
                role="super-admin"
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    );
} 