import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { validatePassword, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { useRouter } from "next/router";

interface ResetPasswordFormProps {
    role: 'admin' | 'super-admin';
    onSubmit?: (data: { password: string; confirmPassword: string }) => void;
}

export default function ResetPasswordForm({ role, onSubmit }: ResetPasswordFormProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const themeColor = role === 'admin' ? 'purple' : 'red';

    const validateForm = () => {
        const newErrors = {
            password: "",
            confirmPassword: "",
        };
        let isValid = true;

        if (!password) {
            newErrors.password = validationMessages.required;
            isValid = false;
        } else if (!validatePassword(password)) {
            newErrors.password = validationMessages.password;
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = validationMessages.required;
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const data = { password, confirmPassword };
            
            try {
                if (onSubmit) {
                    await onSubmit(data);
                }
                showSuccessToast("Password reset successful!");
                router.push(`/${role}/login`);
            } catch (error) {
                showErrorToast("Failed to reset password. Please try again.");
            }
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    return (
        <Card className="bg-white shadow-xl">
            <CardHeader>
                <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 bg-${themeColor}-100 rounded-full flex items-center justify-center mb-4`}>
                        <FaLock className={`w-8 h-8 text-${themeColor}-600`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                        Reset Your Password
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        Please enter your new password
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
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
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <Button type="submit" className={`w-full bg-${themeColor}-600 hover:bg-${themeColor}-700`}>
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 