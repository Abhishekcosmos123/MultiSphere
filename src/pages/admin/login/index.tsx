import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaFacebook, FaApple, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { validateEmail, validatePassword, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { useRouter } from "next/router";
import OTPValidation from "@/components/auth/OTPVerification";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '@/styles/phone-input.css';
import Link from "next/link";
import { googleLogin, facebookLogin, microsoftLogin, appleLogin } from '@/lib/socialAuth';
import 'firebase/auth';

export default function AdminLoginPage() {
    const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isOtpVerification, setIsOtpVerification] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        password: "",
    });

    const validateForm = () => {
        const newErrors = {
            email: "",
            phone: "",
            password: "",
        };
        let isValid = true;

        if (loginMethod === 'email') {
            if (!email) {
                newErrors.email = validationMessages.required;
                isValid = false;
            } else if (!validateEmail(email)) {
                newErrors.email = validationMessages.email;
                isValid = false;
            }
        } else {
            if (!phone) {
                newErrors.phone = validationMessages.required;
                isValid = false;
            } else if (phone.length < 10) {
                newErrors.phone = "Please enter a valid phone number";
                isValid = false;
            }
        }

        if (loginMethod === 'email' && !password) {
            newErrors.password = validationMessages.required;
            isValid = false;
        } else if (loginMethod === 'email' && !validatePassword(password)) {
            newErrors.password = validationMessages.password;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const credentials = loginMethod === 'email' 
                ? { email, password }
                : { phone };
            console.log("Admin login attempt with:", credentials);
            
            if (loginMethod === 'email') {
                showSuccessToast("Admin login successful!");
                router.push("/admin/dashboard");
            } else {
                // Simulate successful API call for OTP
                setIsOtpVerification(true);
            }
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    const handleSocialLogin = async (provider: string) => {
        try {
            let user;
            switch (provider) {
                case "Google":
                    await googleLogin();
                    break;
                case "Facebook":
                    await facebookLogin();
                    break;
                case "Microsoft":
                    await microsoftLogin();
                    break;
                case "Apple":
                    await appleLogin();
                    break;
                default:
                    throw new Error("Unsupported provider");
            }
            console.log("User signed in:", user);
            showSuccessToast(`Signed up with ${provider}`);
            router.push("/restaurant");
        } catch (error: unknown) {
            console.error("Error signing up:", error);
            if (error instanceof Error) {
                showErrorToast(`Failed to sign up with ${provider}: ${error.message}`);
            } else {
                showErrorToast(`Failed to sign up with ${provider}: Unknown error`);
            }
        }
    };

    return (
        <AuthLayout>
            <div className="max-w-md w-full">
                <Card className="bg-white shadow-xl">
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            {!isOtpVerification && (
                                <>
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                        <FaEnvelope className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                                        Admin Login
                                    </CardTitle>
                                </>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!isOtpVerification && (
                            <>
                                <div className="flex border-b border-gray-200 mb-6">
                                    <button
                                        className={`flex-1 py-2 text-center ${loginMethod === 'email' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                                        onClick={() => setLoginMethod('email')}
                                    >
                                        <FaEnvelope className="inline mr-2" /> Email
                                    </button>
                                    <button
                                        className={`flex-1 py-2 text-center ${loginMethod === 'phone' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                                        onClick={() => setLoginMethod('phone')}
                                    >
                                        <FaPhone className="inline mr-2" /> Phone
                                    </button>
                                </div>
                            </>
                        )}
                        {isOtpVerification ? (
                            <OTPValidation 
                                email={phone} 
                                onVerify={() => router.push("/admin/dashboard")}
                                role="admin"
                            />
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {loginMethod === 'email' ? (
                                    <>
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
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
                                                    placeholder="Enter password"
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
                                            <Link
                                                href="/admin/forgot-password"
                                                className="text-sm text-purple-600 hover:text-purple-700 mt-1 inline-block"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <div className="mt-1">
                                            <PhoneInput
                                                country={'us'}
                                                value={phone}
                                                onChange={(value) => setPhone(value)}
                                                inputClass={`w-full ${errors.phone ? "border-red-500" : ""}`}
                                                containerClass="phone-input-container"
                                                buttonClass="phone-input-button"
                                                dropdownClass="phone-input-dropdown"
                                                searchClass="phone-input-search"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                        )}
                                    </div>
                                )}
                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                                    {loginMethod === 'email' ? (
                                        <><FaEnvelope className="mr-2" /> Login with email</>
                                    ) : (
                                        <><FaPhone className="mr-2" /> Continue with phone</>
                                    )}
                                </Button>
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin('Google')}
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        <FcGoogle className="w-6 h-6" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin('Facebook')}
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        <FaFacebook className="w-6 h-6 text-blue-600" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin('Apple')}
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        <FaApple className="w-6 h-6" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin('Microsoft')}
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        <FaMicrosoft className="w-6 h-6 text-blue-500" />
                                    </button>
                                </div>
                                <div className="text-center text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link href="/admin/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthLayout>
    );
} 