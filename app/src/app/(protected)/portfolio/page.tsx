"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface Holding {
  id: number;
  stock_symbol: string;
  quantity: string;
  current_market_price: string;
  exchange: string;
}

interface Fund {
  id: number;
  scheme_code: string;
  current_value: string;
}

export default function PortfolioPage() {

  const [portfolio, setPortfolio] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchPortfolio();

  }, []);

  // FETCH PORTFOLIO
  const fetchPortfolio =
    async () => {

      try {

        setLoading(true);

        // TOKEN
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          setError(
            "Authentication token missing"
          );

          return;
        }

        // USER
        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (!storedUser) {

          setError(
            "User session not found"
          );

          return;
        }

        const user =
          JSON.parse(storedUser);

        // INVESTOR ID
        const investorId =
          user?.investorId;

        if (!investorId) {

          setError(
            "Investor ID not found"
          );

          return;
        }

        console.log(
          "FETCHING PORTFOLIO:",
          investorId
        );

        // API CALL
        const response =
          await axios.get(
            `http://localhost:4000/portfolio/${investorId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          "PORTFOLIO RESPONSE:",
          response.data
        );

        // SAFE RESPONSE
        if (
          !response.data ||
          !response.data.data
        ) {

          setError(
            "Portfolio data unavailable"
          );

          return;
        }

        setPortfolio(
          response.data.data
        );

      } catch (err: any) {

        console.log(
          "PORTFOLIO ERROR:",
          err
        );

        setError(

          err?.response?.data?.message ||

          "Failed to fetch portfolio"
        );

      } finally {

        setLoading(false);

      }
    };

  // LOADING
  if (loading) {

    return (

      <div className="text-white p-6">

        Loading portfolio...

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

  // EMPTY
  if (!portfolio) {

    return (

      <div className="text-red-400 p-6">

        Portfolio data unavailable

      </div>

    );
  }

  return (

    <div className="text-white p-6 min-h-screen bg-[#07111f]">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Portfolio

        </h1>

        <p className="text-slate-400 mt-3">

          Investor wealth overview

        </p>

      </div>

      {/* INVESTOR DETAILS */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10">

        <h2 className="text-3xl font-bold mb-6">

          Investor Details

        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <p className="text-slate-400">

              Investor ID

            </p>

            <h3 className="text-2xl font-semibold mt-2">

              {
                portfolio?.investor?.investorId ||
                "N/A"
              }

            </h3>

          </div>

          <div>

            <p className="text-slate-400">

              Full Name

            </p>

            <h3 className="text-2xl font-semibold mt-2">

              {
                portfolio?.investor?.fullName ||
                "N/A"
              }

            </h3>

          </div>

          <div>

            <p className="text-slate-400">

              PAN Number

            </p>

            <h3 className="text-2xl font-semibold mt-2">

              {
                portfolio?.investor?.pan ||
                "N/A"
              }

            </h3>

          </div>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">

          <p className="text-slate-300">

            Total Equity

          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-4">

            ₹
            {
              Number(
                portfolio?.summary?.totalEquity || 0
              ).toLocaleString()
            }

          </h2>

        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6">

          <p className="text-slate-300">

            Mutual Funds

          </p>

          <h2 className="text-4xl font-bold text-blue-400 mt-4">

            ₹
            {
              Number(
                portfolio?.summary?.totalMutualFunds || 0
              ).toLocaleString()
            }

          </h2>

        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

          <p className="text-slate-300">

            Real Estate

          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-4">

            ₹
            {
              Number(
                portfolio?.summary?.totalRealEstate || 0
              ).toLocaleString()
            }

          </h2>

        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6">

          <p className="text-slate-300">

            Net Worth

          </p>

          <h2 className="text-4xl font-bold text-purple-400 mt-4">

            ₹
            {
              Number(
                portfolio?.summary?.totalNetworth || 0
              ).toLocaleString()
            }

          </h2>

        </div>

      </div>

      {/* EQUITY HOLDINGS */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10">

        <h2 className="text-3xl font-bold mb-8">

          Equity Holdings

        </h2>

        <div className="space-y-5">

          {
            portfolio?.equity?.holdings?.map(
              (holding: Holding) => (

                <div
                  key={holding.id}
                  className="bg-[#0f1c2e] rounded-2xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-2xl font-semibold">

                      {holding.stock_symbol}

                    </h3>

                    <p className="text-slate-400 mt-2">

                      Quantity:
                      {" "}
                      {holding.quantity}

                    </p>

                  </div>

                  <div className="text-right">

                    <h3 className="text-cyan-400 text-2xl font-bold">

                      ₹
                      {holding.current_market_price}

                    </h3>

                    <p className="text-slate-400 mt-2">

                      {holding.exchange}

                    </p>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

      {/* MUTUAL FUNDS */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h2 className="text-3xl font-bold mb-8">

          Mutual Funds

        </h2>

        <div className="space-y-5">

          {
            portfolio?.mutualFunds?.funds?.map(
              (fund: Fund) => (

                <div
                  key={fund.id}
                  className="bg-[#0f1c2e] rounded-2xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-2xl font-semibold">

                      {fund.scheme_code}

                    </h3>

                  </div>

                  <div>

                    <h3 className="text-cyan-400 text-2xl font-bold">

                      ₹
                      {
                        Number(
                          fund.current_value
                        ).toLocaleString()
                      }

                    </h3>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

    </div>
  );
}