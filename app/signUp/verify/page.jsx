"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle, XCircle } from "lucide-react";
import { verifyEmail, resendVerificationCode } from "../../../apiRequest/auth/authapi";

export default function VerifyPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [otpValues, setOtpValues] = useState(["", "", "", ""]);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail") || "user@example.com";
        setEmail(savedEmail);
    }, []);

    const handleOtpChange = (index, value) => {
        if (value && !/^\d+$/.test(value)) return;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value.slice(-1);
        setOtpValues(newOtpValues);
        setError("");

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (otpValues.some(val => val === "")) {
            setError("Please enter the complete 4-digit verification code");
            setIsLoading(false);
            return;
        }

        const otpCode = otpValues.join("");

        try {
            await verifyEmail(otpCode);
            setIsVerified(true);
            setError("");
            
            setTimeout(() => {
                router.push("/signIn");
            }, 2000);
        } catch (err) {
            setError(err.message || "Invalid verification code. Please try again.");
            console.error("Verification error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setOtpValues(["", "", "", ""]);
        setError("");
        setIsLoading(true);

        try {
            await resendVerificationCode(email);
            setError("Verification code has been resent to your email.");
        } catch (err) {
            setError(err.message || "Failed to resend verification code.");
            console.error("Resend error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
                <div className="max-w-md text-center">
                    <Image
                        src="/images/signup.jpg"
                        alt="Sign up illustration"
                        width={700}
                        height={700}
                        className="max-w-xl object-contain"
                    />
                </div>
            </div>

            {/* Right side - Verification Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto bg-red-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                            <Mail className="h-8 w-8 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Verify your email</h1>
                        <p className="text-gray-500 mt-2">
                            We've sent a verification code to <br />
                            <span className="font-medium text-gray-700">{email}</span>
                        </p>
                    </div>

                    {/* Success Message (conditionally rendered) */}
                    {isVerified && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="text-green-800 font-medium">Email verified successfully!</p>
                            <p className="text-green-600 text-sm">Redirecting you to your account...</p>
                        </div>
                    )}

                    {/* Verification Form */}
                    {!isVerified && (
                        <form onSubmit={handleVerify} className="w-full">
                            {/* OTP Input Fields */}
                            <div className="flex justify-center mb-6">
                                {otpValues.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="mx-1 w-12 h-12 text-center text-xl font-bold text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        required
                                    />
                                ))}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 text-center text-red-500">
                                    <XCircle className="h-5 w-5 inline-block mr-1" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-red-500 text-white py-3 rounded-full font-medium hover:bg-red-600 transition duration-300 cursor-pointer mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </button>

                            {/* Resend Code */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Didn't receive the code?{" "}
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-red-500 hover:underline cursor-pointer"
                                    >
                                        Resend
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}