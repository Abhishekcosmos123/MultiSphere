import { FaShieldAlt } from "react-icons/fa";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function AdminSignupPage() {
    const handleSubmit = async (data: any) => {
        // TODO: Implement admin signup logic
        console.log("Admin signup data:", data);
    };

    return (
        <AuthLayout>
            <AuthForm
                type="signup"
                role="admin"
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    );
} 