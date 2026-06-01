"use client";

import { useState } from "react";
import axios from "axios";

export default function UpdateNAVPage() {

  const [schemeCode, setSchemeCode] =
    useState("");

  const [navValue, setNavValue] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.post(
          "http://localhost:4000/admin/market/funds/update-nav",
          {
            schemeCode,
            navValue: Number(navValue),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setMessage(
        response.data.message
      );

      setSchemeCode("");

      setNavValue("");

    } catch (error: any) {

      setMessage(
        error?.response?.data?.message ||
        "Failed to update NAV"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Update Fund NAV
        </h1>

        <p className="text-slate-400 mb-8">
          Update Mutual Fund NAV Values
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
        >

          <div className="mb-6">

            <label className="block mb-2 text-sm font-medium">
              Scheme Code
            </label>

            <input
              type="text"
              value={schemeCode}
              onChange={(e) =>
                setSchemeCode(
                  e.target.value
                )
              }
              placeholder="MF1001"
              required
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 text-sm font-medium">
              NAV Value
            </label>

            <input
              type="number"
              step="0.01"
              value={navValue}
              onChange={(e) =>
                setNavValue(
                  e.target.value
                )
              }
              placeholder="125.50"
              required
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all"
          >

            {loading
              ? "Updating..."
              : "Update NAV"}

          </button>

        </form>

        {message && (

          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}