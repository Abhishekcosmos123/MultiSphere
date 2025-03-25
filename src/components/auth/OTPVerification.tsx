import { useState, useEffect, useRef } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaShieldAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";

interface OTPVerificationProps {
    email: string;
    onVerify: () => void;
    role: 'admin' | 'super-admin' | 'user';
    onResendOTP?: () => void;
}

export default function OTPVerification({ email, onVerify, role, onResendOTP }: OTPVerificationProps) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (timeLeft > 0 && isResendDisabled) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsResendDisabled(false);
        }
        return () => clearInterval(timer);
    }, [timeLeft, isResendDisabled]);

    const handleResendOTP = () => {
        if (onResendOTP) {
            onResendOTP();
            setTimeLeft(60);
            setIsResendDisabled(true);
            showSuccessToast("OTP resent successfully!");
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            showErrorToast("Please enter a valid 6-digit OTP");
            return;
        }

        setIsVerifying(true);
        try {
            // TODO: Implement actual OTP verification logic
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            showSuccessToast("OTP verified successfully!");
            onVerify();
        } catch (error) {
            showErrorToast("Invalid OTP. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const themeColor = role === 'admin' ? 'purple' : role === 'super-admin' ? 'red' : role === 'user' ? 'green' : 'blue';

    return (
        <Card className="bg-white">
            <CardHeader>
                <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 bg-${themeColor}-100 rounded-full flex items-center justify-center mb-4`}>
                        {role === 'admin' || role === 'user' ? (
                            <FaEnvelope className={`w-8 h-8 text-${themeColor}-600`} />
                        ) : (
                            <FaShieldAlt className={`w-8 h-8 text-${themeColor}-600`} />
                        )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                        {role === 'admin' ? 'Admin Verification' : 
                         role === 'super-admin' ? 'Super Admin Verification' : 
                         'Verification'}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        Enter the 6-digit code sent to {email}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex justify-center space-x-4">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                type="text"
                                maxLength={1}
                                className={`w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 focus:border-${themeColor}-500 focus:ring-${themeColor}-500`}
                                value={digit}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
                                        const newOtp = [...otp];
                                        newOtp[index] = value;
                                        setOtp(newOtp);
                                        if (value && index < 5) {
                                            inputRefs.current[index + 1]?.focus();
                                        }
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                                        inputRefs.current[index - 1]?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{" "}
                            <button
                                onClick={handleResendOTP}
                                disabled={isResendDisabled}
                                className={`text-${themeColor}-600 hover:text-${themeColor}-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isResendDisabled ? `Resend in ${timeLeft}s` : "Resend OTP"}
                            </button>
                        </p>
                    </div>

                    <Button
                        onClick={handleVerify}
                        disabled={otp.join("").length !== 6 || isVerifying}
                        className={`w-full bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white font-semibold py-3 rounded-lg transition-colors`}
                    >
                        {isVerifying ? "Verifying..." : "Verify & Continue"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 