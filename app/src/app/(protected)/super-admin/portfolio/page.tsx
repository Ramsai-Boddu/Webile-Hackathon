"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Portfolio {
  investor_pan: string;
  total_equity: number;
  total_mutual_funds: number;
  total_real_estate: number;
  total_networth: number;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/admin/portfolio",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPortfolios(response.data.portfolios || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const totalEquity = portfolios.reduce(
    (sum, p) => sum + Number(p.total_equity),
    0
  );

  const totalMF = portfolios.reduce(
    (sum, p) => sum + Number(p.total_mutual_funds),
    0
  );

  const totalRE = portfolios.reduce(
    (sum, p) => sum + Number(p.total_real_estate),
    0
  );

  const totalNetworth = portfolios.reduce(
    (sum, p) => sum + Number(p.total_networth),
    0
  );

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading Portfolio...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-slate-950 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Portfolio Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Total Equity
          </h3>
          <p className="text-2xl font-bold text-cyan-400">
            ₹{totalEquity.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Mutual Funds
          </h3>
          <p className="text-2xl font-bold text-green-400">
            ₹{totalMF.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Real Estate
          </h3>
          <p className="text-2xl font-bold text-yellow-400">
            ₹{totalRE.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Net Worth
          </h3>
          <p className="text-2xl font-bold text-purple-400">
            ₹{totalNetworth.toLocaleString()}
          </p>
        </div>

      </div>

      {/* Portfolio Table */}

      <div className="bg-slate-900 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>
              <th className="p-4 text-left">
                PAN
              </th>

              <th className="p-4 text-left">
                Equity
              </th>

              <th className="p-4 text-left">
                Mutual Funds
              </th>

              <th className="p-4 text-left">
                Real Estate
              </th>

              <th className="p-4 text-left">
                Net Worth
              </th>
            </tr>

          </thead>

          <tbody>

            {portfolios.map((portfolio, index) => (

              <tr
                key={index}
                className="border-t border-slate-800"
              >

                <td className="p-4">
                  {portfolio.investor_pan}
                </td>

                <td className="p-4">
                  ₹{portfolio.total_equity.toLocaleString()}
                </td>

                <td className="p-4">
                  ₹{portfolio.total_mutual_funds.toLocaleString()}
                </td>

                <td className="p-4">
                  ₹{portfolio.total_real_estate.toLocaleString()}
                </td>

                <td className="p-4 font-bold text-cyan-400">
                  ₹{portfolio.total_networth.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}