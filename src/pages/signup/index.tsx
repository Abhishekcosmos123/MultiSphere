"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaMicrosoft, FaEnvelope, FaEye, FaEyeSlash, FaChevronDown, FaPhone } from "react-icons/fa";
import { validateEmail, validatePassword, validateName, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import { Footer } from "@/components/dashboard/footer";
import { useRouter } from "next/router";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '@/styles/phone-input.css';
import { googleLogin, facebookLogin, microsoftLogin, appleLogin, handleRedirectResult } from '@/lib/socialAuth';
import 'firebase/auth';
import { CRMButtons, ELearningButtons, RealEstateButtons, RestaurantButtons, userRoles } from "@/lib/content";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest, verifyOtpRequest } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { getCookie } from "cookies-next";
import { storage, StorageKeys } from '@/lib/utils/storage';
import { Spinner } from "@/components/ui/spinner";
import { ModuleName } from "..";

interface Module {
    id: number;
    name: string;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    userRole: string;
    country_code: string;
}

interface FormErrors {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

const initialFormData: FormData = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    userRole: "Student",
    country_code: ""
};

const initialErrors: FormErrors = {
    fullName: "",
    email: "",
    phone: "",
    password: ""
};

export default function SignupPage() {
    const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
    const [isOtpVerification, setIsOtpVerification] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const router = useRouter();
    const [selectedModule, setSelectedModule] = useState<Module>({ id: 0, name: 'E-learning' });
    const registerAPIResponse = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const disableTeacher = getCookie("producerMode");
    const otpResponse = useSelector((state: RootState) => state.auth);
    const { currentModule: selected } = useSelector((state: RootState) => state.currentModule);

	useEffect(() => {
		if (selected && typeof selected === "string") {
		  setSelectedModule({ id: 0, name: selected as ModuleName });
		}
	  }, []);  

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value;
        setFormData(prev => ({
            ...prev,
            userRole: selectedRole
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = (): boolean => {
        const newErrors = { ...initialErrors };
        let isValid = true;

        const validations = {
            fullName: () => {
                if (!formData.fullName) {
                    newErrors.fullName = validationMessages.required;
                    return false;
                }
                if (!validateName(formData.fullName)) {
                    newErrors.fullName = validationMessages.name;
                    return false;
                }
                return true;
            },
            contact: () => {
                if (signupMethod === 'email') {
                    if (!formData.email) {
                        newErrors.email = validationMessages.required;
                        return false;
                    }
                    if (!validateEmail(formData.email)) {
                        newErrors.email = validationMessages.email;
                        return false;
                    }
                } else {
                    if (!formData.phone) {
                        newErrors.phone = validationMessages.required;
                        return false;
                    }
                    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
                        newErrors.phone = "Please enter a valid phone number";
                        return false;
                    }
                }
                return true;
            },
            password: () => {
                if (signupMethod === 'phone') return true;
                if (!formData.password) {
                    newErrors.password = validationMessages.required;
                    return false;
                }
                if (!validatePassword(formData.password)) {
                    newErrors.password = validationMessages.password;
                    return false;
                }
                return true;
            }
        };

        Object.values(validations).forEach(validate => {
            if (!validate()) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const provider = signupMethod === 'email' ? 'email' : 'phone';
            const payload: any = {
                name: formData.fullName,
                role: disableTeacher ? "consumer" : (formData.userRole === "Student" ? "consumer" : "producer"),
                provider: provider
            };

            if (signupMethod === 'email') {
                payload.email = formData.email;
                payload.password = formData.password;
            } else {
                const phoneNumber = formData.phone.replace(/^\+/, '');
                const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
                const mobileNumber = phoneNumber.slice(-10);
                payload.phone = mobileNumber;
                payload.country_code = `+${countryCode}`;
            }

            dispatch(registerRequest(payload));
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    useEffect(() => {
        if (registerAPIResponse?.registerResponse?.success) {
            setIsOtpVerification(true);
            showSuccessToast(registerAPIResponse?.registerResponse?.message);
        } else if (registerAPIResponse?.registerResponse?.message) {
            showErrorToast(registerAPIResponse.registerResponse?.message || "Failed to sign up");
        }
        if (registerAPIResponse.error) {
            showErrorToast(registerAPIResponse.error);
        }
    }, [registerAPIResponse.registerResponse, registerAPIResponse.error]);

    useEffect(() => {
        if (otpResponse.otpResponse) {
            showSuccessToast("OTP verified successfully!");
            router.push("/");
        }
    }, [otpResponse.otpResponse, router]);

    const handleSocialSignup = async (provider: string) => {
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
            router.push("/");
        } catch (error: unknown) {
            console.error("Error signing up:", error);
            if (error instanceof Error) {
                showErrorToast(`Failed to sign up with ${provider}: ${error.message}`);
            } else {
                showErrorToast(`Failed to sign up with ${provider}: Unknown error`);
            }
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        const payload: any = {
            otp: otpCode
        };
        if (signupMethod === 'email') {
            payload.email = formData.email;
        } else {
            const phoneNumber = formData.phone.replace(/^\+/, '');
            const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
            const mobileNumber = phoneNumber.slice(-10);
            payload.phone = mobileNumber;
            payload.country_code = `+${countryCode}`;
        }
        dispatch(verifyOtpRequest(payload));
    };

    const renderInput = (name: keyof FormData, label: string, type: string = "text") => {
        if (name === "phone" && signupMethod === 'phone') {
            return (
                <div>
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <div className="mt-1">
                        <PhoneInput
                            country={'us'}
                            value={formData[name]}
                            onChange={(value) => {
                                setFormData(prev => ({ ...prev, [name]: value }));
                                setErrors(prev => ({ ...prev, [name]: "" }));
                            }}
                            inputClass={`w-full ${errors[name] ? "border-red-500" : ""}`}
                            containerClass="phone-input-container"
                            buttonClass="phone-input-button"
                            dropdownClass="phone-input-dropdown"
                            searchClass="phone-input-search"
                            placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                    </div>
                    {errors[name] && (
                        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                    )}
                </div>
            );
        }

        return (
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="relative">
                    <Input
                        id={name}
                        name={name}
                        type={type === "password" ? (showPassword ? "text" : "password") : type}
                        required
                        value={formData[name]}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors[name as keyof FormErrors] ? "border-red-500" : ""}`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                    {type === "password" && (
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    )}
                </div>
                {errors[name as keyof FormErrors] && (
                    <p className="mt-1 text-sm text-red-500">{errors[name as keyof FormErrors]}</p>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            {selectedModule && (
                <NavigationBar buttons={
                    {
                        "E-learning": ELearningButtons,
                        "Real Estate": RealEstateButtons,
                        "CRM Management": CRMButtons,
                        "Restaurants": RestaurantButtons,
                    }[selectedModule.name]
                } />
            )}
            <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-6xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="hidden md:flex w-1/2 items-center justify-center p-8 h-fit">
                        <Image
                            src="/login-illustration.png"
                            alt="Signup Illustration"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-center">
                                    {isOtpVerification ? "Verify your contact" : "Sign up to start your journey"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {!isOtpVerification ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* {!disableTeacher && ( */}
                                        <div className="grid grid-cols-1 gap-4 mb-6">
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Are you?
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.userRole}
                                                        onChange={handleRoleChange}
                                                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-purple-500 focus:ring-purple-500 appearance-none"
                                                    >
                                                        {userRoles.map(role => (
                                                            <option key={role} value={role}>{role}</option>
                                                        ))}
                                                    </select>
                                                    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                        {renderInput("fullName", "Full Name")}

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

                                        {signupMethod === 'email' ?
                                            renderInput("email", "Email", "email") :
                                            renderInput("phone", "Phone Number", "tel")
                                        }

                                        {signupMethod === 'email' && (
                                            renderInput("password", "Password", "password")
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full bg-purple-600 hover:bg-purple-700"
                                            disabled={registerAPIResponse.loading}
                                        >
                                            {registerAPIResponse.loading ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <Spinner size={20} />
                                                    <span>Signing up...</span>
                                                </span>
                                            ) : signupMethod === 'email' ? (
                                                <>
                                                    <FaEnvelope className="mr-2" />
                                                    Sign up with email
                                                </>
                                            ) : (
                                                <>
                                                    <FaPhone className="mr-2" />
                                                    Sign up with phone
                                                </>
                                            )}
                                        </Button>
                                        <div className="relative mt-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Other sign up options</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center space-x-4">
                                            {["Google", "Facebook", "Microsoft", "Apple"].map(provider => (
                                                <Button
                                                    key={provider}
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => handleSocialSignup(provider)}
                                                    disabled={provider === "Microsoft"}
                                                >
                                                    {provider === "Google" && <FcGoogle size={24} />}
                                                    {provider === "Facebook" && <FaFacebook size={24} className="text-blue-600" />}
                                                    {provider === "Microsoft" && <FaMicrosoft size={24} />}
                                                    {provider === "Apple" && <FaApple size={24} />}
                                                </Button>
                                            ))}
                                        </div>

                                        <p className="text-xs text-center text-gray-600 mt-2">
                                            By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{" "}
                                            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                                        </p>
                                    </form>
                                ) : (
                                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Enter OTP
                                            </label>
                                            <div className="flex gap-2 justify-center">
                                                {otp.map((digit, index) => (
                                                    <Input
                                                        key={index}
                                                        type="text"
                                                        maxLength={1}
                                                        className="w-12 h-12 text-center text-xl"
                                                        value={digit}
                                                        onChange={(e) => {
                                                            handleOtpChange(index, e.target.value);
                                                            if (e.target.value && e.target.nextElementSibling) {
                                                                (e.target.nextElementSibling as HTMLElement).focus();
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Backspace' && !digit && index > 0) {
                                                                const prevInput = e.currentTarget.previousElementSibling as HTMLElement;
                                                                prevInput?.focus();
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-center text-gray-600">
                                                Didn&apos;t receive the code? <button type="button" className="text-blue-600 hover:underline">Resend</button>
                                            </p>
                                        </div>
                                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                                            Verify OTP
                                        </Button>
                                    </form>
                                )}
                                <div className="text-center text-sm mt-4">
                                    Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-500">Log in</Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
