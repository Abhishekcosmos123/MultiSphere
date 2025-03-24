import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/ui/button";

interface OTPVerificationProps {
    email: string;
    onVerify: () => void;
}

export default function OTPVerification({ email, onVerify }: OTPVerificationProps) {
    const [otp, setOtp] = useState(Array(6).fill(""));

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onVerify();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    Enter verification code sent to {email}
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
                    Didn't receive the code? <button type="button" className="text-blue-600 hover:underline">Resend</button>
                </p>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Verify Code
            </Button>
        </form>
    );
} 