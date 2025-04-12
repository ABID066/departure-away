import React from "react";
import login from "@/public/login.jpg";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col justify-center items-center pt-16">
      {/* Content (Animation + Form) */}
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl">
        {/* Animation Section */}
        <div className="w-full flex justify-center">
          <Image src={login} alt="Animation" className="h-auto lg:max-w-lg" />
        </div>

        {/* Form Section */}
        <div className="card h-full w-full lg:w-1/2 mx-auto max-w-sm shrink-0 font-[Astrovans]">
          <div className="text-center ">
            <h1 className="text-5xl font-bold pt-4">Hi !</h1>
            <h1 className="text-5xl font-bold pt-4">Welcome Back !</h1>
            <p className=" text-gray-400 pt-1">
              Please log in to manage your account.
            </p>
          </div>
          <form className="card-body text-center">
            <div className="form-control">
              <input
                type="email"
                placeholder="E-mail address"
                name="email"
                className="input input-bordered rounded-full bg-red-200 w-3/4 mb-4"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered rounded-full bg-red-200 w-3/4"
                required
              />
            </div>
            <button
              type="submit"
              className="btn rounded-full w-1/2 mx-auto text-white bg-red-500"
            >
              Log In
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <a className="text-red-500" href="">
                Sign Up
              </a>
            </p>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <button className="btn btn-wide border-2 rounded-full text-xl text-center">
              Continue With
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-2 text-center">
            <FaApple />
            <FcGoogle />
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  );
}

