import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { validateEmail, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { useRouter } from "next/router";
import OTPVerification from "@/components/auth/OTPVerification";
import Link from "next/link";

export default function AdminForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isOtpVerification, setIsOtpVerification] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({
        email: "",
    });

    const validateForm = () => {
        const newErrors = {
            email: "",
        };
        let isValid = true;

        if (!email) {
            newErrors.email = validationMessages.required;
            isValid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = validationMessages.email;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const data = { email };
            console.log("Admin forgot password request:", data);
            
            // Simulate successful API call
            setIsOtpVerification(true);
            showSuccessToast("Reset instructions sent successfully!");
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    const handleResendOTP = () => {
        // TODO: Implement resend OTP logic
        console.log("Resending OTP to:", email);
    };

    return (
        <AuthLayout>
            <div className="max-w-md w-full">
                {isOtpVerification ? (
                    <OTPVerification 
                        email={email}
                        onVerify={() => router.push("/admin/reset-password")}
                        role="admin"
                        onResendOTP={handleResendOTP}
                    />
                ) : (
                    <Card className="bg-white shadow-xl">
                        <CardHeader>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <FaEnvelope className="w-8 h-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                                    Reset Password
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Admin Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                                        placeholder="Enter admin email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                                    <FaEnvelope className="mr-2" /> Send Reset Link
                                </Button>
                                <div className="text-center text-sm">
                                    Remember your password?{" "}
                                    <Link href="/admin/login" className="text-purple-600 hover:text-purple-700">
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AuthLayout>
    );
} 