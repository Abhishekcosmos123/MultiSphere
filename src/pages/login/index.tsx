import { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaMicrosoft, FaEnvelope, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { validateEmail, validatePassword, validationMessages } from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { NavigationBar } from "../_components/dashboard/navigation-bar";
import { Footer } from "../_components/dashboard/footer";
import { useRouter } from "next/router";

export default function LoginPage() {
	const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
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
			} else if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
				newErrors.phone = "Please enter a valid phone number";
				isValid = false;
			}
		}

		if (!password) {
			newErrors.password = validationMessages.required;
			isValid = false;
		} else if (!validatePassword(password)) {
			newErrors.password = validationMessages.password;
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// TODO: Implement login logic
			const credentials = loginMethod === 'email' 
				? { email, password }
				: { phone, password };
			console.log("Login attempt with:", credentials);
			showSuccessToast("Login successful!");
			router.push("/restaurant");
		} else {
			showErrorToast("Please fix the errors before submitting");
		}
	};

	const handleSocialLogin = (provider: string) => {
		// TODO: Implement social login logic
		console.log(`Logging in with ${provider}`);
		showSuccessToast(`Logging in with ${provider}`);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<NavigationBar />
			<div className="flex-grow flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
				<div className="max-w-5xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
					<div className="hidden md:flex w-1/2 items-center justify-center p-8">
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
								<form onSubmit={handleSubmit} className="space-y-6">
									{loginMethod === 'email' ? (
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
									) : (
										<div>
											<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
												Phone Number
											</label>
											<Input
												id="phone"
												type="tel"
												required
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
												placeholder="Enter your phone number"
											/>
											{errors.phone && (
												<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
											)}
										</div>
									)}
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
									<Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
										{loginMethod === 'email' ? (
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
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
