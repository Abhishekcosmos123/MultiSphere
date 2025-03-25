import { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { FaEnvelope, FaEye, FaEyeSlash, FaShieldAlt, FaUser, FaLock, FaPhone, FaFacebook, FaApple, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { validateEmail, validatePassword, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { useRouter } from "next/router";
import OTPVerification from "@/components/auth/OTPVerification";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '@/styles/phone-input.css';

interface AuthFormProps {
    type: 'login' | 'signup';
    role: 'admin' | 'super-admin';
    onSubmit: (data: any) => Promise<void>;
}

interface FormData {
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
}

export default function AuthForm({ type, role, onSubmit }: AuthFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [useMobile, setUseMobile] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = { ...errors };
        let isValid = true;

        // Validate full name for signup
        if (type === 'signup' && !formData.fullName) {
            newErrors.fullName = validationMessages.required;
            isValid = false;
        }

        if (signupMethod === 'phone') {
            // Validate mobile number
            if (!formData.mobileNumber) {
                newErrors.mobileNumber = validationMessages.required;
                isValid = false;
            } else if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
                newErrors.mobileNumber = "Invalid mobile number";
                isValid = false;
            }
        } else {
            // Validate email
            if (!formData.email) {
                newErrors.email = validationMessages.required;
                isValid = false;
            } else if (!validateEmail(formData.email)) {
                newErrors.email = validationMessages.email;
                isValid = false;
            }

            // Validate password
            if (!formData.password) {
                newErrors.password = validationMessages.required;
                isValid = false;
            } else if (!validatePassword(formData.password)) {
                newErrors.password = validationMessages.password;
                isValid = false;
            }

            // Validate confirm password for signup
            if (type === 'signup') {
                if (!formData.confirmPassword) {
                    newErrors.confirmPassword = validationMessages.required;
                    isValid = false;
                } else if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = "Passwords do not match";
                    isValid = false;
                }
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                if (useMobile) {
                    setOtpSent(true);
                } else {
                    await onSubmit(formData);
                    setOtpSent(true);
                }
            } catch (error) {
                showErrorToast(`${type === 'login' ? 'Login' : 'Signup'} failed. Please try again.`);
            } finally {
                setIsLoading(false);
            }
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSocialAuth = (provider: string) => {
        // TODO: Implement social auth logic
        console.log(`${type === 'login' ? 'Logging in' : 'Signing up'} with ${provider}`);
        showSuccessToast(`${type === 'login' ? 'Logging in' : 'Signing up'} with ${provider}`);
    };

    const getThemeColor = () => role === 'super-admin' ? 'red' : 'purple';

    return (
        <div>
            <div className="flex flex-col items-center mb-6">
                {!otpSent && (
                    <>
                        <div className={`w-16 h-16 bg-${getThemeColor()}-100 rounded-full flex items-center justify-center mb-4`}>
                            <FaShieldAlt className={`w-8 h-8 text-${getThemeColor()}-600`} />
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-900">
                            {type === 'login' ? `${role === 'super-admin' ? 'Super ' : ''}Admin Login` : `Create ${role === 'super-admin' ? 'Super ' : ''}Admin Account`}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                            {type === 'login' 
                                ? `Access restricted to ${role === 'super-admin' ? 'super ' : ''}administrators only`
                                : `Restricted access - Requires valid credentials`}
                        </p>
                    </>
                )}
            </div>

            {!otpSent ? (
                <>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {type === 'signup' && (
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
                                        placeholder="Enter your full name"
                                    />
                                    <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                                )}
                            </div>
                        )}

                        <div className="flex border-b border-gray-200 mb-4">
                            <button
                                type="button"
                                className={`flex-1 py-2 text-center ${signupMethod === 'email' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                                onClick={() => setSignupMethod('email')}
                            >
                                <FaEnvelope className="inline mr-2" /> Email
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 text-center ${signupMethod === 'phone' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                                onClick={() => setSignupMethod('phone')}
                            >
                                <FaPhone className="inline mr-2" /> Phone
                            </button>
                        </div>

                        {signupMethod === 'phone' ? (
                            <div>
                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <div className="mt-1">
                                    <PhoneInput
                                        country={'us'}
                                        value={formData.mobileNumber}
                                        onChange={(value) => handleInputChange({ target: { name: 'mobileNumber', value } } as any)}
                                        inputClass={`w-full ${errors.mobileNumber ? "border-red-500" : ""}`}
                                        containerClass="phone-input-container"
                                        buttonClass="phone-input-button"
                                        dropdownClass="phone-input-dropdown"
                                        searchClass="phone-input-search"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                                {errors.mobileNumber && (
                                    <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
                                )}
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        {role === 'super-admin' ? 'Super Admin Email' : 'Admin Email'}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required={signupMethod === 'email'}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                                            placeholder={`Enter ${role === 'super-admin' ? 'super admin' : 'admin'} email`}
                                        />
                                        <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
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
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required={signupMethod === 'email'}
                                            value={formData.password}
                                            onChange={handleInputChange}
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
                                </div>

                                {type === 'signup' && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required={signupMethod === 'email'}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
                                                placeholder="Confirm password"
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
                                )}
                            </>
                        )}

                        <Button 
                            type="submit" 
                            className={`w-full bg-${getThemeColor()}-600 hover:bg-${getThemeColor()}-700`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                "Processing..."
                            ) : (
                                <>
                                    {signupMethod === 'email' ? (
                                        <><FaEnvelope className="mr-2" /> {type === 'login' ? 'Login with email' : 'Sign up with email'}</>
                                    ) : (
                                        <><FaPhone className="mr-2" /> Continue with phone</>
                                    )}
                                </>
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
                                onClick={() => handleSocialAuth('Google')}
                                className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <FcGoogle className="w-6 h-6" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialAuth('Facebook')}
                                className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <FaFacebook className="w-6 h-6 text-blue-600" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialAuth('Apple')}
                                className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <FaApple className="w-6 h-6" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialAuth('Microsoft')}
                                className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <FaMicrosoft className="w-6 h-6 text-blue-500" />
                            </button>
                        </div>
                    </form>
                    {type === 'signup' && (
                        <div className="text-center text-xs text-gray-500 mt-4">
                            By signing up, you agree to our{" "}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                                Terms of Use
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                                Privacy Policy
                            </Link>
                        </div>
                    )}
                    <div className="text-center text-sm text-gray-600 mt-2">
                        {type === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <Link 
                            href={`/${role}/${type === 'login' ? 'signup' : 'login'}`} 
                            className={`text-${getThemeColor()}-600 hover:text-${getThemeColor()}-700 font-medium`}
                        >
                            {type === 'login' ? 'Sign up' : 'Login'}
                        </Link>
                    </div>
                </>
            ) : (
                <OTPVerification
                    email={formData.mobileNumber || formData.email || ''}
                    onVerify={() => router.push(`/${role}/dashboard`)}
                    role={role}
                />
            )}
        </div>
    );
} 