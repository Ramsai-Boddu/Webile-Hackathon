"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function PortfolioOverview() {

  const [portfolio, setPortfolio] =
    useState<any>(null);

  useEffect(() => {

    fetchPortfolio();

  }, []);

  const fetchPortfolio =
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

        setPortfolio(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  if (!portfolio) {

    return (
      <div className="text-white">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Portfolio Overview
      </h2>

      <div className="space-y-4">

        {portfolio.equity.holdings.map(
          (stock: any, index: number) => (

            <div
              key={index}
              className="flex justify-between"
            >

              <span>
                {stock.stock_symbol}
              </span>

              <span>

                ₹
                {stock.current_market_price}

              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}