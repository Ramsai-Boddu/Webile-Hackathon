"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface Card {
  title: string;
  value: string;
}

export default function DashboardCards() {

  const [cards, setCards] =
    useState<Card[]>([
      {
        title: "Total Wealth",
        value: "₹0",
      },

      {
        title: "Stocks",
        value: "₹0",
      },

      {
        title: "Mutual Funds",
        value: "₹0",
      },

      
    ]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchPortfolio();

  }, []);

  // FETCH PORTFOLIO
  const fetchPortfolio =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem("token");

        const user =
          JSON.parse(
            localStorage.getItem("user") || "{}"
          );

        if (
          !token ||
          !user?.investorId
        ) {

          return;
        }

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

        console.log(
          "DASHBOARD API:",
          response.data
        );

        const summary =
          response?.data?.data?.summary;

        setCards([

          {
            title: "Total Wealth",

            value:
              `₹${Number(
                summary?.totalNetworth || 0
              ).toLocaleString()}`,
          },

          {
            title: "Stocks",

            value:
              `₹${Number(
                summary?.totalEquity || 0
              ).toLocaleString()}`,
          },

          {
            title: "Mutual Funds",

            value:
              `₹${Number(
                summary?.totalMutualFunds || 0
              ).toLocaleString()}`,
          },

          
        ]);

      } catch (error) {

        console.log(
          "DASHBOARD ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

  // LOADING
  if (loading) {

    return (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl animate-pulse"
          >

            <div className="h-4 bg-white/10 rounded w-24 mb-4" />

            <div className="h-10 bg-white/10 rounded w-36" />

          </div>

        ))}

      </div>

    );
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-lg hover:border-cyan-500/30 transition-all"
        >

          {/* TITLE */}
          <p className="text-slate-400 text-lg">

            {card.title}

          </p>

          {/* VALUE */}
          <h2 className="text-3xl font-bold mt-4 text-white">

            {card.value}

          </h2>

        </div>

      ))}

    </div>
  );
}