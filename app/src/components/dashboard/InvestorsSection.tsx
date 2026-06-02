"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Investor {
  full_name: string;
  email: string;
  investor_id: string;
  pan_number: string;
  mobile: string;
  demat_account: string;
}

export default function InvestorsSection() {

  const [investor, setInvestor] =
    useState<Investor | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchInvestorData();
  }, []);

  const fetchInvestorData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );

      const investorResponse =
        await axios.get(
          `http://localhost:4000/portfolio/investor/${user.investorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setInvestor(
        investorResponse.data.investor
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="text-white">
        Loading investor details...
      </div>
    );
  }

  if (!investor) {

    return (
      <div className="text-red-400">
        Investor not found
      </div>
    );
  }

  return (

    <div className="space-y-8">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Investor Details
            </h2>

            <p className="text-slate-400 mt-2">
              Logged in investor profile
            </p>

          </div>

        </div>

        <div className="bg-[#0f1c2e] border border-white/5 rounded-2xl p-6">

          <h3 className="text-3xl font-semibold text-white">
            {investor.full_name}
          </h3>

          <p className="text-slate-400 mt-3 text-lg">
            {investor.email}
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            <div className="bg-white/5 rounded-2xl p-5">

              <p className="text-slate-400">
                Investor ID
              </p>

              <h4 className="text-xl font-bold mt-3">
                {investor.investor_id}
              </h4>

            </div>

            <div className="bg-white/5 rounded-2xl p-5">

              <p className="text-slate-400">
                PAN Number
              </p>

              <h4 className="text-xl font-bold mt-3">
                {investor.pan_number}
              </h4>

            </div>

            <div className="bg-white/5 rounded-2xl p-5">

              <p className="text-slate-400">
                Mobile
              </p>

              <h4 className="text-xl font-bold mt-3">
                {investor.mobile}
              </h4>

            </div>

            <div className="bg-white/5 rounded-2xl p-5">

              <p className="text-slate-400">
                Demat Account
              </p>

              <h4 className="text-xl font-bold mt-3">
                {investor.demat_account}
              </h4>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}