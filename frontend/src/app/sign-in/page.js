"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // FIX: Hanya 1 import

export default function SignIn() {
  const router = useRouter(); // FIX: aktif & tidak dobel

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FIX: hapus duplicate function
  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  // FIX: Sekarang sign in pindah ke halaman "signin-berhasil"
  const handleSignIn = () => {
    console.log("Sign in with email:", email);
    router.push("/signin-berhasil");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image Placeholder */}
            <div className="hidden md:block">
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-4 border-dashed border-white-300/40 aspect-square flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-full h-px bg-white-400/40 rotate-45"></div>
                  <div className="absolute w-full h-px bg-white-400/40 -rotate-45"></div>
                </div>
                <p className="text-white-500/70 text-xl font-medium z-10">
                  Image Placeholder
                </p>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full max-w-md mx-auto md:mx-0">
              <div className="bg-[#66AC6E] rounded-3xl shadow-2xl p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Sign <span className="text-[#E3B214]">In</span>
                  </h1>
                  <div className="w-12 h-12 bg-[#E3B214] rounded-full"></div>
                </div>

                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition mb-6 shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Lanjut dengan Google
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#66AC6E] text-white/70">
                      atau
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Username/Email */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Username atau Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ketik di sini"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-transparent focus:border-white focus:bg-white focus:outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ketik di sini"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-transparent focus:border-white focus:bg-white focus:outline-none text-gray-700 placeholder-gray-400 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    onClick={handleSignIn}
                    className="w-full bg-[#E3B214] hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg mt-6"
                  >
                    Sign In
                  </button>

                  {/* Forgot Password */}
                  <div className="text-center mt-4">
                    <a
                      href="/sign-up"
                      className="text-white/90 hover:text-white text-sm underline"
                    >
                      Belum Buat akun di sini
                    </a>
                  </div>

                  {/* Terms */}
                  <p className="text-white/70 text-xs text-center mt-6 leading-relaxed">
                    Dengan mendaftar, saya setuju dengan{" "}
                    <a href="/terms" className="underline hover:text-white">
                      kebijakan privasi
                    </a>{" "}
                    dari Bumi Bersih
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
