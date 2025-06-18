"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "../../apiRequest/auth/authapi";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      console.log("Login successful:", result);
      
      router.push('/');
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message || "Login request failed. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex min-h-screen bg-white">
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Hi!</h1>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">Welcome Back!</h2>
              <p className="text-gray-500 mt-2">Please log in to manage your account</p>
            </div>

            {/* Error message if exists */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-center text-sm">
                  {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full">
              {/* Email */}
              <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail address"
                    className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    required
                />
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    required
                />
                <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400"/>
                  ) : (
                      <Eye className="h-5 w-5 text-gray-400"/>
                  )}
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                    type="button"

                    className="text-sm text-red-500 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Log In Button */}
              <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-red-500 text-white py-3 rounded-full font-medium transition duration-300 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-600 cursor-pointer'
                  } mb-4`}
              >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging In...
                    </div>
                ) : (
                    'Log In'
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center mb-8">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signUp" className="text-red-500 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <button
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition duration-300 mb-4 cursor-pointer">
              Continue With
            </button>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mt-4">
              <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                <FaApple size={24}/>
              </button>
              <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                <FcGoogle size={24}/>
              </button>
              <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                <Facebook size={24}/>
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <Image
              src="/images/login.png"
              alt="Login illustration"
              width={700}
              height={700}
              className="max-w-lg object-contain"
          />
        </div>
      </div>
  );
}