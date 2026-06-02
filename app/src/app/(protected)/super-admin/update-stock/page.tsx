"use client";

import {
  useState,
} from "react";

export default function UpdateStockPage() {

  const [stockSymbol, setStockSymbol] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      setMessage("");

      try {

        // TOKEN
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
            "http://localhost:4000/admin/market/stocks/update-price",
            {
              method: "POST",

              mode: "cors",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                stockSymbol,
                price:
                  Number(price),
              }),
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (!response.ok) {

          setMessage(
            data.message ||
              "Failed to update stock price"
          );

          return;
        }

        setMessage(
          "Stock price updated successfully"
        );

        // RESET
        setStockSymbol("");

        setPrice("");

      } catch (error) {

        console.log(error);

        setMessage(
          "Backend connection failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Update Stock Price
        </h1>

        <p className="text-slate-400 mt-2">
          Update stock market prices
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6"
      >

        {/* STOCK SYMBOL */}
        <div>

          <label className="block text-sm text-slate-400 mb-2">

            Stock Symbol

          </label>

          <input
            type="text"
            placeholder="RELIANCE"
            value={stockSymbol}
            onChange={(e) =>
              setStockSymbol(
                e.target.value
              )
            }
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
          />

        </div>

        {/* PRICE */}
        <div>

          <label className="block text-sm text-slate-400 mb-2">

            Current Market Price

          </label>

          <input
            type="number"
            placeholder="2850"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 transition-all rounded-2xl px-8 py-4 font-semibold"
        >

          {loading
            ? "Updating..."
            : "Update Stock"}

        </button>

      </form>

      {/* MESSAGE */}
      {message && (

        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 text-cyan-400">

          {message}

        </div>

      )}

    </div>
  );
}