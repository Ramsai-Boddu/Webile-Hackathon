"use client";

import {
  useEffect,
  useState,
} from "react";

interface Investor {

  id: number;

  investor_id: string;

  customer_ref: string;

  full_name: string;

  email: string;

  mobile: string;

  pan_number: string;

  demat_account: string;

  folio_number: string;

  is_active: boolean;
}

export default function InvestorsPage() {

  const [investors, setInvestors] =
    useState<Investor[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH INVESTORS
  useEffect(() => {

    const fetchInvestors =
      async () => {

        try {

          // TOKEN FROM LOCALSTORAGE
          const token =
            localStorage.getItem(
              "token"
            );

          const response =
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

          const data =
            await response.json();

          console.log(data);

          if (!response.ok) {

            setError(
              data.message ||
                "Failed to fetch investors"
            );

            return;
          }

          setInvestors(
            data.investors
          );

        } catch (error) {

          console.log(error);

          setError(
            "Backend connection failed"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchInvestors();

  }, []);

  // TOGGLE ACTIVE / DEACTIVE
  const toggleStatus =
    async (
      investorId: string
    ) => {

      try {

        // TOKEN FROM LOCALSTORAGE
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:4000/admin/investor/${investorId}/deactivate`,
            {
              method: "PATCH",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (!response.ok) {

          alert(
            data.message
          );

          return;
        }

        // UPDATE UI
        setInvestors(
          (
            prevInvestors
          ) =>
            prevInvestors.map(
              (
                investor
              ) => {

                if (
                  investor.investor_id ===
                  investorId
                ) {

                  return {
                    ...investor,
                    is_active:
                      data.isActive,
                  };
                }

                return investor;
              }
            )
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update investor"
        );
      }
    };

  if (loading) {

    return (
      <div className="p-6 text-white">
        Loading investors...
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
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Investors
        </h1>

        <div className="bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-xl font-semibold">

          Total Investors:
          {" "}
          {investors.length}

        </div>

      </div>

      {/* INVESTORS */}
      <div className="grid gap-6">

        {investors.map(
          (
            investor
          ) => (

            <div
              key={
                investor.id
              }
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* NAME */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Full Name
                  </p>

                  <h2 className="text-xl font-semibold mt-2">
                    {
                      investor.full_name
                    }
                  </h2>

                </div>

                {/* EMAIL */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Email
                  </p>

                  <h2 className="text-lg mt-2">
                    {
                      investor.email
                    }
                  </h2>

                </div>

                {/* MOBILE */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Mobile
                  </p>

                  <h2 className="text-lg mt-2">
                    {
                      investor.mobile
                    }
                  </h2>

                </div>

                {/* PAN */}
                <div>

                  <p className="text-slate-400 text-sm">
                    PAN Number
                  </p>

                  <h2 className="text-lg mt-2 text-cyan-400">
                    {
                      investor.pan_number
                    }
                  </h2>

                </div>

                {/* INVESTOR ID */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Investor ID
                  </p>

                  <h2 className="text-lg mt-2">
                    {
                      investor.investor_id
                    }
                  </h2>

                </div>

                {/* CUSTOMER REF */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Customer Ref
                  </p>

                  <h2 className="text-lg mt-2">
                    {
                      investor.customer_ref
                    }
                  </h2>

                </div>

                {/* DEMAT */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Demat Account
                  </p>

                  <h2 className="text-lg mt-2">
                    {
                      investor.demat_account
                    }
                  </h2>

                </div>

                {/* FOLIO */}
                <div>

                  <p className="text-slate-400 text-sm">
                    Folio Number
                  </p>

                  <h2 className="text-lg mt-2">
                    {
                      investor.folio_number
                    }
                  </h2>

                </div>

              </div>

              {/* STATUS */}
              <div className="flex items-center justify-between mt-8">

                <span
                  className={`px-4 py-2 rounded-xl text-sm font-semibold
                  ${
                    investor.is_active
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >

                  {investor.is_active
                    ? "Active"
                    : "Inactive"}

                </span>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    toggleStatus(
                      investor.investor_id
                    )
                  }
                  className={`px-5 py-2 rounded-xl font-semibold transition-all
                  ${
                    investor.is_active
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >

                  {investor.is_active
                    ? "Deactivate"
                    : "Activate"}

                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}