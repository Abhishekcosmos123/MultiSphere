import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail, validatePassword, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import { Footer } from "@/components/dashboard/footer";
import OTPVerification from "@/components/auth/OTPVerification";
import { forgetPasswordRequest, resetPasswordRequest } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModuleName } from "..";
import { Spinner } from "@/components/ui/spinner";
import { fetchModuleContent } from "@/utils/fetchModuleContent";
import { fetchModulesRequest } from "@/store/slices/profileSlice";

interface Module {
    id: number;
    name: string;
}

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const router = useRouter();
    const [selectedModule, setSelectedModule] = useState<Module | null>(null)
    const forgetPasswordResponse = useSelector((state: RootState) => state.auth);
    const { currentModule: selected } = useSelector((state: RootState) => state.profile);
    const [moduleContent, setModuleContent] = useState<any>(null);

    useEffect(() => {
        if (selected && typeof selected === "string") {
            setSelectedModule({ id: 0, name: selected as ModuleName });
        }
    }, [selected]);

    useEffect(() => {
        dispatch(fetchModulesRequest())
      }, [])

    useEffect(() => {
		const loadModuleContent = async () => {
			try {
				if (selectedModule && selectedModule.name) {
					const data = await fetchModuleContent(selectedModule.name);
					setModuleContent(data);
				}
			} catch (err) {
				console.error("Failed to load module content", err);
				showErrorToast("Unable to load content.");
			}
		};

		loadModuleContent();
	}, [selectedModule]);

    useEffect(() => {
        const { email: queryEmail } = router.query;
        if (queryEmail && typeof queryEmail === 'string') {
            setEmail(queryEmail);
        }
    }, [router.query]);

    useEffect(() => {
        const response = forgetPasswordResponse?.forgetPasswordResponse;
        if (response?.success) {
            showSuccessToast(response.message);
            setShowOTPVerification(true);
        } else if (forgetPasswordResponse?.error) {
            showErrorToast(forgetPasswordResponse.error);
        }
    }, [forgetPasswordResponse?.forgetPasswordResponse?.success, forgetPasswordResponse?.error]);

    const validateForm = () => {
        const newErrors = {
            email: "",
            newPassword: "",
            confirmPassword: ""
        };
        let isValid = true;

        if (!email) {
            newErrors.email = validationMessages.required;
            isValid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = validationMessages.email;
            isValid = false;
        }

        if (showNewPasswordForm) {
            if (!newPassword) {
                newErrors.newPassword = validationMessages.required;
                isValid = false;
            } else if (!validatePassword(newPassword)) {
                newErrors.newPassword = validationMessages.password;
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
            if (!showOTPVerification) {
                dispatch(forgetPasswordRequest({ email: email }));
            }
        } else {
            showErrorToast("Please fix the errors before submitting");
        }
    };

    const handleOTPVerification = () => {
        setShowOTPVerification(false);
        setShowNewPasswordForm(true);
    };

    const handlePasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(resetPasswordRequest({
                email: email,
                password: newPassword
            }));
            showSuccessToast("Password reset successful!");
            router.push("/login");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value);
        if (!value) {
            setErrors(prev => ({
                ...prev,
                newPassword: validationMessages.required
            }));
        } else if (!validatePassword(value)) {
            setErrors(prev => ({
                ...prev,
                newPassword: validationMessages.password
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                newPassword: ""
            }));
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrors(prev => ({
            ...prev,
            confirmPassword: value !== newPassword ? "Passwords do not match" : ""
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            {selectedModule && moduleContent && (
				<NavigationBar buttons={moduleContent.navbarButtons} />
			)}
            <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-5xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="hidden md:flex w-1/2 items-center justify-center p-8 h-fit">
                        <Image
                            src="/login-illustration.png"
                            alt="Reset Password Illustration"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-center">
                                    {showNewPasswordForm ? "Set New Password" :
                                        showOTPVerification ? "" :
                                            "Reset your password"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {showOTPVerification ? (
                                    <OTPVerification
                                        email={email}
                                        onVerify={handleOTPVerification}
                                        role="user"
                                        onResendOTP={() => {
                                            showSuccessToast("OTP resent successfully!");
                                            setShowOTPVerification(true);
                                        }}
                                    />
                                ) : showNewPasswordForm ? (
                                    <form onSubmit={handlePasswordReset} className="space-y-6">
                                        <div>
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    value={newPassword}
                                                    onChange={handlePasswordChange}
                                                    className={`mt-1 ${errors.newPassword ? "border-red-500" : ""}`}
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
                                            {errors.newPassword && (
                                                <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    required
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange}
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
                                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                                            Reset Password
                                        </Button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-purple-600 hover:bg-purple-700"
                                            disabled={forgetPasswordResponse.loading}
                                        >
                                            {forgetPasswordResponse.loading ? (
                                                <span className="flex items-center space-x-2">
                                                    <Spinner size={16} />
                                                    <span>Sending Instructions...</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <FaEnvelope className="mr-2" />
                                                    Send Reset Instructions
                                                </span>
                                            )}
                                        </Button>
                                        <div className="text-center text-sm">
                                            Remember your password? <Link href="/login" className="text-blue-600 hover:text-blue-500">Back to Login</Link>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer socialLinks={moduleContent?.socialLinks || []} footerLinks={moduleContent?.footerLinks || []} />
        </div>
    );
}