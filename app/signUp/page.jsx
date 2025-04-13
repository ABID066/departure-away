
import React from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BiLogoMicrosoft } from "react-icons/bi";
import signUp from "../../public/images/signup.jpg";
import Image from "next/image";

export default function page() {
  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col justify-center items-center">
      {/* Content (Animation + Form) */}
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl">
        {/* Form Section */}
        <div className="card h-full w-full lg:w-1/2 mx-auto max-w-sm shrink-0 font-[Astrovans]">
          <div className="text-center">
            <h1 className="text-3xl font-bold pt-4">Let's get started!</h1>
            <p className=" text-gray-400 pt-1">Create new account.</p>
          </div>
          <form className="card-body text-center space-y-2">
            <div className="flex gap-4 form-control">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="input input-bordered rounded-full bg-red-200 w-3/4"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="input input-bordered rounded-full bg-red-200 w-3/4"
                required
              />
            </div>
            <div className="flex form-control gap-2">
              <input
                type="text"
                name="code"
                placeholder="+880"
                className="w-1/5 input input-bordered rounded-full bg-red-200 text-black"
              />
              <input
                type="text"
                name="number"
                placeholder="password"
                className="input input-bordered rounded-full bg-red-200 w-4/5"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="E-mail address"
                name="email"
                className="input input-bordered rounded-full bg-red-200 w-full"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered rounded-full bg-red-200 w-full"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="input input-bordered rounded-full bg-red-200 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn rounded-full w-1/2 mx-auto text-white bg-red-500"
            >
              Sign Up
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <a className="text-red-500" href="/signIn">
                Sign In
              </a>
            </p>
          </form>
          <p className="divider divider-neutral">or</p>
          <button className="btn btn-outline rounded-full text-xl text-center w-full mx-auto">
            Register With
          </button>
          <div className="flex justify-center mt-4 space-x-2 text-center">
            <FaApple />
            <FcGoogle />
            <BiLogoMicrosoft />
            <FaFacebook />
          </div>
        </div>
        {/* Animation Section */}
        <div className="w-full flex justify-center">
          <Image src={signUp} alt="Animation" className="h-auto lg:max-w-lg" />
        </div>
      </div>
    </div>
  );
}

