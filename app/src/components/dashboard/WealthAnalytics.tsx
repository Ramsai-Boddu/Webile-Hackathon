"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function WealthAnalytics() {

  const [summary, setSummary] =
    useState<any>(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const user =
          JSON.parse(
            localStorage.getItem("user") || "{}"
          );

        const response =
          await axios.get(
            `http://localhost:4000/portfolio/${user.investorId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setSummary(
          response.data.data.summary
        );

      } catch (error) {

        console.log(error);

      }
    };

  if (!summary) {

    return (
      <div className="text-white">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Wealth Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-cyan-500/10 p-5 rounded-xl">

          <p className="text-slate-400">
            Total Equity
          </p>

          <h3 className="text-2xl font-bold mt-3">

            ₹
            {summary.totalEquity}

          </h3>

        </div>

        <div className="bg-blue-500/10 p-5 rounded-xl">

          <p className="text-slate-400">
            Mutual Funds
          </p>

          <h3 className="text-2xl font-bold mt-3">

            ₹
            {summary.totalMutualFunds}

          </h3>

        </div>

        <div className="bg-green-500/10 p-5 rounded-xl">

          <p className="text-slate-400">
            Net Worth
          </p>

          <h3 className="text-2xl font-bold mt-3">

            ₹
            {summary.totalNetworth}

          </h3>

        </div>

      </div>

    </div>
  );
}