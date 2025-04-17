import { useState, useEffect } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { FaEnvelope, FaArrowLeft, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { useRouter } from "next/router";
import OTPVerification from "@/components/auth/OTPVerification";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { adminForgetPasswordRequest, adminResetPasswordRequest } from "@/store/slices/admin/authAdminSlice";
import { Spinner } from "@/components/ui/spinner";

export default function AdminForgotPasswordPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [isOtpVerification, setIsOtpVerification] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const forgetPasswordResponse = useSelector((state: RootState) => state.adminAuth);

    useEffect(() => {
        const res = forgetPasswordResponse?.forgetPasswordResponse;

        if (res?.success) {
            showSuccessToast(res.message);
            setIsOtpVerification(true);
        } else if (forgetPasswordResponse?.error) {
            showErrorToast(forgetPasswordResponse.error);
        }
    }, [forgetPasswordResponse?.forgetPasswordResponse]);

    const validateForm = () => {
        const newErrors = {
            email: "",
            newPassword: "",
            confirmPassword: "",
        };
        let isValid = true;

        if (!email) {
            newErrors.email = validationMessages.required;
            isValid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = validationMessages.email;
            isValid = false;
        }

        if (showPasswordFields) {
            if (!newPassword) {
                newErrors.newPassword = validationMessages.required;
                isValid = false;
            } else if (newPassword.length < 8) {
                newErrors.newPassword = "Password must be at least 8 characters long";
                isValid = false;
            }

            if (!confirmPassword) {
                newErrors.confirmPassword = validationMessages.required;
                isValid = false;
            } else if (newPassword !== confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            if (!showPasswordFields) {
                const data = { email };
                dispatch(adminForgetPasswordRequest(data));
            } else {
                dispatch(adminResetPasswordRequest({ email: email, password: newPassword }));
                showSuccessToast("Password reset successfully!");
                router.push("/admin/login");
            }
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    const handleResendOTP = () => {
        console.log("Resending OTP to:", email);
    };

    const handleOTPVerify = () => {
        setIsOtpVerification(false);
        setShowPasswordFields(true);
    };

    return (
        <AuthLayout>
            <div className="max-w-md w-full">
                {isOtpVerification ? (
                    <OTPVerification
                        email={email}
                        onVerify={handleOTPVerify}
                        role="admin"
                        onResendOTP={handleResendOTP}
                    />
                ) : (
                    <Card className="bg-white shadow-xl">
                        <CardHeader>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    {showPasswordFields ? (
                                        <FaLock className="w-8 h-8 text-purple-600" />
                                    ) : (
                                        <FaEnvelope className="w-8 h-8 text-purple-600" />
                                    )}
                                </div>
                                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                                    {showPasswordFields ? "Set New Password" : "Reset Password"}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {!showPasswordFields ? (
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
                                ) : (
                                    <>
                                        <div className="relative">
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    required
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className={`mt-1 ${errors.newPassword ? "border-red-500" : ""}`}
                                                    placeholder="Enter new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </button>
                                            </div>
                                            {errors.newPassword && (
                                                <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
                                                    placeholder="Confirm new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                                    {showPasswordFields ? (
                                        <>Reset Password</>
                                    ) : (
                                        <>
                                            {forgetPasswordResponse.loading ? (
                                                <span className="flex items-center space-x-2">
                                                    <Spinner size={20} />
                                                    <span>Sending Reset Link ...</span>
                                                </span>
                                            ) : (
                                                <>
                                                    <FaEnvelope className="mr-2" />
                                                    Send Reset Link
                                                </>
                                            )}
                                        </>
                                    )
                                    }
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