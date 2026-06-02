"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Stock {
  stock_symbol: string;
  company_name: string;
  exchange: string;
  sector: string;
  price: string;
}

export default function UpdateStockPage() {

  const [stocks, setStocks] =
    useState<Stock[]>([]);

  const [selectedStock, setSelectedStock] =
    useState("");

  const [newPrice, setNewPrice] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchStocks();

  }, []);

  const fetchStocks = async () => {
  try {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        "http://localhost:4000/bs/market/stocks",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      "STOCK RESPONSE:",
      response.data
    );

    let stocksData = [];

    if (
      Array.isArray(
        response.data?.stocks
      )
    ) {

      stocksData =
        response.data.stocks;

    } else if (
      Array.isArray(
        response.data?.data
      )
    ) {

      stocksData =
        response.data.data;

    } else if (
      Array.isArray(
        response.data
      )
    ) {

      stocksData =
        response.data;

    }

    console.log(
      "PARSED STOCKS:",
      stocksData
    );

    setStocks(stocksData);

  } catch (error) {

    console.log(
      "FETCH STOCKS ERROR:",
      error
    );

    setError(
      "Failed to fetch stocks"
    );

  } finally {

    setLoading(false);

  }
};

  const updateStockPrice =
    async () => {

      if (
        !selectedStock ||
        !newPrice
      ) {

        alert(
          "Please select stock and enter new price"
        );

        return;
      }

      try {

        setUpdating(true);

        const token =
          localStorage.getItem("token");

        await axios.post(
          "http://localhost:4000/admin/update-stock-price",
          {
            stockSymbol:
              selectedStock,

            price:
              Number(newPrice),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Stock price updated successfully"
        );

        setSelectedStock("");

        setNewPrice("");

        fetchStocks();

      } catch (err) {

        console.log(err);

        alert(
          "Failed to update stock price"
        );

      } finally {

        setUpdating(false);

      }
    };

  if (loading) {

    return (

      <div className="p-6 text-white">

        Loading stocks...

      </div>

    );
  }

  return (

    <div className="p-6 text-white min-h-screen bg-[#07111f]">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Update Stocks

        </h1>

        <p className="text-slate-400 mt-3">

          Update market stock prices

        </p>

      </div>

      {error && (

        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6">

          {error}

        </div>

      )}

      {/* UPDATE CARD */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-3 text-slate-400">

              Select Stock

            </label>

            <select
  value={selectedStock}
  onChange={(e) =>
    setSelectedStock(
      e.target.value
    )
  }
  className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-4"
>

  <option value="">
    Select Stock
  </option>

  {stocks.length > 0 ? (

    stocks.map((stock) => (

      <option
        key={stock.stock_symbol}
        value={stock.stock_symbol}
      >

        {stock.stock_symbol}
        {" - "}
        {stock.company_name}

      </option>

    ))

  ) : (

    <option disabled>
      No Stocks Found
    </option>

  )}

</select>

          </div>

          <div>

            <label className="block mb-3 text-slate-400">

              New Price

            </label>

            <input
              type="number"
              value={newPrice}
              onChange={(e) =>
                setNewPrice(
                  e.target.value
                )
              }
              placeholder="Enter new price"
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-4"
            />

          </div>

        </div>

        <button
          onClick={updateStockPrice}
          disabled={updating}
          className="mt-8 bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-semibold"
        >

          {updating
            ? "Updating..."
            : "Update Stock Price"}

        </button>

      </div>

      {/* STOCK LIST */}

      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">

          Available Stocks

        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          {stocks.map((stock) => (

            <div
              key={
                stock.stock_symbol
              }
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="text-3xl font-bold">

                    {
                      stock.stock_symbol
                    }

                  </h3>

                  <p className="text-slate-400 mt-2">

                    {
                      stock.company_name
                    }

                  </p>

                  <p className="text-slate-500 mt-2">

                    {
                      stock.exchange
                    }
                    {" • "}
                    {
                      stock.sector
                    }

                  </p>

                </div>

                <div>

                  <h2 className="text-cyan-400 text-4xl font-bold">

                    ₹
                    {stock.price}

                  </h2>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}