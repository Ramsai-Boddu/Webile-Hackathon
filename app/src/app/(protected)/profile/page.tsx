"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface Investor {
  investor_id: string;
  customer_ref: string;
  full_name: string;
  email: string;
  mobile: string;
  pan_number: string;
  demat_account: string;
  folio_number: string;
}

export default function ProfilePage() {

  const [investor, setInvestor] =
    useState<Investor | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchInvestorDetails =
      async () => {

        try {

          // TOKEN
          const token =
            localStorage.getItem("token");

          // USER DATA
          const userData =
            localStorage.getItem("user");

          if (!userData) {

            setError("User not found");

            setLoading(false);

            return;
          }

          const user =
            JSON.parse(userData);

          console.log("USER:", user);

          // INVESTOR ID
          const investorId =
            user.investorId;

          console.log(
            "Investor ID:",
            investorId
          );

          if (!investorId) {

            setError(
              "Investor ID missing"
            );

            setLoading(false);

            return;
          }

          // API CALL
          const response =
            await axios.get(
              `http://localhost:4000/portfolio/investor/${investorId}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          console.log(
            "INVESTOR:",
            response.data
          );

          setInvestor(
            response.data.investor
          );

        } catch (err: any) {

          console.log(err);

          setError(
            err.response?.data?.message ||
            "Failed to fetch investor details"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchInvestorDetails();

  }, []);

  // LOADING
  if (loading) {

    return (
      <div className="text-white p-6">
        Loading profile...
      </div>
    );
  }

  // ERROR
  if (error) {

    return (
      <div className="text-red-400 p-6">
        {error}
      </div>
    );
  }

  // NO DATA
  if (!investor) {

    return (
      <div className="text-red-400 p-6">
        Investor data not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white p-6">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Investor Profile
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Complete investor account details
        </p>

      </div>

      {/* PROFILE CARD */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 border-b border-white/10 pb-8">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            {/* PROFILE IMAGE */}
            <div className="w-32 h-32 rounded-full bg-cyan-500/20 flex items-center justify-center text-5xl font-bold text-cyan-400 border border-cyan-500/20">

              {investor.full_name.charAt(0)}

            </div>

            {/* BASIC INFO */}
            <div>

              <h2 className="text-4xl font-bold">
                {investor.full_name}
              </h2>

              <p className="text-cyan-400 text-lg mt-2">
                Investor
              </p>

              <p className="text-slate-400 mt-3">
                {investor.email}
              </p>

            </div>

          </div>

          {/* STATUS */}
          <div className="flex gap-4 flex-wrap">

            <div className="bg-green-500/10 text-green-400 px-5 py-3 rounded-2xl font-semibold">
              Active Account
            </div>

            <div className="bg-cyan-500/10 text-cyan-400 px-5 py-3 rounded-2xl font-semibold">
              KYC Verified
            </div>

          </div>

        </div>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

          {/* INVESTOR ID */}
          <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Investor ID
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {investor.investor_id}
            </h3>

          </div>

          {/* CUSTOMER REF */}
          <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Customer Reference
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {investor.customer_ref}
            </h3>

          </div>

          {/* MOBILE */}
          <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Mobile Number
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {investor.mobile}
            </h3>

          </div>

          {/* PAN */}
          <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              PAN Number
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {investor.pan_number}
            </h3>

          </div>

          {/* DEMAT */}
          <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Demat Account
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {investor.demat_account}
            </h3>

          </div>

          {/* FOLIO */}
          <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Folio Number
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {investor.folio_number}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}