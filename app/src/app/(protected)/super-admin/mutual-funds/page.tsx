"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminMutualFundsPage() {

  const [funds, setFunds] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchFunds =
      async () => {

        try {

          const token =
            document.cookie
              .split("; ")
              .find((row) =>
                row.startsWith(
                  "token="
                )
              )
              ?.split("=")[1];

          const response =
            await fetch(
              "http://localhost:4000/bs/market/funds",
              {
                method: "GET",

                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          console.log(data);

          setFunds(
            data.data ||
            data.funds ||
            []
          );

        } catch (error) {

          console.log(error);

          setError(
            "Failed to fetch funds"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchFunds();

  }, []);

  if (loading) {

    return (
      <div className="p-6 text-white">
        Loading mutual funds...
      </div>
    );
  }

  if (error) {

    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (

    <div className="p-6 text-white ml-72">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Mutual Funds
        </h1>

        <p className="text-slate-400 mt-3">
          Admin mutual fund monitoring
        </p>

      </div>

      {/* EMPTY */}
      {funds.length === 0 && (

        <div className="text-slate-400">
          No mutual funds found
        </div>

      )}

      {/* FUNDS */}
      <div className="grid gap-6">

        {funds.map(
          (
            fund,
            index
          ) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >

              <div className="flex justify-between items-center">

                {/* LEFT */}
                <div>

                  <h2 className="text-2xl font-semibold text-cyan-400">

                    {fund.scheme_name}

                  </h2>

                  <p className="text-slate-400 mt-2">

                    Scheme Code:
                    {" "}
                    {fund.scheme_code}

                  </p>

                  <p className="text-slate-400 mt-2">

                    AMC:
                    {" "}
                    {fund.amc_name}

                  </p>

                </div>

                {/* RIGHT */}
                <div className="text-right">

                  <h3 className="text-2xl font-bold text-green-400">

                    {fund.fund_category}

                  </h3>

                  <p className="text-slate-400 mt-2">

                    Risk:
                    {" "}
                    {fund.risk_category}

                  </p>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}