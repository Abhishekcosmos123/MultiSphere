import { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaApple,
  FaMicrosoft,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaChevronDown,
  FaPhone,
} from "react-icons/fa";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validationMessages,
} from "@/lib/validations";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import { NavigationBar } from "../_components/dashboard/navigation-bar";
import { Footer } from "../_components/dashboard/footer";
import { useRouter } from "next/router";
import { BUSINESS_TYPES } from "@/lib/content";

type BusinessType = keyof typeof BUSINESS_TYPES;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  businessType: BusinessType;
  userRole: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  businessType: "Restaurant",
  userRole: "Manager",
};

const initialErrors: FormErrors = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function SignupPage() {
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const router = useRouter();

  const handleBusinessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBusiness = e.target.value as BusinessType;
    const defaultRole = BUSINESS_TYPES[selectedBusiness][0];

    setFormData((prev) => ({
      ...prev,
      businessType: selectedBusiness,
      userRole: defaultRole,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      userRole: e.target.value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
        if (signupMethod === "email") {
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
        if (!formData.password) {
          newErrors.password = validationMessages.required;
          return false;
        }
        if (!validatePassword(formData.password)) {
          newErrors.password = validationMessages.password;
          return false;
        }
        return true;
      },
      confirmPassword: () => {
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = validationMessages.required;
          return false;
        }
        if (
          !validateConfirmPassword(formData.password, formData.confirmPassword)
        ) {
          newErrors.confirmPassword = validationMessages.confirmPassword;
          return false;
        }
        return true;
      },
    };

    Object.values(validations).forEach((validate) => {
      if (!validate()) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup data:", formData);
      setIsOtpVerification(true);
      showSuccessToast("Account created successfully!");
    } else {
      showErrorToast("Please fix the errors before submitting");
    }
  };

  const handleSocialSignup = (provider: string) => {
    showSuccessToast(`Signing up with ${provider}`);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccessToast("OTP verified successfully!");
    setTimeout(() => router.push("/restaurant"), 1000);
  };

  const renderDropdowns = () => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Type
        </label>
        <div className="relative">
          <select
            value={formData.businessType}
            onChange={handleBusinessChange}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-purple-500 focus:ring-purple-500 appearance-none"
          >
            {Object.keys(BUSINESS_TYPES).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Role
        </label>
        <div className="relative">
          <select
            value={formData.userRole}
            onChange={handleRoleChange}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-purple-500 focus:ring-purple-500 appearance-none"
          >
            {BUSINESS_TYPES[formData.businessType].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );

  const renderInput = (
    name: keyof FormData,
    label: string,
    type: string = "text",
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
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
        <p className="mt-1 text-sm text-red-500">
          {errors[name as keyof FormErrors]}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="hidden md:flex w-1/2 items-center justify-center p-8">
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
                  {isOtpVerification
                    ? "Verify your contact"
                    : "Sign up to start your journey"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isOtpVerification ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {renderDropdowns()}
                    {renderInput("fullName", "Full Name")}

                    <div className="flex border-b border-gray-200 mb-4">
                      <button
                        type="button"
                        className={`flex-1 py-2 text-center ${signupMethod === "email" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"}`}
                        onClick={() => setSignupMethod("email")}
                      >
                        <FaEnvelope className="inline mr-2" /> Email
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 text-center ${signupMethod === "phone" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"}`}
                        onClick={() => setSignupMethod("phone")}
                      >
                        <FaPhone className="inline mr-2" /> Phone
                      </button>
                    </div>

                    {signupMethod === "email"
                      ? renderInput("email", "Email", "email")
                      : renderInput("phone", "Phone Number", "tel")}

                    {renderInput("password", "Password", "password")}
                    {renderInput(
                      "confirmPassword",
                      "Confirm Password",
                      "password",
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {signupMethod === "email" ? (
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
                        <span className="px-2 bg-white text-gray-500">
                          Other sign up options
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {["Google", "Facebook", "Microsoft", "Apple"].map(
                        (provider) => (
                          <Button
                            key={provider}
                            type="button"
                            variant="outline"
                            onClick={() => handleSocialSignup(provider)}
                          >
                            {provider === "Google" && <FcGoogle size={24} />}
                            {provider === "Facebook" && (
                              <FaFacebook size={24} className="text-blue-600" />
                            )}
                            {provider === "Microsoft" && (
                              <FaMicrosoft size={24} />
                            )}
                            {provider === "Apple" && <FaApple size={24} />}
                          </Button>
                        ),
                      )}
                    </div>

                    <p className="text-xs text-center text-gray-600 mt-2">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
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
                              if (
                                e.target.value &&
                                e.target.nextElementSibling
                              ) {
                                (
                                  e.target.nextElementSibling as HTMLElement
                                ).focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Backspace" &&
                                !digit &&
                                index > 0
                              ) {
                                const prevInput = e.currentTarget
                                  .previousElementSibling as HTMLElement;
                                prevInput?.focus();
                              }
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-center text-gray-600">
                        Didn't receive the code?{" "}
                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Verify OTP
                    </Button>
                  </form>
                )}
                <div className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Log in
                  </Link>
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
