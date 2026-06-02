"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import {Eye,EyeOff,ShieldCheck,} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER
      localStorage.setItem(
  "user",
  JSON.stringify({
    investorId:
      response.data.user.investorId,

    fullName:
      response.data.user.fullName,

    email:
      response.data.user.email,

    role:
      response.data.user.role,
  })
);

      // ROLE BASED REDIRECT
      if (
        data.user.role === "ADMIN"
      ) {

        router.push(
          "/super-admin/dashboard"
        );

      } else {

        router.push("/dashboard");

      }

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen flex bg-[#07111f]">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-black items-center justify-center">

        {/* GLOW */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-10 left-10"></div>

        <div className="absolute w-[400px] h-[400px] bg-blue-700/20 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="relative z-10 px-16">

          {/* LOGO */}
          <div className="flex items-center gap-4 mb-8">

            <div className="bg-cyan-500 p-4 rounded-2xl shadow-lg shadow-cyan-500/30">

              <ShieldCheck
                size={40}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-white">
                Wealth Intelligence
              </h1>

              <p className="text-slate-300 mt-2">
                Unified Wealth Monitoring Platform
              </p>

            </div>

          </div>

          {/* FEATURE CARDS */}
          <div className="space-y-6 mt-10">

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">

              <h3 className="text-white font-semibold text-lg">
                Unified Portfolio
              </h3>

              <p className="text-slate-300 mt-2 text-sm">
                Manage stocks, mutual funds and real-estate assets
                from one centralized dashboard.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">

              <h3 className="text-white font-semibold text-lg">
                Operational Insights
              </h3>

              <p className="text-slate-300 mt-2 text-sm">
                Track investor activity, SIP failures and realtime
                system operations.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">

              <h3 className="text-white font-semibold text-lg">
                Enterprise Security
              </h3>

              <p className="text-slate-300 mt-2 text-sm">
                Secure JWT authentication with RBAC enabled access.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-[#0b1727]">

        <div className="w-full max-w-md">

          {/* LOGIN CARD */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

            {/* HEADER */}
            <div className="text-center">

              <h2 className="text-4xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="text-slate-400 mt-3">
                Login to your wealth intelligence dashboard
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="text-sm text-slate-300 block mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full bg-[#111c2d] border border-slate-700 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-slate-500 transition"
                  required
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="text-sm text-slate-300 block mb-2">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full bg-[#111c2d] border border-slate-700 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-slate-500 transition"
                    required
                  />

                  {/* TOGGLE */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute top-3.5 right-4 text-slate-400 hover:text-white"
                  >

                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

              </div>

              {/* REMEMBER */}
              <div className="flex items-center gap-2">

                <input type="checkbox" />

                <span className="text-sm text-slate-400">
                  Remember me
                </span>

              </div>

              {/* ERROR */}
              {error && (

                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">

                  {error}

                </div>

              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-all text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >

                {loading
                  ? "Logging in..."
                  : "Login to Dashboard"}

              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center text-sm text-slate-500">

              Secure Enterprise Wealth Monitoring Platform

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}