"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Holding {
  id: number;
  investor_id: string;
  stock_symbol: string;
  quantity: number;
  avg_buy_price: number;
  current_market_price: number;
  exchange: string;
}

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHoldings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/admin/holdings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHoldings(response.data.holdings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-slate-950 text-white">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Holdings
        </h1>

        <p className="text-slate-400 mt-2">
          Investor Equity Holdings
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr>
                <th className="p-4 text-left">
                  Investor ID
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Avg Buy Price
                </th>

                <th className="p-4 text-left">
                  Current Price
                </th>

                <th className="p-4 text-left">
                  Exchange
                </th>

                <th className="p-4 text-left">
                  Profit/Loss
                </th>
              </tr>

            </thead>

            <tbody>

              {holdings.map((holding) => {

                const profit =
                  (holding.current_market_price -
                    holding.avg_buy_price) *
                  holding.quantity;

                return (
                  <tr
                    key={holding.id}
                    className="border-t border-slate-800"
                  >

                    <td className="p-4">
                      {holding.investor_id}
                    </td>

                    <td className="p-4 font-semibold">
                      {holding.stock_symbol}
                    </td>

                    <td className="p-4">
                      {holding.quantity}
                    </td>

                    <td className="p-4">
                      ₹{holding.avg_buy_price}
                    </td>

                    <td className="p-4">
                      ₹{holding.current_market_price}
                    </td>

                    <td className="p-4">
                      {holding.exchange}
                    </td>

                    <td
                      className={`p-4 font-semibold ${
                        profit >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ₹{profit.toFixed(2)}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}