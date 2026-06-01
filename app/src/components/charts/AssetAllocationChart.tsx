"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface AssetData {
  name: string;
  value: number;
}

const COLORS = [
  "#06b6d4",
  "#3b82f6",
];

export default function AssetAllocationChart() {

  const [data, setData] =
    useState<AssetData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchAssetAllocation();

  }, []);

  // FETCH ASSET DATA
  const fetchAssetAllocation =
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

        console.log(
          "ASSET ALLOCATION:",
          response.data
        );

        const summary =
          response.data.data.summary;

        const assetData = [

          {
            name: "Stocks",
            value:
              summary.totalEquity || 0,
          },

          {
            name: "Mutual Funds",
            value:
              summary.totalMutualFunds || 0,
          },

          
        ];

        setData(assetData);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load asset allocation"
        );

      } finally {

        setLoading(false);

      }
    };

  // LOADING
  if (loading) {

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white">

        Loading chart...

      </div>
    );
  }

  // ERROR
  if (error) {

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-red-400">

        {error}

      </div>
    );
  }

  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold text-white">

          Asset Allocation

        </h2>

        <p className="text-slate-400 mt-2">

          Portfolio distribution overview

        </p>

      </div>

      {/* CHART */}
      <div className="w-full h-[450px] min-w-0">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

            {/* TOOLTIP */}
            <Tooltip
              formatter={(value) => [

                `₹${Number(value).toLocaleString()}`,
                "Value",
              ]}
            />

            {/* LEGEND */}
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">

        {data.map((item, index) => (

          <div
            key={index}
            className="bg-white/5 rounded-2xl p-4"
          >

            <p className="text-slate-400">
              {item.name}
            </p>

            <h3
              className="text-2xl font-bold mt-2"
              style={{
                color:
                  COLORS[
                    index % COLORS.length
                  ],
              }}
            >

              ₹
              {item.value.toLocaleString()}

            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}