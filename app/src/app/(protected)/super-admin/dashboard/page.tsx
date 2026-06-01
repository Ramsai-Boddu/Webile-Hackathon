"use client";

import {
  useEffect,
  useState,
} from "react";

export default function SuperAdminDashboard() {

  const [stats, setStats] =
    useState([
      {
        title: "Total Investors",
        value: "0",
      },

      {
        title: "Total Wealth",
        value: "₹0",
      },

      {
        title: "Failed SIPs",
        value: "0",
      },

      {
        title: "System Health",
        value: "99.9%",
      },
    ]);

  useEffect(() => {

    const fetchDashboardData =
      async () => {

        try {

          // TOKEN FROM LOCALSTORAGE
          const token =
            localStorage.getItem(
              "token"
            );

          // FETCH INVESTORS
          const investorsResponse =
            await fetch(
              "http://localhost:4000/admin/investors",
              {
                method: "GET",

                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const investorsData =
            await investorsResponse.json();

          console.log(
            investorsData
          );

          const investors =
            investorsData.investors || [];

          // TOTAL INVESTORS
          const totalInvestors =
            investors.length;

          // TOTAL WEALTH
          let totalWealth = 0;

          investors.forEach(
            (
              investor: any
            ) => {

              totalWealth +=
                Number(
                  investor.total_wealth || 0
                );
            }
          );

          // UPDATE STATS
          setStats([
            {
              title:
                "Total Investors",

              value:
                totalInvestors.toString(),
            },

            {
              title:
                "Total Wealth",

              value:
                `₹${(
                  totalWealth / 10000000
                ).toFixed(2)}Cr`,
            },

            {
              title:
                "Failed SIPs",

              value: "28",
            },

            {
              title:
                "System Health",

              value:
                "99.9%",
            },
          ]);

        } catch (error) {

          console.log(error);
        }
      };

    fetchDashboardData();

  }, []);

  return (

    <div className="text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Super Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-3">
          Platform operational intelligence
        </p>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >

            <p className="text-slate-400">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-4">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

    </div>
  );
}