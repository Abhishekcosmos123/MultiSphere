import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaMicrosoft, FaEnvelope, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { validateEmail, validatePassword, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { Footer } from "@/components/dashboard/footer";
import { useRouter } from "next/router";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import OTPValidation from "@/components/auth/OTPVerification";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '@/styles/phone-input.css';
import { googleLogin, facebookLogin, microsoftLogin, appleLogin } from '@/lib/socialAuth';
import 'firebase/auth';
import { loginRequest } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Spinner } from "@/components/ui/spinner";
import { ModuleName } from "..";
import { fetchModuleContent } from "@/utils/fetchModuleContent";
import { fetchModulesRequest } from "@/store/slices/profileSlice";

interface Module {
	id: number;
	name: string;
}

export default function LoginPage() {
	const dispatch = useDispatch();
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
	const [selectedModule, setSelectedModule] = useState<Module | null>(null)
	const user = useSelector((state: RootState) => state.auth);
	const { currentModule: selected } = useSelector((state: RootState) => state.profile);
	const [moduleContent, setModuleContent] = useState<any>(null);

	useEffect(() => {
		dispatch(fetchModulesRequest())
	}, [])

	useEffect(() => {
		if (selected && typeof selected === "string") {
			setSelectedModule({ id: 0, name: selected as ModuleName });
		}
	}, [selected]);

	useEffect(() => {
		if (user.isAuthenticated && loginMethod === 'email') {
			router.push("/");
			showSuccessToast("Logged In Successfully");
		}

		if (user.isAuthenticated && loginMethod === 'phone') {
			setIsOtpVerification(true);
			showSuccessToast("OTP sent successfully");
		}

		if (user.error) {
			showErrorToast(user.error);
		}
	}, [user.isAuthenticated, user.error, loginMethod, router]);


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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const phoneNumber = phone.replace(/^\+/, '');
			const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
			const mobileNumber = phoneNumber.slice(-10);
			const payload = {
				...(loginMethod === 'email' ? { email, password } : { country_code: `+${countryCode}`, phone: mobileNumber })
			};

			dispatch(loginRequest(payload));
		} else {
			showErrorToast("Please fix the errors before submitting");
		}
	};

	const handleSocialLogin = async (provider: string) => {
		try {
			let user;
			switch (provider) {
				case "Google":
					user = await googleLogin();
					break;
				case "Facebook":
					user = await facebookLogin();
					break;
				case "Microsoft":
					user = await microsoftLogin();
					break;
				case "Apple":
					user = await appleLogin();
					break;
				default:
					throw new Error("Unsupported provider");
			}
			console.log("User signed in:", user);
			console.log("Fetched user data:", { provider, user }); // Log fetched data
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
							alt="Login Illustration"
							width={400}
							height={400}
						/>
					</div>
					<div className="w-full md:w-1/2 p-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-center">
									Log in to continue your journey
								</CardTitle>
							</CardHeader>
							<CardContent>
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
								{isOtpVerification ? (
									<OTPValidation
										email={phone}
										onVerify={() => router.push("/")}
										role="user"
									/>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										{loginMethod === 'email' ? (
											<>
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
															placeholder="Enter your password"
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
													<div className="mt-1">
														<Link href="/reset" className="text-sm text-blue-600 hover:text-blue-500">
															Forgot password?
														</Link>
													</div>
												</div>
											</>
										) : (
											<div>
												<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
													Phone Number
												</label>
												<div className="mt-1">
													<PhoneInput
														country={'in'}
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
										<Button
											type="submit"
											className="w-full bg-purple-600 hover:bg-purple-700"
											disabled={user.loading}
										>
											{user.loading ? (
												<span className="flex items-center justify-center space-x-2">
													<Spinner size={20} />
													<span>Logging in...</span>
												</span>
											) : loginMethod === 'email' ? (
												<><FaEnvelope className="mr-2" /> Continue with email</>
											) : (
												<><FaPhone className="mr-2" /> Continue with phone</>
											)}
										</Button>
										<div className="relative mt-4">
											<div className="absolute inset-0 flex items-center">
												<div className="w-full border-t border-gray-300"></div>
											</div>
											<div className="relative flex justify-center text-sm">
												<span className="px-2 bg-white text-gray-500">Or continue with</span>
											</div>
										</div>

										<div className="flex justify-center space-x-4">
											<Button
												type="button"
												variant="outline"
												onClick={() => handleSocialLogin('Google')}
											>
												<FcGoogle size={24} />
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => handleSocialLogin('Facebook')}
											>
												<FaFacebook size={24} className="text-blue-600" />
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => handleSocialLogin('Microsoft')}
												disabled
											>
												<FaMicrosoft size={24} />
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => handleSocialLogin('Apple')}
											>
												<FaApple size={24} />
											</Button>
										</div>
										<div className="text-center text-sm">
											Don&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-500">Sign up</Link>
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
