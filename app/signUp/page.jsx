"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BiLogoMicrosoft } from "react-icons/bi";
import {useRouter} from "next/navigation";


export default function Page() {
  const router = useRouter();
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+880",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default value
    acceptTerms: false
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for password match validation
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Check if passwords match and validate form
  useEffect(() => {
    // Check if passwords match when either password field changes
    if (formData.password === "" && formData.confirmPassword === "") {
      setPasswordsMatch(true);
    } else if (formData.confirmPassword !== "" && formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    // Check if form is valid (all required fields filled and passwords match)
    const requiredFieldsFilled =
        formData.firstName !== "" &&
        formData.lastName !== "" &&
        formData.mobile !== "" &&
        formData.email !== "" &&
        formData.password !== "" &&
        formData.confirmPassword !== "" &&
        formData.acceptTerms;

    setFormIsValid(requiredFieldsFilled && passwordsMatch);
  }, [formData]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation on submit
    const requiredFieldsFilled =
        formData.firstName !== "" &&
        formData.lastName !== "" &&
        formData.mobile !== "" &&
        formData.email !== "" &&
        formData.password !== "" &&
        formData.confirmPassword !== "" &&
        formData.acceptTerms;

    if (!requiredFieldsFilled) {
      // If the form isn't fully filled, set validation state
      setFormIsValid(false);
      return;
    }

    if (!passwordsMatch) {
      // If passwords don't match, don't submit the form
      return;
    }

    // Format data according to API requirements
    const apiData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      phone: `${formData.countryCode}${formData.mobile}`,
      role: formData.role
    };

    // If validation passes, submit the form
    console.log("Form Data for API:", apiData);
    localStorage.setItem("userEmail", formData.email);
    router.push('/signUp/verify');
  };

  return (
      <div className="flex min-h-screen bg-white">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <Image
              src="/images/signup.png"
              alt="Sign up illustration"
              width={700}
              height={700}
              className="max-w-auto"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Let's get started!</h1>
              <p className="text-gray-500 mt-1">Create New Account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full">
              {/* Name Fields */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none"
                      required
                  />
                </div>
                <div className="w-1/2">
                  <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none"
                      required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex mb-4">
                <div className="w-1/4 mr-2">
                  <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none"
                  >
                    <option value="+880">+880</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                  </select>
                </div>
                <div className="w-3/4">
                  <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile No"
                      className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none"
                      required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail address"
                    className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none"
                    required
                />
              </div>

              {/* Password */}
              <div className="mb-4 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none ${!passwordsMatch && formData.password ? 'border-2 border-red-500' : ''}`}
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

              {/* Confirm Password */}
              <div className="mb-4 relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={`w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none ${!passwordsMatch && formData.confirmPassword ? 'border-2 border-red-500' : ''}`}
                    required
                />
                <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400"/>
                  ) : (
                      <Eye className="h-5 w-5 text-gray-400"/>
                  )}
                </div>
              </div>

              {/* Password match error message */}
              {!passwordsMatch && formData.confirmPassword && (
                  <div className="mb-4 text-red-500 text-sm">
                    Passwords do not match
                  </div>
              )}

              {/* Role Selection */}
              <div className="mb-4">
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-800 focus:outline-none"
                    required
                >
                  <option value="user">User</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="agency">Agency</option>
                </select>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                    required
                />
                <label className="ml-2 text-sm text-gray-700">
                  I accept the{" "}
                  <Link href="#" className="text-red-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-red-500 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-full font-medium hover:bg-red-600 transition duration-300 cursor-pointer"
              >
                Sign Up
              </button>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/signIn" className="text-red-500 hover:underline">
                    Log In
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

            {/* Social Sign Up */}
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition duration-300 mb-4">
              Register With
            </button>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mt-4">
              <button className="text-gray-600 hover:text-gray-800">
                <FaApple size={24} />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <FcGoogle size={24} />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <BiLogoMicrosoft size={24} />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <Facebook size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}