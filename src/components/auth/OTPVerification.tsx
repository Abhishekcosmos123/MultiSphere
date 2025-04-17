import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShieldAlt, FaEnvelope } from "react-icons/fa";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  showSuccessToast,
  showErrorToast,
} from "@/lib/utils/toast";
import {
  resendOtpRequest,
  verifyForgetPasswordOtpRequest,
  verifyOtpRequestMobile,
} from "@/store/slices/authSlice";
import {
  adminResendOtpRequest,
  adminVerifyForgetPasswordOtpRequest,
  verifyAdminOtpRequestMobile,
} from "@/store/slices/admin/authAdminSlice";
import { RootState } from "@/store";

interface OTPVerificationProps {
  email: string;
  onVerify: () => void;
  role: "admin" | "super-admin" | "user";
  onResendOTP?: () => void;
}

export default function OTPVerification({
  email,
  onVerify,
  role,
  onResendOTP,
}: OTPVerificationProps) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { otpResponse, isLoading: authLoading, success: authSuccess, message: authMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    otpResponse: adminOtpResp,
    isLoading: adminLoading,
    success: adminSuccess,
    message: adminMessage,
    error: adminError,
  } = useSelector((state: RootState) => state.adminAuth);

  const themeColor = {
    "admin": "purple",
    "super-admin": "red",
    "user": "green",
  }[role] || "blue";

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isResendDisabled]);

  // OTP Success handler
  useEffect(() => {
    if (role === "admin") {
      if (adminOtpResp?.success) {
        showSuccessToast(adminOtpResp.message);
        onVerify();
      } else if (adminError) {
        showErrorToast(adminError);
      }
    } else if (otpResponse?.success) {
      showSuccessToast(otpResponse.message);
      onVerify();
    }
  }, [otpResponse, adminOtpResp, adminError, role, onVerify]);

  // Handle resend success
  useEffect(() => {
    if (authSuccess || adminSuccess) {
      setIsResendDisabled(true);
      showSuccessToast(authSuccess ? authMessage : adminMessage);
    }
  }, [authSuccess, adminSuccess]);

  const handleResendOTP = () => {
    if (onResendOTP) onResendOTP();
    const payload = { email };
    if (role === "admin") {
      dispatch(adminResendOtpRequest(payload));
    } else {
      dispatch(resendOtpRequest(payload));
    }
    setTimeLeft(60);
    setIsResendDisabled(true);
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      showErrorToast("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    try {
      if (email.includes("@")) {
        // Email based
        const action = role === "admin"
          ? adminVerifyForgetPasswordOtpRequest
          : verifyForgetPasswordOtpRequest;
        dispatch(action({ email, otp: otpString }));
      } else {
        // Phone based
        const phoneNumber = email.replace(/^\+/, "");
        const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
        const mobileNumber = phoneNumber.slice(-10);
        const action = role === "admin"
          ? verifyAdminOtpRequestMobile
          : verifyOtpRequestMobile;
        dispatch(action({
          phone: mobileNumber,
          country_code: `+${countryCode}`,
          otp: otpString,
        }));
      }
    } catch {
      showErrorToast("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 bg-${themeColor}-100 rounded-full flex items-center justify-center mb-4`}>
            {(role === "admin" || role === "user") ? (
              <FaEnvelope className={`w-8 h-8 text-${themeColor}-600`} />
            ) : (
              <FaShieldAlt className={`w-8 h-8 text-${themeColor}-600`} />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            {role === "admin"
              ? "Admin Verification"
              : role === "super-admin"
              ? "Super Admin Verification"
              : "OTP Verification"}
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
                ref={(el) => {(inputRefs.current[index] = el)}}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[0-9]?$/.test(val)) {
                    const newOtp = [...otp];
                    newOtp[index] = val;
                    setOtp(newOtp);
                    if (val && index < 5) {
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
                disabled={isResendDisabled || authLoading || adminLoading}
                className={`text-${themeColor}-600 hover:text-${themeColor}-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {authLoading || adminLoading
                  ? "Resending OTP..."
                  : isResendDisabled
                  ? `Resend in ${timeLeft}s`
                  : "Resend OTP"}
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
