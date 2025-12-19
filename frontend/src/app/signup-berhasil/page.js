"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


//  MAIN PAGE 
export default function SignupBerhasil() {
  const router = useRouter();

  const handleGoToSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col">

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row justify-center items-center flex-1 px-6 pt-32 pb-16 md:py-28 gap-6 md:gap-10">

        {/* LEFT — Image Placeholder */}
        <div className="w-full md:w-auto flex justify-center">
          <div className="w-[300px] h-[300px] md:w-[360px] md:h-[360px]
                          bg-white/60 backdrop-blur-sm border border-gray-200
                          rounded-[28px] shadow-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image Placeholder</span>
          </div>
        </div>

        {/* RIGHT — Success Card */}
        <div className="w-full md:w-[360px] bg-gradient-to-b from-[#4DA065] to-[#3D7C51]
                        rounded-[28px] p-10 shadow-xl text-center">

          {/* Icon */}
          <div className="w-20 h-20 bg-[#E3B214] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-white text-4xl font-semibold mb-6">
            Sign up <span className="text-yellow-300">success!</span>
          </h1>

          {/* Button */}
          <button
            onClick={handleGoToSignIn}
            className="w-full bg-[#E3B214] hover:bg-yellow-400 text-white py-3 rounded-lg 
                       text-lg font-semibold transition-all shadow-md"
          >
            Kembali ke sign in
          </button>
        </div>
      </div>
    </div>
  );
}
