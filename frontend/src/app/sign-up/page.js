"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


/* ===================== SIGN UP PAGE ===================== */
export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);

    // Redirect ke halaman signup berhasil
    setTimeout(() => {
      router.push("/signup-berhasil");   // <--- FIXED DI SINI
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Image Placeholder */}
            <div className="hidden md:block">
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-4 border-dashed border-white-300/40 aspect-square flex items-center justify-center">
                <p className="text-white-500/70 text-xl font-medium">Image Placeholder</p>
              </div>
            </div>

            {/* Sign Up Form */}
            <div className="bg-[#66AC6E] rounded-3xl shadow-2xl p-8 md:p-10 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sign <span className="text-yellow-400">Up</span>
              </h1>

              <div className="space-y-5">

                <div>
                  <label className="block text-sm mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 text-white pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#E3B214] hover:bg-yellow-500 text-white font-bold py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                  Sign Up
                </button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-[#E3B214] underline">
                    Sign in here
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
