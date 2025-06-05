"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle, XCircle } from "lucide-react";

export default function VerifyPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [otpValues, setOtpValues] = useState(["", "", "", ""]);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    // Get email from localStorage on component mount
    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail") || "user@example.com";
        setEmail(savedEmail);
    }, []);

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d+$/.test(value)) return;

        const newOtpValues = [...otpValues];
        // Take only the last character if multiple are pasted
        newOtpValues[index] = value.slice(-1);
        setOtpValues(newOtpValues);

        // Clear any previous errors
        setError("");

        // Move to next input if current one is filled
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle keydown events for backspace navigation
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            // Move to previous input when backspace is pressed on an empty input
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle OTP verification submission
    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Check if all OTP fields are filled
        if (otpValues.some(val => val === "")) {
            setError("Please enter the complete 4-digit verification code");
            setIsLoading(false);
            return;
        }

        const otpCode = otpValues.join("");

        try {
            const response = await fetch("https://royolex.vercel.app/api/v1/user/verifyEmail", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: otpCode
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsVerified(true);
                setError("");
                
                // Redirect after showing success message
                setTimeout(() => {
                    router.push("/"); // Redirect to dashboard or home page
                }, 2000);
            } else {
                setError(data.message || "Invalid verification code. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Verification error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resending the code
    const handleResend = async () => {
        // Reset the OTP fields
        setOtpValues(["", "", "", ""]);
        setError("");

        // Focus on the first input
        inputRefs.current[0].focus();

        try {
            const response = await fetch("https://royolex.vercel.app/api/v1/user/resendVerificationCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Include email if needed by the API
                body: JSON.stringify({
                    email: localStorage.getItem("userEmail")
                }),
            });

            if (response.ok) {
                alert("New verification code sent to your email");
            } else {
                const data = await response.json();
                setError(data.message || "Failed to resend code. Please try again.");
            }
        } catch (err) {
            setError("Failed to resend code. Please try again.");
            console.error("Resend error:", err);
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